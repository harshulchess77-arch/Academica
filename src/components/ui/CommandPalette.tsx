import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'

interface CommandItem {
  id: string
  label: string
  icon?: React.ReactNode
  action: () => void
  category?: string
}

interface CommandPaletteProps extends HTMLAttributes<HTMLDivElement> {
  items: CommandItem[]
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ items, isOpen, onClose, className, ...props }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, filteredItems.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action()
        onClose()
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className={cn(
          'relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden dark:bg-slate-glass',
          className
        )}
        {...props}
      >
        <div className="flex items-center border-b border-cloud-grey-200 px-4 dark:border-white/10">
          <Search className="w-5 h-5 text-cloud-grey-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 py-4 bg-transparent text-cobalt-900 placeholder:text-cloud-grey-400 focus:outline-none dark:text-text-primary-dark dark:placeholder:text-text-secondary-dark"
          />
          <button onClick={onClose} className="p-2 hover:bg-cloud-grey-100 rounded-lg dark:hover:bg-white/10">
            <X className="w-5 h-5 text-cloud-grey-400" />
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="px-4 py-8 text-center text-cloud-grey-600 dark:text-text-secondary-dark">
              No results found
            </div>
          ) : (
            filteredItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action()
                  onClose()
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 hover:bg-cloud-grey-50 transition-colors dark:hover:bg-white/5',
                  index === selectedIndex && 'bg-cloud-grey-100 dark:bg-white/10'
                )}
              >
                {item.icon && <span className="text-cloud-grey-400">{item.icon}</span>}
                <span className="flex-1 text-left text-cobalt-900 dark:text-text-primary-dark">{item.label}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
