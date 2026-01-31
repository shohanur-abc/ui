import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, FileText } from "lucide-react"

interface InvoiceHeaderProps {
  invoiceNumber: string
  date: string
  dueDate: string
  status: string
}

interface PartyInfoProps {
  label: string
  name: string
  address: string
}

interface LineItemProps {
  description: string
  amount: number
  currency: string
}

interface TotalsProps {
  subtotal: number
  tax: number
  total: number
  currency: string
}

const InvoiceHeader = ({ invoiceNumber, date, dueDate, status }: InvoiceHeaderProps) => (
  <div className="flex items-start justify-between">
    <div className="flex items-center gap-3">
      <FileText className="size-8 text-primary" />
      <div>
        <p className="text-2xl font-bold">Invoice</p>
        <p className="text-muted-foreground">{invoiceNumber}</p>
      </div>
    </div>
    <div className="text-right space-y-1">
      <Badge variant="default">{status}</Badge>
      <p className="text-sm text-muted-foreground">Issued: {date}</p>
      <p className="text-sm text-muted-foreground">Due: {dueDate}</p>
    </div>
  </div>
)

const PartyInfo = ({ label, name, address }: PartyInfoProps) => (
  <div>
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">{label}</p>
    <p className="font-semibold">{name}</p>
    <p className="text-sm text-muted-foreground whitespace-pre-line">{address}</p>
  </div>
)

const LineItem = ({ description, amount, currency }: LineItemProps) => (
  <div className="flex justify-between py-3">
    <span>{description}</span>
    <span className="font-medium">{currency}{amount.toFixed(2)}</span>
  </div>
)

const Totals = ({ subtotal, tax, total, currency }: TotalsProps) => (
  <div className="space-y-2 pt-4">
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">Subtotal</span>
      <span>{currency}{subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">Tax</span>
      <span>{currency}{tax.toFixed(2)}</span>
    </div>
    <Separator />
    <div className="flex justify-between text-lg font-bold pt-2">
      <span>Total</span>
      <span className="text-primary">{currency}{total.toFixed(2)}</span>
    </div>
  </div>
)

export default function Main() {
  const header: InvoiceHeaderProps = {
    invoiceNumber: "#INV-001234",
    date: "Feb 15, 2024",
    dueDate: "Mar 15, 2024",
    status: "Due",
  }

  const from: PartyInfoProps = {
    label: "From",
    name: "Studio Design Co.",
    address: "123 Creative Lane\nSan Francisco, CA 94102",
  }

  const to: PartyInfoProps = {
    label: "Bill To",
    name: "Acme Corporation",
    address: "456 Business Ave\nNew York, NY 10001",
  }

  const items: LineItemProps[] = [
    { description: "Brand Identity Design", amount: 2500.00, currency: "$" },
    { description: "Website Design", amount: 4500.00, currency: "$" },
    { description: "Marketing Collateral", amount: 1200.00, currency: "$" },
  ]

  const totals: TotalsProps = {
    subtotal: 8200.00,
    tax: 820.00,
    total: 9020.00,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="bg-card border rounded-lg p-6 @md:p-8 space-y-8">
          <InvoiceHeader {...header} />
          <div className="grid @sm:grid-cols-2 gap-6">
            <PartyInfo {...from} />
            <PartyInfo {...to} />
          </div>
          <div>
            <Separator />
            {items.map((item, index) => (
              <div key={index}>
                <LineItem {...item} />
                {index < items.length - 1 && <Separator />}
              </div>
            ))}
            <Separator />
            <Totals {...totals} />
          </div>
          <Button className="w-full gap-2">
            <Download className="size-4" />
            Download Invoice
          </Button>
        </div>
      </div>
    </section>
  )
}
