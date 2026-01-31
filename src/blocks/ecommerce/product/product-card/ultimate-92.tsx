import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Rocket, Check, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

interface UltimateProps {
    image: string
    name: string
    brand: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    includes: string[]
    bonuses: string[]
    limitedTime: boolean
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 dark:from-orange-950/30 dark:via-red-950/30 dark:to-pink-950/30">
        <Image src={src} alt={alt} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const UltimateBadge = () => (
    <Badge className="gap-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <Rocket className="size-3" />
        Ultimate
    </Badge>
)

const LimitedBadge = () => (
    <Badge variant="destructive" className="absolute left-3 top-3 animate-pulse gap-1">
        <Sparkles className="size-3" />
        Limited Time Offer
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-bold uppercase tracking-wider text-primary">{text}</span>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-lg font-bold text-foreground">{text}</h3>
)

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const IncludesList = ({ items }: { items: string[] }) => (
    <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Everything Included:</p>
        <div className="space-y-1.5">
            {items.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500">
                        <Check className="size-3 text-white" />
                    </div>
                    <span className="text-foreground">{item}</span>
                </div>
            ))}
        </div>
    </div>
)

const BonusSection = ({ bonuses }: { bonuses: string[] }) => (
    <div className="space-y-2 rounded-lg border border-dashed border-primary/30 bg-primary/5 p-3">
        <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-primary">
            <Sparkles className="size-3" />
            Bonus Included
        </p>
        <div className="space-y-1">
            {bonuses.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ArrowRight className="size-3 text-primary" />
                    {b}
                </div>
            ))}
        </div>
    </div>
)

const PriceDisplay = ({ price, original }: { price: number; original: number }) => {
    const savings = Math.round(((original - price) / original) * 100)
    return (
        <div className="space-y-1">
            <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">${price}</span>
                <span className="text-sm text-muted-foreground line-through">${original}</span>
                <Badge variant="destructive" className="text-xs">-{savings}%</Badge>
            </div>
        </div>
    )
}

const GetButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white hover:from-orange-600 hover:via-red-600 hover:to-pink-600">
        <Rocket className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const ultimate: UltimateProps = {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        name: "Ultimate Creator Bundle",
        brand: "CreatorPro",
        price: 299,
        originalPrice: 599,
        rating: 4.9,
        reviews: 1247,
        includes: [
            "Pro Software License",
            "200+ Premium Templates",
            "1TB Cloud Storage",
            "Priority Support",
            "All Future Updates",
        ],
        bonuses: [
            "Exclusive masterclass ($199 value)",
            "Private community access",
            "1-on-1 onboarding call",
        ],
        limitedTime: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden border-2 border-primary/30 shadow-lg shadow-primary/10">
                    <div className="relative">
                        <ProductImage src={ultimate.image} alt={ultimate.name} />
                        {ultimate.limitedTime && <LimitedBadge />}
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <UltimateBadge />
                            <ProductRating rating={ultimate.rating} reviews={ultimate.reviews} />
                        </div>
                        <BrandLabel text={ultimate.brand} />
                        <ProductName text={ultimate.name} />
                        <IncludesList items={ultimate.includes} />
                        <BonusSection bonuses={ultimate.bonuses} />
                        <Separator />
                        <PriceDisplay price={ultimate.price} original={ultimate.originalPrice} />
                        <GetButton label="Get Ultimate Access" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
