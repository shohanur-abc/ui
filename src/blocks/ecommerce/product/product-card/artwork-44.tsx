import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Brush, Heart, Palette, ShoppingCart, Star, Frame, Ruler } from "lucide-react"
import Image from "next/image"

interface ArtworkProps {
    image: string
    title: string
    artist: string
    price: number
    medium: string
    dimensions: string
    style: string
    rating: number
    limited: boolean
    edition?: string
}

const ArtworkImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
        <div className="absolute inset-2 rounded-lg border-8 border-amber-900/20 dark:border-amber-100/10" />
        <Image src={src} alt={alt} fill className="object-cover" />
        <Button size="icon-sm" variant="ghost" className="absolute right-4 top-4 bg-white/80 backdrop-blur-sm hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const LimitedBadge = ({ edition }: { edition: string }) => (
    <Badge className="absolute left-4 top-4 gap-1.5 bg-amber-600 text-white">
        <Frame className="size-3" />
        {edition}
    </Badge>
)

const StyleBadge = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <Palette className="size-3" />
        {text}
    </Badge>
)

const ArtworkTitle = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const ArtistName = ({ name }: { name: string }) => (
    <p className="text-sm text-muted-foreground">by {name}</p>
)

const ArtworkRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
    </div>
)

const ArtworkDetails = ({ medium, dimensions }: { medium: string; dimensions: string }) => (
    <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
            <Brush className="size-3" />
            {medium}
        </span>
        <span className="flex items-center gap-1.5">
            <Ruler className="size-3" />
            {dimensions}
        </span>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toLocaleString()}</span>
)

const InquireButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        {label}
    </Button>
)

export default function Main() {
    const artwork: ArtworkProps = {
        image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop",
        title: "Urban Dreams",
        artist: "Elena Martinez",
        price: 2400,
        medium: "Oil on Canvas",
        dimensions: "36\" × 48\"",
        style: "Contemporary",
        rating: 4.9,
        limited: true,
        edition: "1/25 Edition",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <ArtworkImage src={artwork.image} alt={artwork.title} />
                        {artwork.limited && artwork.edition && <LimitedBadge edition={artwork.edition} />}
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <StyleBadge text={artwork.style} />
                            <ArtworkRating rating={artwork.rating} />
                        </div>
                        <div className="space-y-0.5">
                            <ArtworkTitle text={artwork.title} />
                            <ArtistName name={artwork.artist} />
                        </div>
                        <ArtworkDetails medium={artwork.medium} dimensions={artwork.dimensions} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={artwork.price} />
                            <InquireButton label="Inquire" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
