// src/data/products.ts
import { Headphones, Keyboard, Monitor, Mouse } from "lucide-react"
import type { Product } from "../components/ProductCard/ProductCard"

export const products: Product[] = [
{
    id: "orbit-75",
    title: "Orbit 75 Keyboard",
    category: "Input",
    price: 189,
    description: "A compact mechanical keyboard with a quiet, tactile pulse.",
    variants: ["Carbon", "Mist", "Cobalt"],
    rating: 4.9,
    reviews: 83,
    stock: 12,
    sale: true,
    icon: Keyboard,
    accentClass: "bg-emerald-400/10 text-emerald-300",
  },
  {
    id: "vector-pro",
    title: "Vector Pro Mouse",
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
    title: "Frame 27 Monitor",
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
    title: "Echo Studio Headphones",
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

export const categories = ["All", "Input", "Display", "Audio"] as const

export const formatPrice = new Intl.NumberFormat("de-CH", {
  style: "currency",
  currency: "CHF",
  maximumFractionDigits: 0,
})