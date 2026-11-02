import { Link, createFileRoute } from "@tanstack/react-router"
import { formatPrice } from "../data/products"
import { useProduct } from "../hooks/useProduct"
import { useProducts } from "../hooks/useProducts"

export const Route = createFileRoute("/products/$productId")({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { productId } = Route.useParams()
  const { product, loading, error } = useProduct(productId)
  const { products: moreProducts } = useProducts(4)

  if (loading) {
    return <p className="p-16 text-center text-zinc-400">Produkt wird geladen ...</p>
  }

  if (error) {
    return <p className="p-16 text-center text-red-400">Fehler: {error}</p>
  }

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

  const image = product.images.nodes[0]
  const price = product.variants.nodes[0]?.price

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {image && (
        <img
          src={image.url}
          alt={image.altText ?? product.title}
          className="h-64 w-full rounded-2xl object-cover"
        />
      )}
      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {product.productType}
      </p>
      <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>
      <p className="mt-4 text-zinc-400">{product.description}</p>
      {price && <p className="mt-6 text-2xl font-bold">{formatPrice.format(Number(price.amount))}</p>}

      <h2 className="mt-16 text-lg font-semibold">Weitere Produkte</h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {moreProducts.map((item) => (
          <li key={item.id}>
            <Link
              to="/products/$productId"
              params={{ productId: item.handle }}
              className="text-emerald-300 hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}