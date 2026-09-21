import { PackageCheck } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

function FreeDispatchAlert() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Alert variant="success" className="flex items-start gap-3">
        <PackageCheck className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <AlertTitle>Free dispatch unlocked</AlertTitle>
          <AlertDescription>Every kit above CHF 150 ships from our bench at no extra cost.</AlertDescription>
        </div>
      </Alert>
    </div>
  )
}

export default FreeDispatchAlert
