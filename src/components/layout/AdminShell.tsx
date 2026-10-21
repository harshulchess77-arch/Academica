import { ReactNode } from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

interface AdminShellProps {
  children?: ReactNode
}

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-canvas dark:bg-cobalt-ink">
      <Navbar />
      <main className="pt-16">
        {children || <Outlet />}
      </main>
    </div>
  )
}
