import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
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
import { FileText, Receipt } from "lucide-react"

interface TimeEntry {
  date: string
  description: string
  hours: number
  rate: number
}

interface InvoiceBannerProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  amount: string
  amountLabel: string
}

interface DetailRowProps {
  label: string
  value: string
}

interface ClientInfoProps {
  title: string
  name: string
  company: string
  address: string
  taxId?: string
}

interface TimeEntriesTableProps {
  items: TimeEntry[]
  currency: string
}

interface TotalSectionProps {
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  currency: string
}

interface PaymentInfoProps {
  title: string
  bankName: string
  accountNumber: string
  routingNumber: string
  swiftCode: string
}

const InvoiceBanner = ({ icon: Icon, title, subtitle, amount, amountLabel }: InvoiceBannerProps) => (
  <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5">
    <div className="flex items-center gap-4">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/20">
        <Icon className="size-7 text-primary" />
      </div>
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-3xl font-bold">{amount}</p>
      <p className="text-sm text-muted-foreground">{amountLabel}</p>
    </div>
  </div>
)

const DetailRow = ({ label, value }: DetailRowProps) => (
  <div className="flex justify-between py-2 border-b border-dashed last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
)

const ClientInfo = ({ title, name, company, address, taxId }: ClientInfoProps) => (
  <div className="space-y-3">
    <p className="text-sm font-semibold text-primary">{title}</p>
    <div className="space-y-1">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-muted-foreground">{company}</p>
      <p className="text-sm text-muted-foreground whitespace-pre-line">{address}</p>
      {taxId && <p className="text-sm text-muted-foreground">{taxId}</p>}
    </div>
  </div>
)

const TimeEntriesTable = ({ items, currency }: TimeEntriesTableProps) => (
  <div className="space-y-3">
    <h3 className="font-semibold flex items-center gap-2">
      <Receipt className="size-4" />
      Time Entries
    </h3>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead className="w-[40%]">Description</TableHead>
          <TableHead className="text-center">Hours</TableHead>
          <TableHead className="text-right">Rate</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((entry, index) => (
          <TableRow key={index}>
            <TableCell className="text-muted-foreground">{entry.date}</TableCell>
            <TableCell className="font-medium">{entry.description}</TableCell>
            <TableCell className="text-center">{entry.hours}</TableCell>
            <TableCell className="text-right">{currency}{entry.rate.toFixed(2)}/hr</TableCell>
            <TableCell className="text-right font-medium">{currency}{(entry.hours * entry.rate).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
)

const TotalSection = ({ subtotal, taxRate, taxAmount, total, currency }: TotalSectionProps) => (
  <div className="flex justify-end">
    <div className="w-full @sm:w-72 p-4 rounded-lg bg-muted/40 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span>{currency}{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Tax ({taxRate}%)</span>
        <span>{currency}{taxAmount.toFixed(2)}</span>
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span className="text-primary">{currency}{total.toFixed(2)}</span>
      </div>
    </div>
  </div>
)

const PaymentInfo = ({ title, bankName, accountNumber, routingNumber, swiftCode }: PaymentInfoProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <p className="font-semibold">{title}</p>
    <div className="grid @sm:grid-cols-2 gap-3 text-sm">
      <div>
        <p className="text-muted-foreground">Bank</p>
        <p className="font-medium">{bankName}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Account</p>
        <p className="font-medium font-mono">{accountNumber}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Routing</p>
        <p className="font-medium font-mono">{routingNumber}</p>
      </div>
      <div>
        <p className="text-muted-foreground">SWIFT</p>
        <p className="font-medium font-mono">{swiftCode}</p>
      </div>
    </div>
  </div>
)

export default function Main() {
  const bannerData: InvoiceBannerProps = {
    icon: FileText,
    title: "Freelance Invoice",
    subtitle: "INV-2024-0087",
    amount: "$4,687.50",
    amountLabel: "Amount Due",
  }

  const invoiceDetails = [
    { label: "Invoice Date", value: "January 30, 2024" },
    { label: "Due Date", value: "February 28, 2024" },
    { label: "Payment Terms", value: "Net 30" },
    { label: "Project", value: "Website Redesign" },
  ]

  const freelancer: ClientInfoProps = {
    title: "From",
    name: "Alex Thompson",
    company: "Thompson Digital",
    address: "456 Creative Lane\nPortland, OR 97201",
    taxId: "Tax ID: 45-6789012",
  }

  const client: ClientInfoProps = {
    title: "Bill To",
    name: "Rachel Green",
    company: "GreenLeaf Marketing",
    address: "789 Brand Street\nDenver, CO 80202",
  }

  const timeEntries: TimeEntry[] = [
    { date: "Jan 8", description: "Discovery & Research", hours: 8, rate: 125.00 },
    { date: "Jan 10", description: "Wireframing & Prototyping", hours: 12, rate: 125.00 },
    { date: "Jan 15", description: "Visual Design - Homepage", hours: 10, rate: 125.00 },
    { date: "Jan 18", description: "Visual Design - Inner Pages", hours: 8, rate: 125.00 },
    { date: "Jan 22", description: "Revisions & Refinements", hours: 5, rate: 125.00 },
  ]

  const totals: TotalSectionProps = {
    subtotal: 5375.00,
    taxRate: 0,
    taxAmount: 0,
    total: 5375.00,
    currency: "$",
  }

  const paymentData: PaymentInfoProps = {
    title: "Wire Transfer Details",
    bankName: "Pacific Northwest Bank",
    accountNumber: "****7890",
    routingNumber: "121000248",
    swiftCode: "PNWBUS33",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardHeader>
            <InvoiceBanner {...bannerData} />
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid @lg:grid-cols-3 gap-6">
              <div className="@lg:col-span-1 space-y-1 text-sm">
                {invoiceDetails.map((detail, index) => (
                  <DetailRow key={index} {...detail} />
                ))}
              </div>
              <div className="@lg:col-span-2 grid @sm:grid-cols-2 gap-6">
                <ClientInfo {...freelancer} />
                <ClientInfo {...client} />
              </div>
            </div>
            <Separator />
            <TimeEntriesTable items={timeEntries} currency="$" />
            <TotalSection {...totals} />
            <div className="grid @md:grid-cols-2 gap-6">
              <PaymentInfo {...paymentData} />
              <div className="flex items-end">
                <Button className="w-full @md:w-auto">Pay Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
