import { useCountdown } from "../../hooks/useCountdown"

function SaleCountdown() {
  const { seconds, reset } = useCountdown(60)

  return (
    <section>
      <h2>🔥 Summer Sale</h2>
      <p>Noch verfügbar für: {seconds} Sekunden</p>
      <button onClick={reset}>Neu starten</button>
    </section>
  )
}

export default SaleCountdown    