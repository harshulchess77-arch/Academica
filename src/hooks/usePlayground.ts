import { useState } from 'react'

export function usePlayground() {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [isRunning, setIsRunning] = useState(false)
  const [output, setOutput] = useState('')

  const runCode = async () => {
    setIsRunning(true)
    try {
      // This is a mock Python/code execution as specified
      // In production, this would call an edge function
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOutput('// This is a simulated code execution result\n// Mock execution completed successfully')
    } catch (error) {
      setOutput('Error: ' + (error as Error).message)
    } finally {
      setIsRunning(false)
    }
  }

  return {
    code,
    setCode,
    language,
    setLanguage,
    output,
    isRunning,
    runCode,
  }
}
