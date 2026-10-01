import { ArrowRight, CircleHelp, ShoppingBag, UserRound } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { useCartStore } from "../../state/cart.store"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Separator } from "../ui/separator"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

type AppHeaderProps = {
  formatPrice: Intl.NumberFormat
}

function AppHeader({ formatPrice }: AppHeaderProps) {
  const isOpen = useCartStore((state) => state.isOpen)
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.open)
  const closeCart = useCartStore((state) => state.close)
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const cartSubtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-3" to="/" aria-label="Relay Supply Startseite">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400 text-sm font-black text-zinc-950">
            rs
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-100">
            relay supply
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-zinc-500 md:flex" aria-label="Hauptnavigation">
          <Link
            to="/"
            activeProps={{ className: "text-zinc-100" }}
            className="transition-colors hover:text-zinc-100"
          >
            Home
          </Link>
          <Link
            to="/collection"
            activeProps={{ className: "text-zinc-100" }}
            className="transition-colors hover:text-zinc-100"
          >
            Collection
          </Link>
          <Link
            to="/notes"
            activeProps={{ className: "text-zinc-100" }}
            className="transition-colors hover:text-zinc-100"
          >
            Field notes
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Hilfe">
                <CircleHelp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Need a second opinion?</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Profil">
                <UserRound className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Your profile</TooltipContent>
          </Tooltip>
          <Dialog
            open={isOpen}
            onOpenChange={(nextOpen) => {
              if (nextOpen) {
                openCart()
              } else {
                closeCart()
              }
            }}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="ml-1 gap-2 border-zinc-700 bg-zinc-900">
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">Kit</span>
                <Badge className="min-w-5 justify-center px-1.5" variant="default">{cartCount}</Badge>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Your kit</DialogTitle>
                <DialogDescription>
                  {cartCount === 0 ? "Your next setup starts here." : `${cartCount} piece${cartCount === 1 ? "" : "s"} ready to ship.`}
                </DialogDescription>
              </DialogHeader>

              {items.length === 0 ? (
                <div className="grid place-items-center gap-3 rounded-lg border border-dashed border-zinc-700 py-10 text-center">
                  <ShoppingBag className="h-8 w-8 text-zinc-600" />
                  <p className="text-sm text-zinc-400">No pieces in your kit yet.</p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {items.map((item) => {
                    const ItemIcon = item.product.icon

                    return (
                      <div className="flex items-center gap-3" key={`${item.product.id}-${item.variant}`}>
                        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${item.product.accentClass}`}>
                          <ItemIcon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-zinc-100">{item.product.title}</p>
                          <p className="text-xs text-zinc-500">{item.variant} / Qty {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">{formatPrice.format(item.product.price * item.quantity)}</p>
                      </div>
                    )
                  })}
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-lg font-bold">{formatPrice.format(cartSubtotal)}</span>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={closeCart}>Keep browsing</Button>
                <Button disabled={items.length === 0}>
                  Checkout <ArrowRight className="h-4 w-4" />
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
