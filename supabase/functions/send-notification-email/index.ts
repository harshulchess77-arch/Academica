import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { userId, notificationType, title, body } = await req.json()

    // Rate limit: max 1 digest email per user per 24h
    const { data: recentEmails } = await supabase
      .from('rate_limit_counters')
      .select('*')
      .eq('user_id', userId)
      .eq('endpoint', 'send-notification-email')
      .gte('created_at', new Date(Date.now() - 86400000).toISOString())
      .limit(1)

    if (recentEmails && recentEmails.length >= 1) {
      return new Response(JSON.stringify({ error: 'Email rate limit exceeded' }), { status: 429 })
    }

    // Log the rate limit check
    await supabase.from('rate_limit_counters').insert({
      user_id: userId,
      endpoint: 'send-notification-email',
      created_at: new Date().toISOString(),
    })

    // Create notification record
    await supabase.from('notifications').insert({
      user_id: userId,
      type: notificationType,
      title,
      body,
      read: false,
      created_at: new Date().toISOString(),
    })

    // In production, integrate with email service (SendGrid, Resend, etc.)
    // For now, we just log it
    console.log(`Notification email would be sent to ${userId}: ${title}`)

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to send notification' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
