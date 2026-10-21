import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { HTMLAttributes, useEffect, useRef } from 'react'

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean
  onClose: () => void
  title?: string
}

export default function Modal({ isOpen, onClose, title, children, className, ...props }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={modalRef}
        className={cn(
          'relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto dark:bg-slate-glass',
          className
        )}
        {...props}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-cloud-grey-200 dark:border-white/10">
            <h2 className="text-xl font-bold text-cobalt-900 dark:text-text-primary-dark">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-cloud-grey-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-cobalt-600 dark:text-text-secondary-dark" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
