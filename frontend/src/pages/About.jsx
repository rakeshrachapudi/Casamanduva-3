import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AnimatedSection from '../components/AnimatedSection';

const teamMembers = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & Principal Designer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: '15+ years of experience in luxury interior design with projects across India.',
  },
  {
    name: 'Priya Sharma',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Award-winning designer specializing in contemporary and fusion styles.',
  },
  {
    name: 'Vikram Singh',
    role: 'Project Head',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Expert in project management ensuring timely delivery and quality execution.',
  },
];

const values = [
  { icon: '⭐', title: 'Excellence', description: 'We pursue perfection in every detail, ensuring the highest quality in materials and craftsmanship.' },
  { icon: '🤝', title: 'Integrity', description: 'Transparent communication, honest pricing, and commitment to our promises define our relationships.' },
  { icon: '💡', title: 'Innovation', description: 'We blend timeless design principles with cutting-edge trends and smart home technologies.' },
];

const About = () => {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'CASAMANDUVA',
      description: 'Premium interior design studio in Hyderabad',
      foundingDate: '2009',
      numberOfEmployees: '50+',
      areaServed: 'India',
    },
  };

  return (
    <>
      <SEO
        title="About Us - Premium Interior Design Studio"
        description="CASAMANDUVA is a premium interior design studio in Hyderabad with 15+ years of experience. Learn about our team, values, and commitment to excellence."
        keywords="about casamanduva, interior design company hyderabad, interior designers team, luxury interior studio"
        url="/about"
        schema={aboutSchema}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=800&fit=crop"
            alt="About CASAMANDUVA"
            loading="eager"
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <AnimatedSection animation="fadeUp">
            <span className="section-badge">About Us</span>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <h1>Crafting Dreams Into <span className="text-gold">Living Spaces</span></h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <p>15+ years of transforming spaces and creating homes that tell unique stories</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <div className="about-grid">
            <AnimatedSection className="about-image" animation="slideLeft">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                alt="CASAMANDUVA Studio"
              />
              <div className="about-image-accent"></div>
            </AnimatedSection>

            <AnimatedSection className="about-content" animation="slideRight">
              <span className="section-badge">Our Story</span>
              <h2>Where <span className="text-gold">Vision</span> Meets Craftsmanship</h2>
              <p>
                Founded in 2009, CASAMANDUVA began with a simple vision: to create spaces that inspire and transform lives. What started as a small studio in Hyderabad has grown into one of the region's most trusted interior design firms.
              </p>
              <p>
                Our name, "Casa Manduva," combines the warmth of "home" with the artistry of creation. Every project we undertake is a collaboration between your dreams and our expertise, resulting in spaces that are uniquely yours.
              </p>
              <p>
                With over 500 completed projects across residential, commercial, and hospitality sectors, we've built a reputation for excellence, innovation, and unwavering commitment to client satisfaction.
              </p>
              <div className="about-signature">
                <span className="signature-line"></span>
                <span className="signature-text">— Arjun Mehta, Founder</span>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section" style={{ background: 'var(--color-warm-beige)' }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Our Values</span>
            <h2 className="section-title">What We <span className="text-gold">Stand For</span></h2>
          </AnimatedSection>

          <div className="philosophy-grid">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} className="philosophy-item" animation="fadeUp" delay={index * 0.15}>
                <span className="philosophy-icon">{value.icon}</span>
                <h4>{value.title}</h4>
                <p>{value.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <AnimatedSection className="stat-item" animation="fadeUp" delay={0.1}>
              <span className="stat-number">500+</span>
              <span className="stat-label">Projects Completed</span>
            </AnimatedSection>
            <AnimatedSection className="stat-item" animation="fadeUp" delay={0.2}>
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience</span>
            </AnimatedSection>
            <AnimatedSection className="stat-item" animation="fadeUp" delay={0.3}>
              <span className="stat-number">50+</span>
              <span className="stat-label">Team Members</span>
            </AnimatedSection>
            <AnimatedSection className="stat-item" animation="fadeUp" delay={0.4}>
              <span className="stat-number">15+</span>
              <span className="stat-label">Cities Served</span>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Our Team</span>
            <h2 className="section-title">Meet the <span className="text-gold">Experts</span></h2>
          </AnimatedSection>

          <div className="testimonials-grid">
            {teamMembers.map((member, index) => (
              <AnimatedSection key={member.name} animation="fadeUp" delay={index * 0.15}>
                <div style={{ background: 'white', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
                  <div style={{ padding: 'var(--space-lg)' }}>
                    <h4 style={{ marginBottom: 'var(--space-xs)' }}>{member.name}</h4>
                    <p className="text-gold" style={{ fontSize: '0.85rem', marginBottom: 'var(--space-sm)' }}>{member.role}</p>
                    <p style={{ fontSize: '0.95rem' }}>{member.bio}</p>
                  </div>
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
            <h2>Ready to Start Your Journey?</h2>
            <p>Let's create something beautiful together</p>
            <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-primary btn-lg">Book Consultation</Link>
              <Link to="/portfolio" className="btn btn-outline btn-lg" style={{ borderColor: 'var(--color-charcoal)', color: 'var(--color-charcoal)' }}>View Portfolio</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default About;
