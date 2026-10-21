import { cn } from '@/lib/utils'
import { HTMLAttributes, useState } from 'react'

interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function Tooltip({ content, position = 'top', children, className, ...props }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-3 py-1.5 text-sm text-white bg-cobalt-900 rounded-lg shadow-lg whitespace-nowrap dark:bg-cobalt-700',
            positions[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}
