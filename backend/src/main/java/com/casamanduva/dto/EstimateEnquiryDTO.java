package com.casamanduva.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class EstimateEnquiryDTO {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[0-9+\\-()\\s]{10,}$")
    private String phone;

    @Email(message = "Invalid email format")
    private String email;

    private String location;

    @Min(value = 300, message = "Area min 300 sq.ft")
    @Max(value = 5000, message = "Area max 5000 sq.ft")
    private Integer area;

    private String bhkType;        // Can be "1bhk", "2bhk", "3bhk" or enum name
    private String packageType;    // Can be "essential", "premium", "luxury"
    private String selectedRooms;
    private Long estimatedBudget;
    private String source;
}