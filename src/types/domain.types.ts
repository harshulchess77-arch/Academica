// Domain type definitions for business logic
// These represent the application's domain models, not the database schema

export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';
export type SubscriptionTier = 'free' | 'pro' | 'premium';
export type Mood = 'excited' | 'calm' | 'confused' | 'frustrated' | 'proud';
export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type VaultItemType = 'cosmetic' | 'avatar_frame' | 'background' | 'effect';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type GapSeverity = 'minor' | 'moderate' | 'severe';
export type NotificationType = 
  | 'streak_reminder'
  | 'badge_unlock'
  | 'guild_activity'
  | 'ai_review_ready'
  | 'assignment_due'
  | 'weekly_digest'
  | 'parent_request_approved';
export type ComplianceEventType =
  | 'consent_granted'
  | 'consent_revoked'
  | 'data_export'
  | 'data_deletion'
  | 'parent_link_request'
  | 'parent_link_approved'
  | 'parent_link_revoked'
  | 'terms_accepted'
  | 'policy_acknowledged';
export type ComplianceStatus = 'pending' | 'approved' | 'revoked';
export type OrganizationType = 'school' | 'district' | 'company';
export type AssignmentType = 'quiz' | 'flashcard_deck';
export type ModerationAction = 'warning' | 'suspended' | 'deleted' | 'flagged';
export type ModerationTarget = 'user' | 'guild_message' | 'code_snippet' | 'flashcard_deck';

export interface Profile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string | null;
  grade: string | null;
  bio: string | null;
  role: UserRole;
  xpTotal: number;
  level: number;
  streakCount: number;
  lastActiveAt: string | null;
  onboardingComplete: boolean;
  dob: string | null;
  isMinor: boolean | null;
  parentEmail: string | null;
  country: string | null;
  vpnCheckPassed: boolean;
  selectedTier: SubscriptionTier | null;
  subscriptionId: string | null;
  dyslexicFontEnabled: boolean;
  highContrastEnabled: boolean;
  reduceMotionEnabled: boolean;
  ttsSpeed: number;
  largerClickTargets: boolean;
  alwaysShowFocus: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestScore {
  id: string;
  userId: string;
  subject: string;
  score: number;
  maxScore: number;
  testDate: string;
  createdAt: string;
}

export interface SkillNode {
  id: string;
  subject: string;
  branch: string;
  level: number;
  title: string;
  description: string | null;
  requiredXp: number;
  parentNodeId: string | null;
  positionX: number;
  positionY: number;
  createdAt: string;
}

export interface UserSkillProgress {
  id: string;
  userId: string;
  nodeId: string;
  unlocked: boolean;
  masteryLevel: number;
  unlockedAt: string | null;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  subject: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface KnowledgeGap {
  id: string;
  userId: string;
  subject: string;
  topic: string;
  gapSeverity: GapSeverity;
  detectedAt: string;
  resolvedAt: string | null;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  mood: Mood | null;
  tags: string[];
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioItem {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  itemType: 'certificate' | 'project' | 'reflection' | 'achievement';
  itemUrl: string | null;
  createdAt: string;
}

export interface PomodoroSession {
  id: string;
  userId: string;
  durationSeconds: number;
  completed: boolean;
  task: string | null;
  startedAt: string;
  completedAt: string | null;
}

export interface Guild {
  id: string;
  name: string;
  description: string | null;
  focusSubject: string | null;
  memberCount: number;
  createdBy: string | null;
  createdAt: string;
}

export interface GuildMember {
  id: string;
  guildId: string;
  userId: string;
  role: 'member' | 'moderator' | 'admin';
  joinedAt: string;
}

export interface GuildMessage {
  id: string;
  guildId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  tier: BadgeTier;
  requiredXp: number;
  createdAt: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  status: 'active' | 'cancelled' | 'expired';
  stripeSubscriptionId: string | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAt: string | null;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface FlashcardDeck {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  subject: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FlashcardItem {
  id: string;
  deckId: string;
  front: string;
  back: string;
  position: number;
  createdAt: string;
}

export interface CodeSnippet {
  id: string;
  userId: string;
  title: string;
  language: string;
  code: string;
  description: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VaultItem {
  id: string;
  name: string;
  description: string | null;
  itemType: VaultItemType;
  costXp: number;
  rarity: Rarity;
  imageUrl: string | null;
  createdAt: string;
}

export interface UserInventory {
  id: string;
  userId: string;
  itemId: string;
  equipped: boolean;
  purchasedAt: string;
}

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  adminId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Classroom {
  id: string;
  organizationId: string;
  name: string;
  gradeLevel: string | null;
  subject: string | null;
  teacherId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassroomMember {
  id: string;
  classroomId: string;
  studentId: string;
  joinedAt: string;
}

export interface ModerationAction {
  id: string;
  moderatorId: string;
  targetType: ModerationTarget;
  targetId: string;
  action: ModerationAction;
  reason: string | null;
  createdAt: string;
}

export interface ComplianceEvent {
  id: string;
  userId: string | null;
  eventType: ComplianceEventType;
  details: Record<string, unknown>;
  ipAddress: string | null;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface Assignment {
  id: string;
  teacherId: string;
  classroomId: string;
  title: string;
  type: AssignmentType;
  refId: string | null;
  dueDate: string | null;
  createdAt: string;
}

export interface AssignmentTarget {
  id: string;
  assignmentId: string;
  studentId: string;
  completed: boolean;
  completedAt: string | null;
}

export interface ParentStudentLink {
  id: string;
  parentId: string;
  studentId: string;
  status: ComplianceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface LeaderboardOptIn {
  id: string;
  userId: string;
  displayAlias: string;
  optedIn: boolean;
  createdAt: string;
}

export interface LeaderboardEntry {
  id: string;
  displayAlias: string;
  xpTotal: number;
  level: number;
  streakCount: number;
  rank: number;
}

export interface ErrorLog {
  id: string;
  userId: string | null;
  message: string;
  stack: string | null;
  route: string | null;
  createdAt: string;
}

export interface RateLimitCounter {
  id: string;
  userId: string;
  endpoint: string;
  requestCount: number;
  windowStart: string;
}

// Domain aggregates and computed types
export interface UserStats {
  totalXp: number;
  currentLevel: number;
  currentStreak: number;
  badgesEarned: number;
  journalCount: number;
  completedPomodoros: number;
  guildCount: number;
}

export interface SubjectProgress {
  subject: string;
  nodesUnlocked: number;
  totalNodes: number;
  averageMastery: number;
  currentLevel: number;
}

export interface LearningDNA {
  subjects: string[];
  goals: string[];
  pace: 'relaxed' | 'moderate' | 'intensive';
  testScores: TestScore[];
  gaps: KnowledgeGap[];
}

export interface OnboardingData {
  dob: string;
  age: number;
  isMinor: boolean;
  parentEmail: string | null;
  country: string;
  vpnCheckPassed: boolean;
  grade: string;
  subjects: string[];
  testScores: TestScore[];
  goals: string[];
  pace: 'relaxed' | 'moderate' | 'intensive';
  avatarConfig: {
    avatarUrl: string | null;
    frameId: string | null;
    backgroundId: string | null;
  };
  selectedTier: SubscriptionTier;
}

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface FlashcardReview {
  deckId: string;
  itemId: string;
  front: string;
  back: string;
  userResponse: 'correct' | 'incorrect' | 'skipped' | null;
  reviewedAt: Date | null;
}

export interface OfflineAction {
  id: string;
  type: 'journal_entry' | 'pomodoro_session' | 'quiz_attempt';
  data: Record<string, unknown>;
  timestamp: Date;
  synced: boolean;
}
