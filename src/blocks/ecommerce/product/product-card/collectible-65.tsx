import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Trophy, TrendingUp, Verified, Tag, Sparkles } from "lucide-react"
import Image from "next/image"

interface CollectibleProps {
    image: string
    name: string
    series: string
    price: number
    marketValue: number
    rating: number
    reviews: number
    rarity: string
    edition: string
    condition: string
    authenticated: boolean
}

const CollectibleImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-950/30 dark:to-yellow-950/30">
        <Image src={src} alt={alt} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 bg-white/80 text-foreground hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const RarityBadge = ({ rarity }: { rarity: string }) => {
    const colors: Record<string, string> = {
        "Common": "bg-slate-500",
        "Uncommon": "bg-green-500",
        "Rare": "bg-blue-500",
        "Epic": "bg-purple-500",
        "Legendary": "bg-gradient-to-r from-amber-500 to-yellow-400",
    }
    return (
        <Badge className={`gap-1 ${colors[rarity] || "bg-primary"}`}>
            <Sparkles className="size-3" />
            {rarity}
        </Badge>
    )
}

const AuthenticatedBadge = () => (
    <Badge variant="outline" className="gap-1 border-green-500 text-green-600">
        <Verified className="size-3" />
        Verified
    </Badge>
)

const CollectibleName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const SeriesInfo = ({ series, edition }: { series: string; edition: string }) => (
    <p className="text-sm text-muted-foreground">{series} • {edition}</p>
)

const CollectibleRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const ConditionBadge = ({ condition }: { condition: string }) => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <Trophy className="size-3" />
        {condition}
    </Badge>
)

const MarketValue = ({ value, price }: { value: number; price: number }) => {
    const change = ((value - price) / price) * 100
    return (
        <div className="flex items-center gap-2 text-sm">
            <TrendingUp className={`size-4 ${change >= 0 ? "text-green-500" : "text-destructive"}`} />
            <span className="text-muted-foreground">Market: ${value.toLocaleString()}</span>
            <span className={change >= 0 ? "text-green-500" : "text-destructive"}>
                ({change >= 0 ? "+" : ""}{change.toFixed(1)}%)
            </span>
        </div>
    )
}

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toLocaleString()}</span>
)

const PurchaseButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const collectible: CollectibleProps = {
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop",
        name: "Vintage Action Figure",
        series: "Classic Heroes",
        price: 299,
        marketValue: 450,
        rating: 4.9,
        reviews: 87,
        rarity: "Rare",
        edition: "1st Edition",
        condition: "Near Mint",
        authenticated: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <CollectibleImage src={collectible.image} alt={collectible.name} />
                        <div className="absolute left-3 top-3">
                            <RarityBadge rarity={collectible.rarity} />
                        </div>
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <ConditionBadge condition={collectible.condition} />
                            {collectible.authenticated && <AuthenticatedBadge />}
                        </div>
                        <div className="space-y-0.5">
                            <CollectibleName text={collectible.name} />
                            <SeriesInfo series={collectible.series} edition={collectible.edition} />
                        </div>
                        <CollectibleRating rating={collectible.rating} reviews={collectible.reviews} />
                        <MarketValue value={collectible.marketValue} price={collectible.price} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={collectible.price} />
                            <PurchaseButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
