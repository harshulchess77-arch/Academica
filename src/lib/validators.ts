import { z } from 'zod'

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')

export const dobSchema = z
  .string()
  .min(1, 'Date of birth is required')
  .refine((val) => {
    const date = new Date(val)
    const now = new Date()
    const minAge = 5
    const maxAge = 100
    const age = now.getFullYear() - date.getFullYear()
    return age >= minAge && age <= maxAge
  }, 'Age must be between 5 and 100')

export const gradeSchema = z.enum([
  'K',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'College',
  'Other',
])

export const countrySchema = z.string().min(1, 'Country is required')

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
})

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  fullName: nameSchema,
})

export const onboardingStep1Schema = z.object({
  dob: dobSchema,
  country: countrySchema,
})

export const onboardingStep2Schema = z.object({
  grade: gradeSchema,
  subjects: z.array(z.string()).min(1, 'Select at least one subject'),
})

export const onboardingStep3Schema = z.object({
  testScores: z.array(
    z.object({
      testName: z.string().min(1, 'Test name is required'),
      score: z.number().min(0).max(100),
      maxScore: z.number().min(1),
      testDate: z.string().min(1, 'Test date is required'),
    })
  ).optional(),
})

export const onboardingStep4Schema = z.object({
  goals: z.array(z.string()).min(1, 'Select at least one goal'),
  pace: z.enum(['relaxed', 'moderate', 'intensive']),
})

export const journalEntrySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  mood: z.enum(['great', 'good', 'neutral', 'challenged', 'struggling']).optional(),
  tags: z.array(z.string()).optional(),
})

export const flashcardDeckSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(500).optional(),
  subject: z.string().optional(),
  isPublic: z.boolean().default(false),
})

export const flashcardItemSchema = z.object({
  front: z.string().min(1, 'Front is required').max(500),
  back: z.string().min(1, 'Back is required').max(1000),
})

export const codeSnippetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  language: z.string().min(1, 'Language is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().max(500).optional(),
  isPublic: z.boolean().default(false),
})

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
})

export const guildSchema = z.object({
  name: z.string().min(3, 'Guild name must be at least 3 characters').max(50),
  description: z.string().max(500).optional(),
  subject: z.string().optional(),
})

export const guildMessageSchema = z.object({
  content: z.string().min(1, 'Message is required').max(1000),
})

export const leaderboardOptInSchema = z.object({
  displayAlias: z
    .string()
    .min(3, 'Alias must be at least 3 characters')
    .max(20, 'Alias must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Only letters, numbers, hyphens, and underscores allowed'),
  optedIn: z.boolean(),
})

export type SignInInput = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type JournalEntryInput = z.infer<typeof journalEntrySchema>
export type FlashcardDeckInput = z.infer<typeof flashcardDeckSchema>
export type FlashcardItemInput = z.infer<typeof flashcardItemSchema>
export type CodeSnippetInput = z.infer<typeof codeSnippetSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type GuildInput = z.infer<typeof guildSchema>
export type GuildMessageInput = z.infer<typeof guildMessageSchema>
export type LeaderboardOptInInput = z.infer<typeof leaderboardOptInSchema>
