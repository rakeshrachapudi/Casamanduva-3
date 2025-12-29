import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AnimatedSection from '../components/AnimatedSection';

const services = [
  {
    id: 1,
    title: 'Living Room Design',
    category: 'residential',
    description: 'Create stunning living spaces that reflect your personality and lifestyle.',
    image: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600&h=400&fit=crop',
    features: ['Custom furniture', 'Accent walls', 'Lighting design', 'Entertainment units'],
  },
  {
    id: 2,
    title: 'Bedroom Design',
    category: 'residential',
    description: 'Design serene sanctuaries for rest and relaxation.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop',
    features: ['Wardrobe solutions', 'Bed design', 'Study corners', 'Ambient lighting'],
  },
  {
    id: 3,
    title: 'Modular Kitchen',
    category: 'residential',
    description: 'Functional and beautiful kitchens that make cooking a joy.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    features: ['Modular cabinets', 'Countertops', 'Appliance integration', 'Storage solutions'],
  },
  {
    id: 4,
    title: 'Office Interiors',
    category: 'commercial',
    description: 'Professional spaces that boost productivity and impress clients.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    features: ['Workstations', 'Conference rooms', 'Reception areas', 'Breakout spaces'],
  },
  {
    id: 5,
    title: 'Wardrobe Design',
    category: 'specialty',
    description: 'Custom wardrobes that maximize storage and style.',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&h=400&fit=crop',
    features: ['Walk-in closets', 'Sliding wardrobes', 'Accessories storage', 'Custom fittings'],
  },
  {
    id: 6,
    title: 'Bathroom Design',
    category: 'residential',
    description: 'Luxurious bathrooms that combine comfort with elegance.',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&h=400&fit=crop',
    features: ['Vanity units', 'Shower enclosures', 'Fixtures', 'Storage solutions'],
  },
];

const processSteps = [
  { number: '01', title: 'Discovery Call', description: 'Understand your vision, requirements, and budget' },
  { number: '02', title: 'Site Assessment', description: 'Detailed measurements and site analysis' },
  { number: '03', title: 'Concept Design', description: '3D visualization and material selection' },
  { number: '04', title: 'Detailed Planning', description: 'Technical drawings and final specifications' },
  { number: '05', title: 'Execution', description: 'Professional installation with quality control' },
  { number: '06', title: 'Handover', description: 'Final walkthrough and project completion' },
];

const pricing = [
  {
    name: 'Essential',
    price: '₹1,800',
    unit: '/sq.ft',
    description: 'Quality materials with functional design',
    features: ['Basic modular furniture', 'Standard finishes', 'Essential lighting', '1-year warranty'],
  },
  {
    name: 'Premium',
    price: '₹2,500',
    unit: '/sq.ft',
    popular: true,
    description: 'Premium materials with elegant design',
    features: ['Premium modular furniture', 'Designer finishes', 'Accent lighting', 'False ceiling', '2-year warranty'],
  },
  {
    name: 'Luxury',
    price: '₹3,500+',
    unit: '/sq.ft',
    description: 'Luxury materials with bespoke design',
    features: ['Luxury custom furniture', 'Imported finishes', 'Smart lighting', 'Full false ceiling', 'Home automation', '3-year warranty'],
  },
];

