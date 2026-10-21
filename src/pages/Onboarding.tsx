import { onboardingStore } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StepIndicator from '@/components/onboarding/StepIndicator'
import DOBStep from '@/components/onboarding/DOBStep'
import RegionStep from '@/components/onboarding/RegionStep'
import GradeSubjectsStep from '@/components/onboarding/GradeSubjectsStep'
import TestScoresStep from '@/components/onboarding/TestScoresStep'
import CustomizationStep from '@/components/onboarding/CustomizationStep'
import AvatarBuilderStep from '@/components/onboarding/AvatarBuilderStep'
import PlanSelectionStep from '@/components/onboarding/PlanSelectionStep'
import MockCheckout from '@/components/onboarding/MockCheckout'
import { supabase } from '@/lib/supabase'
import { authStore } from '@/store'

const TOTAL_STEPS = 10

export default function Onboarding() {
  const { currentStep, reset } = onboardingStore()
  const navigate = useNavigate()
  const { profile } = authStore()

  useEffect(() => {
    if (profile?.onboardingComplete) {
      navigate('/dashboard')
    }
  }, [profile, navigate])

  const handleComplete = async () => {
    try {
      // Save onboarding data to profile
      const { dob, grade, subjects, goals, pace, avatarConfig, selectedTier } = onboardingStore.getState()

      await supabase
        .from('profiles')
        .update({
          dob,
          grade,
          onboarding_complete: true,
        })
        .eq('id', profile?.id)

      reset()
      navigate('/setup-complete')
    } catch (error) {
      console.error('Failed to complete onboarding:', error)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DOBStep />
      case 2:
        return <RegionStep />
      case 3:
        return <GradeSubjectsStep />
      case 4:
        return <TestScoresStep />
      case 5:
        return <CustomizationStep />
      case 6:
        return <AvatarBuilderStep />
      case 7:
        return <PlanSelectionStep />
      case 8:
        return <MockCheckout />
      case 9:
        return <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
          <Button onClick={handleComplete}>Go to Dashboard</Button>
        </div>
      default:
        return <DOBStep />
    }
  }

  return (
    <div className="min-h-screen bg-canvas dark:bg-cobalt-ink flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        {renderStep()}
      </div>
    </div>
  )
}
