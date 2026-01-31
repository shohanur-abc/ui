import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Gift, Heart, ShoppingCart, Star, Tag, Wallet, Clock, Sparkles } from "lucide-react"
import Image from "next/image"

interface VoucherProps {
    image: string
    brand: string
    brandLogo: string
    value: number
    price: number
    discount: number
    rating: number
    sales: number
    validUntil: string
    category: string
    terms: string[]
}

const VoucherDesign = ({ image, brand }: { image: string; brand: string }) => (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute -left-10 -top-10 size-40 rounded-full bg-white/20" />
            <div className="absolute -bottom-10 -right-10 size-60 rounded-full bg-white/10" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
                <Gift className="mx-auto size-12 text-white" />
                <p className="mt-2 text-lg font-bold text-white">{brand}</p>
                <p className="text-sm text-white/80">Gift Voucher</p>
            </div>
        </div>
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white hover:bg-white/20">
            <Heart className="size-4" />
        </Button>
    </div>
)

const DiscountBadge = ({ percent }: { percent: number }) => (
    <Badge className="absolute left-3 top-3 gap-1 bg-green-600">
        <Tag className="size-3" />
        {percent}% OFF
    </Badge>
)

const VoucherValue = ({ value, price }: { value: number; price: number }) => (
    <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-foreground">${value}</span>
        <span className="text-sm text-muted-foreground">for ${price}</span>
    </div>
)

const VoucherRating = ({ rating, sales }: { rating: number; sales: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({sales} sold)</span>
    </div>
)

const CategoryBadge = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <Sparkles className="size-3" />
        {text}
    </Badge>
)

const ValidityInfo = ({ date }: { date: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="size-4" />
        Valid until {date}
    </div>
)

const TermsList = ({ terms }: { terms: string[] }) => (
    <div className="space-y-1">
        {terms.map((term, i) => (
            <p key={i} className="text-xs text-muted-foreground">• {term}</p>
        ))}
    </div>
)

const Savings = ({ amount }: { amount: number }) => (
    <div className="flex items-center gap-1 text-sm text-green-600">
        <Wallet className="size-4" />
        You save ${amount}
    </div>
)

const BuyButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const voucher: VoucherProps = {
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=280&fit=crop",
        brand: "Amazon",
        brandLogo: "",
        value: 100,
        price: 85,
        discount: 15,
        rating: 4.9,
        sales: 12340,
        validUntil: "Dec 31, 2025",
        category: "Shopping",
        terms: [
            "Redeemable online & in-store",
            "No minimum purchase required",
        ],
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <VoucherDesign image={voucher.image} brand={voucher.brand} />
                        <DiscountBadge percent={voucher.discount} />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <CategoryBadge text={voucher.category} />
                            <VoucherRating rating={voucher.rating} sales={voucher.sales} />
                        </div>
                        <VoucherValue value={voucher.value} price={voucher.price} />
                        <ValidityInfo date={voucher.validUntil} />
                        <TermsList terms={voucher.terms} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Savings amount={voucher.value - voucher.price} />
                            <BuyButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
