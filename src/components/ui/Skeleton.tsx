import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular'
}

export default function Skeleton({ variant = 'rectangular', className, ...props }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-cloud-grey-200 dark:bg-white/10',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
