import { cn } from '@/lib/utils'
import { onboardingStore } from '@/store'
import { TIERS } from '@/lib/constants'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { CreditCard, Lock } from 'lucide-react'
import { useState } from 'react'

export default function MockCheckout() {
  const { selectedTier, setStep } = onboardingStore()
  const [isProcessing, setIsProcessing] = useState(false)

  const selectedTierData = TIERS.find((t) => t.id === selectedTier)

  const handleComplete = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep(9) // Go to completion
    }, 2000)
  }

  const handleBack = () => {
    setStep(8)
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/20 dark:border-amber-800">
        <p className="text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
          <Lock className="w-4 h-4" />
          This is a simulated checkout. No real payment will be processed.
        </p>
      </div>

      <h2 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
        Complete Your Purchase
      </h2>
      <p className="text-cloud-grey-600 mb-6 dark:text-text-secondary-dark">
        Upgrade to {selectedTierData?.name} for ${selectedTierData?.price}/month
      </p>

      <div className="space-y-4">
        <div className="p-4 bg-cobalt-50 rounded-lg dark:bg-cobalt-900/20">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-cobalt-900 dark:text-text-primary-dark">
              {selectedTierData?.name} Plan
            </span>
            <span className="text-cobalt-900 dark:text-text-primary-dark">
              ${selectedTierData?.price}/month
            </span>
          </div>
          <div className="flex justify-between items-center text-sm text-cloud-grey-600 dark:text-text-secondary-dark">
            <span>Total due today</span>
            <span className="font-medium text-cobalt-900 dark:text-text-primary-dark">
              ${selectedTierData?.price}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-cobalt-900 dark:text-text-primary-dark">Payment Details</h3>
          <Input label="Card Number" placeholder="4242 4242 4242 4242" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Expiry Date" placeholder="MM/YY" />
            <Input label="CVC" placeholder="123" />
          </div>
          <Input label="Cardholder Name" placeholder="John Doe" />
        </div>

        <div className="flex items-center gap-2 text-sm text-cloud-grey-600 dark:text-text-secondary-dark">
          <CreditCard className="w-4 h-4" />
          <span>Your payment info is secure and encrypted</span>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleBack} className="flex-1">
            Back
          </Button>
          <Button onClick={handleComplete} isLoading={isProcessing} className="flex-1">
            Complete Purchase
          </Button>
        </div>
      </div>
    </div>
  )
}
