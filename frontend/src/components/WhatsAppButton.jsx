import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const WHATSAPP_PHONE = '919121885090';

const WhatsAppButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const getPageContext = () => {
    const path = location.pathname;
    if (path.includes('estimator')) return 'estimator';
    if (path.includes('services')) return 'services';
    if (path.includes('portfolio')) return 'portfolio';
    if (path.includes('contact')) return 'contact';
    return 'home';
  };

  const getSmartMessage = (type) => {
    const context = getPageContext();

    const messages = {
      'Free Consultation': {
        home: `Hi CASAMANDUVA! I would like to schedule a free consultation for my interior design project.`,
        estimator: `Hi! I just used your cost estimator. I'd like to discuss my project and get a detailed quote.`,
        services: `Hi! I'm interested in your interior design services. Can we schedule a consultation?`,
        portfolio: `Hi! I saw your portfolio and I'm impressed. I'd like to discuss my project.`,
        contact: `Hi CASAMANDUVA! I would like to schedule a free consultation.`
      },

      'Get Quote': {
        home: `Hi! I need a detailed quote for my interior design project.`,
        estimator: `Hi! I need a detailed quote based on my requirements.`,
        services: `Hi! I need a quote for interior design services.`,
        portfolio: `Hi! I liked your work. Can I get a quote for a similar project?`,
        contact: `Hi! I need a detailed quote for my project.`
      },

      '1BHK Estimate': `Hi CASAMANDUVA! I am interested in 1BHK interior design. Please share the details.`,
      '2BHK Estimate': `Hi CASAMANDUVA! I am interested in 2BHK interior design. Please share the details.`,
      '3BHK Estimate': `Hi CASAMANDUVA! I am interested in 3BHK interior design. Please share the details.`,
      'Talk to Designer': `Hi! I'd like to speak with a designer about my project.`,
      'Visit Showroom': `Hi! I'd like to visit your showroom. When are you available?`
    };

    const msg = messages[type];
    const finalMessage = typeof msg === 'object' ? msg[context] : msg;

    return encodeURIComponent(finalMessage);
  };

  const sendWhatsAppMessage = (messageType) => {
    const message = getSmartMessage(messageType);
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;

    window.open(url, '_blank');
    setIsMenuOpen(false);
    setShowBadge(false);

    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: messageType,
        page: getPageContext()
      });
    }
  };

  return (
    <>
      <div className={`whatsapp-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu-header">
          <div className="header-content">
            <span className="online-indicator">🟢</span>
            <div>
              <p className="menu-title">Chat with us!</p>
              <p className="menu-subtitle">We reply within minutes</p>
            </div>
          </div>
        </div>

        <div className="menu-items">
          <button className="menu-item" onClick={() => sendWhatsAppMessage('Free Consultation')}>
            <span className="emoji">💬</span>
            <div className="item-content">
              <span className="item-text">Free Consultation</span>
              <span className="item-subtext">Schedule a call with expert</span>
            </div>
            <span className="arrow">→</span>
          </button>

          <button className="menu-item" onClick={() => sendWhatsAppMessage('Get Quote')}>
            <span className="emoji">📋</span>
            <div className="item-content">
              <span className="item-text">Get Instant Quote</span>
              <span className="item-subtext">Quick price estimate</span>
            </div>
            <span className="arrow">→</span>
          </button>

          <button className="menu-item" onClick={() => sendWhatsAppMessage('1BHK Estimate')}>
            <span className="emoji">🏠</span>
            <div className="item-content">
              <span className="item-text">1 BHK Package</span>
              <span className="item-subtext">Starting ₹3.5L</span>
            </div>
            <span className="arrow">→</span>
          </button>

          <button className="menu-item" onClick={() => sendWhatsAppMessage('2BHK Estimate')}>
            <span className="emoji">🏡</span>
            <div className="item-content">
              <span className="item-text">2 BHK Package</span>
              <span className="item-subtext">Starting ₹5.5L</span>
            </div>
            <span className="arrow">→</span>
          </button>

          <button className="menu-item" onClick={() => sendWhatsAppMessage('3BHK Estimate')}>
            <span className="emoji">🏘️</span>
            <div className="item-content">
              <span className="item-text">3 BHK Package</span>
              <span className="item-subtext">Starting ₹8.5L</span>
            </div>
            <span className="arrow">→</span>
          </button>

          <button className="menu-item" onClick={() => sendWhatsAppMessage('Talk to Designer')}>
            <span className="emoji">👨‍🎨</span>
            <div className="item-content">
              <span className="item-text">Talk to Designer</span>
              <span className="item-subtext">Get expert advice</span>
            </div>
            <span className="arrow">→</span>
          </button>

          <button className="menu-item" onClick={() => sendWhatsAppMessage('Visit Showroom')}>
            <span className="emoji">🏢</span>
            <div className="item-content">
              <span className="item-text">Visit Showroom</span>
              <span className="item-subtext">See our work in person</span>
            </div>
            <span className="arrow">→</span>
          </button>
        </div>

        <div className="menu-footer">
          <p className="trust-text">
            <span className="check-icon">✓</span> 500+ Happy Customers
            <span className="divider">•</span>
            <span className="rating">4.9★</span> Rated
          </p>
        </div>
      </div>

      <button
        className={`whatsapp-button ${showBadge ? 'with-badge' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Open WhatsApp chat"
      >
        {showBadge && (
          <span className="badge-pulse">
            <span className="badge-text">Chat Now</span>
          </span>
        )}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </button>
    </>
  );
};

export default WhatsAppButton;
