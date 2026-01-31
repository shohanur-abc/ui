import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Sparkles, Gift, Truck, Award, Shield } from "lucide-react"
import Image from "next/image"

interface GiftsetProps {
    image: string
    name: string
    brand: string
    price: number
    rating: number
    reviews: number
    items: string[]
    giftWrapping: boolean
    personalMessage: boolean
    freeShipping: boolean
    occasion: string
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 dark:from-rose-950/30 dark:via-pink-950/30 dark:to-purple-950/30">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const GiftBadge = () => (
    <Badge className="gap-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <Gift className="size-3" />
        Gift Set
    </Badge>
)

const OccasionBadge = ({ text }: { text: string }) => (
    <Badge variant="outline" className="absolute bottom-3 left-3 border-white/30 bg-black/50 text-white backdrop-blur-sm">
        <Sparkles className="mr-1 size-3" />
        {text}
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-bold uppercase tracking-wider text-primary">{text}</span>
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

const IncludedItems = ({ items }: { items: string[] }) => (
    <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Set Includes:</p>
        <div className="flex flex-wrap gap-1.5">
            {items.map((item, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                    {item}
                </Badge>
            ))}
        </div>
    </div>
)

const GiftFeatures = ({ wrapping, message, shipping }: { wrapping: boolean; message: boolean; shipping: boolean }) => (
    <div className="flex flex-wrap gap-3">
        {wrapping && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Gift className="size-3 text-rose-500" />
                Gift wrapped
            </div>
        )}
        {message && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Award className="size-3 text-pink-500" />
                Personal message
            </div>
        )}
        {shipping && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Truck className="size-3 text-green-500" />
                Free shipping
            </div>
        )}
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const GiftButton = ({ label }: { label: string }) => (
    <Button className="gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
        <Gift className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const giftset: GiftsetProps = {
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop",
        name: "Luxury Skincare Gift Set",
        brand: "GlowBeauty",
        price: 149.99,
        rating: 4.9,
        reviews: 567,
        items: [
            "Serum (30ml)",
            "Moisturizer (50ml)",
            "Eye Cream (15ml)",
            "Face Mask x3",
            "Gift Box",
        ],
        giftWrapping: true,
        personalMessage: true,
        freeShipping: true,
        occasion: "Perfect for Birthdays",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden border-rose-200/50 dark:border-rose-800/30">
                    <div className="relative">
                        <ProductImage src={giftset.image} alt={giftset.name} />
                        <OccasionBadge text={giftset.occasion} />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <GiftBadge />
                            <ProductRating rating={giftset.rating} reviews={giftset.reviews} />
                        </div>
                        <BrandLabel text={giftset.brand} />
                        <ProductName text={giftset.name} />
                        <IncludedItems items={giftset.items} />
                        <GiftFeatures 
                            wrapping={giftset.giftWrapping} 
                            message={giftset.personalMessage} 
                            shipping={giftset.freeShipping} 
                        />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={giftset.price} />
                            <GiftButton label="Send Gift" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
