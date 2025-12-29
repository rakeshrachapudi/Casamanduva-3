import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AnimatedSection from '../components/AnimatedSection';
import EnquiryForm from '../components/EnquiryForm';

const themes = [
  {
    id: 1,
    title: 'Japanese Zen',
    category: 'Minimalist',
    description: 'Clean lines, natural materials, and serene spaces inspired by Japanese design principles.',
    image: 'https://images.unsplash.com/photo-1545083036-b175dd155a1d?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Italian Elegance',
    category: 'Luxury',
    description: 'Sophisticated marble, rich textures, and timeless Italian craftsmanship.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Modern Minimalism',
    category: 'Contemporary',
    description: 'Sleek aesthetics, functional design, and understated luxury for modern living.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Indian Heritage',
    category: 'Traditional',
    description: 'Rich colors, intricate patterns, and cultural elements celebrating Indian artistry.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Scandinavian Hygge',
    category: 'Cozy',
    description: 'Warm textures, soft lighting, and comfortable spaces for the ultimate hygge experience.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Industrial Chic',
    category: 'Urban',
    description: 'Raw materials, exposed elements, and urban sophistication for contemporary spaces.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
  },
];

const testimonials = [
  {
    text: 'CASAMANDUVA transformed our 3BHK into a masterpiece. Their attention to detail and understanding of our vision was exceptional. Every corner tells a story now.',
    author: 'Priya & Rahul Sharma',
    location: 'Jubilee Hills, Hyderabad',
    rating: 5,
  },
  {
    text: 'Professional, creative, and delivered on time. Our modular kitchen is now the heart of our home. The team was incredibly responsive throughout the project.',
    author: 'Ananya Reddy',
    location: 'Gachibowli, Hyderabad',
    rating: 5,
  },
  {
    text: 'From concept to completion, the CASAMANDUVA team exceeded our expectations. Our office space now reflects our brand perfectly. Highly recommended!',
    author: 'Vikram Enterprises',
    location: 'HITEC City, Hyderabad',
    rating: 5,
  },
];

const processSteps = [
  { number: '01', title: 'Consultation', description: 'Free initial meeting to understand your vision, requirements, and budget.' },
  { number: '02', title: 'Design', description: '3D visualization and detailed design plans tailored to your space.' },
  { number: '03', title: 'Execution', description: 'Professional execution with premium materials and skilled craftsmen.' },
  { number: '04', title: 'Delivery', description: 'Final walkthrough and handover of your dream space.' },
];

