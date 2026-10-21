// Central exports for all library services
export { supabase, subscribeToChanges, handleSupabaseError } from './supabase';
export { geminiClient, GeminiClient } from './gemini';
export { apiClient } from './apiClient';
export { authService } from './authService';
export { gapAnalysisService } from './gapAnalysis';
export { statsService } from './statsService';
export { teacherService } from './teacherService';
export { parentService } from './parentService';
export { adminService } from './adminService';
export { onboardingService } from './onboardingService';
export { notificationService } from './notificationService';
export { offlineDB } from './offlineDb';
export {
  logComplianceEvent,
  exportUserData,
  requestAccountDeletion,
  moderateContent,
  checkVPN,
  verifyAge,
  logParentalConsent,
  logTermsAcceptance,
} from './compliance';
export {
  createEmblemEntrance,
  createSkillNodeUnlock,
  createDigitFlip,
  createSpotlightMove,
  createCelebrationBurst,
  createProgressFill,
  createStaggeredReveal,
  createXPCounter,
  createLevelUpFlash,
} from './animations';
export {
  validate,
  emailSchema,
  passwordSchema,
  dobSchema,
  gradeSchema,
  subjectSchema,
  testScoreSchema,
  journalEntrySchema,
  flashcardSchema,
  contactFormSchema,
  parentLinkSchema,
  assignmentSchema,
  codeSnippetSchema,
  guildSchema,
  guildMessageSchema,
} from './validators';
export {
  logEvent,
  trackPageView,
  trackFeatureUse,
  trackError,
  trackCompletion,
  trackEngagement,
} from './analytics';
export { logError, captureError, logPerformanceIssue } from './errorReporting';
export {
  generateCertificatePDF,
  generatePortfolioPDF,
  exportJournalAsPDF,
} from './pdfExport';
export {
  cn,
  formatDate,
  formatRelativeTime,
  formatDuration,
  formatXP,
  getLevelFromXP,
  getXPForLevel,
  getXPProgress,
  debounce,
  throttle,
  generateId,
  truncate,
  capitalize,
  sleep,
  copyToClipboard,
  downloadFile,
} from './utils';
export {
  SUBJECTS,
  GRADES,
  COUNTRIES,
  TIERS,
  ICON_MAP,
  VAULT_COSMETICS,
  LEARNING_PACES,
  GOALS,
  POMODORO_PRESETS,
  BADGE_TIERS,
  SESSION_TIMEOUT_MINUTES,
  SESSION_WARNING_SECONDS,
  AI_RATE_LIMIT_HOURLY,
  CODE_EXECUTION_RATE_LIMIT_HOURLY,
} from './constants';
export { default as i18n } from './i18n';
