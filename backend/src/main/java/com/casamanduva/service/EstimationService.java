package com.casamanduva.service;

import com.casamanduva.dto.EstimateEnquiryDTO;
import com.casamanduva.dto.EstimateRequestDTO;
import com.casamanduva.dto.EstimateResponseDTO;
import com.casamanduva.model.Enquiry;
import com.casamanduva.model.EstimateEnquiry;
import com.casamanduva.repository.EstimateEnquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class EstimationService {

    private final EstimateEnquiryRepository estimateEnquiryRepository;
    private final NotificationService notificationService;

    private static final Map<String, BHKConfig> BHK_CONFIGS = Map.of(
            "1bhk", new BHKConfig("1 BHK", 550, 350000,
                    List.of("Living Room", "Bedroom", "Kitchen", "Bathroom")),
            "2bhk", new BHKConfig("2 BHK", 950, 550000,
                    List.of("Living Room", "Master Bedroom", "Bedroom 2", "Kitchen", "Bathroom 1", "Bathroom 2")),
            "3bhk", new BHKConfig("3 BHK", 1400, 850000,
                    List.of("Living Room", "Master Bedroom", "Bedroom 2", "Bedroom 3", "Kitchen", "Bathroom 1", "Bathroom 2", "Bathroom 3"))
    );

    private static final Map<String, PackageConfig> PACKAGE_CONFIGS = Map.of(
            "essential", new PackageConfig("Essential", 1800, 1.0,
                    List.of("Basic modular furniture", "Standard finishes", "Essential lighting", "1-year warranty")),
            "premium", new PackageConfig("Premium", 2500, 1.4,
                    List.of("Premium modular furniture", "Designer finishes", "Accent lighting", "False ceiling", "2-year warranty")),
            "luxury", new PackageConfig("Luxury", 3500, 1.95,
                    List.of("Luxury custom furniture", "Imported finishes", "Smart lighting", "Full false ceiling", "Home automation ready", "3-year warranty"))
    );

    private static final Map<String, Integer> ROOM_PRICES = Map.ofEntries(
            Map.entry("Living Room", 80000),
            Map.entry("Master Bedroom", 75000),
            Map.entry("Bedroom", 60000),
            Map.entry("Bedroom 2", 60000),
            Map.entry("Bedroom 3", 55000),
            Map.entry("Kitchen", 120000),
            Map.entry("Modular Kitchen", 150000),
            Map.entry("Bathroom", 35000),
            Map.entry("Bathroom 1", 35000),
            Map.entry("Bathroom 2", 30000),
            Map.entry("Bathroom 3", 30000),
            Map.entry("Wardrobe", 45000),
            Map.entry("Study Room", 50000),
            Map.entry("Pooja Room", 40000),
            Map.entry("Balcony", 25000)
    );

    public Map<String, Object> getBHKConfigurations() {
        Map<String, Object> result = new HashMap<>();

        Map<String, Object> bhkData = new HashMap<>();
        for (Map.Entry<String, BHKConfig> entry : BHK_CONFIGS.entrySet()) {
            BHKConfig config = entry.getValue();
            bhkData.put(entry.getKey(), Map.of(
                    "name", config.name,
                    "baseArea", config.baseArea,
                    "basePrice", config.basePrice,
                    "rooms", config.defaultRooms
            ));
        }
        result.put("bhkTypes", bhkData);

        Map<String, Object> packageData = new HashMap<>();
        for (Map.Entry<String, PackageConfig> entry : PACKAGE_CONFIGS.entrySet()) {
            PackageConfig config = entry.getValue();
            packageData.put(entry.getKey(), Map.of(
                    "name", config.name,
                    "rate", config.rate,
                    "multiplier", config.multiplier,
                    "features", config.features
            ));
        }
        result.put("packages", packageData);
        result.put("roomPrices", ROOM_PRICES);
        result.put("additionalRooms", List.of("Wardrobe", "Study Room", "Pooja Room", "Balcony"));

        return result;
    }

    public EstimateResponseDTO calculateEstimate(EstimateRequestDTO request) {
        String bhkType = request.getBhkType().toLowerCase();
        String packageType = request.getPackageType().toLowerCase();

        BHKConfig bhkConfig = BHK_CONFIGS.get(bhkType);
        PackageConfig packageConfig = PACKAGE_CONFIGS.get(packageType);

        if (bhkConfig == null || packageConfig == null) {
            throw new IllegalArgumentException("Invalid BHK or package type");
        }

        int area = request.getArea() != null && request.getArea() > 0
                ? request.getArea()
                : bhkConfig.baseArea;

        if (area < 300 || area > 5000) {
            throw new IllegalArgumentException("Area must be between 300-5000 sq.ft");
        }

        List<String> selectedRooms = request.getSelectedRooms() != null && !request.getSelectedRooms().isEmpty()
                ? request.getSelectedRooms()
                : bhkConfig.defaultRooms;

        List<Map<String, Object>> roomBreakdown = new ArrayList<>();
        int roomTotal = 0;

        for (String room : selectedRooms) {
            int basePrice = ROOM_PRICES.getOrDefault(room, 50000);
            int adjustedPrice = (int) Math.round(basePrice * packageConfig.multiplier);
            roomTotal += adjustedPrice;
            roomBreakdown.add(Map.of(
                    "room", room,
                    "price", adjustedPrice
            ));
        }

        int areaCost = area * packageConfig.rate;
        int totalEstimate = Math.max(roomTotal, areaCost);
        int miscCost = (int) Math.round(totalEstimate * 0.1);
        int grandTotal = totalEstimate + miscCost;
        int perSqFt = grandTotal / area;

        return EstimateResponseDTO.builder()
                .bhk(bhkConfig.name)
                .packageName(packageConfig.name)
                .area(area)
                .rate(packageConfig.rate)
                .roomBreakdown(roomBreakdown)
                .roomTotal(roomTotal)
                .areaCost(areaCost)
                .miscCost(miscCost)
                .grandTotal(grandTotal)
                .perSqFt(perSqFt)
                .build();
    }

    @Transactional
    public EstimateEnquiry saveEstimateEnquiry(EstimateEnquiryDTO dto) {
        log.info("Saving estimate enquiry for: {}", dto.getName());

        if (dto.getName() == null || dto.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (dto.getPhone() == null || !dto.getPhone().matches("^[0-9+\\-()\\s]{10,}$")) {
            throw new IllegalArgumentException("Valid phone number required");
        }
        if (dto.getArea() == null || dto.getArea() < 300 || dto.getArea() > 5000) {
            throw new IllegalArgumentException("Area must be between 300-5000 sq.ft");
        }

        // Normalize bhkType and packageType to lowercase
        String normalizedBhkType = dto.getBhkType() != null ? dto.getBhkType().toLowerCase() : "2bhk";
        String normalizedPackageType = dto.getPackageType() != null ? dto.getPackageType().toLowerCase() : "premium";

        EstimateEnquiry enquiry = EstimateEnquiry.builder()
                .name(dto.getName().trim())
                .phone(dto.getPhone().trim())
                .email(dto.getEmail() != null ? dto.getEmail().trim().toLowerCase() : null)
                .location(dto.getLocation() != null ? dto.getLocation().trim() : null)
                .bhkType(normalizedBhkType)  // Store as string
                .packageType(normalizedPackageType)  // Store as string
                .selectedRooms(dto.getSelectedRooms())
                .area(dto.getArea())
                .estimatedBudget(dto.getEstimatedBudget() != null
                        ? new BigDecimal(dto.getEstimatedBudget())
                        : null)
                .source(dto.getSource() != null ? dto.getSource() : "website")
                .status(Enquiry.EnquiryStatus.NEW)
                .build();

        EstimateEnquiry savedEnquiry = estimateEnquiryRepository.save(enquiry);
        log.info("Estimate enquiry saved: {}", savedEnquiry.getId());

        try {
            notificationService.sendEstimateEnquiryNotification(savedEnquiry);
        } catch (Exception e) {
            log.error("Failed to send notification", e);
        }

        return savedEnquiry;
    }

    public List<EstimateEnquiry> getAllEstimateEnquiries() {
        return estimateEnquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    private record BHKConfig(String name, int baseArea, int basePrice, List<String> defaultRooms) {}
    private record PackageConfig(String name, int rate, double multiplier, List<String> features) {}
}