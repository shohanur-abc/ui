import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Download, FileText, Receipt } from "lucide-react"

interface InvoiceHeaderProps {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  status: string
}

interface PartyCardProps {
  title: string
  name: string
  address: string
  email: string
}

interface LineItemCardProps {
  name: string
  description: string
  quantity: number
  unitPrice: number
  total: number
  currency: string
}

interface TotalCardProps {
  subtotal: number
  tax: number
  taxRate: number
  total: number
  currency: string
  amountDue: number
}

const InvoiceHeader = ({ invoiceNumber, issueDate, dueDate, status }: InvoiceHeaderProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="size-6 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Invoice {invoiceNumber}</h2>
            <p className="text-sm text-muted-foreground">Issued {issueDate}</p>
          </div>
        </div>
        <div className="text-right">
          <Badge variant="default">{status}</Badge>
          <p className="text-sm text-muted-foreground mt-1">Due {dueDate}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const PartyCard = ({ title, name, address, email }: PartyCardProps) => (
  <Card>
    <CardHeader className="pb-3">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
    </CardHeader>
    <CardContent className="space-y-1">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-muted-foreground">{address}</p>
      <p className="text-sm text-muted-foreground">{email}</p>
    </CardContent>
  </Card>
)

const LineItemCard = ({ name, description, quantity, unitPrice, total, currency }: LineItemCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Qty: {quantity}</span>
            <span>@ {currency}{unitPrice.toFixed(2)}</span>
          </div>
        </div>
        <p className="font-bold text-lg">{currency}{total.toFixed(2)}</p>
      </div>
    </CardContent>
  </Card>
)

const TotalCard = ({ subtotal, tax, taxRate, total, currency, amountDue }: TotalCardProps) => (
  <Card className="bg-muted/30">
    <CardContent className="pt-6 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{currency}{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax ({taxRate}%)</span>
          <span>{currency}{tax.toFixed(2)}</span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{currency}{total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center pt-2 border-t">
        <span className="text-sm text-muted-foreground">Amount Due</span>
        <span className="text-xl font-bold text-primary">{currency}{amountDue.toFixed(2)}</span>
      </div>
    </CardContent>
  </Card>
)

export default function Main() {
  const header: InvoiceHeaderProps = {
    invoiceNumber: "#INV-2024-001",
    issueDate: "Feb 15, 2024",
    dueDate: "Mar 15, 2024",
    status: "Pending",
  }

  const seller: PartyCardProps = {
    title: "From",
    name: "TechSolutions Inc.",
    address: "123 Innovation Drive, San Francisco, CA 94102",
    email: "billing@techsolutions.com",
  }

  const buyer: PartyCardProps = {
    title: "Bill To",
    name: "Acme Corporation",
    address: "456 Business Ave, New York, NY 10001",
    email: "accounts@acmecorp.com",
  }

  const items: LineItemCardProps[] = [
    { name: "Website Development", description: "Custom responsive website", quantity: 1, unitPrice: 5000.00, total: 5000.00, currency: "$" },
    { name: "UI/UX Design", description: "User interface design package", quantity: 1, unitPrice: 2500.00, total: 2500.00, currency: "$" },
    { name: "Hosting (Annual)", description: "Premium hosting service", quantity: 1, unitPrice: 299.00, total: 299.00, currency: "$" },
  ]

  const totals: TotalCardProps = {
    subtotal: 7799.00,
    tax: 779.90,
    taxRate: 10,
    total: 8578.90,
    currency: "$",
    amountDue: 8578.90,
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="space-y-4">
          <InvoiceHeader {...header} />
          <div className="grid @md:grid-cols-2 gap-4">
            <PartyCard {...seller} />
            <PartyCard {...buyer} />
          </div>
          <div className="space-y-3">
            {items.map((item, index) => (
              <LineItemCard key={index} {...item} />
            ))}
          </div>
          <TotalCard {...totals} />
          <Card>
            <CardFooter className="pt-6 gap-3">
              <Button className="flex-1 gap-2">
                <CreditCard className="size-4" />
                Pay Now
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Download className="size-4" />
                Download PDF
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}
