import { Headphones, Keyboard, Monitor, Mouse } from "lucide-react"
import { createFileRoute, Link } from "@tanstack/react-router"
import type { Product } from "../components/ProductCard/ProductCard"
import CatalogSection from "../components/sections/CatalogSection"
import { categories, formatPrice } from "../data/products"
import { useProducts, type ShopifyProduct } from "../hooks/useProducts"

type CollectionSearch = {
  q?: string
  category?: string
}

const productIcons = [Keyboard, Mouse, Monitor, Headphones]
const productAccents = [
  "bg-emerald-400/10 text-emerald-300",
  "bg-cyan-400/10 text-cyan-300",
  "bg-amber-300/10 text-amber-200",
  "bg-rose-400/10 text-rose-300",
]

function toCatalogProduct(product: ShopifyProduct, index: number): Product {
  return {
    id: product.handle,
    title: product.title,
    category: product.productType || "Hardware",
    price: Number(product.priceRange.minVariantPrice.amount),
    description: product.description,
    variants: ["Standard"],
    rating: 0,
    reviews: 0,
    stock: 10,
    icon: productIcons[index % productIcons.length] ?? Keyboard,
    accentClass: productAccents[index % productAccents.length] ?? productAccents[0],
  }
}

export const Route = createFileRoute("/collection")({
  validateSearch: (search: Record<string, unknown>): CollectionSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  component: CollectionPage,
})

function CollectionPage() {
  const { q = "", category } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { products: storefrontProducts, loading, error } = useProducts()
  const activeCategory = categories.find((item) => item === category) ?? "All"
  const products = storefrontProducts.map(toCatalogProduct)

  if (loading) {
    return <p className="p-16 text-center text-zinc-400">Produkte werden geladen …</p>
  }

  if (error) {
    return <p className="p-16 text-center text-red-400">Fehler: {error}</p>
  }

  return (
    <>
      <section className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 pb-0 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Relay collection</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-50">Collection</h1>
        </div>
        <Link
          to="/collection"
          search={{ category: "Input" }}
          className="text-sm text-emerald-300 hover:underline"
        >
          Nur Input-Geräte
        </Link>
      </section>
      <CatalogSection
        categories={categories}
        products={products}
        formatPrice={formatPrice}
        searchTerm={q}
        onSearchTermChange={(next) => {
          void navigate({ search: (previous) => ({ ...previous, q: next || undefined }) })
        }}
        activeCategory={activeCategory}
        onActiveCategoryChange={(next) => {
          void navigate({
            search: (previous) => ({
              ...previous,
              category: next === "All" ? undefined : next,
            }),
          })
        }}
      />
    </>
  )
}