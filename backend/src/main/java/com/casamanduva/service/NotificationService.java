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

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final JavaMailSender mailSender;

    @Value("${app.notification.emails:info@casamanduva.com}")
    private String notificationEmails;

    @Value("${app.notification.email:info@casamanduva.com}")
    private String primaryEmail;

    @Value("${app.notification.enabled:false}")
    private boolean notificationEnabled;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    // ==================== ADMIN NOTIFICATIONS ====================

    @Async
    public void sendNewEnquiryNotification(Enquiry enquiry) {
        if (!notificationEnabled) {
            log.warn("⚠️ Notifications are DISABLED. Set app.notification.enabled=true in application.properties");
            return;
        }

        if (fromEmail == null || fromEmail.isEmpty() || fromEmail.contains("your-email")) {
            log.error("❌ Email not configured! Please set spring.mail.username and spring.mail.password");
            return;
        }

        log.info("📧 Sending new enquiry notification for: {}", enquiry.getEmail());

        List<String> adminEmails = getAdminEmailList();
        log.info("📮 Sending to {} admin(s): {}", adminEmails.size(), String.join(", ", adminEmails));

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(adminEmails.toArray(new String[0]));
            message.setSubject("🏠 New Enquiry - CASAMANDUVA - " + enquiry.getName());
            message.setText(buildEnquiryEmailBody(enquiry));

            mailSender.send(message);
            log.info("✅ Enquiry notification email sent successfully to {} admin(s)", adminEmails.size());
            log.info("✅ Recipients: {}", String.join(", ", adminEmails));

            // 🔥 SEND USER CONFIRMATION EMAIL
            sendUserEnquiryConfirmation(enquiry);

        } catch (Exception e) {
            log.error("❌ Failed to send enquiry notification email", e);
            log.error("Error details: {}", e.getMessage());
        }
    }

    @Async
    public void sendEstimateEnquiryNotification(EstimateEnquiry enquiry) {
        if (!notificationEnabled) {
            log.warn("⚠️ Notifications are DISABLED. Set app.notification.enabled=true in application.properties");
            return;
        }

        if (fromEmail == null || fromEmail.isEmpty() || fromEmail.contains("your-email")) {
            log.error("❌ Email not configured! Please set spring.mail.username and spring.mail.password");
            return;
        }

        log.info("📧 Sending estimate enquiry notification for: {}", enquiry.getName());

        List<String> adminEmails = getAdminEmailList();
        log.info("📮 Sending to {} admin(s): {}", adminEmails.size(), String.join(", ", adminEmails));

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(adminEmails.toArray(new String[0]));
            message.setSubject("📊 New Estimate Request - CASAMANDUVA - " + enquiry.getName());
            message.setText(buildEstimateEmailBody(enquiry));

            mailSender.send(message);
            log.info("✅ Estimate enquiry notification email sent successfully to {} admin(s)", adminEmails.size());
            log.info("✅ Recipients: {}", String.join(", ", adminEmails));

            // 🔥 SEND USER CONFIRMATION EMAIL
            sendUserEstimateConfirmation(enquiry);

        } catch (Exception e) {
            log.error("❌ Failed to send estimate notification email", e);
            log.error("Error details: {}", e.getMessage());
        }
    }

    // ==================== USER CONFIRMATION EMAILS (NEW!) ====================

    @Async
    public void sendUserEnquiryConfirmation(Enquiry enquiry) {
        if (!notificationEnabled || fromEmail == null || fromEmail.isEmpty()) {
            return;
        }

        log.info("📧 Sending confirmation to USER: {}", enquiry.getEmail());

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(enquiry.getEmail());
            message.setSubject("Thank You for Contacting CASAMANDUVA! 🏠");
            message.setText(buildUserEnquiryConfirmation(enquiry));

            mailSender.send(message);
            log.info("✅ User confirmation email sent to: {}", enquiry.getEmail());

        } catch (Exception e) {
            log.error("❌ Failed to send user confirmation to: {}", enquiry.getEmail(), e);
        }
    }

    @Async
    public void sendUserEstimateConfirmation(EstimateEnquiry enquiry) {
        if (!notificationEnabled || fromEmail == null || fromEmail.isEmpty()) {
            return;
        }

        // Only send if email is provided
        if (enquiry.getEmail() == null || enquiry.getEmail().trim().isEmpty()) {
            log.info("⚠️ No email provided for estimate enquiry: {}", enquiry.getName());
            return;
        }

        log.info("📧 Sending estimate confirmation to USER: {}", enquiry.getEmail());

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(enquiry.getEmail());
            message.setSubject("Your Interior Design Estimate - CASAMANDUVA 📊");
            message.setText(buildUserEstimateConfirmation(enquiry));

            mailSender.send(message);
            log.info("✅ User estimate confirmation sent to: {}", enquiry.getEmail());

        } catch (Exception e) {
            log.error("❌ Failed to send user estimate confirmation to: {}", enquiry.getEmail(), e);
        }
    }

    @Async
    public void sendNewsletterWelcome(String email) {
        if (!notificationEnabled || fromEmail == null || fromEmail.isEmpty()) {
            return;
        }

        log.info("📧 Sending newsletter welcome to: {}", email);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(email);
            message.setSubject("Welcome to CASAMANDUVA! 🎉 Here's Your 10% Discount");
            message.setText(buildNewsletterWelcome(email));

            mailSender.send(message);
            log.info("✅ Newsletter welcome sent to: {}", email);

        } catch (Exception e) {
            log.error("❌ Failed to send newsletter welcome to: {}", email, e);
        }
    }

    // ==================== EMAIL BODY BUILDERS (USER EMAILS) ====================

    private String buildUserEnquiryConfirmation(Enquiry enquiry) {
        return String.format("""
                Dear %s,
                
                Thank you for reaching out to CASAMANDUVA! 🏠
                
                We have received your enquiry and our team will contact you within 24 hours.
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                YOUR ENQUIRY DETAILS
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                Name:           %s
                Email:          %s
                Phone:          %s
                Property Type:  %s
                Budget:         %s
                Service:        %s
                
                Message:
                %s
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                WHAT HAPPENS NEXT?
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                ✅ Our design expert will review your requirements
                ✅ We'll call you within 24 hours to discuss details
                ✅ Schedule a FREE consultation at your convenience
                ✅ Get a detailed quote tailored to your needs
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                QUICK ACTIONS
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                📞 Call Us:      +91 91218 85090
                💬 WhatsApp:     https://wa.me/919121885090
                🌐 Website:      https://casamanduva.com
                📧 Email:        info@casamanduva.com
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                Best Regards,
                Team CASAMANDUVA
                Premium Interior Design Studio
                Hyderabad, India
                
                Follow us on Instagram: @casamanduva
                """,
                enquiry.getName(),
                enquiry.getName(),
                enquiry.getEmail(),
                enquiry.getPhone(),
                enquiry.getPropertyType() != null ? enquiry.getPropertyType() : "Not specified",
                enquiry.getBudget() != null ? enquiry.getBudget() : "Not specified",
                enquiry.getService() != null ? enquiry.getService() : "Not specified",
                enquiry.getMessage() != null ? enquiry.getMessage() : "No message provided"
        );
    }

    private String buildUserEstimateConfirmation(EstimateEnquiry enquiry) {
        return String.format("""
                Dear %s,
                
                Thank you for using our Interior Design Cost Estimator! 📊
                
                We have received your estimate request and will send you a detailed quote within 24 hours.
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                YOUR ESTIMATE REQUEST
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                Name:           %s
                Phone:          %s
                Email:          %s
                Location:       %s
                
                Property:       %s
                Package:        %s
                Area:           %s sq.ft
                Rooms:          %s
                Est. Budget:    ₹%s
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                WHAT'S NEXT?
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                ✅ Our expert will review your requirements
                ✅ Get a DETAILED QUOTE within 24 hours
                ✅ FREE 3D visualization included
                ✅ Schedule site visit at your convenience
                
                🎁 SPECIAL OFFER: 10%% OFF on your first project!
                Use code: CASA10OFF
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                CONTACT US ANYTIME
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                📞 Call:         +91 91218 85090
                💬 WhatsApp:     https://wa.me/919121885090
                🌐 Website:      https://casamanduva.com
                📧 Email:        info@casamanduva.com
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                Best Regards,
                Team CASAMANDUVA
                Premium Interior Design Studio
                Hyderabad, India
                
                Follow us on Instagram: @casamanduva
                """,
                enquiry.getName(),
                enquiry.getName(),
                enquiry.getPhone(),
                enquiry.getEmail() != null ? enquiry.getEmail() : "Not provided",
                enquiry.getLocation() != null ? enquiry.getLocation() : "Not specified",
                enquiry.getBhkType() != null ? enquiry.getBhkType().toUpperCase() : "Not specified",
                enquiry.getPackageType() != null ? enquiry.getPackageType() : "Not specified",
                enquiry.getArea() != null ? enquiry.getArea() : 0,
                enquiry.getSelectedRooms() != null ? enquiry.getSelectedRooms() : "Default rooms",
                enquiry.getEstimatedBudget() != null ? String.format("%,.0f", enquiry.getEstimatedBudget()) : "To be calculated"
        );
    }

    private String buildNewsletterWelcome(String email) {
        return """
                Welcome to CASAMANDUVA! 🎉
                
                Thank you for subscribing to our newsletter!
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                YOUR EXCLUSIVE DISCOUNT CODE
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                🎁 DISCOUNT CODE: CASA10OFF
                
                ✨ Get 10% OFF on your first interior design project
                ✨ FREE 3D visualization included
                ✨ Valid for new customers only
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                HOW TO REDEEM
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                1. Visit our Cost Estimator: https://casamanduva.com/estimator
                2. Get your instant estimate
                3. Mention code CASA10OFF when you contact us
                4. Enjoy your discount!
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                WHAT YOU'LL RECEIVE
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                📧 Weekly design inspiration
                💡 Interior design tips & trends
                🎁 Exclusive offers & discounts
                📸 Behind-the-scenes of our projects
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                GET STARTED TODAY
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                📞 Call:         +91 91218 85090
                💬 WhatsApp:     https://wa.me/919121885090
                🌐 Website:      https://casamanduva.com
                📧 Email:        info@casamanduva.com
                
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                
                * Discount valid for 30 days from subscription
                * Cannot be combined with other offers
                * Terms & conditions apply
                
                Best Regards,
                Team CASAMANDUVA
                Premium Interior Design Studio
                Hyderabad, India
                
                Follow us on Instagram: @casamanduva
                """;
    }

    // ==================== EMAIL BODY BUILDERS (ADMIN EMAILS) ====================

    private String buildEnquiryEmailBody(Enquiry enquiry) {
        return String.format("""
                🏠 NEW ENQUIRY RECEIVED - CASAMANDUVA
                
                ╔═══════════════════════════════════════╗
                
                👤 CUSTOMER DETAILS
                ────────────────────────────────────────
                Name:           %s
                Email:          %s
                Phone:          %s
                
                🏡 PROJECT DETAILS
                ────────────────────────────────────────
                Property Type:  %s
                Budget:         %s
                Service:        %s
                Source:         %s
                
                💬 MESSAGE
                ────────────────────────────────────────
                %s
                
                ╚═══════════════════════════════════════╝
                
                ⚡ QUICK ACTIONS
                ────────────────────────────────────────
                📞 Call:        tel:%s
                💬 WhatsApp:    https://wa.me/91%s
                ✉️  Email:       mailto:%s
                
                ╚═══════════════════════════════════════╝
                
                🕐 Received at: %s
                
                ╚═══════════════════════════════════════╝
                
                This is an automated notification from CASAMANDUVA Interior Design.
                Please respond to the customer within 24 hours.
                """,
                enquiry.getName(),
                enquiry.getEmail(),
                enquiry.getPhone(),
                enquiry.getPropertyType() != null ? enquiry.getPropertyType() : "Not specified",
                enquiry.getBudget() != null ? enquiry.getBudget() : "Not specified",
                enquiry.getService() != null ? enquiry.getService() : "Not specified",
                enquiry.getSource() != null ? enquiry.getSource() : "Website",
                enquiry.getMessage() != null ? enquiry.getMessage() : "No message provided",
                enquiry.getPhone().replaceAll("[^0-9]", ""),
                enquiry.getPhone().replaceAll("[^0-9]", ""),
                enquiry.getEmail(),
                enquiry.getCreatedAt()
        );
    }

    private String buildEstimateEmailBody(EstimateEnquiry enquiry) {
        return String.format("""
                📊 NEW ESTIMATE REQUEST - CASAMANDUVA
                
                ╔═══════════════════════════════════════╗
                
                👤 CUSTOMER DETAILS
                ────────────────────────────────────────
                Name:           %s
                Phone:          %s
                Email:          %s
                Location:       %s
                
                🏠 ESTIMATE DETAILS
                ────────────────────────────────────────
                BHK Type:       %s
                Package:        %s
                Area:           %d sq.ft
                Selected Rooms: %s
                Est. Budget:    ₹%s
                
                ╚═══════════════════════════════════════╝
                
                ⚡ QUICK ACTIONS
                ────────────────────────────────────────
                📞 Call:        tel:%s
                💬 WhatsApp:    https://wa.me/91%s
                %s
                
                ╚═══════════════════════════════════════╝
                
                🕐 Received at: %s
                
                ╚═══════════════════════════════════════╝
                
                This is an automated notification from CASAMANDUVA Interior Design.
                Please prepare a detailed quote and respond within 24 hours.
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
                enquiry.getEmail() != null ? "✉️  Email:       mailto:" + enquiry.getEmail() : "",
                enquiry.getCreatedAt()
        );
    }

    // ==================== HELPER METHODS ====================

    private List<String> getAdminEmailList() {
        return Arrays.stream(notificationEmails.split(","))
                .map(String::trim)
                .filter(email -> !email.isEmpty())
                .filter(this::isValidEmail)
                .collect(Collectors.toList());
    }

    private boolean isValidEmail(String email) {
        boolean valid = email.matches("^[A-Za-z0-9+_.-]+@(.+)$");
        if (!valid) {
            log.warn("⚠️ Invalid email address skipped: {}", email);
        }
        return valid;
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