package com.casamanduva.controller;

import com.casamanduva.dto.ApiResponse;
import com.casamanduva.dto.EnquiryDTO;
import com.casamanduva.model.Enquiry;
import com.casamanduva.model.NewsletterSubscriber;
import com.casamanduva.repository.NewsletterRepository;
import com.casamanduva.service.EnquiryService;
import com.casamanduva.service.NotificationService;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class ContactController {

    private final EnquiryService enquiryService;
    private final NewsletterRepository newsletterRepository;
    private final NotificationService notificationService; // 🔥 ADDED THIS

    // Create buckets with final modifier
    private final Bucket contactFormBucket = Bucket4j.builder()
            .addLimit(Bandwidth.classic(10, Refill.intervally(10, Duration.ofMinutes(1))))
            .build();

    private final Bucket newsletterBucket = Bucket4j.builder()
            .addLimit(Bandwidth.classic(20, Refill.intervally(20, Duration.ofMinutes(1))))
            .build();

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<Enquiry>> submitContactForm(@Valid @RequestBody EnquiryDTO contactDTO) {
        log.info("Contact form submission from: {}", contactDTO.getEmail());

        if (!contactFormBucket.tryConsume(1)) {
            log.warn("Rate limit exceeded for contact form");
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(ApiResponse.error("Too many requests. Please try again later."));
        }

        if (contactDTO.getSource() == null || contactDTO.getSource().isEmpty()) {
            contactDTO.setSource("contact");
        }

        try {
            contactDTO.setName(contactDTO.getName().trim());
            contactDTO.setEmail(contactDTO.getEmail().trim().toLowerCase());
            contactDTO.setPhone(contactDTO.getPhone().trim());
            if (contactDTO.getMessage() != null) {
                contactDTO.setMessage(contactDTO.getMessage().trim());
            }

            Enquiry enquiry = enquiryService.createEnquiry(contactDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(enquiry, "Thank you for reaching out! We will get back to you soon."));
        } catch (IllegalArgumentException e) {
            log.warn("Invalid contact form data: {}", e.getMessage());
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            log.error("Error processing contact form", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to submit form. Please try again."));
        }
    }

    @PostMapping("/newsletter/subscribe")
    public ResponseEntity<ApiResponse<NewsletterSubscriber>> subscribeNewsletter(
            @RequestBody Map<String, String> request) {

        if (!newsletterBucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(ApiResponse.error("Too many requests. Please try again later."));
        }

        String email = request.get("email");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Email is required"));
        }

        email = email.trim().toLowerCase();

        if (!email.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid email format"));
        }

        if (newsletterRepository.existsByEmail(email)) {
            return ResponseEntity.ok(ApiResponse.success(null, "You're already subscribed!"));
        }

        try {
            NewsletterSubscriber subscriber = NewsletterSubscriber.builder()
                    .email(email)
                    .source(request.getOrDefault("source", "website"))
                    .build();

            NewsletterSubscriber saved = newsletterRepository.save(subscriber);
            log.info("New newsletter subscriber: {}", email);

            // 🔥 SEND WELCOME EMAIL TO USER
            try {
                notificationService.sendNewsletterWelcome(email);
            } catch (Exception e) {
                log.error("Failed to send newsletter welcome email", e);
            }

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(saved, "Successfully subscribed to our newsletter!"));
        } catch (Exception e) {
            log.error("Error subscribing to newsletter", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to subscribe. Please try again."));
        }
    }

    @PostMapping("/newsletter/unsubscribe")
    public ResponseEntity<ApiResponse<Object>> unsubscribeNewsletter(
            @RequestBody Map<String, String> request) {

        String email = request.get("email");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Email is required"));
        }

        email = email.trim().toLowerCase();

        return newsletterRepository.findByEmail(email)
                .map(subscriber -> {
                    subscriber.setActive(false);
                    subscriber.setUnsubscribedAt(java.time.LocalDateTime.now());
                    newsletterRepository.save(subscriber);
                    return ResponseEntity.ok(ApiResponse.success(null, "Successfully unsubscribed"));
                })
                .orElse(ResponseEntity.ok(ApiResponse.success(null, "Email not found in our list")));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> healthCheck() {
        return ResponseEntity.ok(ApiResponse.success(Map.of(
                "status", "UP",
                "service", "CASAMANDUVA API",
                "version", "1.0.0",
                "timestamp", java.time.LocalDateTime.now()
        )));
    }
}