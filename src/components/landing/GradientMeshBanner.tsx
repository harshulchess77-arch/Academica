import { cn } from '@/lib/utils'

interface GradientMeshBannerProps {
  className?: string
}

export default function GradientMeshBanner({ className }: GradientMeshBannerProps) {
  return (
    <div className={cn('relative h-32 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-cobalt-600 via-amethyst-600 to-teal-500 opacity-90" />
      <div className="absolute inset-0 bg-[url('/hero-particles.svg')] opacity-20" />
    </div>
  )
}
