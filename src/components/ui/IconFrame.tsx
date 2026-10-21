import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { HTMLAttributes } from 'react'

interface IconFrameProps extends HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon
  color?: 'cobalt' | 'amethyst' | 'teal' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

export default function IconFrame({ icon: Icon, color = 'cobalt', size = 'md', className, ...props }: IconFrameProps) {
  const colors = {
    cobalt: 'bg-cobalt-100 text-cobalt-900 dark:bg-cobalt-900/30 dark:text-cobalt-300',
    amethyst: 'bg-amethyst-100 text-amethyst-900 dark:bg-amethyst-900/30 dark:text-amethyst-300',
    teal: 'bg-teal-100 text-teal-900 dark:bg-teal-900/30 dark:text-teal-300',
    gold: 'bg-gold-100 text-cobalt-900 dark:bg-gold-900/30 dark:text-gold-300',
  }

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return (
    <div
      className={cn(
        'rounded-xl flex items-center justify-center',
        colors[color],
        sizes[size],
        className
      )}
      {...props}
    >
      <Icon className={iconSizes[size]} />
    </div>
  )
}
