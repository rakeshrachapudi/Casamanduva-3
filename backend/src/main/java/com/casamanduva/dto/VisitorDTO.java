package com.casamanduva.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VisitorDTO {
    private String userAgent;
    private String language;
    private String referrer;
    private String screenResolution;
    private String timezone;
    private String page;
}
