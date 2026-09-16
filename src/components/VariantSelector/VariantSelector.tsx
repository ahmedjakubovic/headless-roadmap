import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

type VariantSelectorProps = {
  variants: string[]
  selectedVariant: string
  onVariantChange: (variant: string) => void
}

function VariantSelector({
  variants,
  selectedVariant,
  onVariantChange,
}: VariantSelectorProps) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Finish</p>
        <Badge variant="outline">{selectedVariant}</Badge>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose finish">
        {variants.map((variant) => (
          <Button
            className="min-w-0 flex-1"
            key={variant}
            type="button"
            size="sm"
            variant={variant === selectedVariant ? "default" : "outline"}
            aria-pressed={variant === selectedVariant}
            onClick={() => onVariantChange(variant)}
          >
            {variant}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default VariantSelector
