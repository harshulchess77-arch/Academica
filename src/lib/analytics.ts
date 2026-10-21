import { supabase } from './supabase';

// Privacy-safe analytics - no personal identifiers, only anonymous metrics
type AnalyticsEvent =
  | { type: 'page_view'; path: string }
  | { type: 'feature_use'; feature: string }
  | { type: 'error'; error: string; context?: string }
  | { type: 'completion'; item: string; duration?: number }
  | { type: 'engagement'; action: string; target?: string };

const isDevelopment = import.meta.env.VITE_APP_ENV === 'development';

export const logEvent = async (event: AnalyticsEvent): Promise<void> => {
  if (isDevelopment) {
    console.log('[Analytics]', event);
    return;
  }

  try {
    // In production, send to a privacy-compliant analytics service
    // For now, we'll use error_logs for error events only
    if (event.type === 'error') {
      await supabase.from('error_logs').insert({
        user_id: null,
        message: event.error,
        stack: event.context,
        route: window.location.pathname,
      });
    }
  } catch (error) {
    console.error('Analytics logging failed:', error);
    // Don't throw - analytics failures shouldn't break the app
  }
};

// Session ID for grouping events (session-local only, no persistence)
let sessionId: string | null = null;

const getSessionId = (): string => {
  if (!sessionId) {
    sessionId = crypto.randomUUID();
  }
  return sessionId;
};

// Page view tracking
export const trackPageView = (path: string): void => {
  logEvent({ type: 'page_view', path });
};

// Feature usage tracking
export const trackFeatureUse = (feature: string): void => {
  logEvent({ type: 'feature_use', feature });
};

// Error tracking (without PII)
export const trackError = (error: string, context?: string): void => {
  logEvent({ type: 'error', error, context });
};

// Completion tracking
export const trackCompletion = (item: string, duration?: number): void => {
  logEvent({ type: 'completion', item, duration });
};

// Engagement tracking
export const trackEngagement = (action: string, target?: string): void => {
  logEvent({ type: 'engagement', action, target });
};
