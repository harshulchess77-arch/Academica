import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { timerStore } from '@/store'
import CountdownModal from '@/components/setup/CountdownModal'
import ProvisioningAnimation from '@/components/setup/ProvisioningAnimation'

export default function SetupComplete() {
  const navigate = useNavigate()
  const { startSetupCountdown } = timerStore()

  useEffect(() => {
    startSetupCountdown()
  }, [startSetupCountdown])

  const handleComplete = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-canvas dark:bg-cobalt-ink flex items-center justify-center p-4">
      <CountdownModal />
      <div className="text-center">
        <ProvisioningAnimation />
        <button
          onClick={handleComplete}
          className="mt-8 px-6 py-3 bg-cobalt-600 text-white rounded-lg hover:bg-cobalt-700 dark:bg-cobalt-500 dark:hover:bg-cobalt-400"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  )
}
