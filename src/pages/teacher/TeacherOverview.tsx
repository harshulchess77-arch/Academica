import AdminShell from '@/components/layout/AdminShell'
import EmptyState from '@/components/ui/EmptyState'
import { GraduationCap } from 'lucide-react'

export default function TeacherOverview() {
  return (
    <AdminShell>
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark mb-6">Teacher Portal</h1>
        <EmptyState icon={GraduationCap} title="Teacher Dashboard" description="Manage your classrooms and assignments." />
      </div>
    </AdminShell>
  )
}
