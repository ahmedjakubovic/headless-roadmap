import { create } from "zustand"
import type { Product } from "../components/ProductCard/ProductCard"

export type CartItem = {
  product: Product
  quantity: number
  variant: string
}

type CartState = {
  items: CartItem[]
  isOpen: boolean
  add: (product: Product, quantity: number, variant: string) => void
  open: () => void
  close: () => void
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,

  add: (product, quantity, variant) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.id === product.id && item.variant === variant,
      )

      if (!existing) {
        return { items: [...state.items, { product, quantity, variant }] }
      }

      return {
        items: state.items.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      }
    }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}))