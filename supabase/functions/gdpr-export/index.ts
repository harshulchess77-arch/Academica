import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Authorization required' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid authorization' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch all user data for GDPR export
    const [
      { data: profile },
      { data: testScores },
      { data: skillProgress },
      { data: quizAttempts },
      { data: knowledgeGaps },
      { data: journalEntries },
      { data: portfolioItems },
      { data: pomodoroSessions },
      { data: badges },
      { data: flashcardDecks },
      { data: codeSnippets },
      { data: inventory },
      { data: complianceEvents },
    ] = await Promise.all([
      supabaseClient.from('profiles').select('*').eq('id', user.id).single(),
      supabaseClient.from('test_scores').select('*').eq('user_id', user.id),
      supabaseClient.from('user_skill_progress').select('*').eq('user_id', user.id),
      supabaseClient.from('quiz_attempts').select('*').eq('user_id', user.id),
      supabaseClient.from('knowledge_gaps').select('*').eq('user_id', user.id),
      supabaseClient.from('journal_entries').select('*').eq('user_id', user.id),
      supabaseClient.from('portfolio_items').select('*').eq('user_id', user.id),
      supabaseClient.from('pomodoro_sessions').select('*').eq('user_id', user.id),
      supabaseClient.from('user_badges').select('*, badges(*)').eq('user_id', user.id),
      supabaseClient.from('flashcard_decks').select('*, flashcard_items(*)').eq('user_id', user.id),
      supabaseClient.from('code_snippets').select('*').eq('user_id', user.id),
      supabaseClient.from('user_inventory').select('*, vault_items(*)').eq('user_id', user.id),
      supabaseClient.from('compliance_events').select('*').eq('user_id', user.id),
    ]);

    const exportData = {
      profile,
      testScores,
      skillProgress,
      quizAttempts,
      knowledgeGaps,
      journalEntries,
      portfolioItems,
      pomodoroSessions,
      badges,
      flashcardDecks,
      codeSnippets,
      inventory,
      complianceEvents,
      exportedAt: new Date().toISOString(),
    };

    // Log compliance event
    await supabaseClient.rpc('log_compliance_event', {
      p_event_type: 'data_export',
      p_details: { requested_by: user.email },
      p_user_id: user.id,
    });

    return new Response(JSON.stringify(exportData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GDPR export error:', error);
    return new Response(JSON.stringify({ error: 'Failed to export data' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
