package com.casamanduva.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "estimate_enquiries")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EstimateEnquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    @Column(nullable = false)
    private String name;

    @NotBlank(message = "Phone is required")
    @Column(nullable = false)
    private String phone;

    private String email;

    private String location;

    @Column(name = "bhk_type", nullable = false)
    private String bhkType;  // 1bhk, 2bhk, 3bhk

    @Column(name = "package_type")
    private String packageType;  // essential, premium, luxury

    @Column(name = "selected_rooms", columnDefinition = "TEXT")
    private String selectedRooms;

    private Integer area;

    @Column(name = "estimated_budget", precision = 12, scale = 2)
    private BigDecimal estimatedBudget;

    private String source;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Enquiry.EnquiryStatus status = Enquiry.EnquiryStatus.NEW;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    private String notes;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
