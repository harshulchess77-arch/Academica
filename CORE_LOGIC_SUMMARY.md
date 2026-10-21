# Academica - Core Business Logic Complete

## Overview
This document summarizes the complete core business logic implementation for Academica, excluding all UI/UX components.

## Architecture

### Database Layer (Supabase)
- **3 Migration Files:**
  - `0001_init.sql` - Core tables (profiles, skill_nodes, user_skill_progress, quiz_attempts, knowledge_gaps, journal_entries, portfolio_items, pomodoro_sessions, guilds, badges, subscriptions, flashcard_decks, code_snippets, vault_items, user_inventory)
  - `0002_admin_multitenant.sql` - Organizations, classrooms, classroom_members, moderation_actions, compliance_events
  - `0003_social_notifications.sql` - Notifications, assignments, assignment_targets, parent_student_links, leaderboard_opt_ins, error_logs, rate_limit_counters

- **Seed Data:**
  - 30 skill nodes across 4 subjects (math, science, english, computer-science)
  - 10 badges with different tiers
  - 12 vault items (cosmetics, backgrounds, effects)
  - 5 guilds
  - 2 sample organizations
  - 3 sample classrooms
  - 5 sample assignments

### Type System
- `database.types.ts` - Full TypeScript types matching Supabase schema
- `domain.types.ts` - Domain models and business logic types
- Central export in `index.ts`

### State Management (Zustand)
10 persisted stores:
1. `authStore` - Session, profile, loading state
2. `onboardingStore` - Onboarding progress and data
3. `uiStore` - UI preferences (theme, sidebar, walkthrough)
4. `timerStore` - Setup countdown and pomodoro timer
5. `accessibilityStore` - Accessibility preferences
6. `gamificationStore` - XP, streak, level, vault balance
7. `adminStore` - Admin context (org, classroom, filters)
8. `notificationStore` - Notifications state
9. `localeStore` - Language preference (en/es/fr)
10. Central export in `index.ts`

### Library Services

#### Core Services
- `supabase.ts` - Supabase client with realtime subscriptions
- `gemini.ts` - Gemini AI client with Socratic tutoring, flashcard generation, content moderation
- `apiClient.ts` - Centralized API client for all Supabase operations
- `authService.ts` - Authentication operations (sign up, sign in, sign out, password reset, role checks)

#### Business Logic Services
- `gapAnalysisService.ts` - Knowledge gap detection and recommendations
- `statsService.ts` - User statistics, progress tracking, peer comparison
- `teacherService.ts` - Classroom and assignment management
- `parentService.ts` - Parent portal functionality, consent management
- `adminService.ts` - Admin console, moderation, compliance audit
- `onboardingService.ts` - Onboarding completion and progress tracking
- `notificationService.ts` - Notification creation and management

#### Utility Services
- `validators.ts` - Zod schemas for all forms
- `analytics.ts` - Privacy-safe event tracking
- `errorReporting.ts` - Centralized error logging
- `pdfExport.ts` - Certificate, portfolio, and journal PDF generation
- `animations.ts` - Anime.js animation factories
- `utils.ts` - Utility functions (formatting, debounce, throttle, etc.)
- `constants.ts` - Application constants (subjects, grades, countries, tiers, etc.)
- `i18n.ts` - Internationalization (English, Spanish, French)
- `compliance.ts` - GDPR/COPPA compliance functions
- `offlineDb.ts` - IndexedDB wrapper for offline sync

### Custom Hooks (18 hooks)
1. `useAuth` - Authentication mutations
2. `useProfile` - Profile queries and updates
3. `useSkillTree` - Skill tree operations
4. `useQuizzes` - Quiz submission and history
5. `useJournal` - Journal CRUD operations
6. `useGuilds` - Guild membership and messaging
7. `useFlashcards` - Flashcard deck management
8. `usePomodoro` - Pomodoro session tracking
9. `useVault` - Vault item purchasing and equipping
10. `useBadges` - Badge earning and display
11. `useNotifications` - Notification management with realtime
12. `useLeaderboard` - Leaderboard opt-in and display
13. `useOfflineSync` - Offline queue management
14. `usePlayground` - Code snippet management
15. `useAdminConsole` - Moderation and compliance audit
16. `useCountdown` - Countdown timer logic
17. `useKeyboardShortcuts` - Global keyboard shortcuts
18. `useParentLink` - Parent-student linking

### Edge Functions (8 functions)
1. `gemini-tutor` - Socratic AI tutoring with rate limiting
2. `flashcard-generator` - AI-powered flashcard generation
3. `vpn-check` - VPN/proxy detection
4. `gdpr-export` - GDPR data export
5. `code-executor-proxy` - Mock code execution
6. `moderation-scan` - Content moderation
7. `send-notification-email` - Email notifications
8. `leaderboard-refresh` - Scheduled leaderboard refresh

## Key Features Implemented

### Security & Compliance
- Row Level Security (RLS) on all tables
- SECURITY DEFINER RPC functions for privileged operations
- Rate limiting for AI endpoints (30/hour) and code execution (50/hour)
- GDPR data export functionality
- COPPA age verification
- Parental consent tracking
- Terms acceptance logging
- Compliance audit trail

### Gamification
- XP system with level progression
- Streak tracking with increment logic
- Badge earning system
- Vault cosmetics store
- Leaderboard with opt-in privacy protection

