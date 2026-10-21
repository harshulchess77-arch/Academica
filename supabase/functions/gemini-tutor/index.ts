import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  // CORS handling
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, content-type',
      },
    })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { question, subject, userId } = await req.json()

    if (!question || !userId) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Rate limit check (simple implementation)
    const { data: recentRequests } = await supabase
      .from('rate_limit_counters')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 3600000).toISOString())
      .limit(30)

    if (recentRequests && recentRequests.length >= 30) {
      return new Response(
        JSON.stringify({ error: 'You have reached your hourly AI limit. Try again soon!' }),
        { status: 429 }
      )
    }

    // Log request for rate limiting
    await supabase.from('rate_limit_counters').insert({
      user_id: userId,
      endpoint: 'gemini-tutor',
      created_at: new Date().toISOString(),
    })

    // Call Gemini API with Socratic guardrails
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a Socratic tutor for ${subject || 'academic'} subjects. 
              
CRITICAL RULES:
1. NEVER give direct answers to homework problems
2. Guide students through reasoning with probing questions
3. Only confirm when the student demonstrates understanding
4. Be encouraging but require genuine effort
5. If a student asks for the answer, redirect them to the underlying concept

Student question: ${question}

Provide a helpful, Socratic response that guides without giving the answer directly.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Gemini API error')
    }

    const answer = data.candidates[0].content.parts[0].text

    return new Response(JSON.stringify({ answer }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in gemini-tutor:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
