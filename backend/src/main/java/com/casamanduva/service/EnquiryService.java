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
        log.info("Creating new enquiry from: {}", enquiryDTO.getEmail());

        Enquiry enquiry = Enquiry.builder()
                .name(enquiryDTO.getName())
                .email(enquiryDTO.getEmail())
                .phone(enquiryDTO.getPhone())
                .propertyType(enquiryDTO.getPropertyType())
                .budget(enquiryDTO.getBudget())
                .service(enquiryDTO.getService())
                .message(enquiryDTO.getMessage())
                .source(enquiryDTO.getSource())
                .status(Enquiry.EnquiryStatus.NEW)
                .build();

        Enquiry savedEnquiry = enquiryRepository.save(enquiry);

        // Send notification to admin
        notificationService.sendNewEnquiryNotification(savedEnquiry);

        log.info("Enquiry created with ID: {}", savedEnquiry.getId());
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
                .orElseThrow(() -> new RuntimeException("Enquiry not found with id: " + id));
    }

    @Transactional
    public Enquiry updateEnquiryStatus(Long id, Enquiry.EnquiryStatus status) {
        Enquiry enquiry = getEnquiryById(id);
        enquiry.setStatus(status);
        return enquiryRepository.save(enquiry);
    }

    @Transactional
    public Enquiry addNote(Long id, String note) {
        Enquiry enquiry = getEnquiryById(id);
        String existingNotes = enquiry.getNotes() != null ? enquiry.getNotes() + "\n" : "";
        enquiry.setNotes(existingNotes + note);
        return enquiryRepository.save(enquiry);
    }

    public Long getEnquiryCountToday() {
        return enquiryRepository.countEnquiriesSince(
                java.time.LocalDateTime.now().toLocalDate().atStartOfDay()
        );
    }
}
