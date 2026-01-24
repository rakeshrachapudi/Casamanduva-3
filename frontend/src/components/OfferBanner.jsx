import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OfferBanner = () => {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour

  useEffect(() => {
    // Check if banner was closed today
    const closedDate = localStorage.getItem('offer_banner_closed');
    const today = new Date().toDateString();

    if (closedDate === today) {
      return; // Don't show if closed today
    }

    // Show banner after 5 seconds
    const timer = setTimeout(() => setShow(true), 5000);

    // Countdown timer
    const countdown = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdown);
    };
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('offer_banner_closed', new Date().toDateString());

    // Track close
    if (window.gtag) {
      window.gtag('event', 'offer_banner_close', {
        event_category: 'engagement'
      });
    }
  };

  const handleClick = () => {
    // Track click
    if (window.gtag) {
      window.gtag('event', 'offer_banner_click', {
        event_category: 'conversion'
      });
    }
  };

  if (!show) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="offer-banner">
      <p>
        🎉 <strong>Limited Time Offer:</strong> Get FREE 3D Design + 10% OFF on all packages!
        {timeLeft > 0 && (
          <span className="urgency-timer">
            Ends in: {minutes}:{seconds < 10 ? '0' : ''}{seconds}
          </span>
        )}
      </p>
      <Link
        to="/estimator"
        className="btn btn-sm"
        onClick={handleClick}
      >
        Claim Now
      </Link>
      <button onClick={handleClose} aria-label="Close offer banner">×</button>
    </div>
  );
};

export default OfferBanner;