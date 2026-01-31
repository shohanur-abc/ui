import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Check, Copy, Key, Shield } from "lucide-react"

interface LicenseHeaderProps {
  orderNumber: string
  purchaseDate: string
  status: string
}

interface ProductInfoProps {
  name: string
  edition: string
  version: string
  licensedTo: string
  email: string
}

interface LicenseKeyProps {
  licenseKey: string
  activationsUsed: number
  maxActivations: number
  expiryDate: string
}

interface PurchaseSummaryProps {
  price: number
  discount: number
  tax: number
  total: number
  currency: string
  paymentMethod: string
}

const LicenseHeader = ({ orderNumber, purchaseDate, status }: LicenseHeaderProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Key className="size-5 text-primary" />
      </div>
      <div>
        <p className="font-bold">License Receipt</p>
        <p className="text-sm text-muted-foreground">{orderNumber}</p>
      </div>
    </div>
    <div className="text-right">
      <Badge variant="default" className="gap-1">
        <Check className="size-3" />
        {status}
      </Badge>
      <p className="text-xs text-muted-foreground mt-1">{purchaseDate}</p>
    </div>
  </div>
)

const ProductInfo = ({ name, edition, version, licensedTo, email }: ProductInfoProps) => (
  <div className="p-4 rounded-lg bg-muted/50 space-y-3">
    <div>
      <p className="font-semibold">{name}</p>
      <div className="flex gap-2 mt-1">
        <Badge variant="secondary">{edition}</Badge>
        <Badge variant="outline">{version}</Badge>
      </div>
    </div>
    <Separator />
    <div className="text-sm space-y-1">
      <p className="text-muted-foreground">Licensed to:</p>
      <p className="font-medium">{licensedTo}</p>
      <p className="text-muted-foreground">{email}</p>
    </div>
  </div>
)

const LicenseKey = ({ licenseKey, activationsUsed, maxActivations, expiryDate }: LicenseKeyProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium">License Key</p>
      <Button variant="ghost" size="sm" className="gap-1 h-7">
        <Copy className="size-3" />
        Copy
      </Button>
    </div>
    <p className="font-mono text-sm bg-muted p-2 rounded break-all">{licenseKey}</p>
    <div className="flex justify-between text-sm">
      <div className="flex items-center gap-1 text-muted-foreground">
        <Shield className="size-3" />
        <span>Activations: {activationsUsed}/{maxActivations}</span>
      </div>
      <span className="text-muted-foreground">Expires: {expiryDate}</span>
    </div>
  </div>
)

const PurchaseSummary = ({ price, discount, tax, total, currency, paymentMethod }: PurchaseSummaryProps) => (
  <div className="space-y-3">
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">License Price</span>
        <span>{currency}{price.toFixed(2)}</span>
      </div>
      {discount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-{currency}{discount.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-muted-foreground">Tax</span>
        <span>{currency}{tax.toFixed(2)}</span>
      </div>
    </div>
    <Separator />
    <div className="flex justify-between font-bold">
      <span>Total Paid</span>
      <span className="text-primary">{currency}{total.toFixed(2)}</span>
    </div>
    <p className="text-xs text-muted-foreground">Payment: {paymentMethod}</p>
  </div>
)

export default function Main() {
  const header: LicenseHeaderProps = {
    orderNumber: "ORD-2024-78901",
    purchaseDate: "Feb 15, 2024",
    status: "Active",
  }

  const product: ProductInfoProps = {
    name: "DevTools Pro",
    edition: "Professional",
    version: "v3.0",
    licensedTo: "John Developer",
    email: "john@company.com",
  }

  const license: LicenseKeyProps = {
    licenseKey: "XXXX-YYYY-ZZZZ-1234-ABCD-EFGH",
    activationsUsed: 1,
    maxActivations: 3,
    expiryDate: "Feb 15, 2025",
  }

  const summary: PurchaseSummaryProps = {
    price: 199.00,
    discount: 0,
    tax: 17.91,
    total: 216.91,
    currency: "$",
    paymentMethod: "Visa ****4521",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-md px-4 @sm:px-6 py-8 @md:py-12">
        <div className="bg-card border rounded-lg p-6 space-y-6">
          <LicenseHeader {...header} />
          <ProductInfo {...product} />
          <LicenseKey {...license} />
          <PurchaseSummary {...summary} />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" size="sm">Download</Button>
            <Button className="flex-1" size="sm">Manage License</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
