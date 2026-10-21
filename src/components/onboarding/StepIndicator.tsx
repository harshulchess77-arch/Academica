import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export default function StepIndicator({ currentStep, totalSteps, className }: StepIndicatorProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2 mb-8', className)}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
            index + 1 <= currentStep
              ? 'bg-cobalt-600 text-white dark:bg-cobalt-500'
              : 'bg-cloud-grey-200 text-cloud-grey-400 dark:bg-white/10 dark:text-text-secondary-dark'
          )}
        >
          {index + 1}
        </div>
      ))}
    </div>
  )
}
