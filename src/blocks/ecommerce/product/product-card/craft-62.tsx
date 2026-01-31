import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Palette, Scissors, ShoppingCart, Star, Sparkles, Package } from "lucide-react"
import Image from "next/image"

interface CraftProps {
    image: string
    name: string
    brand: string
    price: number
    rating: number
    reviews: number
    category: string
    contents: string[]
    difficulty: string
    pieces: number
    ageRange: string
}

const CraftImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 bg-white/80 text-foreground hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const CategoryBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-pink-500 to-purple-500">
        <Palette className="size-3" />
        {text}
    </Badge>
)

const CraftName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const BrandLabel = ({ text }: { text: string }) => (
    <p className="text-sm text-muted-foreground">{text}</p>
)

const CraftRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const DifficultyBadge = ({ level }: { level: string }) => {
    const colors: Record<string, string> = {
        "Beginner": "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
        "Intermediate": "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
        "Advanced": "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
    }
    return (
        <Badge variant="outline" className={`text-xs ${colors[level] || ""}`}>
            {level}
        </Badge>
    )
}

const CraftDetails = ({ pieces, ageRange }: { pieces: number; ageRange: string }) => (
    <div className="flex gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
            <Package className="size-4" />
            {pieces} pieces
        </span>
        <span>Ages {ageRange}</span>
    </div>
)

const ContentsList = ({ items }: { items: string[] }) => (
    <div className="space-y-1.5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="size-3" />
            Kit includes
        </p>
        <div className="flex flex-wrap gap-1.5">
            {items.map((item, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                    {item}
                </Badge>
            ))}
        </div>
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
    const craft: CraftProps = {
        image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=400&fit=crop",
        name: "Ultimate Scrapbooking Kit",
        brand: "CraftHaven",
        price: 34.99,
        rating: 4.7,
        reviews: 567,
        category: "Paper Crafts",
        contents: ["Papers", "Stickers", "Stamps", "Scissors", "Glue"],
        difficulty: "Beginner",
        pieces: 250,
        ageRange: "8+",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <CraftImage src={craft.image} alt={craft.name} />
                        <CategoryBadge text={craft.category} />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <DifficultyBadge level={craft.difficulty} />
                            <CraftRating rating={craft.rating} reviews={craft.reviews} />
                        </div>
                        <div className="space-y-0.5">
                            <CraftName text={craft.name} />
                            <BrandLabel text={craft.brand} />
                        </div>
                        <CraftDetails pieces={craft.pieces} ageRange={craft.ageRange} />
                        <ContentsList items={craft.contents} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={craft.price} />
                            <AddButton label="Add" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
