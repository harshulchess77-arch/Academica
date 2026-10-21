import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { InputHTMLAttributes, forwardRef } from 'react'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`

    return (
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={cn(
              'peer appearance-none w-5 h-5 border-2 border-cloud-grey-300 rounded bg-white checked:bg-cobalt-600 checked:border-cobalt-600 focus:outline-none focus:ring-2 focus:ring-cobalt-500 focus:ring-offset-2 dark:bg-slate-glass dark:border-white/20 dark:checked:bg-cobalt-500 dark:checked:border-cobalt-500 dark:focus:ring-cobalt-400',
              className
            )}
            {...props}
          />
          <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100" />
        </div>
        {label && (
          <label htmlFor={checkboxId} className="text-sm text-cobalt-900 dark:text-text-primary-dark cursor-pointer">
            {label}
          </label>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
