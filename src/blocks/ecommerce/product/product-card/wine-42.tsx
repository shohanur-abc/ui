import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Grape, Heart, MapPin, ShoppingCart, Star, Wine } from "lucide-react"
import Image from "next/image"

interface WineProps {
    image: string
    name: string
    winery: string
    region: string
    year: number
    price: number
    rating: number
    reviews: number
    type: string
    notes: string[]
}

const WineImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-gradient-to-b from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10">
        <Image src={src} alt={alt} fill className="object-contain p-4 drop-shadow-lg transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-2 top-2 text-muted-foreground hover:text-destructive">
            <Heart className="size-4" />
        </Button>
    </div>
)

const WineType = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1.5">
        <Wine className="size-3" />
        {text}
    </Badge>
)

const WineVintage = ({ year }: { year: number }) => (
    <Badge variant="outline">{year}</Badge>
)

const WineName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const WineryInfo = ({ winery, region }: { winery: string; region: string }) => (
    <div className="space-y-1 text-sm text-muted-foreground">
        <p>{winery}</p>
        <p className="flex items-center gap-1">
            <MapPin className="size-3" />
            {region}
        </p>
    </div>
)

const WineRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const TastingNotes = ({ notes }: { notes: string[] }) => (
    <div className="space-y-1.5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Grape className="size-3" />
            Tasting Notes
        </p>
        <div className="flex flex-wrap gap-1">
            {notes.map((note, i) => (
                <Badge key={i} variant="outline" className="text-xs">
                    {note}
                </Badge>
            ))}
        </div>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const AddButton = ({ label }: { label: string }) => (
    <Button className="gap-2 bg-amber-600 hover:bg-amber-700">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const wine: WineProps = {
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=300&h=450&fit=crop",
        name: "Château Margaux Grand Cru",
        winery: "Château Margaux",
        region: "Bordeaux, France",
        year: 2018,
        price: 289.00,
        rating: 4.9,
        reviews: 234,
        type: "Red Wine",
        notes: ["Blackcurrant", "Violet", "Oak", "Spice"],
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group space-y-4 p-4">
                    <WineImage src={wine.image} alt={wine.name} />
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <WineType text={wine.type} />
                                <WineVintage year={wine.year} />
                            </div>
                            <WineRating rating={wine.rating} reviews={wine.reviews} />
                        </div>
                        <WineName text={wine.name} />
                        <WineryInfo winery={wine.winery} region={wine.region} />
                        <TastingNotes notes={wine.notes} />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                        <PriceTag amount={wine.price} />
                        <AddButton label="Add" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
