import { Filter, LayoutGrid, Search, SlidersHorizontal } from "lucide-react"
import ProductCard, { type Product } from "../ProductCard/ProductCard"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Checkbox } from "../ui/checkbox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

type CatalogSectionProps = {
  categories: readonly string[]
  products: Product[]
  visibleProducts: Product[]
  activeCategory: string
  onActiveCategoryChange: (category: string) => void
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  inStockOnly: boolean
  onInStockOnlyChange: (value: boolean) => void
  lowStockOnly: boolean
  onLowStockOnlyChange: (value: boolean) => void
  maxPrice: number[]
  onMaxPriceChange: (value: number[]) => void
  sortOrder: string
  onSortOrderChange: (value: string) => void
  expressShipping: boolean
  onExpressShippingChange: (value: boolean) => void
  wishlist: string[]
  onAddToCart: (product: Product, quantity: number, variant: string) => void
  onWishlistToggle: (productId: string) => void
  onResetFilters: () => void
  formatPrice: Intl.NumberFormat
}

function CatalogSection({
  categories,
  products,
  visibleProducts,
  activeCategory,
  onActiveCategoryChange,
  searchQuery,
  onSearchQueryChange,
  inStockOnly,
  onInStockOnlyChange,
  lowStockOnly,
  onLowStockOnlyChange,
  maxPrice,
  onMaxPriceChange,
  sortOrder,
  onSortOrderChange,
  expressShipping,
  onExpressShippingChange,
  wishlist,
  onAddToCart,
  onWishlistToggle,
  onResetFilters,
  formatPrice,
}: CatalogSectionProps) {
  return (
    <section id="catalog" className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8 lg:py-24">
      <aside>
        <Card className="border-zinc-800 bg-zinc-900/70 lg:sticky lg:top-24">
          <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-base">Refine the signal</CardTitle>
              <CardDescription className="mt-1">Find your next daily driver.</CardDescription>
            </div>
            <SlidersHorizontal className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="catalog-search">Search catalog</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <Input
                  id="catalog-search"
                  className="pl-9"
                  placeholder="Try keyboard..."
                  value={searchQuery}
                  onChange={(event) => onSearchQueryChange(event.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="grid gap-3">
              <Label>Availability</Label>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                <Checkbox checked={inStockOnly} onCheckedChange={(checked) => onInStockOnlyChange(checked === true)} />
                Only show in-stock
              </label>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="max-price">Max price</Label>
                <span className="text-sm font-semibold text-emerald-300">{formatPrice.format(maxPrice[0] ?? 349)}</span>
              </div>
              <Slider
                id="max-price"
                min={50}
                max={349}
                step={1}
                value={maxPrice}
                onValueChange={onMaxPriceChange}
                aria-label="Maximum price"
              />
              <div className="flex justify-between text-[11px] text-zinc-600"><span>CHF 50</span><span>CHF 349</span></div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sort-products">Sort by</Label>
              <Select value={sortOrder} onValueChange={onSortOrderChange}>
                <SelectTrigger id="sort-products"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="rating">Top rated</SelectItem>
                  <SelectItem value="price-low">Price: low to high</SelectItem>
                  <SelectItem value="price-high">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="grid gap-1">
                <Label htmlFor="express-shipping">Express dispatch</Label>
                <span className="text-xs text-zinc-500">Packed first on weekdays</span>
              </div>
              <Switch
                id="express-shipping"
                checked={expressShipping}
                onCheckedChange={onExpressShippingChange}
                aria-label="Express dispatch"
              />
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <span className="inline-flex items-center gap-2"><Filter className="h-4 w-4" /> More filters</span>
                  <span className="text-xs text-zinc-500">{lowStockOnly ? "1 active" : "Optional"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-80">
                <div className="grid gap-4">
                  <div>
                    <p className="text-sm font-semibold">More filters</p>
                    <p className="mt-1 text-xs text-zinc-500">Keep the collection tight.</p>
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                    <Checkbox checked={lowStockOnly} onCheckedChange={(checked) => onLowStockOnlyChange(checked === true)} />
                    Low stock only
                  </label>
                  <Separator />
                  <Button variant="ghost" size="sm" className="justify-start" onClick={onResetFilters}>Reset all filters</Button>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>
      </aside>

      <div className="min-w-0">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300"><LayoutGrid className="h-3.5 w-3.5" /> Curated hardware</p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50">The daily setup</h2>
          </div>
          <p className="text-sm text-zinc-500">{visibleProducts.length} of {products.length} pieces</p>
        </div>

        <Tabs value={activeCategory} onValueChange={onActiveCategoryChange}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabsList className="h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="border border-transparent px-4 py-2 data-[state=active]:border-zinc-700 data-[state=active]:bg-zinc-900">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            <Badge variant="outline">{expressShipping ? "Express lane on" : "Standard lane"}</Badge>
          </div>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              {visibleProducts.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.includes(product.id)}
                      onAddToCart={onAddToCart}
                      onWishlistToggle={() => onWishlistToggle(product.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed bg-transparent">
                  <CardContent className="grid place-items-center gap-3 py-16 text-center">
                    <Search className="h-8 w-8 text-zinc-600" />
                    <div>
                      <p className="font-semibold text-zinc-200">No signal found</p>
                      <p className="mt-1 text-sm text-zinc-500">Try another search or open up the filters.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={onResetFilters}>Reset filters</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

export default CatalogSection
