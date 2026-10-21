import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authStore } from '@/store'

interface ProtectedRouteProps {
  children: ReactNode
  requireOnboarding?: boolean
}

export default function ProtectedRoute({ children, requireOnboarding = true }: ProtectedRouteProps) {
  const { session, profile } = authStore()
  const location = useLocation()

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  if (requireOnboarding && profile && !profile.onboardingComplete) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />
  }

  return <>{children}</>
}
