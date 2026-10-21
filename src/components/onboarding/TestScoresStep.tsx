import { onboardingStore } from '@/store'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { useState } from 'react'

export default function TestScoresStep() {
  const { testScores, updateField, setStep } = onboardingStore()
  const [localScores, setLocalScores] = useState(
    testScores || [{ testName: '', score: 0, maxScore: 100, testDate: '' }]
  )

  const handleAddScore = () => {
    setLocalScores([...localScores, { testName: '', score: 0, maxScore: 100, testDate: '' }])
  }

  const handleScoreChange = (index: number, field: string, value: string | number) => {
    const updated = [...localScores]
    updated[index] = { ...updated[index], [field]: value }
    setLocalScores(updated)
  }

  const handleRemoveScore = (index: number) => {
    if (localScores.length > 1) {
      setLocalScores(localScores.filter((_, i) => i !== index))
    }
  }

  const handleNext = () => {
    updateField('testScores', localScores)
    setStep(6)
  }

  const handleSkip = () => {
    updateField('testScores', [])
    setStep(6)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
        Test Scores (Optional)
      </h2>
      <p className="text-cloud-grey-600 mb-6 dark:text-text-secondary-dark">
        Add your recent test scores to help us personalize your learning path. You can skip this step.
      </p>

      <div className="space-y-4">
        {localScores.map((score, index) => (
          <div key={index} className="p-4 border border-cloud-grey-200 rounded-lg dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input
                label="Test Name"
                value={score.testName}
                onChange={(e) => handleScoreChange(index, 'testName', e.target.value)}
                placeholder="e.g., SAT Math"
              />
              <Input
                type="number"
                label="Score"
                value={score.score}
                onChange={(e) => handleScoreChange(index, 'score', parseInt(e.target.value) || 0)}
                min="0"
              />
              <Input
                type="number"
                label="Max Score"
                value={score.maxScore}
                onChange={(e) => handleScoreChange(index, 'maxScore', parseInt(e.target.value) || 100)}
                min="1"
              />
              <Input
                type="date"
                label="Test Date"
                value={score.testDate}
                onChange={(e) => handleScoreChange(index, 'testDate', e.target.value)}
              />
            </div>
            {localScores.length > 1 && (
              <button
                onClick={() => handleRemoveScore(index)}
                className="mt-2 text-sm text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <Button variant="ghost" onClick={handleAddScore} className="w-full">
          + Add Another Test Score
        </Button>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleSkip} className="flex-1">
            Skip
          </Button>
          <Button onClick={handleNext} className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
