import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const STOREFRONT_API_URL = "https://demostore.mock.shop/api"

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

const PRODUCT_DETAILS_QUERY = `
  query ProductDetails($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      vendor
      tags
      images(first: 5) {
        nodes {
          url
          altText
        }
      }
      variants(first: 5) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

type GraphQLError = {
  message: string
}

type GraphQLResponse<T> = {
  data?: T
  errors?: GraphQLError[]
}

export type StorefrontProduct = {
  id: string
  title: string
  handle: string
  description: string
  featuredImage: {
    url: string
  } | null
  productType: string
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
}

export type StorefrontProductDetails = {
  id: string
  title: string
  handle: string
  description: string
  productType: string
  vendor: string
  tags: string[]
  images: {
    nodes: Array<{
      url: string
      altText: string | null
    }>
  }
  variants: {
    nodes: Array<{
      id: string
      title: string
      availableForSale: boolean
      price: {
        amount: string
        currencyCode: string
      }
    }>
  }
}

async function fetchStorefront<T>(
  query: string,
  variables?: Record<string, string | number>,
): Promise<T> {
  const response = await fetch(STOREFRONT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, ...(variables ? { variables } : {}) }),
  })

  if (!response.ok) {
    throw new Error(`Storefront request failed: ${response.status} ${response.statusText}`)
  }

  const payload = (await response.json()) as GraphQLResponse<T>

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "))
  }

  if (!payload.data) {
    throw new Error("Storefront response did not contain data")
  }

  return payload.data
}

export async function fetchProducts(first = 12): Promise<StorefrontProduct[]> {
  const data = await fetchStorefront<{
    products: {
      edges: Array<{
        node: StorefrontProduct
      }>
    }
  }>(PRODUCTS_QUERY, { first })

  return data.products.edges.map((edge) => edge.node)
}

export async function fetchProductDetails(
  handle: string,
): Promise<StorefrontProductDetails | null> {
  const data = await fetchStorefront<{
    product: StorefrontProductDetails | null
  }>(PRODUCT_DETAILS_QUERY, { handle })

  return data.product
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}