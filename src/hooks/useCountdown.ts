// src/hooks/useCountdown.ts
import { useEffect, useState } from "react"

export function useCountdown(startSeconds: number) {
  const [seconds, setSeconds] = useState(startSeconds)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((previousSeconds) =>
        previousSeconds <= 0 ? 0 : previousSeconds - 1,
      )
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  function reset() {
    setSeconds(startSeconds)
  }

  return { seconds, reset }
}