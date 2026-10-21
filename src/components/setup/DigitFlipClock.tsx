import { cn } from '@/lib/utils'

interface DigitFlipClockProps {
  seconds: number
  className?: string
}

export default function DigitFlipClock({ seconds, className }: DigitFlipClockProps) {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className={cn('flex items-center justify-center gap-4', className)}>
      <div className="flex items-center gap-2">
        <div className="text-6xl font-bold text-cobalt-900 dark:text-text-primary-dark w-16 text-center">
          {String(minutes).padStart(2, '0')}
        </div>
        <div className="text-4xl font-bold text-cobalt-600 dark:text-cobalt-400">:</div>
        <div className="text-6xl font-bold text-cobalt-900 dark:text-text-primary-dark w-16 text-center">
          {String(secs).padStart(2, '0')}
        </div>
      </div>
    </div>
  )
}
