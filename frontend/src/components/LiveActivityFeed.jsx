import { useState, useEffect } from 'react';

const LiveActivityFeed = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [show, setShow] = useState(false);

  const activities = [
    { icon: '🎉', text: 'Priya from Gachibowli just requested a 2BHK quote', time: '2 mins ago' },
    { icon: '✅', text: 'Rajesh from Jubilee Hills booked a consultation', time: '5 mins ago' },
    { icon: '📥', text: 'Ananya from Kondapur downloaded kitchen catalog', time: '8 mins ago' },
    { icon: '🏠', text: 'Vikram from HITEC City got 3BHK estimate', time: '12 mins ago' },
    { icon: '💬', text: 'Meera from Banjara Hills started WhatsApp chat', time: '15 mins ago' },
    { icon: '⭐', text: 'Karthik from Madhapur left a 5-star review', time: '18 mins ago' },
    { icon: '📞', text: 'Sanjana from Film Nagar scheduled a call', time: '22 mins ago' },
    { icon: '🎨', text: 'Arun from Kondapur viewed living room designs', time: '25 mins ago' }
  ];

  useEffect(() => {
    // Show after 10 seconds
    const showTimer = setTimeout(() => setShow(true), 10000);

    // Rotate activities every 8 seconds
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 8000);

    // Hide after 30 seconds
    const hideTimer = setTimeout(() => setShow(false), 40000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, []);

  if (!show) return null;

  const activity = activities[currentActivity];

  return (
    <div
      className="activity-feed"
      style={{
        animation: 'slideInLeft 0.5s ease-out'
      }}
    >
      <span className="activity-icon">{activity.icon}</span>
      <span className="activity-text">{activity.text}</span>
      <span className="activity-time">{activity.time}</span>
    </div>
  );
};

export default LiveActivityFeed;