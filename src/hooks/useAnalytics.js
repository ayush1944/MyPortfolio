const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useAnalytics = () => {
  const track = (event_type, payload = {}) => {
    fetch(`${API_URL}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, payload }),
    }).catch(() => {}); // silent — never break UX for analytics
  };

  return { track };
};
