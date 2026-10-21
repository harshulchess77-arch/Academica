import { ReactNode, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authStore } from '@/store'
import { supabase } from '@/lib/supabase'

interface AdminRouteProps {
  children: ReactNode
  allowedRoles?: Array<'admin' | 'teacher'>
}

export default function AdminRoute({ children, allowedRoles = ['admin', 'teacher'] }: AdminRouteProps) {
  const { session, profile } = authStore()
  const [isLoading, setIsLoading] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)
  const location = useLocation()

  useEffect(() => {
    async function checkRole() {
      if (!session) {
        setIsLoading(false)
        return
      }

      try {
        // Server-side role check via Supabase RLS
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (error || !data) {
          setHasAccess(false)
        } else {
          setHasAccess(allowedRoles.includes(data.role as 'admin' | 'teacher'))
        }
      } catch {
        setHasAccess(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkRole()
  }, [session, allowedRoles])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cobalt-600"></div>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
