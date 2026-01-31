import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard } from "lucide-react"

interface ReceiptHeaderProps {
  storeName: string
  storeAddress: string
  transactionId: string
  date: string
}

interface ReceiptItemProps {
  name: string
  quantity: number
  price: number
  currency: string
}

interface PaymentInfoProps {
  method: string
  lastFour: string
  authCode: string
}

interface ReceiptTotalsProps {
  subtotal: number
  tax: number
  total: number
  currency: string
}

const ReceiptHeader = ({ storeName, storeAddress, transactionId, date }: ReceiptHeaderProps) => (
  <div className="text-center space-y-2">
    <p className="text-xl font-bold">{storeName}</p>
    <p className="text-sm text-muted-foreground">{storeAddress}</p>
    <Separator />
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>Trans: {transactionId}</span>
      <span>{date}</span>
    </div>
  </div>
)

const ReceiptItem = ({ name, quantity, price, currency }: ReceiptItemProps) => (
  <div className="flex justify-between text-sm py-1">
    <span>{quantity}x {name}</span>
    <span>{currency}{(quantity * price).toFixed(2)}</span>
  </div>
)

const PaymentInfo = ({ method, lastFour, authCode }: PaymentInfoProps) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2">
      <CreditCard className="size-4 text-muted-foreground" />
      <span>{method} ****{lastFour}</span>
    </div>
    <span className="text-muted-foreground">Auth: {authCode}</span>
  </div>
)

const ReceiptTotals = ({ subtotal, tax, total, currency }: ReceiptTotalsProps) => (
  <div className="space-y-1 text-sm">
    <div className="flex justify-between">
      <span className="text-muted-foreground">Subtotal</span>
      <span>{currency}{subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Tax</span>
      <span>{currency}{tax.toFixed(2)}</span>
    </div>
    <Separator />
    <div className="flex justify-between font-bold text-base pt-1">
      <span>Total</span>
      <span>{currency}{total.toFixed(2)}</span>
    </div>
  </div>
)

export default function Main() {
  const header: ReceiptHeaderProps = {
    storeName: "Coffee House",
    storeAddress: "789 Main Street, Downtown",
    transactionId: "TXN-789456",
    date: "Feb 20, 2024 10:32 AM",
  }

  const items: ReceiptItemProps[] = [
    { name: "Cappuccino", quantity: 2, price: 4.50, currency: "$" },
    { name: "Croissant", quantity: 1, price: 3.25, currency: "$" },
    { name: "Avocado Toast", quantity: 1, price: 8.95, currency: "$" },
  ]

  const payment: PaymentInfoProps = {
    method: "Visa",
    lastFour: "4521",
    authCode: "A78901",
  }

  const totals: ReceiptTotalsProps = {
    subtotal: 21.20,
    tax: 1.91,
    total: 23.11,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-sm px-4 @sm:px-6 py-8 @md:py-12">
        <div className="bg-card border rounded-lg p-6 space-y-4 font-mono">
          <ReceiptHeader {...header} />
          <Separator className="border-dashed" />
          <div>
            {items.map((item, index) => (
              <ReceiptItem key={index} {...item} />
            ))}
          </div>
          <Separator className="border-dashed" />
          <ReceiptTotals {...totals} />
          <Separator className="border-dashed" />
          <PaymentInfo {...payment} />
          <div className="text-center space-y-2 pt-4">
            <p className="text-sm text-muted-foreground">Thank you for your visit!</p>
            <Badge variant="secondary">Paid</Badge>
          </div>
          <Button variant="outline" className="w-full" size="sm">Email Receipt</Button>
        </div>
      </div>
    </section>
  )
}
