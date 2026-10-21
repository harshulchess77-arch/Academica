import { cn } from '@/lib/utils'
import { onboardingStore } from '@/store'
import { GOALS, PACES } from '@/lib/constants'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'

export default function CustomizationStep() {
  const { goals, pace, updateField, setStep } = onboardingStore()

  const handleGoalToggle = (goal: string) => {
    const currentGoals = goals || []
    if (currentGoals.includes(goal)) {
      updateField('goals', currentGoals.filter((g) => g !== goal))
    } else {
      updateField('goals', [...currentGoals, goal])
    }
  }

  const handleNext = () => {
    if (!goals || goals.length === 0 || !pace) return
    setStep(7)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
        Set Your Goals
      </h2>
      <p className="text-cloud-grey-600 mb-6 dark:text-text-secondary-dark">
        What do you want to achieve? How fast do you want to learn?
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-cobalt-900 mb-3 dark:text-text-primary-dark">
            Your Goals (select at least one)
          </label>
          <div className="space-y-2">
            {GOALS.map((goal) => (
              <Checkbox
                key={goal}
                label={goal}
                id={`goal-${goal}`}
                checked={goals?.includes(goal)}
                onChange={() => handleGoalToggle(goal)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-cobalt-900 mb-3 dark:text-text-primary-dark">
            Learning Pace
          </label>
          <div className="space-y-2">
            {PACES.map((p) => (
              <button
                key={p.id}
                onClick={() => updateField('pace', p.id)}
                className={cn(
                  'w-full p-4 rounded-lg border-2 text-left transition-all',
                  pace === p.id
                    ? 'border-cobalt-600 bg-cobalt-50 dark:border-cobalt-400 dark:bg-cobalt-900/20'
                    : 'border-cloud-grey-200 hover:border-cloud-grey-300 dark:border-white/10 dark:hover:border-white/20'
                )}
              >
                <div className="font-medium text-cobalt-900 dark:text-text-primary-dark">{p.name}</div>
                <div className="text-sm text-cloud-grey-600 dark:text-text-secondary-dark">{p.description}</div>
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleNext} disabled={!goals || goals.length === 0 || !pace} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  )
}
