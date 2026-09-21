import { ArrowRight, Check, Sparkles, Truck } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Separator } from "../ui/separator"

function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-4 pb-14 pt-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pb-20 lg:pt-24">
      <div className="max-w-2xl">
        <Badge variant="success" className="mb-6 gap-1.5 px-3 py-1">
          <Sparkles className="h-3.5 w-3.5" />
          Spring drop / 2026
        </Badge>
        <h1 className="max-w-xl text-5xl font-black tracking-[-0.04em] text-zinc-50 sm:text-6xl">
          Hardware with a point of view.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
          Carefully tuned tools for focused work, clean desks and the hours in between.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <a href="#catalog">Explore collection <ArrowRight className="h-4 w-4" /></a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#notes">Read field notes</a>
          </Button>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-wider text-zinc-500">
          <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Free dispatch over CHF 150</span>
          <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> 30-day returns</span>
        </div>
      </div>

      <Card className="relative overflow-hidden border-emerald-400/20 bg-emerald-400/[0.04]">
        <div className="absolute right-0 top-0 h-40 w-40 border-l border-b border-emerald-400/20" />
        <CardHeader className="relative flex-row items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">Dispatch signal</p>
            <CardTitle className="mt-3 text-3xl">92% packed</CardTitle>
          </div>
          <Badge variant="success">Live</Badge>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <Progress value={92} aria-label="92 percent of orders packed" />
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Orders packed today</span>
            <span className="font-semibold text-zinc-300">46 / 50</span>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-zinc-100">The Relay bench</p>
              <p className="text-xs text-zinc-500">Small batch. Human checked.</p>
            </div>
            <Truck className="ml-auto h-5 w-5 text-emerald-300" />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default HeroSection
