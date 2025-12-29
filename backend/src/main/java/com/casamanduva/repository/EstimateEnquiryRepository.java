package com.casamanduva.repository;

import com.casamanduva.model.EstimateEnquiry;
import com.casamanduva.model.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstimateEnquiryRepository extends JpaRepository<EstimateEnquiry, Long> {

    List<EstimateEnquiry> findByBhkType(String bhkType);

    List<EstimateEnquiry> findByStatus(Enquiry.EnquiryStatus status);

    List<EstimateEnquiry> findAllByOrderByCreatedAtDesc();
}
