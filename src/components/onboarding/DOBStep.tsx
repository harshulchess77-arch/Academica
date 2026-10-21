import { onboardingStore } from '@/store'
import { COUNTRIES } from '@/lib/constants'
import { calculateAge } from '@/lib/utils'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

export default function DOBStep() {
  const { dob, country, updateField, setStep } = onboardingStore()

  const handleNext = () => {
    if (!dob || !country) return

    const age = calculateAge(dob)
    const isMinor = age < 18

    updateField('age', age)
    updateField('isMinor', isMinor)

    setStep(2)
  }

  const countryOptions = COUNTRIES.map((c) => ({ value: c, label: c }))

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
        Tell us about yourself
      </h2>
      <p className="text-cloud-grey-600 mb-6 dark:text-text-secondary-dark">
        This helps us personalize your learning experience.
      </p>

      <div className="space-y-4">
        <Input
          type="date"
          label="Date of Birth"
          value={dob || ''}
          onChange={(e) => updateField('dob', e.target.value)}
          max={new Date().toISOString().split('T')[0]}
        />

        <Select
          label="Country"
          value={country || ''}
          onChange={(e) => updateField('country', e.target.value)}
          options={countryOptions}
        />

        {dob && (
          <p className="text-sm text-cloud-grey-600 dark:text-text-secondary-dark">
            Age: {calculateAge(dob)} years old
          </p>
        )}

        <Button onClick={handleNext} disabled={!dob || !country} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  )
}