### Learning Features
- Skill tree with unlock/mastery progression
- Quiz attempts and scoring
- Knowledge gap detection
- Flashcard decks with AI generation
- Journal with mood tracking
- Pomodoro focus timer

### Social Features
- Guilds with real-time messaging
- Leaderboard (privacy-safe, opt-in only)
- Parent-student linking with consent
- Teacher classroom management
- Assignment creation and tracking

### Offline Support
- IndexedDB-based sync queue
- Content caching
- Offline action tracking
- Reconnection sync

### Accessibility
- Dyslexic font toggle
- High contrast mode
- Reduced motion support
- TTS speed control
- Larger click targets
- Always show focus

### Internationalization
- English, Spanish, French support
- Language detection and persistence
- Full UI string coverage

## Data Flow

1. **Authentication Flow:**
   - User signs up → `authService.signUp()` → Creates profile → Updates store
   - User signs in → `authService.signIn()` → Gets profile → Updates store
   - Role checks via RPC functions for server-side verification

2. **Gamification Flow:**
   - User completes action → `apiClient.addXP()` (RPC) → Updates profile XP
   - Client store updates via React Query invalidation
   - Badge checks via `useBadges` hook

3. **AI Integration Flow:**
   - User requests tutoring → Edge function → Rate limit check → Gemini API → Socratic response
   - Flashcard generation → Edge function → Gemini API → Parsed JSON response

4. **Offline Sync Flow:**
   - User offline → Actions queued in IndexedDB via `offlineDb`
   - Reconnect → `useOfflineSync` flushes queue to Supabase
   - Conflict resolution via last-write-wins

5. **Compliance Flow:**
   - User action → `compliance.ts` logs event → `compliance_events` table
   - GDPR export → Edge function → Aggregates all user data
   - Parent consent → Logged in compliance events

## RPC Functions (Security DEFINER)
- `purchase_vault_item` - Safe XP deduction and inventory update
- `add_user_xp` - Safe XP addition with level up
- `increment_streak` - Safe streak increment with validation
- `check_rate_limit` - Rate limiting for edge functions
- `refresh_leaderboard` - Leaderboard recalculation
- `mark_notifications_read` - Bulk notification read
- `create_parent_link_request` - Parent link creation
- `approve_parent_link` - Parent link approval
- `log_compliance_event` - Compliance event logging
- `is_admin_user` - Admin role check
- `is_teacher_user` - Teacher role check
- `is_parent_user` - Parent role check

## Files Created Summary

### Database (4 files)
- supabase/migrations/0001_init.sql
- supabase/migrations/0002_admin_multitenant.sql
- supabase/migrations/0003_social_notifications.sql
- supabase/seed.sql

### Types (3 files)
- src/types/database.types.ts
- src/types/domain.types.ts
- src/types/index.ts

### Stores (10 files)
- src/store/authStore.ts
- src/store/onboardingStore.ts
- src/store/uiStore.ts
- src/store/timerStore.ts
- src/store/accessibilityStore.ts
- src/store/gamificationStore.ts
- src/store/adminStore.ts
- src/store/notificationStore.ts
- src/store/localeStore.ts
- src/store/index.ts

### Library Services (17 files)
- src/lib/supabase.ts
- src/lib/gemini.ts
- src/lib/apiClient.ts
- src/lib/authService.ts
- src/lib/gapAnalysis.ts
- src/lib/statsService.ts
- src/lib/teacherService.ts
- src/lib/parentService.ts
- src/lib/adminService.ts
- src/lib/onboardingService.ts
- src/lib/notificationService.ts
- src/lib/offlineDb.ts
- src/lib/compliance.ts
- src/lib/validators.ts
- src/lib/analytics.ts
- src/lib/errorReporting.ts
- src/lib/pdfExport.ts
- src/lib/animations.ts
- src/lib/utils.ts
- src/lib/constants.ts
- src/lib/i18n.ts
- src/lib/index.ts

### Hooks (18 files)
- src/hooks/useAuth.ts
- src/hooks/useProfile.ts
- src/hooks/useSkillTree.ts
- src/hooks/useQuizzes.ts
- src/hooks/useJournal.ts
- src/hooks/useGuilds.ts
- src/hooks/useFlashcards.ts
- src/hooks/usePomodoro.ts
- src/hooks/useVault.ts
- src/hooks/useBadges.ts
- src/hooks/useNotifications.ts
- src/hooks/useLeaderboard.ts
- src/hooks/useOfflineSync.ts
- src/hooks/usePlayground.ts
- src/hooks/useAdminConsole.ts
- src/hooks/useCountdown.ts
- src/hooks/useKeyboardShortcuts.ts
- src/hooks/useParentLink.ts
- src/hooks/index.ts

### Edge Functions (8 files)
- supabase/functions/gemini-tutor/index.ts
- supabase/functions/flashcard-generator/index.ts
- supabase/functions/vpn-check/index.ts
- supabase/functions/gdpr-export/index.ts
- supabase/functions/code-executor-proxy/index.ts
- supabase/functions/moderation-scan/index.ts
- supabase/functions/send-notification-email/index.ts
- supabase/functions/leaderboard-refresh/index.ts

**Total: 60+ files** covering all core business logic without any UI components.
