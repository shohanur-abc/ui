import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Award, Calendar, Clock, MapPin, QrCode, Ticket, User } from "lucide-react"

interface TicketDetail {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}

interface EventHeaderProps {
  eventName: string
  eventType: string
  orderNumber: string
  purchaseDate: string
}

interface TicketInfoProps {
  ticketType: string
  quantity: number
  seatInfo: string
  accessLevel: string
}

interface EventDetailsProps {
  details: TicketDetail[]
}

interface PricingBreakdownProps {
  basePrice: number
  quantity: number
  serviceFee: number
  facilityFee: number
  total: number
  currency: string
}

interface QRCodeSectionProps {
  ticketCode: string
  instructions: string
}

const EventHeader = ({ eventName, eventType, orderNumber, purchaseDate }: EventHeaderProps) => (
  <div className="text-center space-y-3">
    <Badge variant="secondary">{eventType}</Badge>
    <h1 className="text-2xl font-bold">{eventName}</h1>
    <div className="flex justify-center gap-4 text-sm text-muted-foreground">
      <span>Order #{orderNumber}</span>
      <span>•</span>
      <span>Purchased {purchaseDate}</span>
    </div>
  </div>
)

const TicketInfo = ({ ticketType, quantity, seatInfo, accessLevel }: TicketInfoProps) => (
  <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Ticket className="size-5 text-primary" />
        <p className="font-semibold">{ticketType}</p>
      </div>
      <Badge>{accessLevel}</Badge>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Quantity</p>
        <p className="font-medium">{quantity} ticket(s)</p>
      </div>
      <div>
        <p className="text-muted-foreground">Seat(s)</p>
        <p className="font-medium">{seatInfo}</p>
      </div>
    </div>
  </div>
)

const EventDetails = ({ details }: EventDetailsProps) => (
  <div className="space-y-3">
    {details.map((detail, index) => (
      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
        <detail.icon className="size-5 text-muted-foreground" />
        <div>
          <p className="text-xs text-muted-foreground">{detail.label}</p>
          <p className="font-medium">{detail.value}</p>
        </div>
      </div>
    ))}
  </div>
)

const PricingBreakdown = ({ basePrice, quantity, serviceFee, facilityFee, total, currency }: PricingBreakdownProps) => (
  <div className="p-4 rounded-lg border space-y-2">
    <p className="font-semibold">Order Summary</p>
    <div className="space-y-1 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">{quantity}x Ticket @ {currency}{basePrice.toFixed(2)}</span>
        <span>{currency}{(basePrice * quantity).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Service Fee</span>
        <span>{currency}{serviceFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Facility Fee</span>
        <span>{currency}{facilityFee.toFixed(2)}</span>
      </div>
    </div>
    <Separator />
    <div className="flex justify-between font-bold text-lg">
      <span>Total Paid</span>
      <span className="text-primary">{currency}{total.toFixed(2)}</span>
    </div>
  </div>
)

const QRCodeSection = ({ ticketCode, instructions }: QRCodeSectionProps) => (
  <div className="p-4 rounded-lg bg-muted/40 text-center space-y-3">
    <div className="flex justify-center">
      <div className="size-32 rounded-lg bg-white flex items-center justify-center border">
        <QrCode className="size-24 text-foreground" />
      </div>
    </div>
    <p className="font-mono text-sm">{ticketCode}</p>
    <p className="text-xs text-muted-foreground">{instructions}</p>
  </div>
)

export default function Main() {
  const header: EventHeaderProps = {
    eventName: "Tech Summit 2024",
    eventType: "Conference",
    orderNumber: "EVT-789012",
    purchaseDate: "Feb 1, 2024",
  }

  const ticket: TicketInfoProps = {
    ticketType: "VIP All-Access Pass",
    quantity: 2,
    seatInfo: "General Admission",
    accessLevel: "VIP",
  }

  const eventDetails: TicketDetail[] = [
    { icon: Calendar, label: "Date", value: "March 15-17, 2024" },
    { icon: Clock, label: "Time", value: "9:00 AM - 6:00 PM Daily" },
    { icon: MapPin, label: "Venue", value: "Convention Center, San Francisco" },
    { icon: User, label: "Attendee", value: "John Smith" },
  ]

  const pricing: PricingBreakdownProps = {
    basePrice: 299.00,
    quantity: 2,
    serviceFee: 35.88,
    facilityFee: 10.00,
    total: 643.88,
    currency: "$",
  }

  const qrCode: QRCodeSectionProps = {
    ticketCode: "TECH24-VIP-ABCD1234",
    instructions: "Show this QR code at the entrance for fast check-in",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardHeader className="border-b">
            <EventHeader {...header} />
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <TicketInfo {...ticket} />
            <EventDetails details={eventDetails} />
            <QRCodeSection {...qrCode} />
            <PricingBreakdown {...pricing} />
          </CardContent>
          <CardFooter className="border-t pt-6 flex-col gap-3">
            <div className="flex flex-wrap gap-3 w-full">
              <Button className="flex-1 gap-2">
                <Award className="size-4" />
                Add to Wallet
              </Button>
              <Button variant="outline" className="flex-1">Download PDF</Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              This ticket is non-transferable. Valid ID required at entry.
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
