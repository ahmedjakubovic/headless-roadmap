import { useState } from "react"
import { Heart, ShoppingBag, Star } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { cn } from "../../lib/utils"
import QuantitySelector from "../QuantitySelector/QuantitySelector"
import VariantSelector from "../VariantSelector/VariantSelector"

export type Product = {
  id: string
  title: string
  category: string
  price: number
  description: string
  variants: string[]
  rating: number
  reviews: number
  stock: number
  icon: LucideIcon
  accentClass: string
}

type ProductCardProps = {
  product: Product
  isWishlisted: boolean
  onAddToCart: (product: Product, quantity: number, variant: string) => void
  onWishlistToggle: () => void
}

function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onWishlistToggle,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0] ?? "")
  const [addedToCart, setAddedToCart] = useState(false)

  const ProductIcon = product.icon
  const formatPrice = new Intl.NumberFormat("de-CH", {
    style: "currency",
    currency: "CHF",
    maximumFractionDigits: 0,
  })

  return (
    <Card className="group flex h-full min-w-0 flex-col overflow-hidden border-zinc-800 bg-zinc-900/80 transition-colors hover:border-zinc-600">
      <div className={cn("relative flex aspect-[1.35] items-center justify-center overflow-hidden border-b border-zinc-800", product.accentClass)}>
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:28px_28px]" />
        <ProductIcon className="relative h-20 w-20 stroke-[1.2] transition-transform duration-500 group-hover:scale-110" />
        <Badge variant={product.stock <= 5 ? "warning" : "success"} className="absolute left-4 top-4">
          {product.stock <= 5 ? `${product.stock} left` : "In stock"}
        </Badge>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-4 bg-zinc-950/50 text-zinc-300 hover:bg-zinc-950 hover:text-rose-300"
              aria-label={isWishlisted ? `Remove ${product.title} from wishlist` : `Add ${product.title} to wishlist`}
              aria-pressed={isWishlisted}
              onClick={onWishlistToggle}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-rose-300 text-rose-300")} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{isWishlisted ? "Saved to wishlist" : "Save to wishlist"}</TooltipContent>
        </Tooltip>
      </div>

      <CardHeader className="gap-2 p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">{product.category}</p>
            <CardTitle>{product.title}</CardTitle>
          </div>
          <p className="shrink-0 text-lg font-bold text-zinc-50">{formatPrice.format(product.price)}</p>
        </div>
        <CardDescription className="leading-6">{product.description}</CardDescription>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          <span className="font-semibold text-zinc-200">{product.rating}</span>
          <span>({product.reviews} reviews)</span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-5 px-5 pb-5">
        <VariantSelector
          variants={product.variants}
          selectedVariant={selectedVariant}
          onVariantChange={setSelectedVariant}
        />
        <div className="mt-auto flex items-center justify-between gap-3">
          <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
          <span className="text-xs text-zinc-500">Ready in 1-2 days</span>
        </div>
        <Button className="w-full" onClick={() => { onAddToCart(product, quantity, selectedVariant); setAddedToCart(true) }}>
          <ShoppingBag className="h-4 w-4" />
          {addedToCart ? "Added to kit" : "Add to kit"}
        </Button>
      </CardContent>
    </Card>
  )
}

export default ProductCard