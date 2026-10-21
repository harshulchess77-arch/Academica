import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { BookOpen } from 'lucide-react'

export default function DashboardHome() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">
          Welcome to Academica
        </h1>
        <EmptyState
          icon={BookOpen}
          title="Your Learning Dashboard"
          description="Start your learning journey by exploring the skill tree or using the AI companion."
          actionLabel="Explore Skill Tree"
          onAction={() => {}}
        />
      </div>
    </DashboardShell>
  )
}
