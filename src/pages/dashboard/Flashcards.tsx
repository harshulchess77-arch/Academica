import DashboardShell from '@/components/layout/DashboardShell'
import EmptyState from '@/components/ui/EmptyState'
import { Layers } from 'lucide-react'

export default function Flashcards() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-cobalt-900 dark:text-text-primary-dark">Flashcards</h1>
        <EmptyState icon={Layers} title="Flashcard Decks" description="Create and study with flashcards." />
      </div>
    </DashboardShell>
  )
}