const Services = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredServices = activeFilter === 'all' 
    ? services 
    : services.filter(s => s.category === activeFilter);

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'LocalBusiness',
      name: 'CASAMANDUVA',
    },
    serviceType: 'Interior Design',
    areaServed: 'Hyderabad, India',
  };

  return (
    <>
      <SEO
        title="Interior Design Services | Living Room, Kitchen, Bedroom Design"
        description="Comprehensive interior design services in Hyderabad. Living room, bedroom, modular kitchen, office interiors. Packages starting ₹1,800/sq.ft. Free consultation."
        keywords="interior design services, living room design, bedroom design, modular kitchen hyderabad, office interior design, wardrobe design"
        url="/services"
        schema={servicesSchema}
      />

      {/* Page Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&h=800&fit=crop"
            alt="Our Services"
            loading="eager"
          />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <AnimatedSection animation="fadeUp">
            <span className="section-badge">Our Services</span>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <h1>Comprehensive Design <span className="text-gold">Solutions</span></h1>
          </AnimatedSection>
          <AnimatedSection animation="fadeUp" delay={0.4}>
            <p>From concept to completion, we handle every aspect of your interior transformation</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filter">
        <div className="container">
          <div className="filter-tabs">
            {['all', 'residential', 'commercial', 'specialty'].map((filter) => (
              <button
                key={filter}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'all' ? 'All Services' : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <div className="themes-grid">
            {filteredServices.map((service, index) => (
              <AnimatedSection key={service.id} className="theme-card" animation="fadeUp" delay={index * 0.1}>
                <div className="theme-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <div className="theme-overlay">
                    <Link to="/estimator" className="btn btn-outline-light">Get Quote</Link>
                  </div>
                </div>
                <div className="theme-content">
                  <span className="theme-category">{service.category}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-md)' }}>
                    {service.features.map((feature, i) => (
                      <li key={i} style={{ fontSize: '0.85rem', padding: '0.25rem 0', color: 'var(--color-text-secondary)' }}>
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/estimator" className="theme-link">Get Estimate →</Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" style={{ background: 'var(--color-warm-beige)' }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Our Process</span>
            <h2 className="section-title">How We <span className="text-gold">Work</span></h2>
          </AnimatedSection>

          <div className="process-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {processSteps.map((step, index) => (
              <AnimatedSection key={step.number} className="process-card" animation="fadeUp" delay={index * 0.1}>
                <span className="process-number">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section" style={{ background: 'var(--color-ivory)' }}>
        <div className="container">
          <AnimatedSection className="section-header">
            <span className="section-badge">Transparent Pricing</span>
            <h2 className="section-title">Our <span className="text-gold">Packages</span></h2>
          </AnimatedSection>

          <div className="process-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {pricing.map((pkg, index) => (
              <AnimatedSection 
                key={pkg.name} 
                animation="fadeUp" 
                delay={index * 0.15}
                style={{
                  background: pkg.popular ? 'var(--color-charcoal)' : 'white',
                  color: pkg.popular ? 'white' : 'inherit',
                  padding: 'var(--space-xl)',
                  borderRadius: 'var(--radius-md)',
                  position: 'relative',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {pkg.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--color-gold)',
                    color: 'var(--color-charcoal)',
                    padding: '0.35rem 1rem',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    borderRadius: 'var(--radius-full)',
                  }}>
                    Most Popular
                  </span>
                )}
                <h3 style={{ color: pkg.popular ? 'white' : 'inherit' }}>{pkg.name}</h3>
                <p style={{ 
                  fontSize: '2.5rem', 
                  fontFamily: 'var(--font-serif)', 
                  color: 'var(--color-gold)',
                  margin: 'var(--space-sm) 0'
                }}>
                  {pkg.price}<span style={{ fontSize: '1rem' }}>{pkg.unit}</span>
                </p>
                <p style={{ opacity: 0.8, marginBottom: 'var(--space-lg)', color: pkg.popular ? 'rgba(255,255,255,0.8)' : 'inherit' }}>
                  {pkg.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-lg)' }}>
                  {pkg.features.map((feature, i) => (
                    <li key={i} style={{ 
                      padding: '0.75rem 0', 
                      borderBottom: `1px solid ${pkg.popular ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: 'var(--color-gold)' }}>✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/estimator" 
                  className={`btn ${pkg.popular ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Get Started
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ background: 'var(--color-charcoal)' }}>
        <div className="container">
          <AnimatedSection className="cta-content">
            <h2 style={{ color: 'var(--color-ivory)' }}>Need a Custom Solution?</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)' }}>Let's discuss your unique requirements</p>
            <Link to="/contact" className="btn btn-primary btn-lg">Schedule Consultation</Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Services;
