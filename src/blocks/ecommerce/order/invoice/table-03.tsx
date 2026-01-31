import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Building2, Calendar, CreditCard, FileText, Mail, Phone } from "lucide-react"

interface ServiceItem {
  service: string
  period: string
  hours: number
  rate: number
  total: number
}

interface CompanyBrandProps {
  icon: React.ComponentType<{ className?: string }>
  name: string
  subtitle: string
}

interface InvoiceInfoItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

interface ContactBlockProps {
  title: string
  name: string
  email: string
  phone: string
  company?: string
}

interface ServiceTableProps {
  items: ServiceItem[]
  columns: { key: string; label: string; align?: "left" | "center" | "right" }[]
  currency: string
}

interface PaymentSummaryProps {
  rows: { label: string; value: number; isTotal?: boolean; isDiscount?: boolean }[]
  currency: string
}

interface PaymentTermsProps {
  title: string
  terms: string[]
}

const CompanyBrand = ({ icon: Icon, name, subtitle }: CompanyBrandProps) => (
  <div className="flex items-center gap-3">
    <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="size-6 text-primary" />
    </div>
    <div>
      <h1 className="text-lg font-bold">{name}</h1>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  </div>
)

const InvoiceInfoItem = ({ icon: Icon, label, value }: InvoiceInfoItemProps) => (
  <div className="flex items-center gap-2 text-sm">
    <Icon className="size-4 text-muted-foreground" />
    <span className="text-muted-foreground">{label}:</span>
    <span className="font-medium">{value}</span>
  </div>
)

const ContactBlock = ({ title, name, email, phone, company }: ContactBlockProps) => (
  <div className="rounded-lg border p-4 space-y-3">
    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
    <div className="space-y-2">
      <p className="font-semibold">{name}</p>
      {company && <p className="text-sm text-muted-foreground">{company}</p>}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Mail className="size-3" />
        <span>{email}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Phone className="size-3" />
        <span>{phone}</span>
      </div>
    </div>
  </div>
)

const ServiceTable = ({ items, columns, currency }: ServiceTableProps) => (
  <div className="rounded-lg border overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/30">
          {columns.map((col) => (
            <TableHead 
              key={col.key} 
              className={col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <p className="font-medium">{item.service}</p>
              <p className="text-xs text-muted-foreground">{item.period}</p>
            </TableCell>
            <TableCell className="text-center">{item.hours}</TableCell>
            <TableCell className="text-right">{currency}{item.rate.toFixed(2)}/hr</TableCell>
            <TableCell className="text-right font-medium">{currency}{item.total.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

const PaymentSummary = ({ rows, currency }: PaymentSummaryProps) => (
  <div className="rounded-lg bg-muted/30 p-4 space-y-2">
    {rows.map((row, index) => (
      <div 
        key={index} 
        className={`flex justify-between ${row.isTotal ? "text-lg font-bold pt-2 border-t" : "text-sm"} ${row.isDiscount ? "text-green-600" : ""}`}
      >
        <span className={row.isTotal ? "" : "text-muted-foreground"}>{row.label}</span>
        <span>{row.isDiscount ? "-" : ""}{currency}{Math.abs(row.value).toFixed(2)}</span>
      </div>
    ))}
  </div>
)

const PaymentTerms = ({ title, terms }: PaymentTermsProps) => (
  <div className="space-y-2">
    <p className="text-sm font-semibold">{title}</p>
    <ul className="text-sm text-muted-foreground space-y-1">
      {terms.map((term, index) => (
        <li key={index}>• {term}</li>
      ))}
    </ul>
  </div>
)

export default function Main() {
  const brand: CompanyBrandProps = {
    icon: Building2,
    name: "DesignPro Agency",
    subtitle: "Creative Solutions",
  }

  const invoiceInfo = [
    { icon: FileText, label: "Invoice", value: "DPA-2024-156" },
    { icon: Calendar, label: "Date", value: "Jan 25, 2024" },
    { icon: CreditCard, label: "Due", value: "Feb 25, 2024" },
  ]

  const from: ContactBlockProps = {
    title: "From",
    name: "Sarah Johnson",
    email: "sarah@designpro.com",
    phone: "+1 (555) 123-4567",
    company: "DesignPro Agency",
  }

  const to: ContactBlockProps = {
    title: "Bill To",
    name: "Michael Chen",
    email: "michael@techcorp.com",
    phone: "+1 (555) 987-6543",
    company: "TechCorp Inc.",
  }

  const columns = [
    { key: "service", label: "Service", align: "left" as const },
    { key: "hours", label: "Hours", align: "center" as const },
    { key: "rate", label: "Rate", align: "right" as const },
    { key: "total", label: "Total", align: "right" as const },
  ]

  const services: ServiceItem[] = [
    { service: "UI/UX Design", period: "Jan 1-15, 2024", hours: 40, rate: 85.00, total: 3400.00 },
    { service: "Brand Identity", period: "Jan 10-20, 2024", hours: 24, rate: 95.00, total: 2280.00 },
    { service: "Prototype Development", period: "Jan 15-25, 2024", hours: 32, rate: 75.00, total: 2400.00 },
  ]

  const paymentRows = [
    { label: "Subtotal", value: 8080.00 },
    { label: "Early Payment Discount", value: 404.00, isDiscount: true },
    { label: "Tax (8.5%)", value: 652.46 },
    { label: "Total Due", value: 8328.46, isTotal: true },
  ]

  const terms: PaymentTermsProps = {
    title: "Payment Terms",
    terms: [
      "Payment due within 30 days",
      "2% late fee after due date",
      "5% discount for payment within 10 days",
    ],
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardHeader className="border-b">
            <div className="flex flex-col @lg:flex-row @lg:items-center @lg:justify-between gap-4">
              <CompanyBrand {...brand} />
              <div className="flex flex-wrap gap-4 @lg:gap-6">
                {invoiceInfo.map((info, index) => (
                  <InvoiceInfoItem key={index} {...info} />
                ))}
                <Badge>Pending</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid @md:grid-cols-2 gap-4">
              <ContactBlock {...from} />
              <ContactBlock {...to} />
            </div>
            <ServiceTable items={services} columns={columns} currency="$" />
            <div className="grid @md:grid-cols-2 gap-6">
              <PaymentTerms {...terms} />
              <PaymentSummary rows={paymentRows} currency="$" />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <p className="text-sm text-muted-foreground">
              Questions? Contact us at billing@designpro.com
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
