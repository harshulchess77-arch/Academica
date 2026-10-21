import AdminShell from '@/components/layout/AdminShell'
import EmptyState from '@/components/ui/EmptyState'
import { Users } from 'lucide-react'

export default function ParentOverview() {
  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark mb-6">Parent Portal</h1>
        <EmptyState icon={Users} title="Parent Dashboard" description="Monitor your child's learning progress." />
      </div>
    </AdminShell>
  )
}
