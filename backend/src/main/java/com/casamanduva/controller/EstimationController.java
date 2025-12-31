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

    @GetMapping("/bhk")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getBHKConfigurations() {
        return ResponseEntity.ok(ApiResponse.success(estimationService.getBHKConfigurations()));
    }

    @PostMapping("/calculate")
    public ResponseEntity<ApiResponse<EstimateResponseDTO>> calculateEstimate(@RequestBody EstimateRequestDTO request) {
        log.info("Calculating estimate");
        try {
            EstimateResponseDTO estimate = estimationService.calculateEstimate(request);
            return ResponseEntity.ok(ApiResponse.success(estimate));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            log.error("Error calculating estimate", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to calculate estimate."));
        }
    }

    @PostMapping("/enquiry")
    public ResponseEntity<ApiResponse<EstimateEnquiry>> saveEstimateEnquiry(@Valid @RequestBody EstimateEnquiryDTO enquiryDTO) {
        log.info("Saving estimate enquiry for: {}", enquiryDTO.getName());
        try {
            EstimateEnquiry enquiry = estimationService.saveEstimateEnquiry(enquiryDTO);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ApiResponse.success(enquiry, "Quote request submitted!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        } catch (Exception e) {
            log.error("Error saving estimate", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error("Failed to submit request."));
        }
    }

    @GetMapping("/enquiries")
    public ResponseEntity<ApiResponse<List<EstimateEnquiry>>> getAllEstimateEnquiries() {
        return ResponseEntity.ok(ApiResponse.success(estimationService.getAllEstimateEnquiries()));
    }

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
                    "area", estimate.getArea()
            );
            return ResponseEntity.ok(ApiResponse.success(quickEstimate));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid BHK type: " + bhkType));
        }
    }
}