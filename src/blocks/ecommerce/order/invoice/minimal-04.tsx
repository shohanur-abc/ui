import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Truck } from "lucide-react"

interface OrderHeaderProps {
  orderNumber: string
  orderDate: string
  status: string
}

interface ShippingInfoProps {
  name: string
  address: string
  method: string
  estimatedDelivery: string
}

interface OrderItemProps {
  name: string
  variant: string
  quantity: number
  price: number
  currency: string
}

interface OrderTotalsProps {
  subtotal: number
  shipping: number
  tax: number
  total: number
  currency: string
}

const OrderHeader = ({ orderNumber, orderDate, status }: OrderHeaderProps) => (
  <div className="flex items-center justify-between">
    <div>
      <p className="text-lg font-bold">Order {orderNumber}</p>
      <p className="text-sm text-muted-foreground">Placed on {orderDate}</p>
    </div>
    <Badge variant="secondary" className="gap-1">
      <Truck className="size-3" />
      {status}
    </Badge>
  </div>
)

const ShippingInfo = ({ name, address, method, estimatedDelivery }: ShippingInfoProps) => (
  <div className="p-4 rounded-lg border space-y-2">
    <div className="flex items-center gap-2 text-sm font-medium">
      <Package className="size-4" />
      <span>Shipping to</span>
    </div>
    <div className="text-sm">
      <p className="font-medium">{name}</p>
      <p className="text-muted-foreground">{address}</p>
    </div>
    <div className="text-xs text-muted-foreground">
      {method} • Est. delivery: {estimatedDelivery}
    </div>
  </div>
)

const OrderItem = ({ name, variant, quantity, price, currency }: OrderItemProps) => (
  <div className="flex justify-between py-3">
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-muted-foreground">{variant} × {quantity}</p>
    </div>
    <p className="font-medium">{currency}{(price * quantity).toFixed(2)}</p>
  </div>
)

const OrderTotals = ({ subtotal, shipping, tax, total, currency }: OrderTotalsProps) => (
  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span className="text-muted-foreground">Subtotal</span>
      <span>{currency}{subtotal.toFixed(2)}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-muted-foreground">Shipping</span>
      <span>{shipping === 0 ? "Free" : `${currency}${shipping.toFixed(2)}`}</span>
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
  const header: OrderHeaderProps = {
    orderNumber: "#ORD-5678",
    orderDate: "February 18, 2024",
    status: "Shipped",
  }

  const shipping: ShippingInfoProps = {
    name: "John Smith",
    address: "123 Main St, Apt 4B, Brooklyn, NY 11201",
    method: "Standard Shipping",
    estimatedDelivery: "Feb 22-24",
  }

  const items: OrderItemProps[] = [
    { name: "Wireless Headphones", variant: "Black", quantity: 1, price: 149.00, currency: "$" },
    { name: "Phone Case", variant: "Clear", quantity: 2, price: 24.99, currency: "$" },
  ]

  const totals: OrderTotalsProps = {
    subtotal: 198.98,
    shipping: 0,
    tax: 17.91,
    total: 216.89,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <OrderHeader {...header} />
          <ShippingInfo {...shipping} />
          <div>
            {items.map((item, index) => (
              <div key={index}>
                <OrderItem {...item} />
                {index < items.length - 1 && <Separator />}
              </div>
            ))}
          </div>
          <Separator />
          <OrderTotals {...totals} />
          <Button variant="outline" className="w-full" size="sm">Track Package</Button>
        </div>
      </div>
    </section>
  )
}
