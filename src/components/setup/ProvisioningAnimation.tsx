import { cn } from '@/lib/utils'

interface ProvisioningAnimationProps {
  className?: string
}

export default function ProvisioningAnimation({ className }: ProvisioningAnimationProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-cobalt-200 rounded-full dark:border-white/10" />
        <div className="absolute inset-0 border-4 border-cobalt-600 rounded-full border-t-transparent animate-spin dark:border-cobalt-400" />
        <div className="absolute inset-2 border-4 border-amethyst-200 rounded-full dark:border-white/10" />
        <div className="absolute inset-2 border-4 border-amethyst-600 rounded-full border-t-transparent animate-spin animation-delay-300 dark:border-amethyst-400" />
        <div className="absolute inset-4 border-4 border-teal-200 rounded-full dark:border-white/10" />
        <div className="absolute inset-4 border-4 border-teal-600 rounded-full border-t-transparent animate-spin animation-delay-600 dark:border-teal-400" />
      </div>
      <p className="mt-6 text-sm text-cloud-grey-600 dark:text-text-secondary-dark animate-pulse">
        Provisioning your learning environment...
      </p>
    </div>
  )
}
