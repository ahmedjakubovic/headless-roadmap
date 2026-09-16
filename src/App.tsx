import { useMemo, useState } from "react"
import {
  ArrowRight,
  Check,
  CircleHelp,
  Filter,
  Headphones,
  Keyboard,
  LayoutGrid,
  Monitor,
  Mouse,
  PackageCheck,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Truck,
  UserRound,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert"
import { Avatar, AvatarFallback } from "./components/ui/avatar"
import { Badge } from "./components/ui/badge"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Checkbox } from "./components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover"
import { Progress } from "./components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Separator } from "./components/ui/separator"
import { Slider } from "./components/ui/slider"
import { Switch } from "./components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip"
import ProductCard, { type Product } from "./components/ProductCard/ProductCard"

const products: Product[] = [
  {
    id: "orbit-75",
    title: "Orbit 75",
    category: "Input",
    price: 189,
    description: "A compact mechanical keyboard with a quiet, tactile pulse.",
    variants: ["Carbon", "Mist", "Cobalt"],
    rating: 4.9,
    reviews: 83,
    stock: 12,
    icon: Keyboard,
    accentClass: "bg-emerald-400/10 text-emerald-300",
  },
  {
    id: "vector-pro",
    title: "Vector Pro",
    category: "Input",
    price: 99,
    description: "A balanced wireless mouse tuned for long sessions.",
    variants: ["Black", "White"],
    rating: 4.8,
    reviews: 54,
    stock: 7,
    icon: Mouse,
    accentClass: "bg-cyan-400/10 text-cyan-300",
  },
  {
    id: "frame-27",
    title: "Frame 27",
    category: "Display",
    price: 349,
    description: "A color-accurate 4K panel for work that needs room.",
    variants: ["27 inch", "32 inch"],
    rating: 4.7,
    reviews: 31,
    stock: 4,
    icon: Monitor,
    accentClass: "bg-amber-300/10 text-amber-200",
  },
  {
    id: "echo-studio",
    title: "Echo Studio",
    category: "Audio",
    price: 149,
    description: "Open-back headphones that leave space for your best work.",
    variants: ["Graphite", "Sand"],
    rating: 4.9,
    reviews: 67,
    stock: 18,
    icon: Headphones,
    accentClass: "bg-rose-400/10 text-rose-300",
  },
]

const categories = ["All", "Input", "Display", "Audio"] as const
const formatPrice = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  maximumFractionDigits: 0,
})

type CartItem = {
  product: Product
  quantity: number
  variant: string
}

