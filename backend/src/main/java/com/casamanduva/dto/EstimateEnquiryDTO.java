package com.casamanduva.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstimateEnquiryDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone is required")
    private String phone;

    private String email;
    private String location;

    @NotBlank(message = "BHK type is required")
    private String bhkType;

    private String packageType;
    private String selectedRooms;
    private Integer area;
    private Long estimatedBudget;
    private String source;
}
