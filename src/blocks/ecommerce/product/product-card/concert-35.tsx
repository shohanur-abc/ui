import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, Clock, Heart, Music, Ticket, MapPin } from "lucide-react"
import Image from "next/image"

interface ConcertProps {
    image: string
    artist: string
    venue: string
    date: string
    time: string
    startingPrice: number
    ticketsLeft: number
    genre: string
}

const EventImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white hover:bg-white/20 hover:text-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const GenreBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1.5">
        <Music className="size-3" />
        {text}
    </Badge>
)

const ArtistName = ({ text }: { text: string }) => (
    <h3 className="text-2xl font-bold text-white">{text}</h3>
)

const VenueInfo = ({ venue, date, time }: { venue: string; date: string; time: string }) => (
    <div className="space-y-1.5 text-sm text-white/80">
        <div className="flex items-center gap-2">
            <MapPin className="size-4" />
            {venue}
        </div>
        <div className="flex gap-4">
            <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {date}
            </span>
            <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {time}
            </span>
        </div>
    </div>
)

const TicketInfo = ({ startingPrice, ticketsLeft }: { startingPrice: number; ticketsLeft: number }) => (
    <div className="flex items-center justify-between">
        <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <span className="text-xl font-bold text-foreground">${startingPrice}</span>
        </div>
        <Badge variant={ticketsLeft < 50 ? "destructive" : "secondary"}>
            {ticketsLeft < 50 ? `Only ${ticketsLeft} left!` : `${ticketsLeft} available`}
        </Badge>
    </div>
)

const BuyButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2">
        <Ticket className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const concert: ConcertProps = {
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=530&fit=crop",
        artist: "The Midnight",
        venue: "Madison Square Garden",
        date: "March 15, 2026",
        time: "8:00 PM",
        startingPrice: 75,
        ticketsLeft: 234,
        genre: "Synthwave",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="overflow-hidden">
                    <div className="relative">
                        <EventImage src={concert.image} alt={concert.artist} />
                        <GenreBadge text={concert.genre} />
                        <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
                            <ArtistName text={concert.artist} />
                            <VenueInfo venue={concert.venue} date={concert.date} time={concert.time} />
                        </div>
                    </div>
                    <div className="space-y-4 p-4">
                        <TicketInfo startingPrice={concert.startingPrice} ticketsLeft={concert.ticketsLeft} />
                        <BuyButton label="Get Tickets" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
