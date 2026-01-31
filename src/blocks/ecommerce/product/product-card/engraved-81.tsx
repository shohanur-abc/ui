import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, Gem, ShoppingCart, Star, Stamp, Clock, Verified } from "lucide-react"
import Image from "next/image"

interface EngravedProps {
    image: string
    name: string
    material: string
    price: number
    rating: number
    reviews: number
    engravingStyles: string[]
    selectedStyle: number
    engravingLines: number
    maxCharsPerLine: number
    productionDays: number
    giftBox: boolean
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
    </div>
)

const EngravedBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-zinc-700 to-zinc-900 text-white">
        <Stamp className="size-3" />
        Engraved
    </Badge>
)

const MaterialLabel = ({ text }: { text: string }) => (
    <Badge variant="outline" className="gap-1 text-xs">
        <Gem className="size-3" />
        {text}
    </Badge>
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

const StyleSelector = ({ styles, selected }: { styles: string[]; selected: number }) => (
    <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Engraving Style</p>
        <div className="flex flex-wrap gap-2">
            {styles.map((style, i) => (
                <Badge 
                    key={i} 
                    variant={i === selected ? "default" : "outline"} 
                    className="cursor-pointer text-xs"
                >
                    {style}
                </Badge>
            ))}
        </div>
    </div>
)

const EngravingInputs = ({ lines, maxChars }: { lines: number; maxChars: number }) => (
    <div className="space-y-2">
        <p className="text-xs text-muted-foreground">
            Your Engraving ({lines} {lines === 1 ? "line" : "lines"}, max {maxChars} chars each)
        </p>
        <div className="space-y-2">
            {Array.from({ length: lines }).map((_, i) => (
                <input
                    key={i}
                    type="text"
                    placeholder={`Line ${i + 1}`}
                    maxLength={maxChars}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-center text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
            ))}
        </div>
    </div>
)

const ProductionTime = ({ days }: { days: number }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="size-4" />
        Production: {days} business days
    </div>
)

const GiftBoxOption = ({ included }: { included: boolean }) => (
    <div className="flex items-center gap-2">
        <input 
            type="checkbox" 
            defaultChecked={included}
            className="size-4 rounded border-border"
        />
        <span className="text-sm text-muted-foreground">Include gift box (+$15)</span>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const OrderButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Stamp className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const engraved: EngravedProps = {
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop",
        name: "Sterling Silver Cufflinks",
        material: "925 Sterling Silver",
        price: 129.00,
        rating: 4.9,
        reviews: 234,
        engravingStyles: ["Classic", "Script", "Modern", "Block"],
        selectedStyle: 0,
        engravingLines: 2,
        maxCharsPerLine: 10,
        productionDays: 3,
        giftBox: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <ProductImage src={engraved.image} alt={engraved.name} />
                        <EngravedBadge />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <MaterialLabel text={engraved.material} />
                            <ProductRating rating={engraved.rating} reviews={engraved.reviews} />
                        </div>
                        <ProductName text={engraved.name} />
                        <StyleSelector styles={engraved.engravingStyles} selected={engraved.selectedStyle} />
                        <EngravingInputs lines={engraved.engravingLines} maxChars={engraved.maxCharsPerLine} />
                        <ProductionTime days={engraved.productionDays} />
                        <GiftBoxOption included={engraved.giftBox} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={engraved.price} />
                            <OrderButton label="Order" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
