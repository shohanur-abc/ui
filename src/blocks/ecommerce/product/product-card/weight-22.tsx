import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Package, ShoppingCart, Star, Truck, Weight } from "lucide-react"
import Image from "next/image"

interface ProductProps {
    image: string
    name: string
    weightOptions: { weight: string; price: number }[]
    selectedWeight: number
    rating: number
    reviews: number
    pricePerUnit: string
    inStock: boolean
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3">
            <Heart className="size-4" />
        </Button>
    </div>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const WeightSelector = ({ options, selected }: { options: { weight: string; price: number }[]; selected: number }) => (
    <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Weight className="size-3" />
            <span>Select weight:</span>
        </div>
        <div className="flex flex-wrap gap-2">
            {options.map((opt, i) => (
                <button
                    key={i}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                        i === selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-muted/50 text-muted-foreground hover:border-primary/50"
                    }`}
                >
                    {opt.weight}
                </button>
            ))}
        </div>
    </div>
)

const PriceDisplay = ({ price, pricePerUnit }: { price: number; pricePerUnit: string }) => (
    <div className="space-y-0.5">
        <span className="text-2xl font-bold text-foreground">${price.toFixed(2)}</span>
        <p className="text-xs text-muted-foreground">{pricePerUnit}</p>
    </div>
)

const StockBadge = ({ inStock }: { inStock: boolean }) => (
    <Badge variant={inStock ? "secondary" : "destructive"}>
        <Package className="mr-1 size-3" />
        {inStock ? "In Stock" : "Out of Stock"}
    </Badge>
)

const AddButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const product: ProductProps = {
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        name: "Organic Coffee Beans - Single Origin",
        weightOptions: [
            { weight: "250g", price: 14.99 },
            { weight: "500g", price: 26.99 },
            { weight: "1kg", price: 49.99 },
        ],
        selectedWeight: 1,
        rating: 4.7,
        reviews: 312,
        pricePerUnit: "$53.98/kg",
        inStock: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="space-y-4 p-4">
                    <ProductImage src={product.image} alt={product.name} />
                    <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                            <ProductName text={product.name} />
                            <StockBadge inStock={product.inStock} />
                        </div>
                        <ProductRating rating={product.rating} reviews={product.reviews} />
                        <WeightSelector options={product.weightOptions} selected={product.selectedWeight} />
                        <PriceDisplay
                            price={product.weightOptions[product.selectedWeight].price}
                            pricePerUnit={product.pricePerUnit}
                        />
                    </div>
                    <AddButton label="Add to Cart" />
                </Card>
            </div>
        </section>
    )
}
