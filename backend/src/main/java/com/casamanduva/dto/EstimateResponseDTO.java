package com.casamanduva.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstimateResponseDTO {
    private String bhk;
    private String packageName;
    private int area;
    private int rate;
    private List<Map<String, Object>> roomBreakdown;
    private int roomTotal;
    private int areaCost;
    private int miscCost;
    private int grandTotal;
    private int perSqFt;
}
