import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Package, ShoppingCart, Star, Truck, Tag, Check } from "lucide-react"
import Image from "next/image"

interface BasicProps {
    image: string
    name: string
    brand: string
    price: number
    rating: number
    reviews: number
    features: string[]
    inStock: boolean
    shipping: string
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const BasicBadge = () => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <Tag className="size-3" />
        Basic
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs text-muted-foreground">{text}</span>
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

const FeatureList = ({ features }: { features: string[] }) => (
    <ul className="space-y-1.5">
        {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="size-4 shrink-0 text-green-500" />
                {f}
            </li>
        ))}
    </ul>
)

const StockStatus = ({ inStock }: { inStock: boolean }) => (
    <div className="flex items-center gap-2 text-sm">
        <Package className={`size-4 ${inStock ? "text-green-500" : "text-muted-foreground"}`} />
        <span className={inStock ? "text-green-600" : "text-muted-foreground"}>
            {inStock ? "In Stock" : "Out of Stock"}
        </span>
    </div>
)

const ShippingInfo = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Truck className="size-4" />
        {text}
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const AddButton = ({ label, disabled }: { label: string; disabled: boolean }) => (
    <Button className="gap-2" disabled={disabled}>
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const basic: BasicProps = {
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
        name: "Classic Sunglasses",
        brand: "EyeWear Co.",
        price: 29.99,
        rating: 4.2,
        reviews: 567,
        features: [
            "UV400 protection",
            "Lightweight frame",
            "Standard case included",
        ],
        inStock: true,
        shipping: "Standard shipping 5-7 days",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group space-y-4 p-4">
                    <ProductImage src={basic.image} alt={basic.name} />
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <BasicBadge />
                            <ProductRating rating={basic.rating} reviews={basic.reviews} />
                        </div>
                        <BrandLabel text={basic.brand} />
                        <ProductName text={basic.name} />
                        <FeatureList features={basic.features} />
                        <StockStatus inStock={basic.inStock} />
                        <ShippingInfo text={basic.shipping} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <PriceTag amount={basic.price} />
                        <AddButton label="Add" disabled={!basic.inStock} />
                    </div>
                </Card>
            </div>
        </section>
    )
}
