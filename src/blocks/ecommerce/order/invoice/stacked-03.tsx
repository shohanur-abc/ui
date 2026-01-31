import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Building2, Calendar, FileText, User } from "lucide-react"

interface ServiceItem {
  name: string
  description: string
  quantity: number
  rate: number
}

interface HeaderSectionProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  invoiceNumber: string
  status: string
  statusVariant: "default" | "secondary" | "destructive" | "outline"
}

interface DateRangeProps {
  issueDate: string
  dueDate: string
}

interface EntityBlockProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  name: string
  details: string[]
}

interface ServiceCardProps {
  item: ServiceItem
  currency: string
}

interface BreakdownSectionProps {
  items: { label: string; value: number; type?: "default" | "discount" | "total" }[]
  currency: string
}

interface NotesSectionProps {
  title: string
  content: string
}

const HeaderSection = ({ icon: Icon, title, invoiceNumber, status, statusVariant }: HeaderSectionProps) => (
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-3">
      <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="size-6 text-primary" />
      </div>
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground font-mono">{invoiceNumber}</p>
      </div>
    </div>
    <Badge variant={statusVariant}>{status}</Badge>
  </div>
)

const DateRange = ({ issueDate, dueDate }: DateRangeProps) => (
  <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/40">
    <Calendar className="size-4 text-muted-foreground" />
    <div className="flex items-center gap-2 text-sm">
      <span>{issueDate}</span>
      <ArrowRight className="size-3 text-muted-foreground" />
      <span className="font-medium">{dueDate}</span>
    </div>
  </div>
)

const EntityBlock = ({ icon: Icon, label, name, details }: EntityBlockProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Icon className="size-4" />
      <span className="font-semibold uppercase tracking-wider">{label}</span>
    </div>
    <div>
      <p className="font-semibold">{name}</p>
      {details.map((detail, index) => (
        <p key={index} className="text-sm text-muted-foreground">{detail}</p>
      ))}
    </div>
  </div>
)

const ServiceCard = ({ item, currency }: ServiceCardProps) => (
  <div className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-1 flex-1">
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
          <span>{item.quantity} × {currency}{item.rate.toFixed(2)}</span>
        </div>
      </div>
      <p className="text-lg font-bold">{currency}{(item.quantity * item.rate).toFixed(2)}</p>
    </div>
  </div>
)

const BreakdownSection = ({ items, currency }: BreakdownSectionProps) => (
  <div className="space-y-2">
    {items.map((item, index) => (
      <div 
        key={index} 
        className={`flex justify-between ${
          item.type === "total" ? "text-lg font-bold pt-2 border-t" : "text-sm"
        } ${item.type === "discount" ? "text-green-600" : ""}`}
      >
        <span className={item.type === "total" ? "" : "text-muted-foreground"}>{item.label}</span>
        <span>
          {item.type === "discount" ? "-" : ""}
          {currency}{Math.abs(item.value).toFixed(2)}
        </span>
      </div>
    ))}
  </div>
)

const NotesSection = ({ title, content }: NotesSectionProps) => (
  <div className="p-4 rounded-lg bg-muted/30 space-y-2">
    <p className="text-sm font-semibold">{title}</p>
    <p className="text-sm text-muted-foreground">{content}</p>
  </div>
)

export default function Main() {
  const header: HeaderSectionProps = {
    icon: FileText,
    title: "Service Invoice",
    invoiceNumber: "SVC-2024-0089",
    status: "Due in 14 days",
    statusVariant: "secondary",
  }

  const dateRange: DateRangeProps = {
    issueDate: "Feb 1, 2024",
    dueDate: "Feb 15, 2024",
  }

  const vendor: EntityBlockProps = {
    icon: Building2,
    label: "From",
    name: "TechConsult Pro",
    details: ["789 Expert Avenue", "Boston, MA 02101", "support@techconsult.pro"],
  }

  const client: EntityBlockProps = {
    icon: User,
    label: "Bill To",
    name: "StartupXYZ Inc.",
    details: ["321 Innovation Way", "Cambridge, MA 02139", "accounts@startupxyz.io"],
  }

  const services: ServiceItem[] = [
    { name: "Technical Architecture Review", description: "Complete system architecture analysis and recommendations", quantity: 1, rate: 3500.00 },
    { name: "Security Audit", description: "Comprehensive security assessment and penetration testing", quantity: 1, rate: 4500.00 },
    { name: "Performance Optimization", description: "Database and API performance tuning", quantity: 16, rate: 175.00 },
  ]

  const breakdown = [
    { label: "Subtotal", value: 10800.00 },
    { label: "Volume Discount (5%)", value: 540.00, type: "discount" as const },
    { label: "Tax (6.25%)", value: 641.25 },
    { label: "Total Due", value: 10901.25, type: "total" as const },
  ]

  const notes: NotesSectionProps = {
    title: "Payment Notes",
    content: "Please include invoice number in payment reference. Wire transfers preferred for amounts over $5,000. Contact billing@techconsult.pro for questions.",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardHeader className="space-y-4">
            <HeaderSection {...header} />
            <DateRange {...dateRange} />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid @sm:grid-cols-2 gap-4">
              <EntityBlock {...vendor} />
              <EntityBlock {...client} />
            </div>
            <Separator />
            <div className="space-y-3">
              <p className="text-sm font-semibold">Services</p>
              {services.map((service, index) => (
                <ServiceCard key={index} item={service} currency="$" />
              ))}
            </div>
            <div className="p-4 rounded-lg border-2 border-primary/20">
              <BreakdownSection items={breakdown} currency="$" />
            </div>
            <NotesSection {...notes} />
          </CardContent>
          <CardFooter className="border-t pt-6 flex flex-wrap gap-3">
            <Button className="flex-1 @sm:flex-none">Pay Invoice</Button>
            <Button variant="outline" className="flex-1 @sm:flex-none">Download PDF</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
