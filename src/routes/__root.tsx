import type { ReactNode } from "react"
import { HeadContent, Link, Outlet, Scripts, createRootRoute } from "@tanstack/react-router"
import AppFooter from "../components/layout/AppFooter"
import AppHeader from "../components/layout/AppHeader"
import AppLayout from "../components/layout/AppLayout"
import { TooltipProvider } from "../components/ui/tooltip"
import { formatPrice } from "../data/products"
import appCss from "../index.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Relay Supply | Hardware with a point of view" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  notFoundComponent: NotFoundPage,
  component: RootComponent,
})

function NotFoundPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-widest text-zinc-500">404</p>
      <h1 className="mt-2 text-2xl font-bold text-zinc-50">Diese Seite gibt es nicht.</h1>
      <Link to="/" className="mt-6 inline-block text-emerald-300 hover:underline">
        Zurück zur Startseite
      </Link>
    </section>
  )
}

function RootComponent() {
  return (
    <RootDocument>
      <AppChrome />
    </RootDocument>
  )
}

function AppChrome() {
  return (
    <TooltipProvider>
      <AppLayout
        header={
          <AppHeader
            formatPrice={formatPrice}
          />
        }
        footer={<AppFooter />}
      >
        <Outlet />
      </AppLayout>
    </TooltipProvider>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}