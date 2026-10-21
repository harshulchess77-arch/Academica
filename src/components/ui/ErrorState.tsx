import { cn } from '@/lib/utils'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { HTMLAttributes } from 'react'

interface ErrorStateProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this content.',
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)} {...props}>
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 dark:bg-red-900/30">
        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-medium text-cobalt-900 dark:text-text-primary-dark mb-2">{title}</h3>
      <p className="text-sm text-cloud-grey-600 dark:text-text-secondary-dark mb-4 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-cobalt-600 text-white rounded-lg hover:bg-cobalt-700 transition-colors dark:bg-cobalt-500 dark:hover:bg-cobalt-400"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  )
}
