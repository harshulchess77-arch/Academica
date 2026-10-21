import { supabase } from './supabase'

interface AnalyticsEvent {
  event_name: string
  event_properties?: Record<string, unknown>
  user_id?: string
}

export async function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  try {
    const { data: { user } } = await supabase.auth.getUser()

    const event: AnalyticsEvent = {
      event_name: eventName,
      event_properties: properties,
      user_id: user?.id,
    }

    // In production, this would send to a privacy-first analytics service
    // For now, we'll log to console in development
    if (import.meta.env.DEV) {
      console.log('[Analytics]', event)
    }

    // Future: Send to Supabase edge function or privacy-compliant analytics
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

export async function trackPageView(page: string) {
  await trackEvent('page_view', { page })
}

export async function trackSkillCompletion(skillId: string, subject: string) {
  await trackEvent('skill_completed', { skill_id: skillId, subject })
}

export async function trackQuizAttempt(score: number, total: number, subject: string) {
  await trackEvent('quiz_attempt', { score, total, subject, percentage: (score / total) * 100 })
}

export async function trackJournalEntry() {
  await trackEvent('journal_entry_created')
}

export async function trackPomodoroSession(duration: number, subject?: string) {
  await trackEvent('pomodoro_session', { duration_seconds: duration, subject })
}

export async function trackGuildJoin(guildId: string) {
  await trackEvent('guild_joined', { guild_id: guildId })
}

export async function trackVaultPurchase(itemId: string, cost: number) {
  await trackEvent('vault_purchase', { item_id: itemId, cost })
}
