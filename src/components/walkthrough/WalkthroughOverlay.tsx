import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { uiStore } from '@/store'

interface WalkthroughStepConfig {
  target: string
  title: string
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

interface WalkthroughOverlayProps {
  steps: WalkthroughStepConfig[]
  onComplete: () => void
  className?: string
}

export default function WalkthroughOverlay({ steps, onComplete, className }: WalkthroughOverlayProps) {
  const { hasSeenWalkthrough, setHasSeenWalkthrough } = uiStore()
  const [currentStep, setCurrentStep] = useState(0)
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (hasSeenWalkthrough) {
      onComplete()
      return
    }

    const updateTargetPosition = () => {
      const targetElement = document.querySelector(steps[currentStep].target)
      if (targetElement) {
        setTargetRect(targetElement.getBoundingClientRect())
      }
    }

    updateTargetPosition()
    window.addEventListener('resize', updateTargetPosition)
    window.addEventListener('scroll', updateTargetPosition)

    return () => {
      window.removeEventListener('resize', updateTargetPosition)
      window.removeEventListener('scroll', updateTargetPosition)
    }
  }, [currentStep, steps, hasSeenWalkthrough, onComplete])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setHasSeenWalkthrough(true)
      onComplete()
    }
  }

  const handleSkip = () => {
    setHasSeenWalkthrough(true)
    onComplete()
  }

  if (hasSeenWalkthrough) return null

  const step = steps[currentStep]

  return (
    <div className={cn('fixed inset-0 z-50 pointer-events-none', className)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Spotlight */}
      {targetRect && (
        <div
          className="absolute border-4 border-cobalt-600 rounded-lg pointer-events-none transition-all duration-300 dark:border-cobalt-400"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        />
      )}

      {/* Tooltip */}
      {targetRect && (
        <div
          className={cn(
            'absolute bg-white rounded-xl shadow-2xl p-6 max-w-sm border border-cloud-grey-200 dark:bg-slate-glass dark:border-white/10 pointer-events-auto',
            step.position === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-4',
            step.position === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-4',
            !step.position && 'top-full left-1/2 -translate-x-1/2 mt-4'
          )}
          style={{
            top: step.position === 'top' ? targetRect.top : undefined,
            left: targetRect.left + targetRect.width / 2,
          }}
        >
          <button
            onClick={handleSkip}
            className="absolute top-2 right-2 p-1 hover:bg-cloud-grey-100 rounded dark:hover:bg-white/10"
          >
            <X className="w-4 h-4 text-cloud-grey-400" />
          </button>
          <h3 className="text-lg font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
            {step.title}
          </h3>
          <p className="text-sm text-cloud-grey-600 mb-4 dark:text-text-secondary-dark">
            {step.content}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-cloud-grey-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-cobalt-600 text-white rounded-lg hover:bg-cobalt-700 text-sm dark:bg-cobalt-500 dark:hover:bg-cobalt-400"
            >
              {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
