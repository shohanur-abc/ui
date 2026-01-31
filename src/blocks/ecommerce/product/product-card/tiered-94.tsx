import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Check, X, Layers } from "lucide-react"
import Image from "next/image"

interface CompareProps {
    image: string
    name: string
    brand: string
    price: number
    rating: number
    reviews: number
    tier: "lite" | "standard" | "plus"
    features: { name: string; included: boolean }[]
    recommended: boolean
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const TierBadge = ({ tier }: { tier: string }) => {
    const colors: Record<string, string> = {
        lite: "bg-muted text-muted-foreground",
        standard: "bg-primary text-primary-foreground",
        plus: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    }
    return (
        <Badge className={`gap-1 capitalize ${colors[tier] || colors.standard}`}>
            <Layers className="size-3" />
            {tier}
        </Badge>
    )
}

const RecommendedRibbon = () => (
    <div className="absolute -right-8 top-6 rotate-45 bg-primary px-10 py-1 text-xs font-semibold text-primary-foreground shadow-md">
        Best Value
    </div>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{text}</span>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const FeatureComparison = ({ features }: { features: { name: string; included: boolean }[] }) => (
    <div className="space-y-1.5">
        {features.map((f, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
                <span className={f.included ? "text-foreground" : "text-muted-foreground"}>{f.name}</span>
                {f.included ? (
                    <Check className="size-4 text-green-500" />
                ) : (
                    <X className="size-4 text-muted-foreground/50" />
                )}
            </div>
        ))}
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const SelectButton = ({ label, recommended }: { label: string; recommended: boolean }) => (
    <Button variant={recommended ? "default" : "outline"} className="w-full gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const compare: CompareProps = {
        image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400&h=400&fit=crop",
        name: "Photo Editor Standard",
        brand: "PixelPro",
        price: 9.99,
        rating: 4.6,
        reviews: 2341,
        tier: "standard",
        features: [
            { name: "Basic editing tools", included: true },
            { name: "100+ filters", included: true },
            { name: "RAW file support", included: true },
            { name: "Cloud sync", included: true },
            { name: "AI enhancement", included: false },
            { name: "Batch processing", included: false },
        ],
        recommended: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className={`group relative overflow-hidden ${compare.recommended ? "border-2 border-primary shadow-lg shadow-primary/10" : ""}`}>
                    {compare.recommended && <RecommendedRibbon />}
                    <ProductImage src={compare.image} alt={compare.name} />
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <TierBadge tier={compare.tier} />
                            <ProductRating rating={compare.rating} reviews={compare.reviews} />
                        </div>
                        <BrandLabel text={compare.brand} />
                        <ProductName text={compare.name} />
                        <FeatureComparison features={compare.features} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={compare.price} />
                            <span className="text-xs text-muted-foreground">/month</span>
                        </div>
                        <SelectButton label="Select Plan" recommended={compare.recommended} />
                    </div>
                </Card>
            </div>
        </section>
    )
}
