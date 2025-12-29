package com.casamanduva.controller;

import com.casamanduva.dto.ApiResponse;
import com.casamanduva.dto.EstimateEnquiryDTO;
import com.casamanduva.dto.EstimateRequestDTO;
import com.casamanduva.dto.EstimateResponseDTO;
import com.casamanduva.model.EstimateEnquiry;
import com.casamanduva.service.EstimationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/estimations")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class EstimationController {

    private final EstimationService estimationService;

    /**
     * Get BHK configurations (1BHK, 2BHK, 3BHK packages, room prices)
     */
    @GetMapping("/bhk")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBHKConfigurations() {
        Map<String, Object> configurations = estimationService.getBHKConfigurations();
        return ResponseEntity.ok(ApiResponse.success(configurations));
    }

    /**
     * Calculate estimate based on user selections
     */
    @PostMapping("/calculate")
    public ResponseEntity<ApiResponse<EstimateResponseDTO>> calculateEstimate(
            @RequestBody EstimateRequestDTO request) {
        log.info("Calculating estimate for {} - {} package", request.getBhkType(), request.getPackageType());
        
        try {
            EstimateResponseDTO estimate = estimationService.calculateEstimate(request);
            return ResponseEntity.ok(ApiResponse.success(estimate));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    /**
     * Save estimate enquiry - when user requests detailed quote
     */
    @PostMapping("/enquiry")
    public ResponseEntity<ApiResponse<EstimateEnquiry>> saveEstimateEnquiry(
            @Valid @RequestBody EstimateEnquiryDTO enquiryDTO) {
        log.info("Saving estimate enquiry for: {}", enquiryDTO.getName());
        
        try {
            EstimateEnquiry enquiry = estimationService.saveEstimateEnquiry(enquiryDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(enquiry, "Your quote request has been submitted! We will contact you shortly."));
        } catch (Exception e) {
            log.error("Error saving estimate enquiry", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to submit request. Please try again."));
        }
    }

    /**
     * Get all estimate enquiries (Admin)
     */
    @GetMapping("/enquiries")
    public ResponseEntity<ApiResponse<List<EstimateEnquiry>>> getAllEstimateEnquiries() {
        List<EstimateEnquiry> enquiries = estimationService.getAllEstimateEnquiries();
        return ResponseEntity.ok(ApiResponse.success(enquiries));
    }

    /**
     * Quick estimate endpoint for simple 1BHK/2BHK/3BHK estimates
     */
    @GetMapping("/quick/{bhkType}")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getQuickEstimate(
            @PathVariable String bhkType,
            @RequestParam(defaultValue = "premium") String packageType) {
        
        EstimateRequestDTO request = EstimateRequestDTO.builder()
                .bhkType(bhkType)
                .packageType(packageType)
                .build();
        
        try {
            EstimateResponseDTO estimate = estimationService.calculateEstimate(request);
            
            Map<String, Object> quickEstimate = Map.of(
                    "bhkType", bhkType.toUpperCase(),
                    "package", estimate.getPackageName(),
                    "estimatedCost", estimate.getGrandTotal(),
                    "perSqFt", estimate.getPerSqFt(),
                    "area", estimate.getArea(),
                    "formatted", String.format("₹%,d", estimate.getGrandTotal())
            );
            
            return ResponseEntity.ok(ApiResponse.success(quickEstimate));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid BHK type: " + bhkType));
        }
    }
}
