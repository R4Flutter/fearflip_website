"import { useCallback } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function useAnalytics() {
  const trackEvent = useCallback(async (eventName, metadata = {}) => {
    try {
      await axios.post(`${API}/track`, {
        event_name: eventName,
        metadata: {
          ...metadata,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        },
      });
    } catch (err) {
      console.warn('Analytics tracking failed:', err);
    }
  }, []);

  return { trackEvent };
}
"