const Home = () => {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'CASAMANDUVA - Premium Interior Design in Hyderabad',
    description: 'Transform your home with luxury interior design services. 1BHK, 2BHK, 3BHK packages available.',
    url: 'https://casamanduva.com',
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'CASAMANDUVA',
      priceRange: '₹₹₹',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      <SEO
        title="Premium Interior Design in Hyderabad | 1BHK, 2BHK, 3BHK Packages"
        description="CASAMANDUVA offers luxury interior design services in Hyderabad. Transform your 1BHK, 2BHK, 3BHK into stunning spaces. Get free consultation & estimates. 500+ projects completed."
        keywords="interior design hyderabad, luxury interior designers, 1bhk interior design, 2bhk interior design, 3bhk interior design, modular kitchen, home interiors"
        url="/"
        schema={homeSchema}
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&h=1080&fit=crop"
            alt="Luxury interior design by CASAMANDUVA"
          />
          <div className="hero-overlay"></div>
        </div>

        <div className="hero-container">
          <div className="hero-content">
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <span className="hero-badge">Premium Interior Design Studio</span>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeUp" delay={0.4}>
              <h1>Curated Spaces. <span className="text-gold">Elevated Living.</span></h1>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeUp" delay={0.6}>
              <p className="hero-subtitle">
                We transform ordinary spaces into extraordinary experiences. From cozy 1BHK apartments to luxurious villas, we bring your vision to life.
              </p>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeUp" delay={0.8}>
              <div className="hero-cta">
                <Link to="/estimator" className="btn btn-primary btn-lg">Get Free Estimate</Link>
                <Link to="/portfolio" className="btn btn-outline-light btn-lg">View Portfolio</Link>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={1}>
              <div className="hero-stats">
                <div className="stat">
                  <h3>500+</h3>
                  <p>Projects</p>
                </div>
                <span className="stat-divider"></span>
                <div className="stat">
                  <h3>15+</h3>
                  <p>Years</p>
                </div>
                <span className="stat-divider"></span>
                <div className="stat">
                  <h3>98%</h3>
                  <p>Happy Clients</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Our Philosophy</span>
            <h2 className="section-title">Design That Speaks To <span className="text-gold">Your Soul</span></h2>
          </AnimatedSection>

          <div className="philosophy-grid">
            <AnimatedSection className="philosophy-item" animation="fadeUp" delay={0.1}>
              <span className="philosophy-icon">✨</span>
              <h4>Timeless Elegance</h4>
              <p>We create spaces that transcend trends, focusing on enduring beauty and sophisticated design.</p>
            </AnimatedSection>
            <AnimatedSection className="philosophy-item" animation="fadeUp" delay={0.2}>
              <span className="philosophy-icon">🎯</span>
              <h4>Functional Beauty</h4>
              <p>Every element serves a purpose while contributing to the overall aesthetic harmony.</p>
            </AnimatedSection>
            <AnimatedSection className="philosophy-item" animation="fadeUp" delay={0.3}>
              <span className="philosophy-icon">💫</span>
              <h4>Personal Touch</h4>
              <p>Your personality, lifestyle, and dreams are woven into every design decision we make.</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Themes Section */}
      <section className="section" style={{ background: 'var(--color-warm-beige)' }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Design Themes</span>
            <h2 className="section-title">Explore Our <span className="text-gold">Signature Styles</span></h2>
          </AnimatedSection>

          <div className="themes-grid">
            {themes.map((theme, index) => (
              <AnimatedSection key={theme.id} className="theme-card" animation="fadeUp" delay={index * 0.1}>
                <div className="theme-image">
                  <img src={theme.image} alt={theme.title} loading="lazy" />
                  <div className="theme-overlay">
                    <Link to="/services" className="btn btn-outline-light">Explore Style</Link>
                  </div>
                </div>
                <div className="theme-content">
                  <span className="theme-category">{theme.category}</span>
                  <h3>{theme.title}</h3>
                  <p>{theme.description}</p>
                  <Link to="/services" className="theme-link">Learn More →</Link>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
            <Link to="/services" className="btn btn-primary btn-lg">Explore All Services</Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Our Process</span>
            <h2 className="section-title">How We <span className="text-gold">Work</span></h2>
          </AnimatedSection>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.number} className="process-card" animation="fadeUp" delay={index * 0.15}>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Client Stories</span>
            <h2 className="section-title">What Our <span className="text-gold">Clients Say</span></h2>
          </AnimatedSection>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} className="testimonial-card" animation="fadeUp" delay={index * 0.15}>
                <span className="quote-icon">"</span>
                <p className="testimonial-text">{testimonial.text}</p>
                <div className="testimonial-author">
                  <div className="author-info">
                    <strong>{testimonial.author}</strong>
                    <span>{testimonial.location}</span>
                  </div>
                  <span className="stars">{'★'.repeat(testimonial.rating)}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <AnimatedSection className="cta-content">
            <h2>Ready to Transform Your Space?</h2>
            <p>Get a free estimate for your 1BHK, 2BHK, or 3BHK interior design project</p>
            <Link to="/estimator" className="btn btn-primary btn-lg">Get Free Estimate</Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section" id="contact-section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <div className="contact-grid">
            <AnimatedSection className="contact-info" animation="slideLeft">
              <span className="section-badge">Get In Touch</span>
              <h2>Let's Create <span className="text-gold">Together</span></h2>
              <p>Ready to transform your space? We'd love to hear from you.</p>

              <div className="info-items">
                <div className="info-item">
                  <span className="info-icon">📍</span>
                  <div className="info-content">
                    <h4>Visit Us</h4>
                    <p>Jubilee Hills, Road No. 36<br />Hyderabad, Telangana 500033</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">📞</span>
                  <div className="info-content">
                    <h4>Call Us</h4>
                    <p><a href="tel:+917730051329">+91 77300 51329</a></p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">✉️</span>
                  <div className="info-content">
                    <h4>Email Us</h4>
                    <p><a href="mailto:info@casamanduva.com">info@casamanduva.com</a></p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideRight">
              <EnquiryForm source="home" />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
