package com.casamanduva.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "visitors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    private String language;

    private String referrer;

    @Column(name = "screen_resolution")
    private String screenResolution;

    private String timezone;

    private String page;

    private String city;

    private String region;

    private String country;

    @Column(name = "visited_at", nullable = false)
    private LocalDateTime visitedAt;

    @Column(name = "session_id")
    private String sessionId;

    @PrePersist
    protected void onCreate() {
        visitedAt = LocalDateTime.now();
    }
}
