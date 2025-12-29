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

    /**
     * Track a new visitor - called when someone visits the website
     * Returns notification data to show welcome message
     */
    @PostMapping("/track")
    public ResponseEntity<ApiResponse<Map<String, Object>>> trackVisitor(
            @RequestBody VisitorDTO visitorDTO,
            HttpServletRequest request) {
        
        String ipAddress = getClientIpAddress(request);
        log.debug("Tracking visitor from IP: {}", ipAddress);
        
        try {
            Visitor visitor = visitorService.trackVisitor(visitorDTO, ipAddress);
            
            // Return notification data for frontend
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", visitor.getSessionId());
            response.put("notification", Map.of(
                    "title", "Welcome to CASAMANDUVA! 🏠",
                    "message", "Get a FREE consultation + 10% off on your first project!",
                    "type", "welcome"
            ));
            response.put("offers", List.of(
                    Map.of("code", "FIRST10", "discount", "10%", "description", "On your first project"),
                    Map.of("code", "FREECONSULT", "discount", "Free", "description", "Design consultation")
            ));
            
            return ResponseEntity.ok(ApiResponse.success(response, "Welcome!"));
        } catch (Exception e) {
            log.error("Error tracking visitor", e);
            return ResponseEntity.ok(ApiResponse.success(Map.of("tracked", false)));
        }
    }

    /**
     * Get recent visitors (Admin)
     */
    @GetMapping("/recent")
    public ResponseEntity<ApiResponse<List<Visitor>>> getRecentVisitors() {
        List<Visitor> visitors = visitorService.getRecentVisitors();
        return ResponseEntity.ok(ApiResponse.success(visitors));
    }

    /**
     * Get visitor statistics (Admin dashboard)
     */
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getVisitorStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("uniqueVisitorsToday", visitorService.getUniqueVisitorsToday());
        stats.put("totalVisitsToday", visitorService.getTotalVisitsToday());
        stats.put("pageStats", visitorService.getPageVisitStats());
        return ResponseEntity.ok(ApiResponse.success(stats));
    }

    /**
     * Get client IP address from request
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String[] headerNames = {
                "X-Forwarded-For",
                "X-Real-IP",
                "Proxy-Client-IP",
                "WL-Proxy-Client-IP",
                "HTTP_X_FORWARDED_FOR",
                "HTTP_X_FORWARDED",
                "HTTP_FORWARDED_FOR",
                "HTTP_FORWARDED",
                "HTTP_CLIENT_IP"
        };

        for (String header : headerNames) {
            String ip = request.getHeader(header);
            if (ip != null && !ip.isEmpty() && !"unknown".equalsIgnoreCase(ip)) {
                // X-Forwarded-For can contain multiple IPs, take the first one
                return ip.split(",")[0].trim();
            }
        }

        return request.getRemoteAddr();
    }
}
