import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Mic, Play, Radio, Rss, Star, Clock, Headphones } from "lucide-react"
import Image from "next/image"

interface PodcastProps {
    cover: string
    title: string
    host: string
    description: string
    price: number
    rating: number
    reviews: number
    episodes: number
    category: string
    duration: string
    listeners: number
}

const PodcastCover = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="rounded-full bg-white/90 p-3">
                <Play className="size-8 fill-primary text-primary" />
            </div>
        </div>
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 bg-black/50 text-white hover:bg-black/70">
            <Heart className="size-4" />
        </Button>
    </div>
)

const CategoryBadge = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <Mic className="size-3" />
        {text}
    </Badge>
)

const PodcastTitle = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const HostName = ({ name }: { name: string }) => (
    <p className="text-sm text-muted-foreground">Hosted by {name}</p>
)

const PodcastDescription = ({ text }: { text: string }) => (
    <p className="line-clamp-2 text-sm text-muted-foreground">{text}</p>
)

const PodcastRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const PodcastStats = ({ episodes, duration, listeners }: { episodes: number; duration: string; listeners: number }) => (
    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
            <Radio className="size-4" />
            {episodes} episodes
        </span>
        <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {duration}
        </span>
        <span className="flex items-center gap-1">
            <Headphones className="size-4" />
            {listeners.toLocaleString()}
        </span>
    </div>
)

const PriceDisplay = ({ amount }: { amount: number }) => (
    <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">Premium Access</p>
        <span className="text-xl font-bold text-foreground">${amount}/mo</span>
    </div>
)

const SubscribeButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Rss className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const podcast: PodcastProps = {
        cover: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop",
        title: "The Tech Insider",
        host: "Alex Rivera",
        description: "Weekly deep dives into the latest technology trends, startups, and the future of innovation.",
        price: 4.99,
        rating: 4.9,
        reviews: 2341,
        episodes: 156,
        category: "Technology",
        duration: "45 min avg",
        listeners: 125000,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group space-y-4 p-4">
                    <PodcastCover src={podcast.cover} alt={podcast.title} />
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <CategoryBadge text={podcast.category} />
                            <PodcastRating rating={podcast.rating} reviews={podcast.reviews} />
                        </div>
                        <div className="space-y-0.5">
                            <PodcastTitle text={podcast.title} />
                            <HostName name={podcast.host} />
                        </div>
                        <PodcastDescription text={podcast.description} />
                        <PodcastStats 
                            episodes={podcast.episodes} 
                            duration={podcast.duration} 
                            listeners={podcast.listeners} 
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <PriceDisplay amount={podcast.price} />
                        <SubscribeButton label="Subscribe" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
