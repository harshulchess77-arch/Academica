import { onboardingStore } from '@/store'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function RegionStep() {
  const { isMinor, parentEmail, updateField, setStep } = onboardingStore()

  const handleNext = () => {
    if (isMinor && !parentEmail) return
    setStep(3)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
        Parental Consent
      </h2>
      <p className="text-cloud-grey-600 mb-6 dark:text-text-secondary-dark">
        {isMinor
          ? 'For users under 18, we require parental email for COPPA compliance.'
          : 'You can proceed to the next step.'}
      </p>

      <div className="space-y-4">
        {isMinor && (
          <Input
            type="email"
            label="Parent Email"
            value={parentEmail || ''}
            onChange={(e) => updateField('parentEmail', e.target.value)}
            placeholder="parent@example.com"
          />
        )}

        <Button onClick={handleNext} disabled={isMinor && !parentEmail} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  )
}
