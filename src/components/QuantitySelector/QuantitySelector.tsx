import { Minus, Plus } from "lucide-react"
import { Button } from "../ui/button"

type QuantitySelectorProps = {
  quantity: number
  onQuantityChange: (quantity: number) => void
}

function QuantitySelector({
  quantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-950 p-1" role="group" aria-label="Quantity">
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-zinc-400 hover:text-zinc-100"
        type="button"
        aria-label="Decrease quantity"
        disabled={quantity <= 1}
        onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      <span className="min-w-7 text-center text-sm font-semibold text-zinc-100" aria-live="polite">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-zinc-400 hover:text-zinc-100"
        type="button"
        aria-label="Increase quantity"
        onClick={() => onQuantityChange(Math.min(9, quantity + 1))}
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

export default QuantitySelector
