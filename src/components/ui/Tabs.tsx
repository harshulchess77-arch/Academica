import { cn } from '@/lib/utils'
import { HTMLAttributes, useState } from 'react'

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Array<{ id: string; label: string }>
  defaultTab?: string
  onTabChange?: (tabId: string) => void
}

export default function Tabs({ tabs, defaultTab, onTabChange, className, ...props }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="flex border-b border-cloud-grey-200 dark:border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-cobalt-600 text-cobalt-900 dark:border-cobalt-400 dark:text-text-primary-dark'
                : 'border-transparent text-cloud-grey-600 hover:text-cobalt-900 dark:text-text-secondary-dark dark:hover:text-text-primary-dark'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
