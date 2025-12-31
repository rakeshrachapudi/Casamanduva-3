package com.casamanduva.service;

import com.casamanduva.dto.EnquiryDTO;
import com.casamanduva.model.Enquiry;
import com.casamanduva.repository.EnquiryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EnquiryService {
    private final EnquiryRepository enquiryRepository;
    private final NotificationService notificationService;

    @Transactional
    public Enquiry createEnquiry(EnquiryDTO enquiryDTO) {
        log.info("Creating enquiry from: {}", enquiryDTO.getEmail());
        Enquiry enquiry = Enquiry.builder()
                .name(enquiryDTO.getName().trim())
                .email(enquiryDTO.getEmail().trim().toLowerCase())
                .phone(enquiryDTO.getPhone().trim())
                .propertyType(enquiryDTO.getPropertyType() != null ? enquiryDTO.getPropertyType().trim() : null)
                .budget(enquiryDTO.getBudget() != null ? enquiryDTO.getBudget().trim() : null)
                .service(enquiryDTO.getService() != null ? enquiryDTO.getService().trim() : null)
                .message(enquiryDTO.getMessage() != null ? enquiryDTO.getMessage().trim() : null)
                .source(enquiryDTO.getSource() != null ? enquiryDTO.getSource().trim() : "contact")
                .status(Enquiry.EnquiryStatus.NEW)
                .build();
        Enquiry savedEnquiry = enquiryRepository.save(enquiry);
        log.info("Enquiry created: {}", savedEnquiry.getId());
        try {
            notificationService.sendNewEnquiryNotification(savedEnquiry);
        } catch (Exception e) {
            log.error("Failed to send notification", e);
        }
        return savedEnquiry;
    }

    public List<Enquiry> getAllEnquiries() {
        return enquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Enquiry> getNewEnquiries() {
        return enquiryRepository.findNewEnquiries();
    }

    public Enquiry getEnquiryById(Long id) {
        return enquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Enquiry not found: " + id));
    }

    @Transactional
    public Enquiry updateEnquiryStatus(Long id, Enquiry.EnquiryStatus status) {
        Enquiry enquiry = getEnquiryById(id);
        enquiry.setStatus(status);
        if (status == Enquiry.EnquiryStatus.CONTACTED) {
            enquiry.setContactedAt(java.time.LocalDateTime.now());
        }
        return enquiryRepository.save(enquiry);
    }

    @Transactional
    public Enquiry addNote(Long id, String note) {
        if (note == null || note.trim().isEmpty()) {
            throw new IllegalArgumentException("Note cannot be empty");
        }
        Enquiry enquiry = getEnquiryById(id);
        String timestamp = java.time.LocalDateTime.now().toString();
        String existingNotes = enquiry.getNotes() != null ? enquiry.getNotes() + "\n" : "";
        enquiry.setNotes(existingNotes + "[" + timestamp + "] " + note.trim());
        return enquiryRepository.save(enquiry);
    }

    public Long getEnquiryCountToday() {
        return enquiryRepository.countEnquiriesSince(
                java.time.LocalDateTime.now().toLocalDate().atStartOfDay()
        );
    }
}