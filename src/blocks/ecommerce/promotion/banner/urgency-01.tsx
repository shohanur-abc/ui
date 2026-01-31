import Link from "next/link"
import { ArrowRight, Shield, Clock, Zap, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const StockIndicator = ({
    current,
    total,
    label,
}: {
    current: number
    total: number
    label: string
}) => (
    <div className="space-y-2">
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-bold text-red-500">{current} left</span>
        </div>
        <Progress value={(current / total) * 100} className="h-2 bg-muted [&>div]:bg-red-500" />
    </div>
)

const UrgencyContent = ({
    badge,
    headline,
    originalPrice,
    salePrice,
    stock,
    features,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: string
    originalPrice: string
    salePrice: string
    stock: { current: number; total: number }
    features: string[]
    cta: { label: string; href: string }
}) => (
    <div className="max-w-lg mx-auto text-center space-y-6">
        <Badge className="bg-red-500 text-white border-0 gap-1.5 animate-pulse">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">{headline}</h2>
        <div className="flex items-center justify-center gap-4">
            <span className="text-2xl text-muted-foreground line-through">{originalPrice}</span>
            <span className="text-4xl @md:text-5xl font-black text-red-500">{salePrice}</span>
        </div>
        <StockIndicator current={stock.current} total={stock.total} label="Items in stock" />
        <div className="flex flex-wrap justify-center gap-2">
            {features.map((feature, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                    {feature}
                </Badge>
            ))}
        </div>
        <Button size="lg" className="gap-2 bg-red-500 hover:bg-red-600 w-full @sm:w-auto" asChild>
            <Link href={cta.href}>
                <Zap className="size-4" />
                {cta.label}
            </Link>
        </Button>
        <p className="text-xs text-muted-foreground">⚡ 47 people are viewing this right now</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8 border-y border-red-500/30">
                <UrgencyContent
                    badge={{ icon: Clock, text: "Limited Time Only" }}
                    headline="Flash Sale - Ending Soon!"
                    originalPrice="$299.99"
                    salePrice="$149.99"
                    stock={{ current: 12, total: 100 }}
                    features={["Free Shipping", "2-Year Warranty", "30-Day Returns"]}
                    cta={{ label: "Buy Now - Save 50%", href: "/flash-sale" }}
                />
            </div>
        </section>
    )
}
