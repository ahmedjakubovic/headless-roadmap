import { useEffect, useState } from "react"
import { fetchProducts, type StorefrontProduct } from "../lib/utils"

export type ShopifyProduct = StorefrontProduct

export function useProducts(first = 12) {
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts(first)
      .then((data) => setProducts(data))
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error ? requestError.message : "Unbekannter Fehler",
        )
      })
      .finally(() => setLoading(false))
  }, [first])

  return { products, loading, error }
}