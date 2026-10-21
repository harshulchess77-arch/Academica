import { ReactNode } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { authStore } from '@/store'

interface DashboardShellProps {
  children?: ReactNode
}

export default function DashboardShell({ children }: DashboardShellProps) {
  const { profile } = authStore()

  return (
    <div className="min-h-screen bg-canvas dark:bg-cobalt-ink">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-16 md:ml-64 p-6 transition-all duration-300">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
