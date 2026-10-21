import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { MessageSquare } from 'lucide-react'

export default function AICompanion() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">AI Companion</h1>
        <EmptyState icon={MessageSquare} title="AI Tutor" description="Get Socratic tutoring guidance from our AI companion." />
      </div>
    </DashboardShell>
  )
}
