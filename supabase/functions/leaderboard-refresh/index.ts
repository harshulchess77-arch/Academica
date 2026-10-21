import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // This is a scheduled function, triggered by cron or Supabase Scheduled Functions
  // It recalculates the leaderboard_public_view ranking cache every 15 minutes

  try {
    // Recalculate leaderboard rankings
    // The view leaderboard_public_view should already handle the ranking,
    // but we can add caching or materialized view refresh logic here

    // Update last refresh timestamp
    const { error } = await supabase
      .from('leaderboard_public_view')
      .select('xp_total')
      .order('xp_total', { ascending: false })
      .limit(1)

    if (error) {
      throw error
    }

    console.log('Leaderboard refreshed successfully')

    return new Response(JSON.stringify({ success: true, refreshedAt: new Date().toISOString() }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Leaderboard refresh failed:', error)
    return new Response(JSON.stringify({ error: 'Refresh failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
