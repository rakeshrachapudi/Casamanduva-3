package com.casamanduva.service;

import com.casamanduva.dto.VisitorDTO;
import com.casamanduva.model.Visitor;
import com.casamanduva.repository.VisitorRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class VisitorService {
    private final VisitorRepository visitorRepository;

    @Transactional
    public Visitor trackVisitor(VisitorDTO visitorDTO, String ipAddress) {
        log.debug("Tracking visitor from: {}", ipAddress);
        String sessionId = UUID.randomUUID().toString();
        Visitor visitor = Visitor.builder()
                .ipAddress(ipAddress)
                .userAgent(visitorDTO.getUserAgent())
                .language(visitorDTO.getLanguage())
                .referrer(visitorDTO.getReferrer())
                .screenResolution(visitorDTO.getScreenResolution())
                .timezone(visitorDTO.getTimezone())
                .page(visitorDTO.getPage())
                .sessionId(sessionId)
                .build();
        return visitorRepository.save(visitor);
    }

    public List<Visitor> getRecentVisitors() {
        return visitorRepository.findTop100ByOrderByVisitedAtDesc();
    }

    public Long getUniqueVisitorsToday() {
        return visitorRepository.countUniqueVisitorsSince(
                LocalDateTime.now().toLocalDate().atStartOfDay()
        );
    }

    public Long getTotalVisitsToday() {
        return visitorRepository.countVisitsSince(
                LocalDateTime.now().toLocalDate().atStartOfDay()
        );
    }

    public List<Object[]> getPageVisitStats() {
        return visitorRepository.getPageVisitCounts();
    }
}
