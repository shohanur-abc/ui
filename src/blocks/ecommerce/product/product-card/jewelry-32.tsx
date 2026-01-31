import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Diamond, Heart, Shield, Star, Sparkles, Truck } from "lucide-react"
import Image from "next/image"

interface JewelryProps {
    image: string
    name: string
    collection: string
    material: string
    price: number
    rating: number
    certified: boolean
    freeShipping: boolean
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-full bg-gradient-to-br from-amber-100 to-amber-50 p-6 dark:from-amber-950/30 dark:to-amber-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent)]" />
        <Image src={src} alt={alt} fill className="object-contain p-4 drop-shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
        <Button size="icon-sm" variant="ghost" className="absolute right-4 top-4 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const CollectionBadge = ({ text }: { text: string }) => (
    <Badge variant="outline" className="gap-1.5 border-amber-500/30 text-amber-600 dark:text-amber-400">
        <Diamond className="size-3" />
        {text}
    </Badge>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-center text-lg font-semibold text-foreground">{text}</h3>
)

const MaterialInfo = ({ text }: { text: string }) => (
    <p className="text-center text-sm text-muted-foreground">{text}</p>
)

const ProductRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center justify-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`} />
        ))}
    </div>
)

const TrustBadges = ({ certified, freeShipping }: { certified: boolean; freeShipping: boolean }) => (
    <div className="flex justify-center gap-4 text-xs text-muted-foreground">
        {certified && (
            <span className="flex items-center gap-1">
                <Shield className="size-3 text-green-500" />
                Certified
            </span>
        )}
        {freeShipping && (
            <span className="flex items-center gap-1">
                <Truck className="size-3 text-primary" />
                Free Shipping
            </span>
        )}
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <div className="text-center">
        <span className="text-2xl font-bold text-foreground">${amount.toLocaleString()}</span>
    </div>
)

const ActionButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700">
        <Sparkles className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const jewelry: JewelryProps = {
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
        name: "Eternity Diamond Ring",
        collection: "Luxury Collection",
        material: "18K White Gold • 1.5ct Diamond",
        price: 4999,
        rating: 5,
        certified: true,
        freeShipping: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group space-y-4 p-5">
                    <ProductImage src={jewelry.image} alt={jewelry.name} />
                    <div className="space-y-2 text-center">
                        <CollectionBadge text={jewelry.collection} />
                        <ProductName text={jewelry.name} />
                        <MaterialInfo text={jewelry.material} />
                        <ProductRating rating={jewelry.rating} />
                    </div>
                    <Separator />
                    <TrustBadges certified={jewelry.certified} freeShipping={jewelry.freeShipping} />
                    <PriceTag amount={jewelry.price} />
                    <ActionButton label="Add to Cart" />
                </Card>
            </div>
        </section>
    )
}
