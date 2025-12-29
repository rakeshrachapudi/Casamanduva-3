import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============ VISITOR TRACKING ============
export const trackVisitor = async () => {
  try {
    const visitorData = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      referrer: document.referrer || 'direct',
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      page: window.location.pathname,
    };
    
    const response = await api.post('/visitors/track', visitorData);
    return response.data;
  } catch (error) {
    console.error('Visitor tracking error:', error);
    throw error;
  }
};

// ============ ENQUIRY FORM ============
export const submitEnquiry = async (enquiryData) => {
  try {
    const response = await api.post('/enquiries', enquiryData);
    return response.data;
  } catch (error) {
    console.error('Enquiry submission error:', error);
    throw error;
  }
};

export const getEnquiries = async () => {
  try {
    const response = await api.get('/enquiries');
    return response.data;
  } catch (error) {
    console.error('Get enquiries error:', error);
    throw error;
  }
};

// ============ BHK ESTIMATIONS ============
export const getBHKEstimations = async () => {
  try {
    const response = await api.get('/estimations/bhk');
    return response.data;
  } catch (error) {
    console.error('Get BHK estimations error:', error);
    throw error;
  }
};

export const calculateEstimate = async (estimateRequest) => {
  try {
    const response = await api.post('/estimations/calculate', estimateRequest);
    return response.data;
  } catch (error) {
    console.error('Calculate estimate error:', error);
    throw error;
  }
};

export const saveEstimateEnquiry = async (estimateEnquiry) => {
  try {
    const response = await api.post('/estimations/enquiry', estimateEnquiry);
    return response.data;
  } catch (error) {
    console.error('Save estimate enquiry error:', error);
    throw error;
  }
};

// ============ CONTACT ============
export const submitContactForm = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    return response.data;
  } catch (error) {
    console.error('Contact form error:', error);
    throw error;
  }
};

// ============ NEWSLETTER ============
export const subscribeNewsletter = async (email) => {
  try {
    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    throw error;
  }
};

export default api;
