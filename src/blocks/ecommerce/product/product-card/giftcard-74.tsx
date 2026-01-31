import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Gift, Heart, ShoppingCart, Star, Wallet, Infinity, Sparkles } from "lucide-react"
import Image from "next/image"

interface GiftCardProps {
    brand: string
    value: number
    price: number
    rating: number
    sales: number
    designs: { name: string; color: string }[]
    selectedDesign: number
    denomination: number[]
    selectedValue: number
    digital: boolean
}

const GiftCardDesign = ({ brand, color }: { brand: string; color: string }) => (
    <div 
        className="relative aspect-[16/10] overflow-hidden rounded-xl"
        style={{ backgroundColor: color }}
    >
        <div className="absolute inset-0">
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-white/10" />
            <div className="absolute -bottom-20 -right-20 size-60 rounded-full bg-black/10" />
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-6">
            <div>
                <Gift className="size-10 text-white/90" />
                <p className="mt-2 text-xl font-bold text-white">{brand}</p>
            </div>
            <div className="text-right">
                <p className="text-sm text-white/70">Gift Card</p>
            </div>
        </div>
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const DigitalBadge = () => (
    <Badge className="gap-1 bg-blue-600">
        <Wallet className="size-3" />
        Digital
    </Badge>
)

const CardRating = ({ rating, sales }: { rating: number; sales: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({sales.toLocaleString()} sold)</span>
    </div>
)

const DesignSelector = ({ designs, selected }: { designs: { name: string; color: string }[]; selected: number }) => (
    <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Select Design</p>
        <div className="flex gap-2">
            {designs.map((design, i) => (
                <button
                    key={i}
                    className={`size-8 rounded-full border-2 transition-transform hover:scale-110 ${
                        i === selected ? "border-primary ring-2 ring-primary/30" : "border-transparent"
                    }`}
                    style={{ backgroundColor: design.color }}
                    title={design.name}
                />
            ))}
        </div>
    </div>
)

const ValueSelector = ({ values, selected }: { values: number[]; selected: number }) => (
    <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Select Amount</p>
        <div className="flex flex-wrap gap-2">
            {values.map((value, i) => (
                <button
                    key={i}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        i === selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-muted/50 text-foreground hover:border-primary/50"
                    }`}
                >
                    ${value}
                </button>
            ))}
        </div>
    </div>
)

const NoExpiry = () => (
    <div className="flex items-center gap-2 text-sm text-green-600">
        <Infinity className="size-4" />
        No expiry date
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount}</span>
)

const BuyButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <CreditCard className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const giftCard: GiftCardProps = {
        brand: "Apple",
        value: 50,
        price: 50,
        rating: 4.9,
        sales: 45230,
        designs: [
            { name: "Black", color: "#1a1a1a" },
            { name: "Blue", color: "#0071e3" },
            { name: "Purple", color: "#8b5cf6" },
            { name: "Red", color: "#ef4444" },
        ],
        selectedDesign: 1,
        denomination: [25, 50, 100, 200],
        selectedValue: 1,
        digital: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="p-4">
                        <GiftCardDesign 
                            brand={giftCard.brand} 
                            color={giftCard.designs[giftCard.selectedDesign].color} 
                        />
                    </div>
                    <div className="space-y-3 px-4 pb-4">
                        <div className="flex items-center justify-between">
                            {giftCard.digital && <DigitalBadge />}
                            <CardRating rating={giftCard.rating} sales={giftCard.sales} />
                        </div>
                        <h3 className="font-semibold text-foreground">{giftCard.brand} Gift Card</h3>
                        <DesignSelector designs={giftCard.designs} selected={giftCard.selectedDesign} />
                        <ValueSelector values={giftCard.denomination} selected={giftCard.selectedValue} />
                        <NoExpiry />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={giftCard.denomination[giftCard.selectedValue]} />
                            <BuyButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
