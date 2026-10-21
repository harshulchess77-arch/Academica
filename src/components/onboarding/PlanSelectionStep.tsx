import { cn } from '@/lib/utils'
import { onboardingStore } from '@/store'
import { TIERS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import { Check } from 'lucide-react'

export default function PlanSelectionStep() {
  const { selectedTier, updateField, setStep } = onboardingStore()

  const handleTierSelect = (tierId: string) => {
    updateField('selectedTier', tierId as 'free' | 'pro' | 'school')
  }

  const handleNext = () => {
    if (!selectedTier) {
      handleTierSelect('free')
    }
    if (selectedTier === 'free') {
      setStep(9) // Skip checkout
    } else {
      setStep(10) // Go to checkout
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
        Choose Your Plan
      </h2>
      <p className="text-cloud-grey-600 mb-6 dark:text-text-secondary-dark">
        Start free and upgrade anytime. No credit card required for free tier.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {TIERS.map((tier) => (
          <div
            key={tier.id}
            onClick={() => handleTierSelect(tier.id)}
            className={cn(
              'p-6 rounded-2xl border-2 cursor-pointer transition-all',
              selectedTier === tier.id
                ? 'border-cobalt-600 shadow-xl dark:border-cobalt-400'
                : 'border-cloud-grey-200 hover:border-cloud-grey-300 dark:border-white/10 dark:hover:border-white/20'
            )}
          >
            <h3 className="text-xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
              {tier.name}
            </h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-cobalt-900 dark:text-text-primary-dark">
                {tier.price === 0 ? 'Free' : `$${tier.price}`}
              </span>
              {tier.price > 0 && <span className="text-cloud-grey-600 dark:text-text-secondary-dark">/month</span>}
            </div>
            <ul className="space-y-2">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-cobalt-900 dark:text-text-primary-dark">
                  <Check className="w-4 h-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Button onClick={handleNext} disabled={!selectedTier} className="w-full">
        {selectedTier === 'free' ? 'Start Learning' : 'Continue to Checkout'}
      </Button>
    </div>
  )
}
