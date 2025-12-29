package com.casamanduva.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstimateRequestDTO {
    private String bhkType;
    private String packageType;
    private Integer area;
    private List<String> selectedRooms;
}
