import { onboardingStore } from '@/store'
import { GRADES, SUBJECTS } from '@/lib/constants'
import Select from '@/components/ui/Select'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'

export default function GradeSubjectsStep() {
  const { grade, subjects, updateField, setStep } = onboardingStore()

  const handleSubjectToggle = (subject: string) => {
    const currentSubjects = subjects || []
    if (currentSubjects.includes(subject)) {
      updateField('subjects', currentSubjects.filter((s) => s !== subject))
    } else {
      updateField('subjects', [...currentSubjects, subject])
    }
  }

  const handleNext = () => {
    if (!grade || !subjects || subjects.length === 0) return
    setStep(5)
  }

  const gradeOptions = GRADES.map((g) => ({ value: g, label: g }))

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-cobalt-900 mb-2 dark:text-text-primary-dark">
        Your Academic Focus
      </h2>
      <p className="text-cloud-grey-600 mb-6 dark:text-text-secondary-dark">
        Select your grade level and subjects you want to study.
      </p>

      <div className="space-y-6">
        <Select
          label="Grade Level"
          value={grade || ''}
          onChange={(e) => updateField('grade', e.target.value)}
          options={gradeOptions}
        />

        <div>
          <label className="block text-sm font-medium text-cobalt-900 mb-3 dark:text-text-primary-dark">
            Subjects (select at least one)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {SUBJECTS.map((subject) => (
              <Checkbox
                key={subject}
                label={subject}
                id={`subject-${subject}`}
                checked={subjects?.includes(subject)}
                onChange={() => handleSubjectToggle(subject)}
              />
            ))}
          </div>
        </div>

        <Button onClick={handleNext} disabled={!grade || !subjects || subjects.length === 0} className="w-full">
          Continue
        </Button>
      </div>
    </div>
  )
}
