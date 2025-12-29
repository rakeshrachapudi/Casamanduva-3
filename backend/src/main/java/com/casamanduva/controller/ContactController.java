package com.casamanduva.controller;

import com.casamanduva.dto.ApiResponse;
import com.casamanduva.dto.EnquiryDTO;
import com.casamanduva.model.Enquiry;
import com.casamanduva.model.NewsletterSubscriber;
import com.casamanduva.repository.NewsletterRepository;
import com.casamanduva.service.EnquiryService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class ContactController {

    private final EnquiryService enquiryService;
    private final NewsletterRepository newsletterRepository;

    /**
     * Contact form submission - same as enquiry but from contact page
     */
    @PostMapping("/contact")
    public ResponseEntity<ApiResponse<Enquiry>> submitContactForm(@Valid @RequestBody EnquiryDTO contactDTO) {
        log.info("Contact form submission from: {}", contactDTO.getEmail());
        
        // Set source as contact if not specified
        if (contactDTO.getSource() == null || contactDTO.getSource().isEmpty()) {
            contactDTO.setSource("contact");
        }
        
        try {
            Enquiry enquiry = enquiryService.createEnquiry(contactDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(enquiry, "Thank you for reaching out! We will get back to you soon."));
        } catch (Exception e) {
            log.error("Error processing contact form", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to submit form. Please try again or call us directly."));
        }
    }

    /**
     * Newsletter subscription
     */
    @PostMapping("/newsletter/subscribe")
    public ResponseEntity<ApiResponse<NewsletterSubscriber>> subscribeNewsletter(
            @RequestBody Map<String, String> request) {
        
        String email = request.get("email");
        
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Email is required"));
        }

        // Check if already subscribed
        if (newsletterRepository.existsByEmail(email)) {
            return ResponseEntity.ok(ApiResponse.success(null, "You're already subscribed!"));
        }

        try {
            NewsletterSubscriber subscriber = NewsletterSubscriber.builder()
                    .email(email.trim().toLowerCase())
                    .source(request.getOrDefault("source", "website"))
                    .build();

            NewsletterSubscriber saved = newsletterRepository.save(subscriber);
            log.info("New newsletter subscriber: {}", email);
            
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(saved, "Successfully subscribed to our newsletter!"));
        } catch (Exception e) {
            log.error("Error subscribing to newsletter", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to subscribe. Please try again."));
        }
    }

    /**
     * Unsubscribe from newsletter
     */
    @PostMapping("/newsletter/unsubscribe")
    public ResponseEntity<ApiResponse<Object>> unsubscribeNewsletter(
            @RequestBody Map<String, String> request) {
        
        String email = request.get("email");
        
        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Email is required"));
        }

        return newsletterRepository.findByEmail(email.toLowerCase())
                .map(subscriber -> {
                    subscriber.setActive(false);
                    subscriber.setUnsubscribedAt(java.time.LocalDateTime.now());
                    newsletterRepository.save(subscriber);
                    return ResponseEntity.ok(ApiResponse.success(null, "Successfully unsubscribed"));
                })
                .orElse(ResponseEntity.ok(ApiResponse.success(null, "Email not found in our list")));
    }

    /**
     * Health check endpoint
     */
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
