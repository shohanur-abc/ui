import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Shirt, ShoppingCart, Star, Palette, Ruler } from "lucide-react"
import Image from "next/image"

interface AccessoryProps {
    image: string
    name: string
    brand: string
    price: number
    rating: number
    reviews: number
    colors: { name: string; hex: string }[]
    selectedColor: number
    material: string
    care: string
}

const AccessoryImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
    </div>
)

const BrandBadge = ({ text }: { text: string }) => (
    <span className="text-xs font-semibold uppercase tracking-widest text-primary">{text}</span>
)

const AccessoryName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const AccessoryRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const ColorSwatches = ({ colors, selected }: { colors: { name: string; hex: string }[]; selected: number }) => (
    <div className="space-y-2">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Palette className="size-3" />
            Color: {colors[selected].name}
        </p>
        <div className="flex gap-2">
            {colors.map((color, i) => (
                <button
                    key={i}
                    className={`size-7 rounded-full border-2 transition-transform hover:scale-110 ${
                        i === selected ? "border-primary ring-2 ring-primary/30" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                />
            ))}
        </div>
    </div>
)

const MaterialInfo = ({ material, care }: { material: string; care: string }) => (
    <div className="space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            <Shirt className="size-4" />
            {material}
        </div>
        <p className="text-xs">{care}</p>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const AddButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const accessory: AccessoryProps = {
        image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400&h=400&fit=crop",
        name: "Silk Scarf - Botanical",
        brand: "Elegance",
        price: 89.00,
        rating: 4.8,
        reviews: 234,
        colors: [
            { name: "Navy", hex: "#1e3a5f" },
            { name: "Burgundy", hex: "#722f37" },
            { name: "Forest", hex: "#228b22" },
            { name: "Ivory", hex: "#fffff0" },
        ],
        selectedColor: 0,
        material: "100% Mulberry Silk",
        care: "Dry clean only",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group space-y-4 p-4">
                    <AccessoryImage src={accessory.image} alt={accessory.name} />
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <BrandBadge text={accessory.brand} />
                            <AccessoryRating rating={accessory.rating} reviews={accessory.reviews} />
                        </div>
                        <AccessoryName text={accessory.name} />
                        <ColorSwatches colors={accessory.colors} selected={accessory.selectedColor} />
                        <MaterialInfo material={accessory.material} care={accessory.care} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <PriceTag amount={accessory.price} />
                        <AddButton label="Add" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
