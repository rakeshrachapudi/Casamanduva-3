package com.casamanduva.repository;

import com.casamanduva.model.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisitorRepository extends JpaRepository<Visitor, Long> {

    List<Visitor> findByVisitedAtBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COUNT(DISTINCT v.ipAddress) FROM Visitor v WHERE v.visitedAt >= :startDate")
    Long countUniqueVisitorsSince(LocalDateTime startDate);

    @Query("SELECT COUNT(v) FROM Visitor v WHERE v.visitedAt >= :startDate")
    Long countVisitsSince(LocalDateTime startDate);

    @Query("SELECT v.page, COUNT(v) as count FROM Visitor v GROUP BY v.page ORDER BY count DESC")
    List<Object[]> getPageVisitCounts();

    List<Visitor> findTop100ByOrderByVisitedAtDesc();
}
