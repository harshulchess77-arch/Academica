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
    const { code, language } = await req.json()

    // MOCK CODE EXECUTION - as specified in requirements
    // This is a simulated Python/code execution, not real
    // In production, use a sandboxed service like Piston or similar
    
    const simulatedOutput = `// SIMULATED EXECUTION RESULT
// Language: ${language}
// Code executed in safe sandbox environment

[Simulation Active]
Execution time: 0.23s
Memory usage: 12.4MB
Status: Completed

// Note: This is a mock execution as specified
// Real execution would require a secure sandbox service`

Output:
${language === 'python' ? 'Hello, World!' : '// Code would execute here'}`

    return new Response(JSON.stringify({ 
      output: simulatedOutput,
      simulated: true 
    }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Execution failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
