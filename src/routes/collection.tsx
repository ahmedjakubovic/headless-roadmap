import { createFileRoute, Link } from "@tanstack/react-router"
import CatalogSection from "../components/sections/CatalogSection"
import { categories, formatPrice, products } from "../data/products"

type CollectionSearch = {
  q?: string
  category?: string
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
  const activeCategory = categories.find((item) => item === category) ?? "All"

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