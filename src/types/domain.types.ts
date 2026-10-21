export interface User {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  role: 'student' | 'teacher' | 'parent' | 'admin'
  tier: 'free' | 'pro' | 'school'
  grade?: string
  country?: string
  dob?: string
  isMinor?: boolean
  parentEmail?: string
  onboardingComplete: boolean
  xpTotal: number
  streakCount: number
  lastStreakDate?: string
  vaultBalance: number
}

export interface SkillNode {
  id: string
  subject: string
  title: string
  description?: string
  parentId?: string
  orderIndex: number
  xpReward: number
  completed?: boolean
  children?: SkillNode[]
}

export interface QuizAttempt {
  id: string
  userId: string
  skillNodeId?: string
  score: number
  totalQuestions: number
  completedAt: string
}

export interface KnowledgeGap {
  id: string
  userId: string
  subject: string
  topic: string
  gapSeverity: 'minor' | 'moderate' | 'severe'
  createdAt: string
  resolvedAt?: string
}

export interface JournalEntry {
  id: string
  userId: string
  title: string
  content: string
  mood?: 'great' | 'good' | 'neutral' | 'challenged' | 'struggling'
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface PortfolioItem {
  id: string
  userId: string
  title: string
  description?: string
  itemType: 'project' | 'certificate' | 'achievement' | 'reflection'
  metadata?: Record<string, unknown>
  createdAt: string
}

export interface PomodoroSession {
  id: string
  userId: string
  subject?: string
  durationSeconds: number
  completed: boolean
  startedAt: string
  completedAt?: string
}

export interface Guild {
  id: string
  name: string
  description?: string
  subject?: string
  createdBy?: string
  memberCount: number
  createdAt: string
  isMember?: boolean
  memberRole?: 'member' | 'moderator' | 'leader'
}

export interface GuildMessage {
  id: string
  guildId: string
  userId: string
  userName?: string
  userAvatar?: string
  content: string
  createdAt: string
}

export interface Badge {
  id: string
  name: string
  description?: string
  icon?: string
  requirement?: string
  xpReward: number
  earnedAt?: string
}

export interface FlashcardDeck {
  id: string
  userId: string
  title: string
  description?: string
  subject?: string
  isPublic: boolean
  cardCount?: number
  createdAt: string
  updatedAt: string
}

export interface FlashcardItem {
  id: string
  deckId: string
  front: string
  back: string
  orderIndex: number
  createdAt: string
}

export interface CodeSnippet {
  id: string
  userId: string
  title: string
  language: string
  code: string
  description?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface VaultItem {
  id: string
  name: string
  description?: string
  itemType: 'avatar' | 'theme' | 'badge_frame' | 'title'
  cost: number
  icon?: string
  isAvailable: boolean
  isOwned?: boolean
  isEquipped?: boolean
}

export interface Organization {
  id: string
  name: string
  domain?: string
  tier: 'school' | 'district' | 'enterprise'
  maxStudents?: number
  createdAt: string
}

export interface Classroom {
  id: string
  organizationId?: string
  teacherId?: string
  name: string
  subject?: string
  grade?: string
  createdAt: string
  studentCount?: number
}

export interface Assignment {
  id: string
  teacherId: string
  classroomId: string
  title: string
  type: 'quiz' | 'flashcard_deck'
  refId?: string
  dueDate: string
  createdAt: string
  completed?: boolean
}

export interface Notification {
  id: string
  userId: string
  type: 'streak_reminder' | 'badge_unlock' | 'guild_activity' | 'ai_review_ready' | 'assignment_due'
  title: string
  body: string
  read: boolean
  createdAt: string
}

export interface LeaderboardEntry {
  id: string
  displayAlias: string
  xpTotal: number
  level: number
  streakCount: number
  isCurrentUser?: boolean
  rank?: number
}

export interface OnboardingData {
  currentStep: number
  dob?: string
  age?: number
  isMinor?: boolean
  parentEmail?: string
  country?: string
  vpnCheckPassed?: boolean
  grade?: string
  subjects?: string[]
  testScores?: Array<{ testName: string; score: number; maxScore: number; testDate: string }>
  goals?: string[]
  pace?: 'relaxed' | 'moderate' | 'intensive'
  avatarConfig?: {
    baseColor: string
    accentColor: string
    style: string
  }
  selectedTier?: 'free' | 'pro' | 'school'
}

export interface Theme {
  mode: 'light' | 'dark' | 'system'
}

export interface AccessibilitySettings {
  dyslexicFont: boolean
  highContrast: boolean
  reduceMotion: boolean
  ttsSpeed: number
  largerClickTargets: boolean
  alwaysShowFocus: boolean
}
