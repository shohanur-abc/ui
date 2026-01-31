import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Ticket, Users } from "lucide-react"
import Image from "next/image"

interface EventProductProps {
    image: string
    title: string
    date: string
    time: string
    location: string
    price: number
    spotsLeft: number
    totalSpots: number
    category: string
}

const EventImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
)

const EventCategory = ({ text }: { text: string }) => (
    <Badge className="absolute left-4 top-4">{text}</Badge>
)

const EventTitle = ({ text }: { text: string }) => (
    <h3 className="text-lg font-bold text-foreground">{text}</h3>
)

const EventDetail = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4 text-primary" />
        <span>{text}</span>
    </div>
)

const SpotsIndicator = ({ left, total }: { left: number; total: number }) => {
    const urgency = left <= 10
    return (
        <div className={`flex items-center gap-2 text-sm ${urgency ? "text-destructive" : "text-muted-foreground"}`}>
            <Users className="size-4" />
            <span>{urgency ? `Only ${left} spots left!` : `${left} of ${total} spots available`}</span>
        </div>
    )
}

const PriceTag = ({ amount }: { amount: number }) => (
    <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">${amount}</span>
        <span className="text-sm text-muted-foreground">/ person</span>
    </div>
)

const BookButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2">
        <Ticket className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const event: EventProductProps = {
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=340&fit=crop",
        title: "Tech Innovation Summit 2026",
        date: "March 15, 2026",
        time: "9:00 AM - 6:00 PM",
        location: "San Francisco Convention Center",
        price: 299,
        spotsLeft: 47,
        totalSpots: 500,
        category: "Conference",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <EventImage src={event.image} alt={event.title} />
                        <EventCategory text={event.category} />
                    </div>
                    <div className="space-y-4 p-5">
                        <EventTitle text={event.title} />
                        <div className="space-y-2">
                            <EventDetail icon={Calendar} text={event.date} />
                            <EventDetail icon={Clock} text={event.time} />
                            <EventDetail icon={MapPin} text={event.location} />
                        </div>
                        <SpotsIndicator left={event.spotsLeft} total={event.totalSpots} />
                        <div className="flex items-center justify-between pt-2">
                            <PriceTag amount={event.price} />
                        </div>
                        <BookButton label="Book Now" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
