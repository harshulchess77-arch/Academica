import { useNavigate } from 'react-router-dom'
import EmptyState from '@/components/ui/EmptyState'
import { Home } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-canvas dark:bg-cobalt-ink flex items-center justify-center p-4">
      <EmptyState
        icon={Home}
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        actionLabel="Go Home"
        onAction={() => navigate('/')}
      />
    </div>
  )
}
