import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Activity, AlertTriangle, Calendar, Car, CheckCircle, Clock, FileText, Gauge, Shield, Wrench } from "lucide-react"

interface VehicleInfoProps {
  make: string
  model: string
  year: number
  vin: string
  mileage: number
  licensePlate: string
  color: string
  engine: string
}

interface CustomerInfoProps {
  name: string
  phone: string
  email: string
  address: string
}

interface ServiceAdvisorProps {
  name: string
  phone: string
  repairOrderNumber: string
  dateIn: string
  dateOut: string
  status: string
}

interface InspectionItemProps {
  system: string
  component: string
  status: string
  notes: string
  recommendation: string
}

interface LaborItemProps {
  code: string
  description: string
  technicianId: string
  hours: number
  rate: number
  total: number
}

interface PartItemProps {
  partNumber: string
  description: string
  quantity: number
  unitPrice: number
  warranty: boolean
  total: number
}

interface InvoiceSummaryProps {
  laborTotal: number
  partsTotal: number
  shopSupplies: number
  hazmatFee: number
  subtotal: number
  tax: number
  total: number
  warranty: number
  customerPay: number
  currency: string
}

const VehicleInfo = ({ make, model, year, vin, mileage, licensePlate, color, engine }: VehicleInfoProps) => (
  <Card className="bg-gradient-to-r from-slate-500/5 to-zinc-500/5">
    <CardContent className="pt-6">
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-lg bg-primary/10 flex items-center justify-center">
          <Car className="size-8 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{year} {make} {model}</h2>
          <p className="text-sm text-muted-foreground">{color} • {engine}</p>
        </div>
        <div className="text-right">
          <Badge variant="secondary" className="font-mono text-lg">{licensePlate}</Badge>
          <p className="text-sm text-muted-foreground mt-1">{mileage.toLocaleString()} mi</p>
        </div>
      </div>
      <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center gap-2">
        <Gauge className="size-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">VIN:</span>
        <span className="font-mono text-sm">{vin}</span>
      </div>
    </CardContent>
  </Card>
)

const CustomerInfo = ({ name, phone, email, address }: CustomerInfoProps) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-sm font-medium text-muted-foreground">Customer Information</CardTitle>
    </CardHeader>
    <CardContent className="space-y-2 text-sm">
      <p className="font-semibold">{name}</p>
      <p className="text-muted-foreground">{phone}</p>
      <p className="text-muted-foreground">{email}</p>
      <p className="text-muted-foreground">{address}</p>
    </CardContent>
  </Card>
)

