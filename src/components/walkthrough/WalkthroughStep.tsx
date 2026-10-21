import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface WalkthroughStepProps {
  title: string
  content: string
  stepNumber: number
  totalSteps: number
  onNext: () => void
  onSkip: () => void
  isLast: boolean
  className?: string
}

export default function WalkthroughStep({
  title,
  content,
  stepNumber,
  totalSteps,
  onNext,
  onSkip,
  isLast,
  className,
}: WalkthroughStepProps) {
  return (
    <div className={cn('bg-white rounded-xl shadow-2xl p-6 max-w-sm border border-cloud-grey-200 dark:bg-slate-glass dark:border-white/10', className)}>
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-cobalt-900 dark:text-text-primary-dark">{title}</h3>
        <button onClick={onSkip} className="p-1 hover:bg-cloud-grey-100 rounded dark:hover:bg-white/10">
          <X className="w-4 h-4 text-cloud-grey-400" />
        </button>
      </div>
      <p className="text-sm text-cloud-grey-600 mb-4 dark:text-text-secondary-dark">{content}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-cloud-grey-400">Step {stepNumber} of {totalSteps}</span>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-cobalt-600 text-white rounded-lg hover:bg-cobalt-700 text-sm dark:bg-cobalt-500 dark:hover:bg-cobalt-400"
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}
