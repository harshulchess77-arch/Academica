import { cn } from '@/lib/utils'
import { Globe } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { localeStore } from '@/store'

interface LanguageSwitcherProps extends HTMLAttributes<HTMLButtonElement> {
  onOpen?: () => void
}

export default function LanguageSwitcher({ onOpen, className, ...props }: LanguageSwitcherProps) {
  const { locale } = localeStore()

  const localeNames: Record<string, string> = {
    en: 'EN',
    es: 'ES',
    fr: 'FR',
  }

  return (
    <button
      onClick={onOpen}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-cloud-grey-100 transition-colors dark:hover:bg-white/10',
        className
      )}
      {...props}
    >
      <Globe className="w-4 h-4 text-cobalt-600 dark:text-text-secondary-dark" />
      <span className="text-sm font-medium text-cobalt-900 dark:text-text-primary-dark">
        {localeNames[locale] || locale.toUpperCase()}
      </span>
    </button>
  )
}
