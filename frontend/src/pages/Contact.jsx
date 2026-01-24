import SEO from "../components/SEO";
import AnimatedSection from "../components/AnimatedSection";
import EnquiryForm from "../components/EnquiryForm";

const Contact = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "CASAMANDUVA",
      telephone: "+91-9121885090",
      email: "info@casamanduva.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jubilee Hills, Road No. 36",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500033",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <SEO
        title="Contact Us | Get Free Interior Design Consultation"
        description="Contact CASAMANDUVA for free interior design consultation in Hyderabad. Call +91 91218 85090 or visit our studio in Jubilee Hills. Get instant quotes on WhatsApp."
        keywords="contact interior designer, free consultation, interior design hyderabad contact, casamanduva contact"
        url="/contact"
        schema={contactSchema}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=800&fit=crop"
            alt="Contact CASAMANDUVA"
            loading="eager"
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <AnimatedSection animation="fadeUp">
            <span className="section-badge">Get In Touch</span>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <h1>
              Let's Create <span className="text-gold">Together</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <p>Ready to transform your space? We'd love to hear from you.</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" style={{ background: "var(--color-ivory)" }}>
        <div className="container">
          <div className="contact-grid">
            <AnimatedSection className="contact-info" animation="slideLeft">
              <span className="section-badge">Contact Information</span>
              <h2>
                Begin Your <span className="text-gold">Journey</span>
              </h2>
              <p>
                Let's discuss how we can transform your space into something
                extraordinary.
              </p>

              <div className="info-items">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div className="info-content">
                    <h4>Visit Us</h4>
                    <p>
                      Jubilee Hills, Road No. 36
                      <br />
                      Hyderabad, Telangana 500033
                      <br />
                      India
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📞</span>
                  <div className="info-content">
                    <h4>Call Us</h4>
                    <p>
                      <a href="tel:+919121885090">+91 91218 85090</a>
                    </p>
                    <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                      Mon - Sat: 10:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">✉️</span>
                  <div className="info-content">
                    <h4>Email Us</h4>
                    <p>
                      <a href="mailto:info@casamanduva.com">
                        info@casamanduva.com
                      </a>
                    </p>
                    <p>
                      <a href="mailto:design@casamanduva.com">
                        design@casamanduva.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">💬</span>
                  <div className="info-content">
                    <h4>WhatsApp</h4>
                    <p>
                      <a
                        href="https://wa.me/9199121885090"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Chat with us instantly
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div style={{ marginTop: "var(--space-xl)" }}>
                <h4
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "var(--space-sm)",
                  }}
                >
                  Follow Us
                </h4>
                <div
                  className="social-links"
                  style={{ justifyContent: "flex-start" }}
                >
                  <a
                    href="https://instagram.com/casamanduva"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    style={{
                      background: "var(--color-warm-beige)",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.981-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                    </svg>
                  </a>
                  <a
                    href="https://facebook.com/casamanduva"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    style={{
                      background: "var(--color-warm-beige)",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://pinterest.com/casamanduva"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    style={{
                      background: "var(--color-warm-beige)",
                      color: "var(--color-charcoal)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideRight">
              <EnquiryForm source="contact" />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section style={{ background: "var(--color-charcoal)" }}>
        <div style={{ width: "100%", lineHeight: 0 }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.8279898693147!2d78.40707841487729!3d17.43185948804489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90c78ba673e5%3A0xa19e3e0c3f02e927!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1624000000000!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CASAMANDUVA Location"
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section
        className="section"
        style={{ background: "var(--color-warm-beige)" }}
      >
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Common Questions</span>
            <h2 className="section-title">Frequently Asked</h2>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "var(--space-lg)",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {[
              {
                q: "How do I get started?",
                a: "Simply fill out the contact form or WhatsApp us. We'll schedule a free consultation to understand your requirements.",
              },
              {
                q: "What is your typical project timeline?",
                a: "Residential projects typically take 45-90 days from design approval to completion, depending on scope.",
              },
              {
                q: "Do you work outside Hyderabad?",
                a: "Yes! We serve clients across India with virtual consultations and local contractor coordination.",
              },
              {
                q: "What warranty do you provide?",
                a: "All our work comes with a 1-year warranty on workmanship. Premium packages include up to 2-3 years.",
              },
            ].map((faq, index) => (
              <AnimatedSection
                key={index}
                animation="fadeUp"
                delay={index * 0.1}
                style={{
                  background: "var(--color-ivory)",
                  padding: "var(--space-xl)",
                  border: "1px solid rgba(44,44,44,0.05)",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "400",
                    marginBottom: "var(--space-sm)",
                    fontFamily: "var(--font-serif)",
                  }}
                >
                  {faq.q}
                </h4>
                <p
                  style={{ fontSize: "0.95rem", lineHeight: 1.7, opacity: 0.8 }}
                >
                  {faq.a}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
