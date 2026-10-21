import { cn } from '@/lib/utils'
import { Sun, Moon, Monitor } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { uiStore } from '@/store'

interface ThemeToggleProps extends HTMLAttributes<HTMLButtonElement> {
  onOpen?: () => void
}

export default function ThemeToggle({ onOpen, className, ...props }: ThemeToggleProps) {
  const { theme } = uiStore()

  const icons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  }

  const Icon = icons[theme]

  return (
    <button
      onClick={onOpen}
      className={cn(
        'p-2 rounded-lg hover:bg-cloud-grey-100 transition-colors dark:hover:bg-white/10',
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5 text-cobalt-600 dark:text-text-secondary-dark" />
    </button>
  )
}
