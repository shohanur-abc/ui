import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Clock, Heart, Sparkles, Star, ShoppingCart, History, Medal } from "lucide-react"
import Image from "next/image"

interface VintageProps {
    image: string
    name: string
    era: string
    price: number
    condition: string
    rating: number
    seller: string
    authenticity: boolean
    origin: string
    year: number
}

const VintageImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 bg-white/80 text-foreground hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const EraBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1 bg-amber-600">
        <History className="size-3" />
        {text}
    </Badge>
)

const AuthenticBadge = () => (
    <Badge variant="outline" className="gap-1 border-green-500 text-green-600">
        <Medal className="size-3" />
        Authenticated
    </Badge>
)

const ItemName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const ItemOrigin = ({ origin, year }: { origin: string; year: number }) => (
    <p className="text-sm text-muted-foreground">
        {origin} • circa {year}
    </p>
)

const ItemRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`size-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
        ))}
    </div>
)

const ConditionDisplay = ({ condition }: { condition: string }) => {
    const colors: Record<string, string> = {
        "Excellent": "text-green-600 bg-green-100 dark:bg-green-950",
        "Good": "text-blue-600 bg-blue-100 dark:bg-blue-950",
        "Fair": "text-amber-600 bg-amber-100 dark:bg-amber-950",
    }
    return (
        <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-muted-foreground" />
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${colors[condition] || colors["Good"]}`}>
                {condition} Condition
            </span>
        </div>
    )
}

const SellerInfo = ({ name }: { name: string }) => (
    <p className="text-sm text-muted-foreground">Sold by: {name}</p>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toLocaleString()}</span>
)

const PurchaseButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const vintage: VintageProps = {
        image: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=400&h=400&fit=crop",
        name: "Art Deco Table Lamp",
        era: "1920s",
        price: 850,
        condition: "Excellent",
        rating: 5,
        seller: "Antique Treasures",
        authenticity: true,
        origin: "France",
        year: 1925,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <VintageImage src={vintage.image} alt={vintage.name} />
                        <EraBadge text={vintage.era} />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            {vintage.authenticity && <AuthenticBadge />}
                            <ItemRating rating={vintage.rating} />
                        </div>
                        <div className="space-y-0.5">
                            <ItemName text={vintage.name} />
                            <ItemOrigin origin={vintage.origin} year={vintage.year} />
                        </div>
                        <ConditionDisplay condition={vintage.condition} />
                        <SellerInfo name={vintage.seller} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={vintage.price} />
                            <PurchaseButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