function App() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [expressShipping, setExpressShipping] = useState(true)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [lowStockOnly, setLowStockOnly] = useState(false)
  const [maxPrice, setMaxPrice] = useState([349])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("featured")
  const [wishlist, setWishlist] = useState<string[]>([])

  const visibleProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const maxPriceValue = maxPrice[0] ?? 349

    return products
      .filter((product) => activeCategory === "All" || product.category === activeCategory)
      .filter((product) => !normalizedQuery || `${product.title} ${product.category}`.toLowerCase().includes(normalizedQuery))
      .filter((product) => !inStockOnly || product.stock > 0)
      .filter((product) => !lowStockOnly || product.stock <= 8)
      .filter((product) => product.price <= maxPriceValue)
      .sort((firstProduct, secondProduct) => {
        if (sortOrder === "price-low") return firstProduct.price - secondProduct.price
        if (sortOrder === "price-high") return secondProduct.price - firstProduct.price
        if (sortOrder === "rating") return secondProduct.rating - firstProduct.rating
        return secondProduct.reviews - firstProduct.reviews
      })
  }, [activeCategory, inStockOnly, lowStockOnly, maxPrice, searchQuery, sortOrder])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  function handleAddToCart(product: Product, quantity: number, variant: string) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id && item.variant === variant,
      )

      if (!existingItem) {
        return [...currentItems, { product, quantity, variant }]
      }

      return currentItems.map((item) =>
        item === existingItem
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      )
    })
    setCartOpen(true)
  }

  function handleWishlistToggle(productId: string) {
    setWishlist((currentWishlist) =>
      currentWishlist.includes(productId)
        ? currentWishlist.filter((id) => id !== productId)
        : [...currentWishlist, productId],
    )
  }

  function resetFilters() {
    setSearchQuery("")
    setInStockOnly(false)
    setLowStockOnly(false)
    setMaxPrice([349])
    setSortOrder("featured")
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <a className="flex items-center gap-3" href="#top" aria-label="Relay Supply Startseite">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400 text-sm font-black text-zinc-950">
                rs
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-100">
                relay supply
              </span>
            </a>

            <nav className="hidden items-center gap-6 text-sm text-zinc-500 md:flex" aria-label="Hauptnavigation">
              <a className="text-zinc-100" href="#catalog">Collection</a>
              <a className="transition-colors hover:text-zinc-100" href="#notes">Field notes</a>
            </nav>

            <div className="ml-auto flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Hilfe">
                    <CircleHelp className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Need a second opinion?</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Profil">
                    <UserRound className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Your profile</TooltipContent>
              </Tooltip>
              <Dialog open={cartOpen} onOpenChange={setCartOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-1 gap-2 border-zinc-700 bg-zinc-900">
                    <ShoppingBag className="h-4 w-4" />
                    <span className="hidden sm:inline">Kit</span>
                    <Badge className="min-w-5 justify-center px-1.5" variant="default">{cartCount}</Badge>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Your kit</DialogTitle>
                    <DialogDescription>
                      {cartCount === 0 ? "Your next setup starts here." : `${cartCount} piece${cartCount === 1 ? "" : "s"} ready to ship.`}
                    </DialogDescription>
                  </DialogHeader>

                  {cartItems.length === 0 ? (
                    <div className="grid place-items-center gap-3 rounded-lg border border-dashed border-zinc-700 py-10 text-center">
                      <ShoppingBag className="h-8 w-8 text-zinc-600" />
                      <p className="text-sm text-zinc-400">No pieces in your kit yet.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {cartItems.map((item) => {
                        const ItemIcon = item.product.icon

                        return (
                          <div className="flex items-center gap-3" key={`${item.product.id}-${item.variant}`}>
                            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${item.product.accentClass}`}>
                              <ItemIcon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold text-zinc-100">{item.product.title}</p>
                              <p className="text-xs text-zinc-500">{item.variant} / Qty {item.quantity}</p>
                            </div>
                            <p className="text-sm font-semibold">{formatPrice.format(item.product.price * item.quantity)}</p>
                          </div>
                        )
                      })}
                      <Separator />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-400">Subtotal</span>
                        <span className="text-lg font-bold">{formatPrice.format(cartSubtotal)}</span>
                      </div>
                    </div>
                  )}

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setCartOpen(false)}>Keep browsing</Button>
                    <Button disabled={cartItems.length === 0}>
                      Checkout <ArrowRight className="h-4 w-4" />
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <main id="top">
          <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-14 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-20 lg:pt-24">
            <div className="max-w-2xl">
              <Badge variant="success" className="mb-6 gap-1.5 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5" />
                Spring drop / 2026
              </Badge>
              <h1 className="max-w-xl text-5xl font-black tracking-[-0.04em] text-zinc-50 sm:text-6xl">
                Hardware with a point of view.
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
                Carefully tuned tools for focused work, clean desks and the hours in between.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild>
                  <a href="#catalog">Explore collection <ArrowRight className="h-4 w-4" /></a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#notes">Read field notes</a>
                </Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Free dispatch over CHF 150</span>
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 30-day returns</span>
              </div>
            </div>

            <Card className="relative overflow-hidden border-emerald-400/20 bg-emerald-400/[0.04]">
              <div className="absolute right-0 top-0 h-40 w-40 border-l border-b border-emerald-400/20" />
              <CardHeader className="relative flex-row items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Dispatch signal</p>
                  <CardTitle className="mt-3 text-3xl">92% packed</CardTitle>
                </div>
                <Badge variant="success">Live</Badge>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <Progress value={92} aria-label="92 percent of orders packed" />
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Orders packed today</span>
                  <span className="font-semibold text-zinc-300">46 / 50</span>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">The Relay bench</p>
                    <p className="text-xs text-zinc-500">Small batch. Human checked.</p>
                  </div>
                  <Truck className="ml-auto h-5 w-5 text-emerald-300" />
                </div>
              </CardContent>
            </Card>
          </section>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Alert variant="success" className="flex items-start gap-3">
              <PackageCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <AlertTitle>Free dispatch unlocked</AlertTitle>
                <AlertDescription>Every kit above CHF 150 ships from our bench at no extra cost.</AlertDescription>
              </div>
            </Alert>
          </div>

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
                      <Input id="catalog-search" className="pl-9" placeholder="Try keyboard..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-3">
                    <Label>Availability</Label>
                    <label className="flex cursor-pointer items-center gap-3 text-sm text-zinc-300">
                      <Checkbox checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(checked === true)} />
                      Only show in-stock
                    </label>
                  </div>

                  <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="max-price">Max price</Label>
                      <span className="text-sm font-semibold text-emerald-300">{formatPrice.format(maxPrice[0] ?? 349)}</span>
                    </div>
                    <Slider id="max-price" min={50} max={349} step={1} value={maxPrice} onValueChange={setMaxPrice} aria-label="Maximum price" />
                    <div className="flex justify-between text-[11px] text-zinc-600"><span>CHF 50</span><span>CHF 349</span></div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="sort-products">Sort by</Label>
                    <Select value={sortOrder} onValueChange={setSortOrder}>
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
                    <Switch id="express-shipping" checked={expressShipping} onCheckedChange={setExpressShipping} aria-label="Express dispatch" />
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
                          <Checkbox checked={lowStockOnly} onCheckedChange={(checked) => setLowStockOnly(checked === true)} />
                          Low stock only
                        </label>
                        <Separator />
                        <Button variant="ghost" size="sm" className="justify-start" onClick={resetFilters}>Reset all filters</Button>
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

              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
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
                            onAddToCart={handleAddToCart}
                            onWishlistToggle={() => handleWishlistToggle(product.id)}
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
                          <Button variant="outline" size="sm" onClick={resetFilters}>Reset filters</Button>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          <section id="notes" className="border-t border-zinc-800/80">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
              <div>
                <Badge variant="outline" className="mb-5">Field notes</Badge>
                <h2 className="max-w-md text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">Good tools disappear into the work.</h2>
                <p className="mt-5 max-w-md leading-7 text-zinc-400">We choose pieces for the details you notice after a long day: stable feet, soft keys, honest color and less friction.</p>
              </div>
              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Why a small catalog?</AccordionTrigger>
                  <AccordionContent>Fewer, better options make it easier to build a setup that feels like yours. Each piece earns its space on the bench.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does dispatch work?</AccordionTrigger>
                  <AccordionContent>Orders are checked, packed and sent from the Relay bench on weekdays. Express dispatch moves your kit to the front of that queue.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I change my mind?</AccordionTrigger>
                  <AccordionContent>Absolutely. Try your gear for 30 days and send it back in good condition if it does not earn a permanent place on your desk.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </main>

        <footer className="border-t border-zinc-800/80">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <span className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.2em] text-zinc-300"><span className="h-2 w-2 rounded-full bg-emerald-400" /> relay supply</span>
            <span>Free components. Thoughtful hardware. No noise.</span>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
}

export default App;