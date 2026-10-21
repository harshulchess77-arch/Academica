import { cn } from '@/lib/utils'
import { onboardingStore } from '@/store'
import { AVATAR_COLORS } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function AvatarBuilderStep() {
  const { avatarConfig, updateField, setStep } = onboardingStore()

  const handleColorSelect = (color: string) => {
    updateField('avatarConfig', {
      baseColor: color,
      accentColor: color,
      style: 'default',
    })
  }

  const handleNext = () => {
    if (!avatarConfig?.baseColor) {
      // Set default if none selected
      updateField('avatarConfig', {
        baseColor: AVATAR_COLORS[0],
        accentColor: AVATAR_COLORS[0],
        style: 'default',
      })
    }
    setStep(8)
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
        Choose Your Avatar Color
      </h2>
      <p className="text-cloud-grey-600 mb-6 dark:text-text-secondary-dark">
        Pick a color that represents you. You can change this later.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {AVATAR_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={cn(
                'w-16 h-16 rounded-full border-4 transition-all',
                avatarConfig?.baseColor === color
                  ? 'border-cobalt-600 scale-110 dark:border-cobalt-400'
                  : 'border-transparent hover:border-cloud-grey-300'
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex justify-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold"
            style={{ backgroundColor: avatarConfig?.baseColor || AVATAR_COLORS[0] }}
          >
            {avatarConfig?.baseColor ? 'A' : '?'}
          </div>
        </div>

        <Button onClick={handleNext} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  )
}
