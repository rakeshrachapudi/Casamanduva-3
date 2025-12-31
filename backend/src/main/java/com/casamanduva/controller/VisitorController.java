package com.casamanduva.controller;

import com.casamanduva.dto.ApiResponse;
import com.casamanduva.dto.VisitorDTO;
import com.casamanduva.model.Visitor;
import com.casamanduva.service.VisitorService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/visitors")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class VisitorController {
    private final VisitorService visitorService;

    @PostMapping("/track")
    public ResponseEntity<ApiResponse<Map<String, Object>>> trackVisitor(
            @RequestBody VisitorDTO visitorDTO,
            HttpServletRequest request) {
        String ipAddress = getClientIpAddress(request);
        log.debug("Tracking visitor from IP: {}", ipAddress);
        try {
            Visitor visitor = visitorService.trackVisitor(visitorDTO, ipAddress);
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", visitor.getSessionId());
            response.put("notification", Map.of(
                    "title", "Welcome to CASAMANDUVA! 🏠",
                    "message", "FREE consultation + 10% off!",
                    "type", "welcome"
            ));
            return ResponseEntity.ok(ApiResponse.success(response, "Welcome!"));
        } catch (Exception e) {
            log.error("Error tracking visitor", e);
            return ResponseEntity.ok(ApiResponse.success(Map.of("tracked", false)));
        }
    }

    @GetMapping("/recent")
    public ResponseEntity<ApiResponse<List<Visitor>>> getRecentVisitors() {
        return ResponseEntity.ok(ApiResponse.success(visitorService.getRecentVisitors()));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getVisitorStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("uniqueVisitorsToday", visitorService.getUniqueVisitorsToday());
        stats.put("totalVisitsToday", visitorService.getTotalVisitsToday());
        stats.put("pageStats", visitorService.getPageVisitStats());
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String[] headerNames = {"X-Forwarded-For", "X-Real-IP", "Proxy-Client-IP", "WL-Proxy-Client-IP", "HTTP_X_FORWARDED_FOR"};
        for (String header : headerNames) {
            String ip = request.getHeader(header);
            if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip)) {
                return ip.split(",")[0].trim();
            }
        }
        return request.getRemoteAddr();
    }
}