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
    const { userId } = await req.json()

    // Gather all user data for GDPR export
    const [profile, quizAttempts, journalEntries, skillProgress, complianceEvents] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('quiz_attempts').select('*').eq('user_id', userId),
      supabase.from('journal_entries').select('*').eq('user_id', userId),
      supabase.from('user_skill_progress').select('*').eq('user_id', userId),
      supabase.from('compliance_events').select('*').eq('user_id', userId),
    ])

    const exportData = {
      profile,
      quizAttempts,
      journalEntries,
      skillProgress,
      complianceEvents,
      exportedAt: new Date().toISOString(),
    }

    return new Response(JSON.stringify(exportData), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Export failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
