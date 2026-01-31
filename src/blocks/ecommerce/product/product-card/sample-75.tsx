import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Beaker, Heart, Package, ShoppingCart, Star, TestTube, Droplet } from "lucide-react"
import Image from "next/image"

interface SampleProps {
    image: string
    name: string
    brand: string
    price: number
    fullPrice: number
    rating: number
    reviews: number
    category: string
    size: string
    usageCount: string
    limited: boolean
    stock: number
    maxStock: number
}

const SampleImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20">
        <Image src={src} alt={alt} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const SampleBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-rose-500 to-pink-500">
        <TestTube className="size-3" />
        Sample
    </Badge>
)

const LimitedBadge = () => (
    <Badge variant="destructive" className="text-xs">
        Limited
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{text}</span>
)

const SampleName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const SampleRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const SampleDetails = ({ size, usage }: { size: string; usage: string }) => (
    <div className="flex gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
            <Droplet className="size-4" />
            {size}
        </span>
        <span>~{usage} uses</span>
    </div>
)

const StockProgress = ({ current, max }: { current: number; max: number }) => {
    const percent = (current / max) * 100
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>{current} left</span>
                <span>{percent.toFixed(0)}%</span>
            </div>
            <Progress value={percent} className="h-2" />
        </div>
    )
}

const PriceDisplay = ({ sample, full }: { sample: number; full: number }) => (
    <div className="space-y-0.5">
        <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">${sample.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">sample</span>
        </div>
        <p className="text-xs text-muted-foreground">Full size: ${full.toFixed(2)}</p>
    </div>
)

const TryButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Package className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const sample: SampleProps = {
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
        name: "Luxury Face Serum",
        brand: "Glow Lab",
        price: 12.00,
        fullPrice: 89.00,
        rating: 4.8,
        reviews: 456,
        category: "Skincare",
        size: "10ml",
        usageCount: "7-10",
        limited: true,
        stock: 23,
        maxStock: 100,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <SampleImage src={sample.image} alt={sample.name} />
                        <SampleBadge />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            {sample.limited && <LimitedBadge />}
                            <SampleRating rating={sample.rating} reviews={sample.reviews} />
                        </div>
                        <BrandLabel text={sample.brand} />
                        <SampleName text={sample.name} />
                        <SampleDetails size={sample.size} usage={sample.usageCount} />
                        <StockProgress current={sample.stock} max={sample.maxStock} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceDisplay sample={sample.price} full={sample.fullPrice} />
                            <TryButton label="Try" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
