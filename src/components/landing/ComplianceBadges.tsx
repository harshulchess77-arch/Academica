import { cn } from '@/lib/utils'
import { ShieldCheck, Lock, UserCheck } from 'lucide-react'

interface ComplianceBadgesProps {
  className?: string
}

export default function ComplianceBadges({ className }: ComplianceBadgesProps) {
  const badges = [
    {
      icon: ShieldCheck,
      title: 'COPPA Compliant',
      description: 'Children\'s Online Privacy Protection Act certified for users under 13.',
    },
    {
      icon: Lock,
      title: 'GDPR Ready',
      description: 'Full compliance with EU General Data Protection Regulation requirements.',
    },
    {
      icon: UserCheck,
      title: 'Privacy-First',
      description: 'Zero third-party tracking. Your data stays yours, always.',
    },
  ]

  return (
    <section className={cn('py-16 bg-cobalt-50 dark:bg-cobalt-900/20', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-cobalt-900 mb-4 dark:text-text-primary-dark">
            Built for Trust & Safety
          </h2>
          <p className="text-cloud-grey-600 dark:text-text-secondary-dark">
            Enterprise-grade compliance standards protecting every student.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md mb-4 dark:bg-slate-glass">
                <badge.icon className="w-8 h-8 text-cobalt-600 dark:text-cobalt-400" />
              </div>
              <h3 className="text-lg font-semibold text-cobalt-900 mb-2 dark:text-text-primary-dark">
                {badge.title}
              </h3>
              <p className="text-sm text-cloud-grey-600 dark:text-text-secondary-dark">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
