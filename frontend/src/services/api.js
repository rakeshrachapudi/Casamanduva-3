import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 429) {
      toast.error('Too many requests. Please try again later.');
    }
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

// VISITOR TRACKING
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
    console.error('Visitor tracking error:', error.message);
    throw error;
  }
};

// ENQUIRY FORM
export const submitEnquiry = async (enquiryData) => {
  try {
    if (!enquiryData.name?.trim()) throw new Error('Name is required');
    if (!enquiryData.email?.includes('@')) throw new Error('Valid email is required');
    if (!enquiryData.phone?.match(/^[0-9+\-()\\s]{10,}$/)) {
      throw new Error('Valid phone number required');
    }
    if (!enquiryData.message?.trim()) throw new Error('Project description required');

    const response = await api.post('/enquiries', enquiryData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || 'Failed to submit enquiry');
  }
};

export const getEnquiries = async () => {
  try {
    const response = await api.get('/enquiries');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch enquiries');
  }
};

// ESTIMATIONS
export const getBHKEstimations = async () => {
  try {
    const response = await api.get('/estimations/bhk');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch configurations');
  }
};

export const calculateEstimate = async (estimateRequest) => {
  try {
    if (!estimateRequest.bhkType) throw new Error('BHK type required');
    if (!estimateRequest.packageType) throw new Error('Package type required');

    const response = await api.post('/estimations/calculate', estimateRequest);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || 'Failed to calculate');
  }
};

export const saveEstimateEnquiry = async (estimateEnquiry) => {
  try {
    if (!estimateEnquiry.name?.trim()) throw new Error('Name is required');
    if (!estimateEnquiry.phone?.match(/^[0-9+\-()\\s]{10,}$/)) {
      throw new Error('Valid phone required');
    }
    if (!estimateEnquiry.area || estimateEnquiry.area < 300 || estimateEnquiry.area > 5000) {
      throw new Error('Area must be 300-5000 sq.ft');
    }

    const response = await api.post('/estimations/enquiry', estimateEnquiry);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message || 'Failed to save estimate');
  }
};

// CONTACT
export const submitContactForm = async (contactData) => {
  try {
    const response = await api.post('/contact', contactData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to submit form');
  }
};

// NEWSLETTER
export const subscribeNewsletter = async (email) => {
  try {
    if (!email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Invalid email format');
    }

    const response = await api.post('/newsletter/subscribe', { email });
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Failed to subscribe');
  }
};

export default api;