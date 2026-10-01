import { createFileRoute } from "@tanstack/react-router"
import FreeDispatchAlert from "../components/sections/FreeDispatchAlert"
import HeroSection from "../components/sections/HeroSection"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <>
      <HeroSection />
      <FreeDispatchAlert />
    </>
  )
}