import type { ReactNode } from "react"

type AppLayoutProps = {
  header: ReactNode
  children: ReactNode
  footer: ReactNode
}

function AppLayout({ header, children, footer }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {header}
      <main id="top">{children}</main>
      {footer}
    </div>
  )
}

export default AppLayout
