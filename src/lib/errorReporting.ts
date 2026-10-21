import { supabase } from './supabase'

interface ErrorLog {
  message: string
  stack?: string
  route?: string
  userId?: string
}

let errorCount = 0
const MAX_ERRORS_PER_MINUTE = 10
const RESET_INTERVAL = 60000 // 1 minute

export async function logError(error: Error, context?: { route?: string }) {
  // Rate limiting
  errorCount++
  if (errorCount > MAX_ERRORS_PER_MINUTE) {
    console.warn('Error rate limit exceeded, skipping log')
    return
  }

  // Reset counter after interval
  setTimeout(() => {
    errorCount = 0
  }, RESET_INTERVAL)

  try {
    const { data: { user } } = await supabase.auth.getUser()

    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      route: context?.route || window.location.pathname,
      userId: user?.id,
    }

    // Log to console in development
    if (import.meta.env.DEV) {
      console.error('[Error Reporting]', errorLog)
    }

    // Send to Supabase error_logs table
    await supabase.from('error_logs').insert(errorLog)
  } catch (logError) {
    console.error('Failed to log error:', logError)
  }
}

export function setupGlobalErrorHandling() {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    logError(new Error(event.reason), { route: window.location.pathname })
  })

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    logError(event.error || new Error(event.message), { route: window.location.pathname })
  })
}
