import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Globe, Heart, Landmark, MapPin, Plane, Star, Calendar, Users } from "lucide-react"
import Image from "next/image"

interface TourProps {
    image: string
    title: string
    destination: string
    duration: string
    price: number
    rating: number
    reviews: number
    groupSize: number
    highlights: string[]
    startDate: string
}

const TourImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white hover:bg-white/20">
            <Heart className="size-4" />
        </Button>
    </div>
)

const DestinationBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1.5">
        <Globe className="size-3" />
        {text}
    </Badge>
)

const TourTitle = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const TourLocation = ({ text }: { text: string }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4" />
        {text}
    </div>
)

const TourRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const TourDetails = ({ duration, groupSize, startDate }: { duration: string; groupSize: number; startDate: string }) => (
    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {duration}
        </span>
        <span className="flex items-center gap-1.5">
            <Users className="size-4" />
            Max {groupSize}
        </span>
        <span className="flex items-center gap-1.5">
            <Plane className="size-4" />
            {startDate}
        </span>
    </div>
)

const Highlights = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-1.5">
        {items.map((item, i) => (
            <Badge key={i} variant="outline" className="gap-1 text-xs">
                <Landmark className="size-3" />
                {item}
            </Badge>
        ))}
    </div>
)

const PriceDisplay = ({ amount }: { amount: number }) => (
    <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">From</p>
        <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-foreground">${amount.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/person</span>
        </div>
    </div>
)

const BookButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Plane className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const tour: TourProps = {
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=375&fit=crop",
        title: "Paris & French Riviera Adventure",
        destination: "France",
        duration: "10 Days",
        price: 2999,
        rating: 4.9,
        reviews: 847,
        groupSize: 12,
        highlights: ["Eiffel Tower", "Nice", "Monaco"],
        startDate: "Mar 15",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <TourImage src={tour.image} alt={tour.title} />
                        <DestinationBadge text={tour.destination} />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <TourLocation text={tour.destination} />
                            <TourRating rating={tour.rating} reviews={tour.reviews} />
                        </div>
                        <TourTitle text={tour.title} />
                        <TourDetails duration={tour.duration} groupSize={tour.groupSize} startDate={tour.startDate} />
                        <Highlights items={tour.highlights} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceDisplay amount={tour.price} />
                            <BookButton label="Book" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
