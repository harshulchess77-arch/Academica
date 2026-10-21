import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!

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
    const { topic, subject, userId } = await req.json()

    // Rate limit check
    const { data: recentRequests } = await supabase
      .from('rate_limit_counters')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', new Date(Date.now() - 3600000).toISOString())
      .limit(30)

    if (recentRequests && recentRequests.length >= 30) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 })
    }

    // Generate flashcards using Gemini
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Generate 10 flashcards for ${subject} topic: ${topic}.
              
Format each flashcard as:
Q: [question]
A: [answer]

Make questions progressive from basic to advanced.`
            }]
          }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1000,
          },
        }),
      }
    )

    const data = await response.json()
    const generatedContent = data.candidates[0].content.parts[0].text

    // Parse the generated content into flashcard objects
    const flashcards = parseFlashcards(generatedContent)

    return new Response(JSON.stringify({ flashcards }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Generation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})

function parseFlashcards(content: string) {
  const lines = content.split('\n')
  const flashcards: { question: string; answer: string }[] = []
  let currentQuestion = ''

  for (const line of lines) {
    if (line.startsWith('Q:')) {
      currentQuestion = line.replace('Q:', '').trim()
    } else if (line.startsWith('A:') && currentQuestion) {
      flashcards.push({
        question: currentQuestion,
        answer: line.replace('A:', '').trim(),
      })
      currentQuestion = ''
    }
  }

  return flashcards
}
