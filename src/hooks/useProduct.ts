import { useEffect, useState } from "react"
import { fetchProductDetails, type StorefrontProductDetails } from "../lib/utils"

export function useProduct(handle: string) {
  const [product, setProduct] = useState<StorefrontProductDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProductDetails(handle)
      .then((data) => setProduct(data))
      .catch((requestError: unknown) => {
        setError(
          requestError instanceof Error ? requestError.message : "Unbekannter Fehler",
        )
      })
      .finally(() => setLoading(false))
  }, [handle])

  return { product, loading, error }
}