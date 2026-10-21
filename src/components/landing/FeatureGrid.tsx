import { cn } from '@/lib/utils'
import { BrainCircuit, TrendingUp, Shield, Users, Zap, Award } from 'lucide-react'
import IconFrame from '@/components/ui/IconFrame'

interface FeatureGridProps {
  className?: string
}

const features = [
  {
    icon: BrainCircuit,
    color: 'cobalt' as const,
    title: 'AI-Powered Learning',
    description: 'Socratic AI tutoring that guides without giving answers, fostering critical thinking.',
  },
  {
    icon: TrendingUp,
    color: 'teal' as const,
    title: 'Adaptive Skill Trees',
    description: 'Personalized learning paths that adapt to your progress and knowledge gaps.',
  },
  {
    icon: Shield,
    color: 'amethyst' as const,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption with strict COPPA/GDPR compliance for student safety.',
  },
  {
    icon: Users,
    color: 'gold' as const,
    title: 'Guild Communities',
    description: 'Collaborative learning spaces where students can study together and share knowledge.',
  },
  {
    icon: Zap,
    color: 'cobalt' as const,
    title: 'Gamified Progress',
    description: 'XP, streaks, badges, and leaderboards make learning engaging and rewarding.',
  },
  {
    icon: Award,
    color: 'teal' as const,
    title: 'Certificate Portfolio',
    description: 'Earn certificates and build a comprehensive portfolio of your achievements.',
  },
]

export default function FeatureGrid({ className }: FeatureGridProps) {
  return (
    <section className={cn('py-20 bg-white dark:bg-slate-glass', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-cobalt-900 mb-4 dark:text-text-primary-dark">
            Everything You Need to Excel
          </h2>
          <p className="text-lg text-cloud-grey-600 max-w-2xl mx-auto dark:text-text-secondary-dark">
            Comprehensive tools designed for modern education, combining cutting-edge AI with proven learning science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl border border-cloud-grey-200 hover:border-cobalt-300 hover:shadow-lg transition-all dark:border-white/10 dark:hover:border-cobalt-400"
            >
              <IconFrame icon={feature.icon} color={feature.color} size="lg" className="mb-4" />
              <h3 className="text-xl font-semibold text-cobalt-900 mb-2 dark:text-text-primary-dark">
                {feature.title}
              </h3>
              <p className="text-cloud-grey-600 dark:text-text-secondary-dark">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
