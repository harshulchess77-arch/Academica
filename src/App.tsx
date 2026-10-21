import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/layout/ErrorBoundary'
import { authStore } from './store'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import SessionTimeoutModal from './components/layout/SessionTimeoutModal'
import OfflineBanner from './components/layout/OfflineBanner'

// Lazy load pages
const Landing = React.lazy(() => import('./pages/Landing'))
const Auth = React.lazy(() => import('./pages/Auth'))
const Onboarding = React.lazy(() => import('./pages/Onboarding'))
const SetupComplete = React.lazy(() => import('./pages/SetupComplete'))
const DashboardHome = React.lazy(() => import('./pages/dashboard/DashboardHome'))
const Analytics = React.lazy(() => import('./pages/dashboard/Analytics'))
const SkillTree = React.lazy(() => import('./pages/dashboard/SkillTree'))
const AICompanion = React.lazy(() => import('./pages/dashboard/AICompanion'))
const VoicePractice = React.lazy(() => import('./pages/dashboard/VoicePractice'))
const GapDiagnostics = React.lazy(() => import('./pages/dashboard/GapDiagnostics'))
const OfflineSync = React.lazy(() => import('./pages/dashboard/OfflineSync'))
const Accessibility = React.lazy(() => import('./pages/dashboard/Accessibility'))
const Journal = React.lazy(() => import('./pages/dashboard/Journal'))
const FocusTimer = React.lazy(() => import('./pages/dashboard/FocusTimer'))
const Guilds = React.lazy(() => import('./pages/dashboard/Guilds'))
const Flashcards = React.lazy(() => import('./pages/dashboard/Flashcards'))
const Playground = React.lazy(() => import('./pages/dashboard/Playground'))
const Vault = React.lazy(() => import('./pages/dashboard/Vault'))
const Leaderboard = React.lazy(() => import('./pages/dashboard/Leaderboard'))
const Notifications = React.lazy(() => import('./pages/dashboard/Notifications'))
const TeacherOverview = React.lazy(() => import('./pages/teacher/TeacherOverview'))
const ParentOverview = React.lazy(() => import('./pages/parent/ParentOverview'))
const AdminOverview = React.lazy(() => import('./pages/admin/AdminOverview'))
const PrivacyPolicy = React.lazy(() => import('./pages/legal/PrivacyPolicy'))
const TermsOfService = React.lazy(() => import('./pages/legal/TermsOfService'))
const DataRequest = React.lazy(() => import('./pages/legal/DataRequest'))
const ContactUs = React.lazy(() => import('./pages/legal/ContactUs'))
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))
const OfflinePage = React.lazy(() => import('./pages/OfflinePage'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  const { setSession, refreshProfile } = authStore()

  useEffect(() => {
    // Skip auth checks in demo mode
    if ((supabase as any).isDemoMode) {
      console.log('Running in demo mode - auth checks skipped')
      return
    }

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        refreshProfile()
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        refreshProfile()
      }
    })

    return () => subscription.unsubscribe()
  }, [setSession, refreshProfile])

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <OfflineBanner />
            <SessionTimeoutModal />
            <Toaster position="top-right" />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/legal/privacy" element={<PrivacyPolicy />} />
              <Route path="/legal/terms" element={<TermsOfService />} />
              <Route path="/legal/data-request" element={<DataRequest />} />
              <Route path="/legal/contact" element={<ContactUs />} />
              <Route path="/offline" element={<OfflinePage />} />

              {/* Protected routes */}
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/setup-complete" element={<SetupComplete />} />
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/skill-tree" element={<SkillTree />} />
              <Route path="/dashboard/ai-companion" element={<AICompanion />} />
              <Route path="/dashboard/voice-practice" element={<VoicePractice />} />
              <Route path="/dashboard/gap-diagnostics" element={<GapDiagnostics />} />
              <Route path="/dashboard/offline-sync" element={<OfflineSync />} />
              <Route path="/dashboard/accessibility" element={<Accessibility />} />
              <Route path="/dashboard/journal" element={<Journal />} />
              <Route path="/dashboard/focus-timer" element={<FocusTimer />} />
              <Route path="/dashboard/guilds" element={<Guilds />} />
              <Route path="/dashboard/flashcards" element={<Flashcards />} />
              <Route path="/dashboard/playground" element={<Playground />} />
              <Route path="/dashboard/vault" element={<Vault />} />
              <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
              <Route path="/dashboard/notifications" element={<Notifications />} />

              {/* Teacher routes */}
              <Route path="/teacher" element={<TeacherOverview />} />

              {/* Parent routes */}
              <Route path="/parent" element={<ParentOverview />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminOverview />} />

              {/* Error routes */}
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
