import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Armchair, Clock, Film, MapPin, Popcorn, QrCode, Ticket, Users } from "lucide-react"

interface MovieInfoProps {
  title: string
  genre: string
  duration: string
  rating: string
  format: string
}

interface ShowtimeDetailsProps {
  date: string
  time: string
  theater: string
  screen: string
  seats: string[]
}

interface BookingSummaryProps {
  confirmationNumber: string
  bookedAt: string
  status: string
}

interface ConcessionOrderProps {
  items: { name: string; quantity: number; price: number }[]
  currency: string
}

interface PaymentSummaryProps {
  tickets: { type: string; quantity: number; price: number }[]
  concessions: number
  convenienceFee: number
  total: number
  currency: string
}

const MovieInfo = ({ title, genre, duration, rating, format }: MovieInfoProps) => (
  <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 space-y-4">
    <div className="flex items-center gap-3">
      <div className="size-16 rounded-xl bg-background flex items-center justify-center">
        <Film className="size-8 text-primary" />
      </div>
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{genre}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">{duration}</Badge>
      <Badge variant="outline">{rating}</Badge>
      <Badge variant="secondary">{format}</Badge>
    </div>
  </div>
)

const ShowtimeDetails = ({ date, time, theater, screen, seats }: ShowtimeDetailsProps) => (
  <div className="p-4 rounded-lg border space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div className="p-3 rounded-lg bg-muted/40 space-y-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="size-3" />
          Showtime
        </div>
        <p className="font-bold">{time}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
      <div className="p-3 rounded-lg bg-muted/40 space-y-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          Location
        </div>
        <p className="font-medium">{theater}</p>
        <p className="text-sm text-muted-foreground">{screen}</p>
      </div>
    </div>
    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
      <div className="flex items-center gap-2 mb-2">
        <Armchair className="size-4 text-primary" />
        <p className="font-semibold">Your Seats</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {seats.map((seat, index) => (
          <Badge key={index} variant="default">{seat}</Badge>
        ))}
      </div>
    </div>
  </div>
)

const BookingSummary = ({ confirmationNumber, bookedAt, status }: BookingSummaryProps) => (
  <div className="p-4 rounded-lg bg-muted/40 space-y-3">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Confirmation</p>
        <p className="font-mono font-bold">{confirmationNumber}</p>
      </div>
      <Badge variant="default">{status}</Badge>
    </div>
    <p className="text-sm text-muted-foreground">Booked: {bookedAt}</p>
  </div>
)

const ConcessionOrder = ({ items, currency }: ConcessionOrderProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <div className="flex items-center gap-2">
      <Popcorn className="size-4 text-muted-foreground" />
      <p className="font-semibold">Concessions (Pick up at Counter 3)</p>
    </div>
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex justify-between text-sm">
          <span>{item.quantity}x {item.name}</span>
          <span>{currency}{item.price.toFixed(2)}</span>
        </div>
      ))}
    </div>
  </div>
)

const PaymentSummary = ({ tickets, concessions, convenienceFee, total, currency }: PaymentSummaryProps) => (
  <div className="p-4 rounded-lg border space-y-3">
    <p className="font-semibold">Payment Summary</p>
    <div className="space-y-2 text-sm">
      {tickets.map((ticket, index) => (
        <div key={index} className="flex justify-between">
          <span className="text-muted-foreground">{ticket.quantity}x {ticket.type}</span>
          <span>{currency}{(ticket.quantity * ticket.price).toFixed(2)}</span>
        </div>
      ))}
      <div className="flex justify-between">
        <span className="text-muted-foreground">Concessions</span>
        <span>{currency}{concessions.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Convenience Fee</span>
        <span>{currency}{convenienceFee.toFixed(2)}</span>
      </div>
    </div>
    <Separator />
    <div className="flex justify-between font-bold text-lg">
      <span>Total Paid</span>
      <span className="text-primary">{currency}{total.toFixed(2)}</span>
    </div>
  </div>
)

export default function Main() {
  const movie: MovieInfoProps = {
    title: "Dune: Part Two",
    genre: "Sci-Fi • Adventure",
    duration: "2h 46m",
    rating: "PG-13",
    format: "IMAX 3D",
  }

  const showtime: ShowtimeDetailsProps = {
    date: "Saturday, Feb 24, 2024",
    time: "7:30 PM",
    theater: "Cineplex Downtown",
    screen: "IMAX Theater 1",
    seats: ["J-12", "J-13", "J-14", "J-15"],
  }

  const booking: BookingSummaryProps = {
    confirmationNumber: "MOV-2024-78901",
    bookedAt: "Feb 18, 2024 at 3:45 PM",
    status: "Confirmed",
  }

  const concessions = [
    { name: "Large Popcorn Combo", quantity: 2, price: 15.99 },
    { name: "Nachos", quantity: 1, price: 7.99 },
  ]

  const payment: PaymentSummaryProps = {
    tickets: [
      { type: "Adult IMAX 3D", quantity: 2, price: 24.99 },
      { type: "Child IMAX 3D", quantity: 2, price: 18.99 },
    ],
    concessions: 39.97,
    convenienceFee: 3.50,
    total: 131.43,
    currency: "$",
  }

  return (
    <section className="@container">
      <div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
        <Card>
          <CardContent className="pt-6">
            <div className="grid @lg:grid-cols-5 gap-6">
              <div className="@lg:col-span-2 space-y-4">
                <MovieInfo {...movie} />
                <div className="p-4 rounded-lg bg-muted/40 text-center space-y-3">
                  <div className="size-32 mx-auto rounded-lg bg-white flex items-center justify-center">
                    <QrCode className="size-24 text-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Show this at entry</p>
                </div>
              </div>
              <div className="@lg:col-span-3 space-y-4">
                <div className="flex items-center gap-2">
                  <Ticket className="size-5 text-primary" />
                  <h2 className="text-xl font-bold">Movie Tickets</h2>
                </div>
                <BookingSummary {...booking} />
                <ShowtimeDetails {...showtime} />
                <ConcessionOrder items={concessions} currency="$" />
                <PaymentSummary {...payment} />
                <div className="flex gap-3">
                  <Button className="flex-1">Add to Wallet</Button>
                  <Button variant="outline" className="flex-1">Email Tickets</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
