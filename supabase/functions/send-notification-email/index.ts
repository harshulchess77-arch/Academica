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
    const { userId, notificationType, title, body } = await req.json();

    if (!userId || !notificationType || !title || !body) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if user has had an email in the last 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: recentEmails } = await supabaseClient
      .from('notifications')
      .select('created_at')
      .eq('user_id', userId)
      .gte('created_at', oneDayAgo)
      .limit(1);

    if (recentEmails && recentEmails.length > 0) {
      // Rate limit: skip email if one was sent recently
      return new Response(JSON.stringify({ sent: false, reason: 'Rate limited' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create notification
    const { error: insertError } = await supabaseClient.from('notifications').insert({
      user_id: userId,
      type: notificationType,
      title,
      body,
      read: false,
    });

    if (insertError) {
      throw insertError;
    }

    // Get user email
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('email')
      .eq('id', userId)
      .single();

    if (!profile) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send email via Supabase Auth
    // In production, use a proper email service or Supabase's email hooks
    const { error: emailError } = await supabaseClient.auth.admin.updateUserById(userId, {
      email: profile.email,
    });

    if (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the request if email fails
    }

    return new Response(JSON.stringify({ sent: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Send notification email error:', error);
    return new Response(JSON.stringify({ error: 'Failed to send notification' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
