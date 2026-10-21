import ErrorState from '@/components/ui/ErrorState'
import { useNavigate } from 'react-router-dom'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-canvas dark:bg-cobalt-ink flex items-center justify-center p-4">
      <ErrorState
        title="Something Went Wrong"
        message="An unexpected error occurred. We've been notified and are working to fix it."
        onRetry={() => window.location.reload()}
      />
    </div>
  )
}
