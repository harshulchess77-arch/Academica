import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY

if (!apiKey) {
  console.warn('Gemini API key not configured')
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null

export async function generateSocraticResponse(
  question: string,
  context?: string
): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API not configured')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const systemPrompt = `You are a Socratic tutor. Never give direct answers. Instead, guide the student to discover the answer themselves through thoughtful questions and hints. Be encouraging and patient. Keep responses concise (under 200 words).${context ? `\n\nContext: ${context}` : ''}`

  try {
    const result = await model.generateContent([
      systemPrompt,
      question,
    ])

    return result.response.text()
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('Failed to generate response. Please try again.')
  }
}

export async function generateFlashcards(
  topic: string,
  count: number = 10
): Promise<Array<{ front: string; back: string }>> {
  if (!genAI) {
    throw new Error('Gemini API not configured')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `Generate ${count} flashcard pairs about "${topic}". Format as JSON array with "front" and "back" properties. Front should be a question or term, back should be the answer or definition. Keep responses concise.`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()

    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('Failed to parse flashcards')
    }

    const flashcards = JSON.parse(jsonMatch[0])
    return flashcards
  } catch (error) {
    console.error('Gemini flashcard generation error:', error)
    throw new Error('Failed to generate flashcards. Please try again.')
  }
}

export async function analyzeCode(
  code: string,
  language: string
): Promise<string> {
  if (!genAI) {
    throw new Error('Gemini API not configured')
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

  const prompt = `Analyze this ${language} code for bugs, improvements, and best practices. Provide specific, actionable feedback. Keep response under 300 words.\n\nCode:\n${code}`

  try {
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('Gemini code analysis error:', error)
    throw new Error('Failed to analyze code. Please try again.')
  }
}
