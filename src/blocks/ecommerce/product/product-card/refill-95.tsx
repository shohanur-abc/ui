import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, RotateCcw, Check, Award, RefreshCw } from "lucide-react"
import Image from "next/image"

interface RefillProps {
    image: string
    name: string
    brand: string
    price: number
    subscribePrice: number
    rating: number
    reviews: number
    size: string
    supplyDuration: string
    subscribeAndSave: boolean
    benefits: string[]
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <Image src={src} alt={alt} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const RefillBadge = () => (
    <Badge variant="secondary" className="gap-1">
        <RefreshCw className="size-3" />
        Refillable
    </Badge>
)

const SubscribeBadge = ({ savings }: { savings: number }) => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
        <RotateCcw className="size-3" />
        Save {savings}% with Subscribe
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{text}</span>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const ProductSize = ({ size, duration }: { size: string; duration: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{size}</span>
        <span>•</span>
        <span>{duration} supply</span>
    </div>
)

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const BenefitsList = ({ benefits }: { benefits: string[] }) => (
    <div className="space-y-1.5">
        <p className="text-xs font-medium text-muted-foreground">Subscribe Benefits:</p>
        {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-4 text-green-500" />
                {b}
            </div>
        ))}
    </div>
)

const PriceOptions = ({ oneTime, subscribe }: { oneTime: number; subscribe: number }) => (
    <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-muted-foreground/20 p-2">
            <span className="text-sm text-muted-foreground">One-time</span>
            <span className="font-semibold">${oneTime.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border-2 border-primary bg-primary/5 p-2">
            <div className="flex items-center gap-2">
                <RotateCcw className="size-4 text-primary" />
                <span className="text-sm font-medium">Subscribe</span>
            </div>
            <span className="font-bold text-primary">${subscribe.toFixed(2)}</span>
        </div>
    </div>
)

const SubscribeButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
        <RotateCcw className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const refill: RefillProps = {
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
        name: "Daily Vitamin Complex",
        brand: "VitaLife",
        price: 34.99,
        subscribePrice: 29.74,
        rating: 4.8,
        reviews: 1892,
        size: "90 capsules",
        supplyDuration: "30-day",
        subscribeAndSave: true,
        benefits: [
            "15% off every order",
            "Free shipping always",
            "Skip or cancel anytime",
            "Early access to new products",
        ],
    }

    const savings = Math.round(((refill.price - refill.subscribePrice) / refill.price) * 100)

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <ProductImage src={refill.image} alt={refill.name} />
                        {refill.subscribeAndSave && <SubscribeBadge savings={savings} />}
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <RefillBadge />
                            <ProductRating rating={refill.rating} reviews={refill.reviews} />
                        </div>
                        <BrandLabel text={refill.brand} />
                        <ProductName text={refill.name} />
                        <ProductSize size={refill.size} duration={refill.supplyDuration} />
                        <BenefitsList benefits={refill.benefits} />
                        <Separator />
                        <PriceOptions oneTime={refill.price} subscribe={refill.subscribePrice} />
                        <SubscribeButton label="Subscribe & Save" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
