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

    @PostMapping
    public ResponseEntity<ApiResponse<Enquiry>> createEnquiry(@Valid @RequestBody EnquiryDTO enquiryDTO) {
        log.info("New enquiry from: {}", enquiryDTO.getEmail());
        try {
            Enquiry enquiry = enquiryService.createEnquiry(enquiryDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(enquiry, "Enquiry submitted! We will contact you soon."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            log.error("Error creating enquiry", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to submit enquiry."));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Enquiry>>> getAllEnquiries() {
        return ResponseEntity.ok(ApiResponse.success(enquiryService.getAllEnquiries()));
    }

    @GetMapping("/new")
    public ResponseEntity<ApiResponse<List<Enquiry>>> getNewEnquiries() {
        return ResponseEntity.ok(ApiResponse.success(enquiryService.getNewEnquiries()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Enquiry>> getEnquiryById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(ApiResponse.success(enquiryService.getEnquiryById(id)));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApiResponse<Enquiry>> updateStatus(
            @PathVariable Long id,
            @RequestParam Enquiry.EnquiryStatus status) {
        try {
            Enquiry enquiry = enquiryService.updateEnquiryStatus(id, status);
            return ResponseEntity.ok(ApiResponse.success(enquiry, "Status updated"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<ApiResponse<Enquiry>> addNote(
            @PathVariable Long id,
            @RequestBody String note) {
        try {
            Enquiry enquiry = enquiryService.addNote(id, note);
            return ResponseEntity.ok(ApiResponse.success(enquiry, "Note added"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/stats/today")
    public ResponseEntity<ApiResponse<Long>> getTodayCount() {
        return ResponseEntity.ok(ApiResponse.success(enquiryService.getEnquiryCountToday()));
    }
}