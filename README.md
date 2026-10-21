# Academica — The Intelligent Design & Educational Hub

> Founded by Harshul Gupta (Grade 11) • AI-Powered Gamified Learning Ecosystem

Academica is a world-class, globally compliant, AI-powered gamified learning ecosystem for K-12 and advanced students worldwide. Built with enterprise-grade security, strict COPPA/GDPR compliance, edge performance, and a Liquid Glass UI material system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase and Gemini API keys

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
npm run test:e2e
```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + Vite 7 + TypeScript 5.8
- **Styling**: Tailwind CSS 3.4.x with custom theme tokens
- **State Management**: Zustand 5.0 with persist middleware
- **Database**: Supabase (PostgreSQL + RLS + Auth + Edge Functions)
- **AI**: Google Gemini API (@google/generative-ai)
- **Animations**: Anime.js v4 + Framer Motion 11
- **3D**: Three.js + @react-three/fiber + @react-three/drei
- **Forms**: react-hook-form + zod
- **Data Fetching**: TanStack Query v5
- **Internationalization**: react-i18next
- **PDF Export**: jspdf + html2canvas
- **Testing**: Vitest + React Testing Library + Playwright

### Project Structure
```
academica/
├── src/
│   ├── main.tsx, App.tsx, index.css
│   ├── assets/ (logo, hero particles)
│   ├── locales/ (en, es, fr)
│   ├── lib/ (utilities, supabase, gemini, animations)
│   ├── store/ (Zustand stores)
│   ├── hooks/ (custom React hooks)
│   ├── components/
│   │   ├── ui/ (reusable UI primitives)
│   │   ├── layout/ (Navbar, Footer, DashboardShell, etc.)
│   │   ├── landing/ (Hero, Features, Testimonials, etc.)
│   │   ├── onboarding/ (multi-step onboarding flow)
│   │   ├── setup/ (countdown, provisioning)
│   │   ├── walkthrough/ (interactive walkthrough)
│   │   └── dashboard/ (14 hub modules)
│   ├── pages/ (route components)
│   └── types/ (TypeScript definitions)
├── supabase/
│   ├── migrations/ (SQL schema)
│   ├── functions/ (Edge Functions)
│   └── seed.sql
├── public/ (PWA assets, robots.txt, sitemap.xml)
└── tests/ (unit, integration, e2e)
```

## 🎨 Design System

### Color Tokens
- **Deep Cobalt**: `#1A237E` — primary, navigation, headings
- **Royal Amethyst**: `#6200EA` — secondary, hover states
- **Academic Gold**: `#FFC107` — gamification only (streaks, badges, rewards)
- **Tech Teal**: `#00BFA5` — success, completion, verified states
- **Cloud Grey**: `#F0F0F0` — secondary surfaces
- **Background Canvas**: `#F8FAFC` — page background
- **Pure White**: `#FFFFFF` — elevated surfaces

### Dark Mode
- **Background**: `#0B0F2E` (cobalt-ink)
- **Surfaces**: `#161B3D` (slate-glass)
- **Primary Text**: `#E8EAF6`
- **Secondary Text**: `#9FA8DA`

### Typography
- **Headings**: Plus Jakarta Sans (bold/extrabold, uppercase, tight tracking)
- **Body**: Inter (regular/medium, sentence case, generous line-height)

### Liquid Glass UI
- `.glass-panel`: translucent white with backdrop blur
- `.glass-panel-dark`: cobalt-toned variant for dark mode
- **Backdrop-filter budget**: Never nest more than 2 blur layers per view

## 🔐 Security & Compliance

### COPPA/GDPR Compliance
- Strict safeguards for learners under 13
- Parental consent workflows for minors
- Right-to-be-forgotten and data portability
- Zero third-party tracking cookies
- COPPA/GDPR-compliant legal pages

### Row Level Security (RLS)
- All tables have owner-only RLS policies
- Privileged mutations (XP, role, streak) go through SECURITY DEFINER RPCs
- Server-side role checks for admin/teacher/parent routes
- Parent portal exposes progress metrics only (no private journal/AI content)

### Leaderboard Privacy
- Opt-in only (default OFF, especially for minors)
- Shows only display alias + XP + level (never real names/emails)
- Accessed via `leaderboard_public_view` (anonymized view)

## 🎯 Key Features

### Core Learning Features
- **Adaptive Skill Tree**: Non-linear knowledge mapping with prerequisite tracing
- **Socratic AI Companion**: Guides without giving answers, with safety guardrails
- **Voice Practice**: Pronunciation and verbal skills training
- **Gap Diagnostics**: Identifies and addresses learning gaps
- **Flashcards**: AI-generated decks with spaced repetition
- **Code Playground**: Interactive code editor (simulated execution)
- **Focus Timer**: Pomodoro-style study sessions
- **Journal**: Private learning reflections
- **Guilds**: Safe, moderated peer study communities
- **Vault**: Gamified cosmetics store with XP
- **Leaderboard**: Privacy-safe global rankings

### Portal Features
- **Student Dashboard**: Complete learning hub
- **Teacher Portal**: Classroom management, assignments, gradebook
- **Parent Portal**: Progress monitoring (metrics only, no private content)
- **Admin Console**: User management, moderation, compliance audit

### Technical Features
- **PWA**: Offline sync, installable on iOS/Android/Desktop
- **Accessibility**: WCAG 2.2 AAA target, dyslexic font, high contrast
- **i18n**: English + scaffolded Spanish/French
- **Keyboard Shortcuts**: Cmd/Ctrl+K (palette), Cmd/Ctrl+/ (AI), Cmd/Ctrl+J (journal), Esc (close)
- **Real-time Notifications**: Supabase Realtime subscriptions

## 📦 Edge Functions

### Available Functions
- `gemini-tutor`: Socratic AI tutoring with rate limiting (30 req/hour)
- `vpn-check`: VPN/proxy detection
- `gdpr-export`: Complete user data export
- `flashcard-generator`: AI-powered flashcard creation
- `code-executor-proxy`: Mock code execution (simulated as specified)
- `moderation-scan`: Content safety filtering
- `send-notification-email`: Transactional email with rate limiting
- `leaderboard-refresh`: Scheduled leaderboard recalculation

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests with Playwright
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📝 Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_APP_ENV=development
VITE_ENABLE_DEV_UNLOCK=true
VITE_ADMIN_ENABLED=true
VITE_DEFAULT_LOCALE=en
```

## 🌐 Deployment

### Deploy Edge Functions
```bash
# Using Supabase CLI
supabase functions deploy gemini-tutor
supabase functions deploy vpn-check
# ... deploy all functions
```

### Deploy PWA
```bash
npm run build
# Upload public/ directory to your hosting provider
```

## 📄 License

Copyright © 2026 Academica. All rights reserved. Founded by Harshul Gupta.

---

**Built with ❤️ for students who want to truly understand, not just memorize.**
