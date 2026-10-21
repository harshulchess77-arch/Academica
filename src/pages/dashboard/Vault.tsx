import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Trophy } from 'lucide-react'

export default function Vault() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Vault</h1>
        <EmptyState icon={Trophy} title="Cosmetics Vault" description="Spend your XP on customization items." />
      </div>
    </DashboardShell>
  )
}
