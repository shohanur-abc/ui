import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Ruler, ShoppingCart, Star, Wrench, Package, Shield, Truck } from "lucide-react"
import Image from "next/image"

interface ToolProps {
    image: string
    name: string
    brand: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    type: string
    specs: { label: string; value: string }[]
    warranty: string
    inStock: boolean
}

const ToolImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
        <Image src={src} alt={alt} fill className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const TypeBadge = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <Wrench className="size-3" />
        {text}
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{text}</span>
)

const ToolName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const ToolRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const SpecsList = ({ specs }: { specs: { label: string; value: string }[] }) => (
    <div className="grid grid-cols-2 gap-2 text-sm">
        {specs.map((spec, i) => (
            <div key={i} className="rounded-lg bg-muted/50 px-3 py-2">
                <p className="text-xs text-muted-foreground">{spec.label}</p>
                <p className="font-medium text-foreground">{spec.value}</p>
            </div>
        ))}
    </div>
)

const WarrantyInfo = ({ warranty }: { warranty: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="size-4 text-green-500" />
        {warranty}
    </div>
)

const StockStatus = ({ inStock }: { inStock: boolean }) => (
    <div className="flex items-center gap-2 text-sm">
        <Truck className="size-4" />
        <span className={inStock ? "text-green-600" : "text-destructive"}>
            {inStock ? "In Stock - Ships Today" : "Out of Stock"}
        </span>
    </div>
)

const PriceDisplay = ({ price, original }: { price: number; original: number }) => (
    <div className="space-y-0.5">
        <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">${price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">${original.toFixed(2)}</span>
        </div>
    </div>
)

const AddButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const tool: ToolProps = {
        image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop",
        name: "Pro Cordless Drill Set",
        brand: "DeWalt",
        price: 179.99,
        originalPrice: 249.99,
        rating: 4.8,
        reviews: 3421,
        type: "Power Tool",
        specs: [
            { label: "Voltage", value: "20V Max" },
            { label: "Speed", value: "2000 RPM" },
            { label: "Battery", value: "2x 5.0Ah" },
            { label: "Weight", value: "3.5 lbs" },
        ],
        warranty: "3-Year Limited Warranty",
        inStock: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group space-y-4 p-4">
                    <ToolImage src={tool.image} alt={tool.name} />
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <TypeBadge text={tool.type} />
                            <ToolRating rating={tool.rating} reviews={tool.reviews} />
                        </div>
                        <BrandLabel text={tool.brand} />
                        <ToolName text={tool.name} />
                        <SpecsList specs={tool.specs} />
                        <WarrantyInfo warranty={tool.warranty} />
                        <StockStatus inStock={tool.inStock} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <PriceDisplay price={tool.price} original={tool.originalPrice} />
                        <AddButton label="Add" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
