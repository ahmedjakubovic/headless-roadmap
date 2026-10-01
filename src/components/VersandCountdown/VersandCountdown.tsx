import { useCountdown } from "../../hooks/useCountdown"

function VersandCountdown() {
  const { seconds } = useCountdown(15 * 60)

  return (
    <p>⚡ Noch {seconds} Sekunden für den Versand heute</p>
  )
}

export default VersandCountdown