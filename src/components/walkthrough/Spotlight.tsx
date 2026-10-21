import { cn } from '@/lib/utils'

interface SpotlightProps {
  rect: DOMRect
  className?: string
}

export default function Spotlight({ rect, className }: SpotlightProps) {
  return (
    <div
      className={cn(
        'fixed border-4 border-cobalt-600 rounded-lg pointer-events-none transition-all duration-300 dark:border-cobalt-400 z-50',
        className
      )}
      style={{
        top: rect.top - 8,
        left: rect.left - 8,
        width: rect.width + 16,
        height: rect.height + 16,
      }}
    />
  )
}
