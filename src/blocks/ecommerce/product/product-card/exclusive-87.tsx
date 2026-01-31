import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Lock, ShoppingCart, Star, Sparkles, Crown, Award, Shield } from "lucide-react"
import Image from "next/image"

interface ExclusiveProps {
    image: string
    name: string
    brand: string
    price: number
    rating: number
    reviews: number
    exclusiveFor: string
    benefits: string[]
    memberOnly: boolean
    earlyAccess: boolean
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-violet-900 to-purple-900">
        <Image src={src} alt={alt} fill className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const ExclusiveBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-violet-600 to-purple-600">
        <Sparkles className="size-3" />
        Exclusive
    </Badge>
)

const MemberBadge = ({ text }: { text: string }) => (
    <Badge variant="outline" className="absolute bottom-3 left-3 gap-1 border-white/30 bg-black/50 text-white backdrop-blur-sm">
        <Crown className="size-3" />
        {text}
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-bold uppercase tracking-widest text-primary">{text}</span>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-lg font-semibold text-foreground">{text}</h3>
)

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const ExclusiveBenefits = ({ benefits }: { benefits: string[] }) => (
    <div className="space-y-2">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Award className="size-3" />
            Member Benefits
        </p>
        <div className="space-y-1.5">
            {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex size-4 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-[10px] text-primary">✓</span>
                    </div>
                    {b}
                </div>
            ))}
        </div>
    </div>
)

const EarlyAccessNotice = () => (
    <div className="flex items-center gap-2 rounded-lg bg-violet-100 px-3 py-2 text-sm text-violet-700 dark:bg-violet-950 dark:text-violet-400">
        <Lock className="size-4" />
        Early access for members
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const ShopButton = ({ label }: { label: string }) => (
    <Button className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const exclusive: ExclusiveProps = {
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop",
        name: "Elite Runner Pro",
        brand: "Velocity",
        price: 249.00,
        rating: 4.9,
        reviews: 324,
        exclusiveFor: "VIP Members",
        benefits: [
            "First access to new releases",
            "Free express shipping",
            "Extended 60-day returns",
            "Exclusive colorways",
        ],
        memberOnly: true,
        earlyAccess: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden border-violet-500/20 bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/20 dark:to-background">
                    <div className="relative">
                        <ProductImage src={exclusive.image} alt={exclusive.name} />
                        <ExclusiveBadge />
                        {exclusive.memberOnly && <MemberBadge text={exclusive.exclusiveFor} />}
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <BrandLabel text={exclusive.brand} />
                            <ProductRating rating={exclusive.rating} reviews={exclusive.reviews} />
                        </div>
                        <ProductName text={exclusive.name} />
                        <ExclusiveBenefits benefits={exclusive.benefits} />
                        {exclusive.earlyAccess && <EarlyAccessNotice />}
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={exclusive.price} />
                            <ShopButton label="Shop" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
