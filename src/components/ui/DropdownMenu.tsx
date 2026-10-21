import { cn } from '@/lib/utils'
import { HTMLAttributes, useRef, useState } from 'react'

interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: React.ReactNode
  items: Array<{ label: string; onClick: () => void; icon?: React.ReactNode }>
}

export default function DropdownMenu({ trigger, items, className, ...props }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative" {...props}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div
            ref={menuRef}
            className={cn(
              'absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-cloud-grey-200 py-1 z-20 dark:bg-slate-glass dark:border-white/10',
              className
            )}
          >
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick()
                  setIsOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-cobalt-900 hover:bg-cloud-grey-100 flex items-center gap-2 dark:text-text-primary-dark dark:hover:bg-white/10"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
