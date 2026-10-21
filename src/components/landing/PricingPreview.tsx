import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { TIERS } from '@/lib/constants'

interface PricingPreviewProps {
  className?: string
}

export default function PricingPreview({ className }: PricingPreviewProps) {
  return (
    <section className={cn('py-20 bg-canvas dark:bg-cobalt-ink', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-cobalt-900 mb-4 dark:text-text-primary-dark">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-cloud-grey-600 max-w-2xl mx-auto dark:text-text-secondary-dark">
            Start free, upgrade when you're ready. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'p-8 rounded-2xl border-2 transition-all',
                tier.id === 'pro'
                  ? 'border-cobalt-600 shadow-xl scale-105 dark:border-cobalt-400'
                  : 'border-cloud-grey-200 dark:border-white/10'
              )}
            >
              <h3 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
                {tier.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-cobalt-900 dark:text-text-primary-dark">
                  {tier.price === 0 ? 'Free' : `$${tier.price}`}
                </span>
                {tier.price > 0 && <span className="text-cloud-grey-600 dark:text-text-secondary-dark">/month</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-cobalt-900 dark:text-text-primary-dark">
                    <Check className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={tier.id === 'pro' ? 'primary' : 'ghost'}
                className="w-full"
                onClick={() => {}}
              >
                {tier.id === 'free' ? 'Get Started' : 'Upgrade to Pro'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
