import { useEffect, useMemo, useState } from "react"
import { Headphones, Keyboard, Monitor, Mouse } from "lucide-react"
import type { Product } from "./components/ProductCard/ProductCard"
import AppFooter from "./components/layout/AppFooter"
import AppHeader from "./components/layout/AppHeader"
import AppLayout from "./components/layout/AppLayout"
import CatalogSection from "./components/sections/CatalogSection"
import FieldNotesSection from "./components/sections/FieldNotesSection"
import FreeDispatchAlert from "./components/sections/FreeDispatchAlert"
import HeroSection from "./components/sections/HeroSection"
import { TooltipProvider } from "./components/ui/tooltip"

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

  useEffect(() => {
    document.title = cartOpen ? "Your kit" : "Relay Supply"
  }, [cartOpen])

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
      <AppLayout
        header={
          <AppHeader
            cartOpen={cartOpen}
            onCartOpenChange={setCartOpen}
            cartItems={cartItems}
            cartCount={cartCount}
            cartSubtotal={cartSubtotal}
            formatPrice={formatPrice}
          />
        }
        footer={<AppFooter />}
      >
        <HeroSection />
        <FreeDispatchAlert />
        <CatalogSection
          categories={categories}
          products={products}
          visibleProducts={visibleProducts}
          activeCategory={activeCategory}
          onActiveCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          inStockOnly={inStockOnly}
          onInStockOnlyChange={setInStockOnly}
          lowStockOnly={lowStockOnly}
          onLowStockOnlyChange={setLowStockOnly}
          maxPrice={maxPrice}
          onMaxPriceChange={setMaxPrice}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
          expressShipping={expressShipping}
          onExpressShippingChange={setExpressShipping}
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onWishlistToggle={handleWishlistToggle}
          onResetFilters={resetFilters}
          formatPrice={formatPrice}
        />
        <FieldNotesSection />
      </AppLayout>
    </TooltipProvider>
  )
}

export default App;