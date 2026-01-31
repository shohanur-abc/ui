import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CalendarDays, Hash, Receipt } from "lucide-react"

interface InvoiceItem {
  name: string
  quantity: number
  price: number
}

interface HeaderProps {
  companyName: string
  tagline: string
}

interface MetaItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

interface AddressCardProps {
  title: string
  name: string
  lines: string[]
}

interface ItemCardProps {
  item: InvoiceItem
  currency: string
}

interface SummaryRowProps {
  label: string
  value: string
  isBold?: boolean
  isHighlight?: boolean
}

const Header = ({ companyName, tagline }: HeaderProps) => (
  <div className="text-center space-y-1">
    <h1 className="text-2xl font-bold tracking-tight">{companyName}</h1>
    <p className="text-sm text-muted-foreground">{tagline}</p>
  </div>
)

const MetaItem = ({ icon: Icon, label, value }: MetaItemProps) => (
  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/40">
    <Icon className="size-4 text-muted-foreground" />
    <div className="text-sm">
      <span className="text-muted-foreground">{label}: </span>
      <span className="font-medium">{value}</span>
    </div>
  </div>
)

const AddressCard = ({ title, name, lines }: AddressCardProps) => (
  <div className="p-4 rounded-lg border space-y-2">
    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
    <p className="font-semibold">{name}</p>
    {lines.map((line, index) => (
      <p key={index} className="text-sm text-muted-foreground">{line}</p>
    ))}
  </div>
)

const ItemCard = ({ item, currency }: ItemCardProps) => (
  <div className="p-4 rounded-lg border flex items-center justify-between">
    <div>
      <p className="font-medium">{item.name}</p>
      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
    </div>
    <p className="font-semibold">{currency}{(item.quantity * item.price).toFixed(2)}</p>
  </div>
)

const SummaryRow = ({ label, value, isBold, isHighlight }: SummaryRowProps) => (
  <div className={`flex justify-between ${isBold ? "font-bold text-lg" : "text-sm"} ${isHighlight ? "text-primary" : ""}`}>
    <span className={isBold ? "" : "text-muted-foreground"}>{label}</span>
    <span>{value}</span>
  </div>
)

export default function Main() {
  const header = { companyName: "SimpleBill Co.", tagline: "Simple. Clear. Professional." }

  const meta = [
    { icon: Hash, label: "Invoice", value: "#SB-2024-001" },
    { icon: CalendarDays, label: "Date", value: "Feb 1, 2024" },
    { icon: Receipt, label: "Due", value: "Mar 1, 2024" },
  ]

  const from: AddressCardProps = {
    title: "From",
    name: "SimpleBill Co.",
    lines: ["123 Invoice Street", "Business City, BC 12345", "hello@simplebill.co"],
  }

  const to: AddressCardProps = {
    title: "Bill To",
    name: "Jane Customer",
    lines: ["456 Client Avenue", "Customer Town, CT 67890", "jane@customer.com"],
  }

  const items: InvoiceItem[] = [
    { name: "Consulting Services", quantity: 10, price: 150.00 },
    { name: "Project Management", quantity: 5, price: 200.00 },
    { name: "Documentation", quantity: 1, price: 500.00 },
  ]

  const summaryRows = [
    { label: "Subtotal", value: "$3,000.00" },
    { label: "Tax (10%)", value: "$300.00" },
  ]

  return (
    <section className="@container">
      <div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardHeader className="text-center border-b">
            <Header {...header} />
            <Badge variant="secondary" className="mx-auto mt-4">Pending Payment</Badge>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid @sm:grid-cols-3 gap-3">
              {meta.map((item, index) => (
                <MetaItem key={index} {...item} />
              ))}
            </div>
            <div className="grid @sm:grid-cols-2 gap-4">
              <AddressCard {...from} />
              <AddressCard {...to} />
            </div>
            <Separator />
            <div className="space-y-3">
              <p className="text-sm font-semibold">Items</p>
              {items.map((item, index) => (
                <ItemCard key={index} item={item} currency="$" />
              ))}
            </div>
            <div className="p-4 rounded-lg bg-muted/30 space-y-2">
              {summaryRows.map((row, index) => (
                <SummaryRow key={index} {...row} />
              ))}
              <Separator />
              <SummaryRow label="Total Due" value="$3,300.00" isBold isHighlight />
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 text-center">
            <p className="text-sm text-muted-foreground w-full">
              Thank you for your business! Payment due within 30 days.
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
