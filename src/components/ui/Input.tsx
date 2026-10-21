import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-cobalt-900 dark:text-text-primary-dark mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2 rounded-lg border border-cloud-grey-300 bg-white text-cobalt-900 placeholder:text-cloud-grey-400 focus:outline-none focus:ring-2 focus:ring-cobalt-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-glass dark:border-white/20 dark:text-text-primary-dark dark:placeholder:text-text-secondary-dark dark:focus:ring-cobalt-400',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
