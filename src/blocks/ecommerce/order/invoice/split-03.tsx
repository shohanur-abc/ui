import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Box, Check, CreditCard, Package, Truck } from "lucide-react"

interface OrderItem {
  name: string
  variant: string
  sku: string
  quantity: number
  price: number
  imageIcon: React.ComponentType<{ className?: string }>
}

interface ShippingAddressProps {
  name: string
  address: string[]
  phone: string
}

interface DeliveryTimelineProps {
  steps: { label: string; date: string; completed: boolean; current?: boolean }[]
}

interface OrderItemRowProps {
  item: OrderItem
  currency: string
}

interface OrderTotalsProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: string
}

interface OrderActionsProps {
  orderNumber: string
  status: string
}

const ShippingAddress = ({ name, address, phone }: ShippingAddressProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <div className="flex items-center gap-2">
      <Truck className="size-4 text-muted-foreground" />
      <p className="font-semibold">Shipping Address</p>
    </div>
    <div className="space-y-1 text-sm">
      <p className="font-medium">{name}</p>
      {address.map((line, index) => (
        <p key={index} className="text-muted-foreground">{line}</p>
      ))}
      <p className="text-muted-foreground">{phone}</p>
    </div>
  </div>
)

const DeliveryTimeline = ({ steps }: DeliveryTimelineProps) => (
  <div className="p-4 rounded-lg bg-muted/40 space-y-4">
    <p className="font-semibold">Delivery Status</p>
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className={`mt-0.5 size-5 rounded-full flex items-center justify-center ${
            step.completed ? "bg-green-500 text-white" : 
            step.current ? "bg-primary text-primary-foreground" : 
            "bg-muted-foreground/20"
          }`}>
            {step.completed && <Check className="size-3" />}
          </div>
          <div className="flex-1">
            <p className={step.current ? "font-semibold" : step.completed ? "text-muted-foreground" : "text-muted-foreground/60"}>
              {step.label}
            </p>
            <p className="text-xs text-muted-foreground">{step.date}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const OrderItemRow = ({ item, currency }: OrderItemRowProps) => (
  <div className="flex gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
    <div className="size-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
      <item.imageIcon className="size-8 text-muted-foreground" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium truncate">{item.name}</p>
      <p className="text-sm text-muted-foreground">{item.variant}</p>
      <p className="text-xs text-muted-foreground font-mono">SKU: {item.sku}</p>
    </div>
    <div className="text-right shrink-0">
      <p className="font-semibold">{currency}{(item.quantity * item.price).toFixed(2)}</p>
      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
    </div>
  </div>
)

const OrderTotals = ({ subtotal, shipping, tax, total, currency }: OrderTotalsProps) => (
  <div className="p-4 rounded-lg border space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">Subtotal</span>
      <span>{currency}{subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">Shipping</span>
      <span>{shipping === 0 ? "Free" : `${currency}${shipping.toFixed(2)}`}</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">Tax</span>
      <span>{currency}{tax.toFixed(2)}</span>
    </div>
    <Separator />
    <div className="flex justify-between font-bold text-lg">
      <span>Total</span>
      <span className="text-primary">{currency}{total.toFixed(2)}</span>
    </div>
  </div>
)

const OrderActions = ({ orderNumber, status }: OrderActionsProps) => (
  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Order Number</p>
        <p className="font-mono font-semibold">{orderNumber}</p>
      </div>
      <Badge variant="secondary">{status}</Badge>
    </div>
    <div className="flex gap-2">
      <Button size="sm" className="flex-1">Track Order</Button>
      <Button size="sm" variant="outline" className="flex-1">Get Invoice</Button>
    </div>
  </div>
)

export default function Main() {
  const shippingAddress: ShippingAddressProps = {
    name: "Emily Chen",
    address: ["789 Home Street", "Apt 4B", "Brooklyn, NY 11201"],
    phone: "+1 (555) 987-6543",
  }

  const timeline = [
    { label: "Order Placed", date: "Feb 10, 2024", completed: true },
    { label: "Processing", date: "Feb 10, 2024", completed: true },
    { label: "Shipped", date: "Feb 11, 2024", completed: true },
    { label: "Out for Delivery", date: "Feb 13, 2024", completed: false, current: true },
    { label: "Delivered", date: "Expected Feb 13", completed: false },
  ]

  const items: OrderItem[] = [
    { name: "Ergonomic Office Chair", variant: "Gray / Mesh Back", sku: "CHR-ERG-001", quantity: 1, price: 449.00, imageIcon: Box },
    { name: "Standing Desk Converter", variant: "Black / 36 inch", sku: "DSK-STD-036", quantity: 1, price: 299.00, imageIcon: Package },
    { name: "Monitor Arm Mount", variant: "Dual / Silver", sku: "MNT-DL-SLV", quantity: 1, price: 89.00, imageIcon: Box },
  ]

  const totals: OrderTotalsProps = {
    subtotal: 837.00,
    shipping: 0,
    tax: 75.33,
    total: 912.33,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="grid @lg:grid-cols-5 gap-6">
              <div className="@lg:col-span-2 space-y-4">
                <OrderActions orderNumber="#ORD-2024-5678" status="In Transit" />
                <ShippingAddress {...shippingAddress} />
                <DeliveryTimeline steps={timeline} />
              </div>
              <div className="@lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Order Details</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CreditCard className="size-4" />
                    <span>Visa •••• 4242</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <OrderItemRow key={index} item={item} currency="$" />
                  ))}
                </div>
                <OrderTotals {...totals} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
