import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import { Lightbulb, BookOpen, Users, Trophy } from 'lucide-react'

interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  icon?: 'lightbulb' | 'book' | 'users' | 'trophy' | React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({
  icon = 'lightbulb',
  title,
  description,
  actionLabel,
  onAction,
  className,
  ...props
}: EmptyStateProps) {
  const icons = {
    lightbulb: Lightbulb,
    book: BookOpen,
    users: Users,
    trophy: Trophy,
  }

  const IconComponent = typeof icon === 'string' ? icons[icon] : null

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)} {...props}>
      <div className="w-16 h-16 rounded-full bg-cloud-grey-100 flex items-center justify-center mb-4 dark:bg-white/10">
        {typeof icon === 'string' ? (
          IconComponent && <IconComponent className="w-8 h-8 text-cloud-grey-400 dark:text-text-secondary-dark" />
        ) : (
          icon
        )}
      </div>
      <h3 className="text-lg font-medium text-cobalt-900 dark:text-text-primary-dark mb-2">{title}</h3>
      <p className="text-sm text-cloud-grey-600 dark:text-text-secondary-dark mb-4 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-cobalt-600 text-white rounded-lg hover:bg-cobalt-700 transition-colors dark:bg-cobalt-500 dark:hover:bg-cobalt-400"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
