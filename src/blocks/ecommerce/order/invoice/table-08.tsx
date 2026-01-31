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
import { Globe, MapPin, Package, Plane, Ship, Truck } from "lucide-react"

interface ShipmentItem {
  description: string
  hsCode: string
  quantity: number
  weight: number
  unitValue: number
}

interface InternationalHeaderProps {
  title: string
  invoiceNumber: string
  type: string
}

interface ShipmentInfoProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  lines: string[]
}

interface ShipmentDetailsProps {
  items: { label: string; value: string }[]
}

interface ItemsTableProps {
  items: ShipmentItem[]
  currency: string
}

interface CostSummaryProps {
  sections: {
    title: string
    items: { label: string; value: number }[]
  }[]
  grandTotal: number
  currency: string
}

interface DeclarationProps {
  title: string
  text: string
  signatureLabel: string
  dateLabel: string
}

const InternationalHeader = ({ title, invoiceNumber, type }: InternationalHeaderProps) => (
  <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
        <Globe className="size-6 text-blue-500" />
      </div>
      <div>
        <h1 className="text-xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground">{invoiceNumber}</p>
      </div>
    </div>
    <Badge variant="outline" className="w-fit text-blue-500 border-blue-500">{type}</Badge>
  </div>
)

const ShipmentInfo = ({ icon: Icon, label, lines }: ShipmentInfoProps) => (
  <div className="p-4 rounded-lg border space-y-2">
    <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
      <Icon className="size-4" />
      <span>{label}</span>
    </div>
    <div className="space-y-0.5">
      {lines.map((line, index) => (
        <p key={index} className={index === 0 ? "font-semibold" : "text-sm text-muted-foreground"}>
          {line}
        </p>
      ))}
    </div>
  </div>
)

const ShipmentDetails = ({ items }: ShipmentDetailsProps) => (
  <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/40">
    {items.map((item, index) => (
      <div key={index}>
        <p className="text-xs text-muted-foreground">{item.label}</p>
        <p className="font-medium">{item.value}</p>
      </div>
    ))}
  </div>
)

const ItemsTable = ({ items, currency }: ItemsTableProps) => (
  <div className="space-y-2">
    <h3 className="font-semibold flex items-center gap-2">
      <Package className="size-4" />
      Commercial Items
    </h3>
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="w-[35%]">Description</TableHead>
            <TableHead>HS Code</TableHead>
            <TableHead className="text-center">Qty</TableHead>
            <TableHead className="text-right">Weight (kg)</TableHead>
            <TableHead className="text-right">Unit Value</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.description}</TableCell>
              <TableCell className="font-mono text-sm">{item.hsCode}</TableCell>
              <TableCell className="text-center">{item.quantity}</TableCell>
              <TableCell className="text-right">{item.weight.toFixed(2)}</TableCell>
              <TableCell className="text-right">{currency}{item.unitValue.toFixed(2)}</TableCell>
              <TableCell className="text-right font-medium">{currency}{(item.quantity * item.unitValue).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
)

const CostSummary = ({ sections, grandTotal, currency }: CostSummaryProps) => (
  <div className="space-y-4">
    {sections.map((section, sIndex) => (
      <div key={sIndex} className="space-y-2">
        <p className="text-sm font-semibold text-muted-foreground">{section.title}</p>
        {section.items.map((item, iIndex) => (
          <div key={iIndex} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{item.label}</span>
            <span>{currency}{item.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    ))}
    <Separator />
    <div className="flex justify-between text-xl font-bold">
      <span>Grand Total</span>
      <span className="text-primary">{currency}{grandTotal.toFixed(2)}</span>
    </div>
  </div>
)

const Declaration = ({ title, text, signatureLabel, dateLabel }: DeclarationProps) => (
  <div className="p-4 rounded-lg border space-y-4">
    <p className="font-semibold">{title}</p>
    <p className="text-sm text-muted-foreground">{text}</p>
    <div className="grid @sm:grid-cols-2 gap-4 pt-4">
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">{signatureLabel}</p>
        <div className="h-12 border-b border-dashed" />
      </div>
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">{dateLabel}</p>
        <div className="h-12 border-b border-dashed" />
      </div>
    </div>
  </div>
)

export default function Main() {
  const headerData: InternationalHeaderProps = {
    title: "Commercial Invoice",
    invoiceNumber: "CI-2024-INT-0892",
    type: "International Export",
  }

  const shipFrom: ShipmentInfoProps = {
    icon: MapPin,
    label: "Ship From (Exporter)",
    lines: [
      "TechExport Ltd.",
      "1200 Industrial Park Drive",
      "Los Angeles, CA 90001, USA",
      "EIN: 12-3456789",
    ],
  }

  const shipTo: ShipmentInfoProps = {
    icon: MapPin,
    label: "Ship To (Importer)",
    lines: [
      "Euro Distribution GmbH",
      "Industriestraße 45",
      "60329 Frankfurt, Germany",
      "VAT: DE123456789",
    ],
  }

  const shipmentDetails = [
    { label: "Invoice Date", value: "Jan 30, 2024" },
    { label: "Terms", value: "CIF Frankfurt" },
    { label: "Currency", value: "USD" },
    { label: "Country of Origin", value: "USA" },
    { label: "Transport Mode", value: "Sea Freight" },
    { label: "Container No.", value: "MSCU1234567" },
    { label: "B/L Number", value: "MSCUSHA123456" },
    { label: "Packages", value: "24 Pallets" },
  ]

  const items: ShipmentItem[] = [
    { description: "Industrial Control Units", hsCode: "8537.10.90", quantity: 50, weight: 125.00, unitValue: 450.00 },
    { description: "Power Supply Modules", hsCode: "8504.40.90", quantity: 100, weight: 200.00, unitValue: 180.00 },
    { description: "Sensor Assemblies", hsCode: "9031.80.00", quantity: 200, weight: 80.00, unitValue: 95.00 },
    { description: "Cable Harnesses", hsCode: "8544.42.90", quantity: 500, weight: 250.00, unitValue: 25.00 },
  ]

  const costSections = [
    {
      title: "Merchandise Value",
      items: [
        { label: "FOB Value", value: 72000.00 },
      ],
    },
    {
      title: "Freight & Insurance",
      items: [
        { label: "Ocean Freight", value: 2800.00 },
        { label: "Insurance (0.5%)", value: 360.00 },
      ],
    },
  ]

  const declarationData: DeclarationProps = {
    title: "Exporter's Declaration",
    text: "I declare that the information contained in this invoice is true and correct. The goods described are of US origin and comply with all applicable export regulations.",
    signatureLabel: "Authorized Signature",
    dateLabel: "Date",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardHeader className="border-b">
            <InternationalHeader {...headerData} />
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid @md:grid-cols-2 gap-4">
              <ShipmentInfo {...shipFrom} />
              <ShipmentInfo {...shipTo} />
            </div>
            <ShipmentDetails items={shipmentDetails} />
            <ItemsTable items={items} currency="$" />
            <div className="grid @lg:grid-cols-2 gap-6">
              <Declaration {...declarationData} />
              <div className="p-4 rounded-lg bg-muted/30">
                <CostSummary sections={costSections} grandTotal={75160.00} currency="$" />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <Plane className="size-4" />
                Track Shipment
              </Button>
              <Button variant="outline" className="gap-2">
                <Ship className="size-4" />
                View B/L
              </Button>
              <Button variant="outline" className="gap-2">
                <Truck className="size-4" />
                Customs Docs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
