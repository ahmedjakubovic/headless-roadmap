import { createFileRoute } from "@tanstack/react-router"
import FieldNotesSection from "../components/sections/FieldNotesSection"

export const Route = createFileRoute("/notes")({
  component: NotesPage,
})

function NotesPage() {
  return <FieldNotesSection />
}