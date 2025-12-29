package com.casamanduva.repository;

import com.casamanduva.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

    List<Enquiry> findByStatus(Enquiry.EnquiryStatus status);

    List<Enquiry> findBySource(String source);

    List<Enquiry> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT e FROM Enquiry e WHERE e.status = 'NEW' ORDER BY e.createdAt DESC")
    List<Enquiry> findNewEnquiries();

    @Query("SELECT COUNT(e) FROM Enquiry e WHERE e.createdAt >= :startDate")
    Long countEnquiriesSince(LocalDateTime startDate);

    List<Enquiry> findAllByOrderByCreatedAtDesc();
}
