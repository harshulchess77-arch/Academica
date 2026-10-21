import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

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
    const { content, type } = await req.json()

    // Content moderation with safety filters
    const flaggedTerms = ['spam', 'harassment', 'hate', 'violence']
    const lowerContent = content.toLowerCase()
    
    let flagged = false
    let categories: string[] = []

    for (const term of flaggedTerms) {
      if (lowerContent.includes(term)) {
        flagged = true
        categories.push(term)
      }
    }

    return new Response(JSON.stringify({ 
      flagged,
      categories,
      safe: !flagged
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Moderation check failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
