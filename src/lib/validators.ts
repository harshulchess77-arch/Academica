import { z } from 'zod';

// Email validation
export const emailSchema = z.string().email('Invalid email address');

// Password validation
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// DOB validation (must be at least 5 years old, no future dates)
export const dobSchema = z
  .string()
  .refine((dob) => {
    const date = new Date(dob);
    const now = new Date();
    const minAge = new Date(now.getFullYear() - 100, now.getMonth(), now.getDate());
    const maxAge = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
    return date >= minAge && date <= maxAge;
  }, 'Date of birth must be between 5 and 100 years ago');

// Grade validation
export const gradeSchema = z.enum(['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'college']);

// Subject validation
export const subjectSchema = z.enum([
  'math',
  'science',
  'english',
  'history',
  'art',
  'music',
  'computer-science',
  'physics',
  'chemistry',
  'biology',
  'geography',
]);

// Test score validation
export const testScoreSchema = z.object({
  subject: subjectSchema,
  score: z.number().min(0).max(100),
  maxScore: z.number().min(0).max(100),
  testDate: z.string(),
});

// Journal entry validation
export const journalEntrySchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1).max(10000),
  mood: z.enum(['excited', 'calm', 'confused', 'frustrated', 'proud']).nullable(),
  tags: z.array(z.string()).max(10),
  isPrivate: z.boolean(),
});

// Flashcard validation
export const flashcardSchema = z.object({
  front: z.string().min(1).max(500),
  back: z.string().min(1).max(1000),
});

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: emailSchema,
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
});

// Parent link validation
export const parentLinkSchema = z.object({
  studentEmail: emailSchema,
});

// Assignment validation
export const assignmentSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['quiz', 'flashcard_deck']),
  classroomId: z.string().uuid(),
  dueDate: z.string().nullable(),
});

// Code snippet validation
export const codeSnippetSchema = z.object({
  title: z.string().min(1).max(200),
  language: z.string().min(1).max(50),
  code: z.string().min(1).max(50000),
  description: z.string().max(1000).nullable(),
  isPublic: z.boolean(),
});

// Guild validation
export const guildSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(500).nullable(),
  focusSubject: subjectSchema.nullable(),
});

// Guild message validation
export const guildMessageSchema = z.object({
  content: z.string().min(1).max(1000),
});

// Helper to validate and return typed data
export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }
  return result.data;
};
