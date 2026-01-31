import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Crown, Star, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const BestsellerGrid = ({ products }: { products: { image: string; name: string; price: string; sales: string; rank: number }[] }) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
        {products.map((product, i) => (
            <div key={i} className="group rounded-2xl border bg-card overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                    <div className="absolute top-3 left-3 z-10 size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        #{product.rank}
                    </div>
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 space-y-2">
                    <p className="font-medium truncate">{product.name}</p>
                    <div className="flex items-center justify-between">
                        <p className="text-primary font-bold">{product.price}</p>
                        <p className="text-xs text-muted-foreground">{product.sales} sold</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex justify-center gap-8 @md:gap-12">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <div className="text-center">
        <Button size="lg" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-5" />
            </Link>
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Badge variant="secondary" className="gap-2">
                        <Crown className="size-4" />
                        Bestsellers
                    </Badge>
                    <Title text="Our Most Loved" highlight="Products" />
                    <Description text="Discover what everyone's buying. These bestsellers have earned their spot with thousands of 5-star reviews." />
                </div>
                <Stats items={[
                    { value: "500K+", label: "Items Sold" },
                    { value: "4.9★", label: "Avg Rating" },
                    { value: "98%", label: "Would Recommend" }
                ]} />
                <BestsellerGrid products={[
                    { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop", name: "Urban Runner Pro", price: "$149", sales: "45K", rank: 1 },
                    { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop", name: "Classic Summer Dress", price: "$89", sales: "38K", rank: 2 },
                    { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop", name: "Premium Leather Bag", price: "$249", sales: "32K", rank: 3 },
                    { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop", name: "Smart Watch Elite", price: "$299", sales: "28K", rank: 4 }
                ]} />
                <CTA label="View All Bestsellers" href="/bestsellers" />
            </div>
        </section>
    )
}
