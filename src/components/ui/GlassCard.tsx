import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  intensity?: 'light' | 'medium' | 'heavy'
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, intensity = 'medium', children, ...props }, ref) => {
    const intensities = {
      light: 'backdrop-blur-md',
      medium: 'backdrop-blur-xl',
      heavy: 'backdrop-blur-2xl',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white/60 backdrop-blur-xl border border-white/40 shadow-card rounded-xl dark:bg-slate-glass/60 dark:border-white/10 dark:shadow-card-dark',
          intensities[intensity],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

export default GlassCard
