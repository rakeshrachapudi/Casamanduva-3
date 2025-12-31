package com.casamanduva.service;

import com.casamanduva.model.Enquiry;
import com.casamanduva.model.EstimateEnquiry;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender mailSender;

    @Value("${app.notification.email:info@casamanduva.com}")
    private String notificationEmail;

    @Value("${app.notification.enabled:false}")
    private boolean notificationEnabled;

    @Value("${app.whatsapp.phone:917730051329}")
    private String whatsappPhone;

    @Async
    public void sendNewEnquiryNotification(Enquiry enquiry) {
        log.info("Sending new enquiry notification for: {}", enquiry.getEmail());

        if (!notificationEnabled) {
            log.debug("Notifications disabled, skipping email");
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(notificationEmail);
            message.setSubject("🏠 New Enquiry - CASAMANDUVA");
            message.setText(buildEnquiryEmailBody(enquiry));

            mailSender.send(message);
            log.info("Enquiry notification email sent");
        } catch (Exception e) {
            log.error("Failed to send enquiry notification", e);
        }
    }

    @Async
    public void sendEstimateEnquiryNotification(EstimateEnquiry enquiry) {
        log.info("Sending estimate enquiry notification for: {}", enquiry.getName());

        if (!notificationEnabled) {
            log.debug("Notifications disabled, skipping email");
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(notificationEmail);
            message.setSubject("📊 New Estimate Request - CASAMANDUVA");
            message.setText(buildEstimateEmailBody(enquiry));

            mailSender.send(message);
            log.info("Estimate enquiry notification email sent");
        } catch (Exception e) {
            log.error("Failed to send estimate notification", e);
        }
    }

    private String buildEnquiryEmailBody(Enquiry enquiry) {
        return String.format("""
                New Enquiry Received!
                
                ================================
                
                Customer Details:
                ────────────────────────────────
                Name: %s
                Email: %s
                Phone: %s
                
                Project Details:
                ────────────────────────────────
                Property Type: %s
                Budget: %s
                Service: %s
                Source: %s
                
                Message:
                ────────────────────────────────
                %s
                
                ================================
                
                Quick Actions:
                • Call: tel:%s
                • WhatsApp: https://wa.me/%s
                
                Received at: %s
                """,
                enquiry.getName(),
                enquiry.getEmail(),
                enquiry.getPhone(),
                enquiry.getPropertyType() != null ? enquiry.getPropertyType() : "Not specified",
                enquiry.getBudget() != null ? enquiry.getBudget() : "Not specified",
                enquiry.getService() != null ? enquiry.getService() : "Not specified",
                enquiry.getSource() != null ? enquiry.getSource() : "Website",
                enquiry.getMessage() != null ? enquiry.getMessage() : "No message",
                enquiry.getPhone().replaceAll("[^0-9]", ""),
                enquiry.getPhone().replaceAll("[^0-9]", ""),
                enquiry.getCreatedAt()
        );
    }

    private String buildEstimateEmailBody(EstimateEnquiry enquiry) {
        return String.format("""
                New Estimate Request!
                
                ================================
                
                Customer Details:
                ────────────────────────────────
                Name: %s
                Phone: %s
                Email: %s
                Location: %s
                
                Estimate Details:
                ────────────────────────────────
                BHK Type: %s
                Package: %s
                Area: %d sq.ft
                Selected Rooms: %s
                Estimated Budget: ₹%s
                
                ================================
                
                Quick Actions:
                • Call: tel:%s
                • WhatsApp: https://wa.me/%s
                
                Received at: %s
                """,
                enquiry.getName(),
                enquiry.getPhone(),
                enquiry.getEmail() != null ? enquiry.getEmail() : "Not provided",
                enquiry.getLocation() != null ? enquiry.getLocation() : "Not specified",
                enquiry.getBhkType() != null ? enquiry.getBhkType().toUpperCase() : "Not specified",
                enquiry.getPackageType() != null ? enquiry.getPackageType() : "Not specified",
                enquiry.getArea() != null ? enquiry.getArea() : 0,
                enquiry.getSelectedRooms() != null ? enquiry.getSelectedRooms() : "Default",
                enquiry.getEstimatedBudget() != null ? String.format("%,.0f", enquiry.getEstimatedBudget()) : "Not calculated",
                enquiry.getPhone().replaceAll("[^0-9]", ""),
                enquiry.getPhone().replaceAll("[^0-9]", ""),
                enquiry.getCreatedAt()
        );
    }

    public String generateWhatsAppLink(String phone, String message) {
        String cleanPhone = phone.replaceAll("[^0-9]", "");
        if (!cleanPhone.startsWith("91")) {
            cleanPhone = "91" + cleanPhone;
        }
        return String.format("https://wa.me/%s?text=%s", cleanPhone,
                java.net.URLEncoder.encode(message, java.nio.charset.StandardCharsets.UTF_8));
    }
}