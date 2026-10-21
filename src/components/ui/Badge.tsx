import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'gold' | 'teal' | 'amethyst'
}

export default function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-cobalt-100 text-cobalt-900 dark:bg-cobalt-900/30 dark:text-cobalt-300',
    gold: 'bg-gold-100 text-cobalt-900 dark:bg-gold-900/30 dark:text-gold-300',
    teal: 'bg-teal-100 text-cobalt-900 dark:bg-teal-900/30 dark:text-teal-300',
    amethyst: 'bg-amethyst-100 text-cobalt-900 dark:bg-amethyst-900/30 dark:text-amethyst-300',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
