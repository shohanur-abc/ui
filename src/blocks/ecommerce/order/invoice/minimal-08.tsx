import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Wallet } from "lucide-react"

interface TimeEntryProps {
  date: string
  description: string
  hours: number
  rate: number
  currency: string
}

interface TimesheetHeaderProps {
  invoiceNumber: string
  period: string
  projectName: string
  status: string
}

interface TimesheetSummaryProps {
  totalHours: number
  hourlyRate: number
  subtotal: number
  tax: number
  total: number
  currency: string
}

const TimesheetHeader = ({ invoiceNumber, period, projectName, status }: TimesheetHeaderProps) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Clock className="size-5 text-primary" />
        <p className="font-bold">Time Invoice</p>
      </div>
      <Badge variant="default">{status}</Badge>
    </div>
    <div className="text-sm">
      <p className="text-muted-foreground">{invoiceNumber}</p>
      <p className="font-medium">{projectName}</p>
      <p className="text-muted-foreground">{period}</p>
    </div>
  </div>
)

const TimeEntry = ({ date, description, hours, rate, currency }: TimeEntryProps) => (
  <div className="grid grid-cols-12 gap-2 py-2 text-sm">
    <div className="col-span-2 text-muted-foreground">{date}</div>
    <div className="col-span-6">{description}</div>
    <div className="col-span-2 text-center">{hours}h</div>
    <div className="col-span-2 text-right font-medium">{currency}{(hours * rate).toFixed(2)}</div>
  </div>
)

const TimesheetSummary = ({ totalHours, hourlyRate, subtotal, tax, total, currency }: TimesheetSummaryProps) => (
  <div className="space-y-3">
    <div className="p-3 rounded-lg bg-muted/50 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Total Hours</span>
        <span className="font-bold">{totalHours} hours @ {currency}{hourlyRate}/hr</span>
      </div>
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{currency}{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span>{currency}{tax.toFixed(2)}</span>
      </div>
    </div>
    <Separator />
    <div className="flex justify-between font-bold text-lg">
      <span>Amount Due</span>
      <span className="text-primary">{currency}{total.toFixed(2)}</span>
    </div>
  </div>
)

export default function Main() {
  const header: TimesheetHeaderProps = {
    invoiceNumber: "INV-2024-0089",
    period: "Feb 1 - Feb 15, 2024",
    projectName: "Website Redesign Project",
    status: "Due",
  }

  const entries: TimeEntryProps[] = [
    { date: "Feb 1", description: "Homepage design mockups", hours: 4, rate: 75, currency: "$" },
    { date: "Feb 3", description: "Navigation & header development", hours: 6, rate: 75, currency: "$" },
    { date: "Feb 5", description: "Product page templates", hours: 5, rate: 75, currency: "$" },
    { date: "Feb 8", description: "Responsive testing & fixes", hours: 3, rate: 75, currency: "$" },
    { date: "Feb 12", description: "Client review meeting", hours: 2, rate: 75, currency: "$" },
    { date: "Feb 14", description: "Revision implementation", hours: 4, rate: 75, currency: "$" },
  ]

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)
  const subtotal = totalHours * 75
  const tax = subtotal * 0.1

  const summary: TimesheetSummaryProps = {
    totalHours,
    hourlyRate: 75,
    subtotal,
    tax,
    total: subtotal + tax,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-xl px-4 @sm:px-6 py-8 @md:py-12">
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <TimesheetHeader {...header} />
          <div>
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide pb-2">
              <div className="col-span-2">Date</div>
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Hours</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>
            <Separator />
            {entries.map((entry, index) => (
              <TimeEntry key={index} {...entry} />
            ))}
            <Separator />
          </div>
          <TimesheetSummary {...summary} />
          <Button className="w-full gap-2">
            <Wallet className="size-4" />
            Pay Invoice
          </Button>
        </div>
      </div>
    </section>
  )
}