const ServiceAdvisorCard = ({ name, phone, repairOrderNumber, dateIn, dateOut, status }: ServiceAdvisorProps) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">Repair Order</CardTitle>
        <Badge variant={status === "Complete" ? "default" : "secondary"}>{status}</Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3 text-sm">
      <div>
        <p className="text-xs text-muted-foreground">RO Number</p>
        <p className="font-mono font-bold text-lg">{repairOrderNumber}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Date In</p>
          <p>{dateIn}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Date Out</p>
          <p>{dateOut}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Service Advisor</p>
          <p className="font-medium">{name}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Direct Line</p>
          <p>{phone}</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const InspectionTable = ({ items }: { items: InspectionItemProps[] }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Activity className="size-4" />
        Multi-Point Inspection Results
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>System</TableHead>
            <TableHead>Component</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Recommendation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.system}</TableCell>
              <TableCell>{item.component}</TableCell>
              <TableCell className="text-center">
                {item.status === "Good" && <CheckCircle className="size-5 text-green-500 mx-auto" />}
                {item.status === "Fair" && <Clock className="size-5 text-yellow-500 mx-auto" />}
                {item.status === "Replace" && <AlertTriangle className="size-5 text-red-500 mx-auto" />}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{item.notes}</TableCell>
              <TableCell>
                {item.recommendation && <Badge variant="outline">{item.recommendation}</Badge>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex gap-4 mt-4 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="size-4 text-green-500" />
          <span>Good</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="size-4 text-yellow-500" />
          <span>Monitor / Service Soon</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-red-500" />
          <span>Needs Immediate Attention</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

const LaborTable = ({ items, currency }: { items: LaborItemProps[]; currency: string }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Wrench className="size-4" />
        Labor Charges
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">Op Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Tech ID</TableHead>
            <TableHead className="text-center">Hours</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono">{item.code}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-center">{item.technicianId}</TableCell>
              <TableCell className="text-center">{item.hours}</TableCell>
              <TableCell className="text-right">{currency}{item.rate}</TableCell>
              <TableCell className="text-right font-medium">{currency}{item.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const PartsTable = ({ items, currency }: { items: PartItemProps[]; currency: string }) => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <FileText className="size-4" />
        Parts & Materials
      </CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-32">Part Number</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-center">Warranty</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono text-xs">{item.partNumber}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">{currency}{item.unitPrice.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                {item.warranty && <Shield className="size-4 text-green-500 mx-auto" />}
              </TableCell>
              <TableCell className="text-right font-medium">{currency}{item.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
)

const InvoiceSummary = ({ laborTotal, partsTotal, shopSupplies, hazmatFee, subtotal, tax, total, warranty, customerPay, currency }: InvoiceSummaryProps) => (
  <Card className="bg-primary text-primary-foreground">
    <CardContent className="pt-6 space-y-4">
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="opacity-80">Labor Total</span>
          <span>{currency}{laborTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Parts Total</span>
          <span>{currency}{partsTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Shop Supplies</span>
          <span>{currency}{shopSupplies.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="opacity-80">Hazmat/EPA Fee</span>
          <span>{currency}{hazmatFee.toFixed(2)}</span>
        </div>
      </div>
      <Separator className="bg-primary-foreground/20" />
      <div className="flex justify-between">
        <span className="opacity-80">Subtotal</span>
        <span>{currency}{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="opacity-80">Tax (8.25%)</span>
        <span>{currency}{tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{currency}{total.toFixed(2)}</span>
      </div>
      {warranty > 0 && (
        <div className="flex justify-between text-green-300">
          <span>Warranty Coverage</span>
          <span>-{currency}{warranty.toFixed(2)}</span>
        </div>
      )}
      <Separator className="bg-primary-foreground/20" />
      <div className="flex justify-between font-bold text-2xl">
        <span>Customer Pay</span>
        <span>{currency}{customerPay.toFixed(2)}</span>
      </div>
      <Button variant="secondary" className="w-full">Pay Now</Button>
    </CardContent>
  </Card>
)

export default function Main() {
  const vehicle: VehicleInfoProps = {
    make: "Honda",
    model: "Accord EX-L",
    year: 2022,
    vin: "1HGCV1F34NA000123",
    mileage: 32456,
    licensePlate: "7ABC123",
    color: "Crystal Black Pearl",
    engine: "1.5L Turbo I4",
  }

  const customer: CustomerInfoProps = {
    name: "Jennifer Martinez",
    phone: "(555) 234-5678",
    email: "j.martinez@email.com",
    address: "456 Oak Street, San Diego, CA 92101",
  }

  const advisor: ServiceAdvisorProps = {
    name: "David Chen",
    phone: "(555) 100-2001",
    repairOrderNumber: "RO-2024-08956",
    dateIn: "Feb 18, 2024",
    dateOut: "Feb 19, 2024",
    status: "Complete",
  }

  const inspection: InspectionItemProps[] = [
    { system: "Brakes", component: "Front Pads", status: "Replace", notes: "3mm remaining", recommendation: "Replace Now" },
    { system: "Brakes", component: "Rear Pads", status: "Fair", notes: "5mm remaining", recommendation: "Next Service" },
    { system: "Tires", component: "Front Tires", status: "Good", notes: "6/32 tread depth", recommendation: "" },
    { system: "Tires", component: "Rear Tires", status: "Fair", notes: "4/32 tread depth", recommendation: "Monitor" },
    { system: "Fluids", component: "Brake Fluid", status: "Replace", notes: "Contaminated", recommendation: "Flush" },
    { system: "Battery", component: "12V Battery", status: "Good", notes: "620 CCA", recommendation: "" },
  ]

  const labor: LaborItemProps[] = [
    { code: "BR-101", description: "Replace Front Brake Pads & Rotors", technicianId: "T-042", hours: 1.5, rate: 145, total: 217.50 },
    { code: "FL-205", description: "Brake Fluid Flush Service", technicianId: "T-042", hours: 0.5, rate: 145, total: 72.50 },
    { code: "MP-001", description: "Multi-Point Inspection", technicianId: "T-042", hours: 0.5, rate: 145, total: 0 },
  ]

  const parts: PartItemProps[] = [
    { partNumber: "45022-TBG-A01", description: "Front Brake Pad Set - OEM", quantity: 1, unitPrice: 89.99, warranty: false, total: 89.99 },
    { partNumber: "45251-TBA-A01", description: "Front Brake Rotor - Right", quantity: 1, unitPrice: 124.99, warranty: false, total: 124.99 },
    { partNumber: "45251-TBA-A02", description: "Front Brake Rotor - Left", quantity: 1, unitPrice: 124.99, warranty: false, total: 124.99 },
    { partNumber: "08203-999-A25", description: "DOT 3 Brake Fluid - 1L", quantity: 2, unitPrice: 18.99, warranty: false, total: 37.98 },
  ]

  const summary: InvoiceSummaryProps = {
    laborTotal: 290.00,
    partsTotal: 377.95,
    shopSupplies: 35.00,
    hazmatFee: 4.50,
    subtotal: 707.45,
    tax: 58.36,
    total: 765.81,
    warranty: 0,
    customerPay: 765.81,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <div className="space-y-6">
          <VehicleInfo {...vehicle} />
          <div className="grid @md:grid-cols-2 gap-4">
            <CustomerInfo {...customer} />
            <ServiceAdvisorCard {...advisor} />
          </div>
          <InspectionTable items={inspection} />
          <LaborTable items={labor} currency="$" />
          <PartsTable items={parts} currency="$" />
          <div className="grid @md:grid-cols-3 gap-4">
            <div className="@md:col-span-2 p-4 rounded-lg border bg-muted/30 text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-2">Service Notes:</p>
              <p>Front brake pads were worn below minimum specification. Rotors showed signs of scoring and were replaced. Brake fluid was dark and contaminated - performed full system flush. All work completed per manufacturer specifications. Test drove vehicle - brakes operating normally.</p>
              <p className="mt-3 font-medium text-foreground">Next Service Recommended:</p>
              <p>Tire rotation and rear brake inspection at 37,000 miles</p>
            </div>
            <InvoiceSummary {...summary} />
          </div>
        </div>
      </div>
    </section>
  )
}
