import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Briefcase, Clock, DollarSign, Heart, MapPin, Star, Building, Users } from "lucide-react"
import Image from "next/image"

interface GigProps {
    image: string
    title: string
    provider: string
    providerAvatar: string
    price: number
    priceUnit: string
    deliveryTime: string
    rating: number
    reviews: number
    level: string
    ordersInQueue: number
}

const GigImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 bg-white/80 text-foreground hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const ProviderInfo = ({ name, avatar, level }: { name: string; avatar: string; level: string }) => (
    <div className="flex items-center gap-2">
        <div className="relative size-8 overflow-hidden rounded-full">
            <Image src={avatar} alt={name} fill className="object-cover" />
        </div>
        <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{name}</span>
            <Badge variant="secondary" className="text-xs">{level}</Badge>
        </div>
    </div>
)

const GigTitle = ({ text }: { text: string }) => (
    <h3 className="line-clamp-2 font-semibold leading-snug text-foreground">{text}</h3>
)

const GigRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews.toLocaleString()})</span>
    </div>
)

const DeliveryTime = ({ time }: { time: string }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Clock className="size-4" />
        {time}
    </div>
)

const QueueStatus = ({ orders }: { orders: number }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Users className="size-4" />
        {orders} in queue
    </div>
)

const PriceDisplay = ({ price, unit }: { price: number; unit: string }) => (
    <div className="flex items-baseline gap-1">
        <span className="text-xs uppercase text-muted-foreground">Starting at</span>
        <span className="text-xl font-bold text-foreground">${price}</span>
        <span className="text-sm text-muted-foreground">/{unit}</span>
    </div>
)

const OrderButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Briefcase className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const gig: GigProps = {
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=340&fit=crop",
        title: "I will build a modern responsive website using React and Tailwind CSS",
        provider: "CodeMaster",
        providerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        price: 150,
        priceUnit: "project",
        deliveryTime: "3 days",
        rating: 4.9,
        reviews: 1247,
        level: "Top Rated",
        ordersInQueue: 5,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <GigImage src={gig.image} alt={gig.title} />
                    <div className="space-y-3 p-4">
                        <ProviderInfo name={gig.provider} avatar={gig.providerAvatar} level={gig.level} />
                        <GigTitle text={gig.title} />
                        <div className="flex items-center justify-between">
                            <GigRating rating={gig.rating} reviews={gig.reviews} />
                            <DeliveryTime time={gig.deliveryTime} />
                        </div>
                        <QueueStatus orders={gig.ordersInQueue} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceDisplay price={gig.price} unit={gig.priceUnit} />
                            <OrderButton label="Order" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
