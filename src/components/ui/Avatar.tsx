import { cn } from '@/lib/utils'
import { User } from 'lucide-react'
import { HTMLAttributes } from 'react'
import { getInitials } from '@/lib/utils'

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Avatar({ src, alt, name, size = 'md', className, ...props }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name || 'Avatar'}
        className={cn('rounded-full object-cover', sizes[size], className)}
        {...props}
      />
    )
  }

  if (name) {
    return (
      <div
        className={cn(
          'rounded-full bg-cobalt-100 text-cobalt-900 flex items-center justify-center font-medium dark:bg-cobalt-900/30 dark:text-cobalt-300',
          sizes[size],
          className
        )}
        {...props}
      >
        {getInitials(name)}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-full bg-cloud-grey-200 text-cloud-grey-400 flex items-center justify-center dark:bg-white/10 dark:text-text-secondary-dark',
        sizes[size],
        className
      )}
      {...props}
    >
      <User className="w-1/2 h-1/2" />
    </div>
  )
}
