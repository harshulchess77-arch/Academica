import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'
import { HTMLAttributes } from 'react'

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  type?: 'success' | 'error' | 'warning' | 'info'
  onClose?: () => void
}

export default function Toast({ type = 'info', onClose, children, className, ...props }: ToastProps) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }

  const colors = {
    success: 'bg-teal-50 border-teal-200 text-teal-900 dark:bg-teal-900/30 dark:border-teal-800 dark:text-teal-300',
    error: 'bg-red-50 border-red-200 text-red-900 dark:bg-red-900/30 dark:border-red-800 dark:text-red-300',
    warning: 'bg-gold-50 border-gold-200 text-cobalt-900 dark:bg-gold-900/30 dark:border-gold-800 dark:text-gold-300',
    info: 'bg-cobalt-50 border-cobalt-200 text-cobalt-900 dark:bg-cobalt-900/30 dark:border-cobalt-800 dark:text-cobalt-300',
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg',
        colors[type],
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-sm">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
