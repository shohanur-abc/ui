import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Heart, MapPin, QrCode, ShoppingCart, Ticket, Users } from "lucide-react"
import Image from "next/image"

interface EventTicketProps {
    image: string
    eventName: string
    venue: string
    date: string
    time: string
    price: number
    ticketType: string
    section: string
    row: string
    seats: number
    soldBy: string
}

const EventImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[21/9] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white hover:bg-white/20">
            <Heart className="size-4" />
        </Button>
    </div>
)

const TicketTypeBadge = ({ type }: { type: string }) => {
    const colors: Record<string, string> = {
        "VIP": "bg-gradient-to-r from-amber-500 to-yellow-400 text-black",
        "Premium": "bg-purple-600",
        "Standard": "bg-blue-600",
        "General": "bg-slate-600",
    }
    return (
        <Badge className={`gap-1 ${colors[type] || "bg-primary"}`}>
            <Ticket className="size-3" />
            {type}
        </Badge>
    )
}

const EventName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const VenueInfo = ({ venue }: { venue: string }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4" />
        {venue}
    </div>
)

const EventDateTime = ({ date, time }: { date: string; time: string }) => (
    <div className="flex gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {date}
        </span>
        <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {time}
        </span>
    </div>
)

const SeatDetails = ({ section, row, seats }: { section: string; row: string; seats: number }) => (
    <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
        <div className="text-center">
            <p className="text-xs text-muted-foreground">Section</p>
            <p className="font-semibold text-foreground">{section}</p>
        </div>
        <div className="text-center border-x border-border">
            <p className="text-xs text-muted-foreground">Row</p>
            <p className="font-semibold text-foreground">{row}</p>
        </div>
        <div className="text-center">
            <p className="text-xs text-muted-foreground">Seats</p>
            <p className="font-semibold text-foreground">{seats}</p>
        </div>
    </div>
)

const SellerInfo = ({ name }: { name: string }) => (
    <p className="text-xs text-muted-foreground">Sold by {name}</p>
)

const PriceDisplay = ({ price, seats }: { price: number; seats: number }) => (
    <div className="space-y-0.5">
        <span className="text-xl font-bold text-foreground">${price}</span>
        <p className="text-xs text-muted-foreground">per ticket × {seats}</p>
    </div>
)

const BuyButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <QrCode className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const ticket: EventTicketProps = {
        image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=700&h=300&fit=crop",
        eventName: "Taylor Swift - Eras Tour",
        venue: "Madison Square Garden, NYC",
        date: "Aug 15, 2025",
        time: "7:30 PM",
        price: 350,
        ticketType: "VIP",
        section: "A",
        row: "5",
        seats: 2,
        soldBy: "Verified Seller",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <EventImage src={ticket.image} alt={ticket.eventName} />
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <TicketTypeBadge type={ticket.ticketType} />
                            <SellerInfo name={ticket.soldBy} />
                        </div>
                        <EventName text={ticket.eventName} />
                        <VenueInfo venue={ticket.venue} />
                        <EventDateTime date={ticket.date} time={ticket.time} />
                        <SeatDetails section={ticket.section} row={ticket.row} seats={ticket.seats} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceDisplay price={ticket.price} seats={ticket.seats} />
                            <BuyButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
