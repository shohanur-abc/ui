import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Paintbrush, ShoppingCart, Star, Clock, Package, Palette } from "lucide-react"
import Image from "next/image"

interface CustomProps {
    image: string
    name: string
    brand: string
    basePrice: number
    rating: number
    reviews: number
    customOptions: { name: string; options: string[] }[]
    productionTime: string
    customText: string
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
    </div>
)

const CustomBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-amber-500 to-orange-500">
        <Paintbrush className="size-3" />
        Custom Made
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{text}</span>
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

const CustomOption = ({ name, options, selectedIndex = 0 }: { name: string; options: string[]; selectedIndex?: number }) => (
    <div className="space-y-2">
        <p className="text-xs text-muted-foreground">{name}</p>
        <div className="flex flex-wrap gap-1.5">
            {options.map((opt, i) => (
                <Badge 
                    key={i} 
                    variant={i === selectedIndex ? "default" : "outline"} 
                    className="cursor-pointer text-xs transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                    {opt}
                </Badge>
            ))}
        </div>
    </div>
)

const TextInput = ({ placeholder }: { placeholder: string }) => (
    <div className="space-y-2">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Palette className="size-3" />
            Personalization
        </p>
        <input
            type="text"
            placeholder={placeholder}
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
)

const ProductionTime = ({ time }: { time: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="size-4" />
        Production time: {time}
    </div>
)

const PriceDisplay = ({ basePrice }: { basePrice: number }) => (
    <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">Starting from</p>
        <span className="text-xl font-bold text-foreground">${basePrice.toFixed(2)}</span>
    </div>
)

const CustomizeButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Paintbrush className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const custom: CustomProps = {
        image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=400&fit=crop",
        name: "Custom Leather Wallet",
        brand: "Artisan Co.",
        basePrice: 89.00,
        rating: 4.9,
        reviews: 567,
        customOptions: [
            { name: "Leather Color", options: ["Black", "Brown", "Tan", "Navy"] },
            { name: "Thread Color", options: ["Gold", "Silver", "Natural"] },
        ],
        productionTime: "5-7 business days",
        customText: "Add your initials (up to 3 letters)",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <ProductImage src={custom.image} alt={custom.name} />
                        <CustomBadge />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <BrandLabel text={custom.brand} />
                            <ProductRating rating={custom.rating} reviews={custom.reviews} />
                        </div>
                        <ProductName text={custom.name} />
                        {custom.customOptions.map((opt, i) => (
                            <CustomOption key={i} name={opt.name} options={opt.options} />
                        ))}
                        <TextInput placeholder={custom.customText} />
                        <ProductionTime time={custom.productionTime} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceDisplay basePrice={custom.basePrice} />
                            <CustomizeButton label="Create" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
