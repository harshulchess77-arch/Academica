import AdminShell from '@/components/layout/AdminShell'
import EmptyState from '@/components/ui/EmptyState'
import { Shield } from 'lucide-react'

export default function AdminOverview() {
  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark mb-6">Admin Console</h1>
        <EmptyState icon={Shield} title="Admin Dashboard" description="Manage users, organizations, and compliance." />
      </div>
    </AdminShell>
  )
}
