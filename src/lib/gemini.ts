import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing Gemini API key');
}

const genAI = new GoogleGenerativeAI(apiKey);

// System prompt for Socratic tutoring
const SOCRATIC_SYSTEM_PROMPT = `
You are a Socratic tutor for K-12 students. Your role is to guide students to understanding through questions, not direct answers.

Rules:
1. Never give direct answers. Ask guiding questions instead.
2. Break complex problems into smaller steps.
3. Celebrate student insights and progress.
4. If a student is completely stuck, provide the smallest possible hint.
5. Maintain a friendly, encouraging tone.
6. Adapt language complexity to the student's level.
7. Focus on the "why" and "how", not just the "what".
8. Use examples and analogies when helpful.
9. If a student asks for code, guide them to write it themselves.
10. Never write complete solutions for students.

If a student asks you to do their homework directly, politely redirect them to think through the problem.
`;

const SAFETY_SETTINGS = [
  {
    category: 'HARM_CATEGORY_HARASSMENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_HATE_SPEECH',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
  {
    category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
    threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  },
];

export class GeminiClient {
  private model: GenerativeModel;

  constructor() {
    this.model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: SOCRATIC_SYSTEM_PROMPT,
      safetySettings: SAFETY_SETTINGS,
    });
  }

  async chat(
    message: string,
    conversationHistory: Array<{ role: string; content: string }> = []
  ): Promise<string> {
    try {
      // Build conversation with system prompt
      const history = conversationHistory.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

      const chat = this.model.startChat({ history });
      const result = await chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to get AI response. Please try again.');
    }
  }

  async generateFlashcards(topic: string, count: number = 10): Promise<Array<{ front: string; back: string }>> {
    try {
      const prompt = `Generate ${count} flashcards about "${topic}" for K-12 students. Return ONLY a JSON array with "front" and "back" properties. No other text.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse JSON from response
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const flashcards = JSON.parse(jsonMatch[0]);
      return flashcards;
    } catch (error) {
      console.error('Flashcard generation error:', error);
      throw new Error('Failed to generate flashcards. Please try again.');
    }
  }

  async moderateContent(content: string): Promise<{ isSafe: boolean; reason?: string }> {
    try {
      const prompt = `Analyze this content for safety: "${content}". Return ONLY a JSON object with "isSafe" (boolean) and "reason" (string if unsafe). Consider: harassment, hate speech, explicit content, self-harm, dangerous activities.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        return { isSafe: true };
      }

      const moderation = JSON.parse(jsonMatch[0]);
      return moderation;
    } catch (error) {
      console.error('Moderation error:', error);
      // Fail open: if moderation fails, assume content is safe
      return { isSafe: true };
    }
  }
}

export const geminiClient = new GeminiClient();
