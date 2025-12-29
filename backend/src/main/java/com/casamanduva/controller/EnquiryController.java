package com.casamanduva.controller;

import com.casamanduva.dto.ApiResponse;
import com.casamanduva.dto.EnquiryDTO;
import com.casamanduva.model.Enquiry;
import com.casamanduva.service.EnquiryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enquiries")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class EnquiryController {

    private final EnquiryService enquiryService;

    /**
     * Submit a new enquiry - saves to database and sends notification
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Enquiry>> createEnquiry(@Valid @RequestBody EnquiryDTO enquiryDTO) {
        log.info("Received new enquiry from: {}", enquiryDTO.getEmail());
        
        try {
            Enquiry enquiry = enquiryService.createEnquiry(enquiryDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(enquiry, "Enquiry submitted successfully! We will contact you soon."));
        } catch (Exception e) {
            log.error("Error creating enquiry", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to submit enquiry. Please try again."));
        }
    }

    /**
     * Get all enquiries (Admin)
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Enquiry>>> getAllEnquiries() {
        List<Enquiry> enquiries = enquiryService.getAllEnquiries();
        return ResponseEntity.ok(ApiResponse.success(enquiries));
    }

    /**
     * Get new enquiries only (Admin)
     */
    @GetMapping("/new")
    public ResponseEntity<ApiResponse<List<Enquiry>>> getNewEnquiries() {
        List<Enquiry> enquiries = enquiryService.getNewEnquiries();
        return ResponseEntity.ok(ApiResponse.success(enquiries));
    }

    /**
     * Get enquiry by ID (Admin)
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Enquiry>> getEnquiryById(@PathVariable Long id) {
        try {
            Enquiry enquiry = enquiryService.getEnquiryById(id);
            return ResponseEntity.ok(ApiResponse.success(enquiry));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Update enquiry status (Admin)
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Enquiry>> updateStatus(
            @PathVariable Long id,
            @RequestParam Enquiry.EnquiryStatus status) {
        try {
            Enquiry enquiry = enquiryService.updateEnquiryStatus(id, status);
            return ResponseEntity.ok(ApiResponse.success(enquiry, "Status updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Add note to enquiry (Admin)
     */
    @PostMapping("/{id}/notes")
    public ResponseEntity<ApiResponse<Enquiry>> addNote(
            @PathVariable Long id,
            @RequestBody String note) {
        try {
            Enquiry enquiry = enquiryService.addNote(id, note);
            return ResponseEntity.ok(ApiResponse.success(enquiry, "Note added successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Get today's enquiry count (Admin dashboard)
     */
    @GetMapping("/stats/today")
    public ResponseEntity<ApiResponse<Long>> getTodayCount() {
        Long count = enquiryService.getEnquiryCountToday();
        return ResponseEntity.ok(ApiResponse.success(count));
    }
}
