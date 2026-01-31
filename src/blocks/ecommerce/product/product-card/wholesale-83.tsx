import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Building, Heart, Minus, Package, Plus, ShoppingCart, Star, Truck, Percent } from "lucide-react"
import Image from "next/image"

interface WholesaleProps {
    image: string
    name: string
    sku: string
    retailPrice: number
    wholesalePrice: number
    minOrder: number
    rating: number
    reviews: number
    tiers: { min: number; price: number }[]
    inStock: number
    leadTime: string
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const WholesaleBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-blue-600">
        <Building className="size-3" />
        Wholesale
    </Badge>
)

const ProductSku = ({ sku }: { sku: string }) => (
    <span className="text-xs text-muted-foreground">SKU: {sku}</span>
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

const PricingTiers = ({ tiers, retail }: { tiers: { min: number; price: number }[]; retail: number }) => (
    <div className="space-y-2">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Percent className="size-3" />
            Volume Pricing
        </p>
        <div className="space-y-1.5">
            {tiers.map((tier, i) => {
                const discount = ((retail - tier.price) / retail * 100).toFixed(0)
                return (
                    <div key={i} className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
                        <span className="text-muted-foreground">{tier.min}+ units</span>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground">${tier.price.toFixed(2)}/ea</span>
                            <Badge variant="secondary" className="text-xs text-green-600">-{discount}%</Badge>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
)

const QuantitySelector = ({ min }: { min: number }) => (
    <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Quantity (Min: {min})</p>
        <div className="flex items-center gap-2">
            <Button size="icon-sm" variant="outline">
                <Minus className="size-4" />
            </Button>
            <span className="w-16 text-center font-medium">{min}</span>
            <Button size="icon-sm" variant="outline">
                <Plus className="size-4" />
            </Button>
        </div>
    </div>
)

const StockInfo = ({ count, leadTime }: { count: number; leadTime: string }) => (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
            <Package className="size-4" />
            {count.toLocaleString()} in stock
        </div>
        <div className="flex items-center gap-1.5">
            <Truck className="size-4" />
            {leadTime}
        </div>
    </div>
)

const TotalPrice = ({ price, quantity }: { price: number; quantity: number }) => (
    <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">Order Total</p>
        <span className="text-xl font-bold text-foreground">${(price * quantity).toFixed(2)}</span>
    </div>
)

const AddButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const wholesale: WholesaleProps = {
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        name: "Premium Smartwatch",
        sku: "SW-PRO-2025",
        retailPrice: 299.99,
        wholesalePrice: 149.99,
        minOrder: 50,
        rating: 4.8,
        reviews: 1234,
        tiers: [
            { min: 50, price: 149.99 },
            { min: 100, price: 139.99 },
            { min: 500, price: 129.99 },
        ],
        inStock: 5000,
        leadTime: "3-5 days",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <ProductImage src={wholesale.image} alt={wholesale.name} />
                        <WholesaleBadge />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <ProductSku sku={wholesale.sku} />
                            <ProductRating rating={wholesale.rating} reviews={wholesale.reviews} />
                        </div>
                        <ProductName text={wholesale.name} />
                        <PricingTiers tiers={wholesale.tiers} retail={wholesale.retailPrice} />
                        <QuantitySelector min={wholesale.minOrder} />
                        <StockInfo count={wholesale.inStock} leadTime={wholesale.leadTime} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <TotalPrice price={wholesale.wholesalePrice} quantity={wholesale.minOrder} />
                            <AddButton label="Add" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
