import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  progress: number
  variant?: 'default' | 'gold' | 'teal'
}

export default function ProgressBar({ progress, variant = 'default', className, ...props }: ProgressBarProps) {
  const variants = {
    default: 'bg-cobalt-600 dark:bg-cobalt-500',
    gold: 'bg-gold-500',
    teal: 'bg-teal-500',
  }

  return (
    <div className={cn('w-full bg-cloud-grey-200 rounded-full overflow-hidden dark:bg-white/10', className)} {...props}>
      <div
        className={cn('h-2 rounded-full transition-all duration-500 ease-out', variants[variant])}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  )
}
