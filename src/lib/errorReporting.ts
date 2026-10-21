import { supabase } from './supabase';

// Centralized error reporting to Supabase error_logs table
// Rate-limited to prevent log flooding

const MAX_ERRORS_PER_MINUTE = 10;
const errorLogTimes: number[] = [];

export const logError = async (
  error: Error | string,
  context?: string,
  route?: string
): Promise<void> => {
  // Rate limit check
  const now = Date.now();
  const oneMinuteAgo = now - 60000;

  // Remove old entries
  const recentErrors = errorLogTimes.filter((time) => time > oneMinuteAgo);

  if (recentErrors.length >= MAX_ERRORS_PER_MINUTE) {
    console.warn('Error rate limit exceeded, skipping log');
    return;
  }

  errorLogTimes.push(now);

  try {
    const message = typeof error === 'string' ? error : error.message;
    const stack = typeof error === 'string' ? null : error.stack;

    await supabase.from('error_logs').insert({
      user_id: null, // Can be null for anonymous errors
      message,
      stack,
      route: route || window.location.pathname,
    });
  } catch (e) {
    console.error('Failed to log error:', e);
    // Don't throw - logging failures shouldn't cause cascading errors
  }
};

// Error boundary component helper
export const captureError = (error: Error, errorInfo: unknown): void => {
  logError(error, JSON.stringify(errorInfo));
};

// Performance error tracking
export const logPerformanceIssue = (metric: string, value: number, threshold: number): void => {
  if (value > threshold) {
    logError(`Performance issue: ${metric} exceeded threshold`, `${value}ms > ${threshold}ms`);
  }
};
