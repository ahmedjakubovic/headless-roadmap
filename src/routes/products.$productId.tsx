import { Link, createFileRoute } from "@tanstack/react-router"
import { formatPrice, products } from "../data/products"

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const product = products.find((item) => item.id === productId)

  if (!product) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-bold">Produkt nicht gefunden</h1>
        <Link to="/collection" className="mt-6 inline-block text-emerald-300 hover:underline">
          Zurück zur Collection
        </Link>
      </section>
    )
  }

  const ProductIcon = product.icon

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className={`grid h-64 place-items-center rounded-2xl ${product.accentClass}`}>
        <ProductIcon className="h-24 w-24 stroke-[1.2]" />
      </div>
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {product.category}
      </p>
      <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
      <p className="mt-4 text-zinc-400">{product.description}</p>
      <p className="mt-6 text-2xl font-bold">{formatPrice.format(product.price)}</p>
    </section>
  )
}