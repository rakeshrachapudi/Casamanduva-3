import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WHATSAPP_PHONE = '919121885090';

const StickyActionBar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 500);

      if (window.scrollY > 500) {
        document.body.classList.add('sticky-bar-visible');
      } else {
        document.body.classList.remove('sticky-bar-visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('sticky-bar-visible');
    };
  }, []);

  const openWhatsApp = () => {
    const messages = {
      '/': `Hi CASAMANDUVA! I want to transform my home. Can we discuss?`,
      '/estimator': `Hi! I just checked your estimator. I need a detailed quote.`,
      '/services': `Hi! I'm interested in your interior design services.`,
      '/portfolio': `Hi! I loved your portfolio. Let's discuss my project.`,
      '/contact': `Hi! I'd like to schedule a consultation.`
    };

    const message = messages[location.pathname] || messages['/'];
    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    if (window.gtag) {
      window.gtag('event', 'sticky_bar_whatsapp', {
        event_category: 'engagement',
        page: location.pathname
      });
    }
  };

  const handleCall = () => {
    if (window.gtag) {
      window.gtag('event', 'sticky_bar_call', {
        event_category: 'engagement',
        page: location.pathname
      });
    }
  };

  const handleEstimateClick = () => {
    if (window.gtag) {
      window.gtag('event', 'sticky_bar_estimate', {
        event_category: 'conversion',
        page: location.pathname
      });
    }
  };

  if (!show) return null;

  return (
    <div className="sticky-action-bar">
      <Link
        to="/estimator"
        className="btn btn-primary"
        onClick={handleEstimateClick}
      >
        <span>📋</span> Get Free Estimate
      </Link>

      <a
        href={`tel:+${WHATSAPP_PHONE}`}
        className="btn btn-outline"
        onClick={handleCall}
      >
        <span>📞</span> Call Now
      </a>

      <button
        onClick={openWhatsApp}
        className="btn btn-success"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ marginRight: '0.5rem' }}
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        WhatsApp
      </button>
    </div>
  );
};

export default StickyActionBar;
