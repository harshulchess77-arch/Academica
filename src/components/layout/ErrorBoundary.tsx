import { Component, ReactNode } from 'react'
import ErrorState from '@/components/ui/ErrorState'
import { logError } from '@/lib/errorReporting'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, { route: window.location.pathname })
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-canvas dark:bg-cobalt-ink flex items-center justify-center p-4">
          <ErrorState
            title="Something went wrong"
            message="An unexpected error occurred. We've been notified and are working to fix it."
            onRetry={() => window.location.reload()}
          />
        </div>
      )
    }

    return this.props.children
  }
}
