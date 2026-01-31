import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, Download } from "lucide-react"

interface QuoteHeaderProps {
  quoteNumber: string
  issueDate: string
  validUntil: string
  status: string
}

interface CompanyInfoProps {
  name: string
  contact: string
  email: string
}

interface QuoteItemProps {
  description: string
  quantity: number
  unitPrice: number
  total: number
  currency: string
}

interface QuoteTotalsProps {
  subtotal: number
  discount: number
  total: number
  currency: string
}

const QuoteHeader = ({ quoteNumber, issueDate, validUntil, status }: QuoteHeaderProps) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-bold">Quote</p>
        <p className="text-muted-foreground">{quoteNumber}</p>
      </div>
      <Badge variant="secondary">{status}</Badge>
    </div>
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <span>Issued: {issueDate}</span>
      <div className="flex items-center gap-1">
        <Clock className="size-3" />
        <span>Valid until: {validUntil}</span>
      </div>
    </div>
  </div>
)

const CompanyInfo = ({ name, contact, email }: CompanyInfoProps) => (
  <div className="text-sm">
    <p className="font-semibold">{name}</p>
    <p className="text-muted-foreground">{contact}</p>
    <p className="text-muted-foreground">{email}</p>
  </div>
)

const QuoteItem = ({ description, quantity, unitPrice, total, currency }: QuoteItemProps) => (
  <div className="grid grid-cols-12 gap-4 py-3 text-sm">
    <div className="col-span-6">{description}</div>
    <div className="col-span-2 text-center text-muted-foreground">{quantity}</div>
    <div className="col-span-2 text-right text-muted-foreground">{currency}{unitPrice.toFixed(2)}</div>
    <div className="col-span-2 text-right font-medium">{currency}{total.toFixed(2)}</div>
  </div>
)

const QuoteTotals = ({ subtotal, discount, total, currency }: QuoteTotalsProps) => (
  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span className="text-muted-foreground">Subtotal</span>
      <span>{currency}{subtotal.toFixed(2)}</span>
    </div>
    {discount > 0 && (
      <div className="flex justify-between text-green-600">
        <span>Volume Discount</span>
        <span>-{currency}{discount.toFixed(2)}</span>
      </div>
    )}
    <Separator />
    <div className="flex justify-between font-bold text-lg pt-1">
      <span>Quote Total</span>
      <span className="text-primary">{currency}{total.toFixed(2)}</span>
    </div>
  </div>
)

export default function Main() {
  const header: QuoteHeaderProps = {
    quoteNumber: "#QT-2024-0045",
    issueDate: "Feb 15, 2024",
    validUntil: "Mar 15, 2024",
    status: "Pending",
  }

  const prepared: CompanyInfoProps = {
    name: "Tech Solutions Inc.",
    contact: "Sales Team",
    email: "sales@techsolutions.com",
  }

  const client: CompanyInfoProps = {
    name: "Global Enterprises",
    contact: "Procurement Dept.",
    email: "procurement@globalent.com",
  }

  const items: QuoteItemProps[] = [
    { description: "Enterprise Software License (Annual)", quantity: 50, unitPrice: 120.00, total: 6000.00, currency: "$" },
    { description: "Implementation Services", quantity: 40, unitPrice: 150.00, total: 6000.00, currency: "$" },
    { description: "Training Package (Per User)", quantity: 50, unitPrice: 50.00, total: 2500.00, currency: "$" },
  ]

  const totals: QuoteTotalsProps = {
    subtotal: 14500.00,
    discount: 1450.00,
    total: 13050.00,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="bg-card border rounded-lg p-6 @md:p-8 space-y-6">
          <QuoteHeader {...header} />
          <div className="grid @sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">From</p>
              <CompanyInfo {...prepared} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">To</p>
              <CompanyInfo {...client} />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wide pb-2">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Unit</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            <Separator />
            {items.map((item, index) => (
              <QuoteItem key={index} {...item} />
            ))}
            <Separator />
          </div>
          <QuoteTotals {...totals} />
          <div className="flex gap-3">
            <Button className="flex-1">Accept Quote</Button>
            <Button variant="outline" className="gap-2">
              <Download className="size-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
