import Modal from '@/components/ui/Modal'
import DigitFlipClock from './DigitFlipClock'
import { timerStore } from '@/store'
import { useEffect, useState } from 'react'

const SETUP_DURATION = 10 * 1000 // 10 seconds for demo (dev-unlocked)

export default function CountdownModal() {
  const { setupStartedAt, devUnlock } = timerStore()
  const [secondsLeft, setSecondsLeft] = useState(SETUP_DURATION / 1000)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!setupStartedAt) return

    // Dev unlock skips countdown
    if (setupStartedAt === 0) {
      setIsComplete(true)
      return
    }

    const elapsed = Date.now() - setupStartedAt
    const remaining = Math.max(0, SETUP_DURATION - elapsed)
    setSecondsLeft(Math.ceil(remaining / 1000))

    if (remaining <= 0) {
      setIsComplete(true)
    }

    const interval = setInterval(() => {
      const newElapsed = Date.now() - setupStartedAt
      const newRemaining = Math.max(0, SETUP_DURATION - newElapsed)
      setSecondsLeft(Math.ceil(newRemaining / 1000))

      if (newRemaining <= 0) {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [setupStartedAt])

  if (!setupStartedAt) return null

  return (
    <Modal isOpen={!isComplete} onClose={() => {}} title="Setting Up Your Account">
      <div className="text-center">
        <p className="text-cobalt-900 dark:text-text-primary-dark mb-6">
          We're personalizing your learning experience. This will only take a moment.
        </p>
        <DigitFlipClock seconds={secondsLeft} />
        {devUnlock && (
          <p className="text-sm text-cloud-grey-600 mt-4 dark:text-text-secondary-dark">
            Dev mode: countdown skipped
          </p>
        )}
      </div>
    </Modal>
  )
}
