import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Mountain, ShoppingCart, Star, Sun, Thermometer, Wind, Droplets } from "lucide-react"
import Image from "next/image"

interface OutdoorGearProps {
    image: string
    name: string
    brand: string
    price: number
    originalPrice: number
    rating: number
    reviews: number
    category: string
    weather: string[]
    features: { icon: string; label: string }[]
}

const GearImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
    </div>
)

const CategoryBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1">
        <Mountain className="size-3" />
        {text}
    </Badge>
)

const GearName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-sm text-muted-foreground">{text}</span>
)

const GearRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const WeatherConditions = ({ conditions }: { conditions: string[] }) => {
    const iconMap: Record<string, React.ReactNode> = {
        "All Seasons": <Sun className="size-3" />,
        "Cold": <Thermometer className="size-3" />,
        "Windy": <Wind className="size-3" />,
        "Wet": <Droplets className="size-3" />,
    }
    return (
        <div className="flex flex-wrap gap-1.5">
            {conditions.map((cond, i) => (
                <Badge key={i} variant="outline" className="gap-1 text-xs">
                    {iconMap[cond] || <Sun className="size-3" />}
                    {cond}
                </Badge>
            ))}
        </div>
    )
}

const FeatureList = ({ features }: { features: { icon: string; label: string }[] }) => (
    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        {features.map((f, i) => (
            <div key={i} className="flex items-center gap-1.5">
                <div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xs">✓</span>
                </div>
                {f.label}
            </div>
        ))}
    </div>
)

const PriceDisplay = ({ price, original }: { price: number; original: number }) => (
    <div className="space-y-0.5">
        <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">${price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">${original.toFixed(2)}</span>
        </div>
        <Badge variant="destructive" className="text-xs">
            Save ${(original - price).toFixed(0)}
        </Badge>
    </div>
)

const AddButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const gear: OutdoorGearProps = {
        image: "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=600&h=450&fit=crop",
        name: "Alpine Expedition Jacket",
        brand: "Summit Pro",
        price: 189.99,
        originalPrice: 249.99,
        rating: 4.7,
        reviews: 892,
        category: "Hiking",
        weather: ["All Seasons", "Windy", "Wet"],
        features: [
            { icon: "waterproof", label: "Waterproof" },
            { icon: "breathable", label: "Breathable" },
            { icon: "lightweight", label: "Lightweight" },
            { icon: "packable", label: "Packable" },
        ],
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <GearImage src={gear.image} alt={gear.name} />
                        <CategoryBadge text={gear.category} />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <BrandLabel text={gear.brand} />
                            <GearRating rating={gear.rating} reviews={gear.reviews} />
                        </div>
                        <GearName text={gear.name} />
                        <WeatherConditions conditions={gear.weather} />
                        <FeatureList features={gear.features} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceDisplay price={gear.price} original={gear.originalPrice} />
                            <AddButton label="Add" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
