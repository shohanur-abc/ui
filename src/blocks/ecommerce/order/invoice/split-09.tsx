import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Home, Key, MapPin, Shield, Star, User } from "lucide-react"

interface PropertyFeatureProps {
  icon: React.ComponentType<{ className?: string }>
  text: string
}

interface PropertyInfoProps {
  name: string
  type: string
  location: string
  rating: number
  reviews: number
  features: PropertyFeatureProps[]
}

interface ReservationDetailsProps {
  confirmationCode: string
  checkIn: string
  checkOut: string
  guests: number
  status: string
}

interface HostInfoProps {
  name: string
  responseRate: number
  isSuperhost: boolean
}

interface PricingBreakdownProps {
  nightlyRate: number
  nights: number
  cleaningFee: number
  serviceFee: number
  taxes: number
  total: number
  currency: string
}

const PropertyInfo = ({ name, type, location, rating, reviews, features }: PropertyInfoProps) => (
  <div className="p-6 rounded-xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 space-y-4">
    <div>
      <Badge variant="secondary" className="mb-2">{type}</Badge>
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
        <MapPin className="size-3" />
        <span>{location}</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <Star className="size-4 fill-amber-400 text-amber-400" />
      <span className="font-medium">{rating}</span>
      <span className="text-muted-foreground">({reviews} reviews)</span>
    </div>
    <div className="grid grid-cols-2 gap-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <feature.icon className="size-4 text-muted-foreground" />
          <span>{feature.text}</span>
        </div>
      ))}
    </div>
  </div>
)

const ReservationDetails = ({ confirmationCode, checkIn, checkOut, guests, status }: ReservationDetailsProps) => (
  <div className="p-4 rounded-lg bg-muted/40 space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Confirmation Code</p>
        <p className="font-mono font-bold text-lg">{confirmationCode}</p>
      </div>
      <Badge variant="default">{status}</Badge>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <div className="p-3 rounded-lg bg-background space-y-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="size-3" />
          Check-in
        </div>
        <p className="font-medium">{checkIn}</p>
        <p className="text-xs text-muted-foreground">After 3:00 PM</p>
      </div>
      <div className="p-3 rounded-lg bg-background space-y-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="size-3" />
          Check-out
        </div>
        <p className="font-medium">{checkOut}</p>
        <p className="text-xs text-muted-foreground">Before 11:00 AM</p>
      </div>
      <div className="p-3 rounded-lg bg-background space-y-1">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <User className="size-3" />
          Guests
        </div>
        <p className="font-medium">{guests} guests</p>
      </div>
    </div>
  </div>
)

const HostInfo = ({ name, responseRate, isSuperhost }: HostInfoProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-muted flex items-center justify-center">
          <User className="size-5" />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          {isSuperhost && (
            <Badge variant="outline" className="text-xs gap-1">
              <Star className="size-3" />
              Superhost
            </Badge>
          )}
        </div>
      </div>
      <Button variant="outline" size="sm">Message Host</Button>
    </div>
    <p className="text-sm text-muted-foreground">Response rate: {responseRate}%</p>
  </div>
)

const PricingBreakdown = ({ nightlyRate, nights, cleaningFee, serviceFee, taxes, total, currency }: PricingBreakdownProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <p className="font-semibold">Price Breakdown</p>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-muted-foreground">{currency}{nightlyRate} × {nights} nights</span>
        <span>{currency}{(nightlyRate * nights).toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Cleaning fee</span>
        <span>{currency}{cleaningFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Service fee</span>
        <span>{currency}{serviceFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Taxes</span>
        <span>{currency}{taxes.toFixed(2)}</span>
      </div>
    </div>
    <Separator />
    <div className="flex justify-between font-bold text-lg">
      <span>Total</span>
      <span className="text-primary">{currency}{total.toFixed(2)}</span>
    </div>
  </div>
)

export default function Main() {
  const features: PropertyFeatureProps[] = [
    { icon: Home, text: "Entire home" },
    { icon: Key, text: "Self check-in" },
    { icon: Shield, text: "Free cancellation" },
    { icon: Clock, text: "Flexible checkout" },
  ]

  const property: PropertyInfoProps = {
    name: "Cozy Mountain Cabin with Hot Tub",
    type: "Cabin",
    location: "Lake Tahoe, California",
    rating: 4.95,
    reviews: 248,
    features,
  }

  const reservation: ReservationDetailsProps = {
    confirmationCode: "HMAB1234XY",
    checkIn: "Feb 22",
    checkOut: "Feb 25",
    guests: 4,
    status: "Confirmed",
  }

  const host: HostInfoProps = {
    name: "Sarah & Mike",
    responseRate: 98,
    isSuperhost: true,
  }

  const pricing: PricingBreakdownProps = {
    nightlyRate: 275.00,
    nights: 3,
    cleaningFee: 125.00,
    serviceFee: 116.75,
    taxes: 91.50,
    total: 1158.25,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="grid @lg:grid-cols-5 gap-6">
              <div className="@lg:col-span-2 space-y-4">
                <PropertyInfo {...property} />
                <HostInfo {...host} />
              </div>
              <div className="@lg:col-span-3 space-y-4">
                <h2 className="text-xl font-bold">Reservation Confirmed</h2>
                <ReservationDetails {...reservation} />
                <PricingBreakdown {...pricing} />
                <div className="flex gap-3">
                  <Button className="flex-1">Get Directions</Button>
                  <Button variant="outline" className="flex-1">View Itinerary</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
