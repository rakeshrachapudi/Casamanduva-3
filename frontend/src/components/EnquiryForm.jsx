import { useState } from 'react';
import toast from 'react-hot-toast';
import { submitEnquiry } from '../services/api';

const EnquiryForm = ({ source = 'contact' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!formData.phone.match(/^[0-9+\-()\\s]{10,}$/)) {
      newErrors.phone = 'Invalid phone (10+ digits)';
    }

    if (!formData.message?.trim()) {
      newErrors.message = 'Project description required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'At least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors');
      return;
    }

    setIsSubmitting(true);

    try {
      const enquiryData = {
        ...formData,
        source,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
        submittedAt: new Date().toISOString(),
      };

      await submitEnquiry(enquiryData);

      toast.success('Thank you! We will contact you shortly.');

      setFormData({
        name: '',
        email: '',
        phone: '',
        propertyType: '',
        budget: '',
        service: '',
        message: '',
      });

      if (window.gtag) {
        window.gtag('event', 'conversion', {
          send_to: 'AW-XXXXXXXXX/CONVERSION_ID',
          value: 1.0,
          currency: 'INR',
        });
      }

      if (window.fbq) {
        window.fbq('track', 'Lead', {
          content_name: source,
          value: 1.0,
          currency: 'INR',
        });
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    if (!formData.name?.trim() || !formData.phone?.trim()) {
      toast.error('Enter name and phone first');
      return;
    }

    const message = encodeURIComponent(
      `Hi CASAMANDUVA! I'm ${formData.name.trim()}. Looking for ${formData.service || 'interior design'}. ${formData.message?.trim() || ''}`
    );
    window.open(`https://wa.me/919121885090?text=${message}`, '_blank');
  };

  return (
    <div className="contact-form-wrapper">
      <h3>Send an Enquiry</h3>
      <p>Fill out the form below and we'll get back to you within 24 hours.</p>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              maxLength="255"
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              maxLength="255"
              disabled={isSubmitting}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 00000 00000"
              disabled={isSubmitting}
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="propertyType">Property Type</label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select property type</option>
              <option value="1bhk">1 BHK Apartment</option>
              <option value="2bhk">2 BHK Apartment</option>
              <option value="3bhk">3 BHK Apartment</option>
              <option value="4bhk">4+ BHK Apartment</option>
              <option value="villa">Villa / House</option>
              <option value="office">Office Space</option>
              <option value="commercial">Commercial Space</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="budget">Approx. Budget</label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select budget</option>
              <option value="3-5">₹3 - 5 Lakhs</option>
              <option value="5-10">₹5 - 10 Lakhs</option>
              <option value="10-20">₹10 - 20 Lakhs</option>
              <option value="20-35">₹20 - 35 Lakhs</option>
              <option value="35+">₹35 Lakhs+</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="service">Service Interested In</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="">Select a service</option>
              <option value="complete">Complete Home Interior</option>
              <option value="living-room">Living Room Design</option>
              <option value="bedroom">Bedroom Design</option>
              <option value="kitchen">Modular Kitchen</option>
              <option value="wardrobe">Wardrobe Design</option>
              <option value="office">Office Interiors</option>
              <option value="renovation">Renovation</option>
              <option value="consultation">Design Consultation Only</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Tell us about your project *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your vision, requirements, property size..."
            rows="5"
            maxLength="5000"
            disabled={isSubmitting}
          />
          <span className="char-count">{formData.message.length}/5000</span>
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Enquiry'}
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={openWhatsApp}
            disabled={isSubmitting}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnquiryForm;