import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Badge } from "../ui/badge"

function FieldNotesSection() {
  return (
    <section id="notes" className="border-t border-zinc-800/80">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
        <div>
          <Badge variant="outline" className="mb-5">Field notes</Badge>
          <h2 className="max-w-md text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">Good tools disappear into the work.</h2>
          <p className="mt-5 max-w-md leading-7 text-zinc-400">We choose pieces for the details you notice after a long day: stable feet, soft keys, honest color and less friction.</p>
        </div>
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Why a small catalog?</AccordionTrigger>
            <AccordionContent>Fewer, better options make it easier to build a setup that feels like yours. Each piece earns its space on the bench.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does dispatch work?</AccordionTrigger>
            <AccordionContent>Orders are checked, packed and sent from the Relay bench on weekdays. Express dispatch moves your kit to the front of that queue.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Can I change my mind?</AccordionTrigger>
            <AccordionContent>Absolutely. Try your gear for 30 days and send it back in good condition if it does not earn a permanent place on your desk.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

export default FieldNotesSection
