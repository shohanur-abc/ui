import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Wallet, Shirt, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const BudgetFilter = ({ items }: { items: { label: string; active?: boolean }[] }) => (
    <div className="flex flex-wrap gap-2">
        {items.map(({ label, active }, i) => (
            <Button key={i} variant={active ? "default" : "outline"} size="sm" className="rounded-full">
                {label}
            </Button>
        ))}
    </div>
)

const BudgetProducts = ({ products }: { products: { image: string; name: string; price: string; category: string }[] }) => (
    <div className="grid grid-cols-2 gap-4">
        {products.map((product, i) => (
            <div key={i} className="group rounded-2xl border bg-card overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                    <Badge className="absolute top-3 left-3 z-10" variant="secondary">{product.category}</Badge>
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 space-y-2">
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-primary font-bold text-lg">{product.price}</p>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex gap-6">
        {items.map(({ value, label }, i) => (
            <div key={i}>
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Wallet} text="Budget Friendly" />
                        <Title text="Style That Fits" highlight="Your Budget" />
                        <Description text="Great fashion doesn't have to break the bank. Discover affordable pieces that look and feel premium without the premium price tag." />
                        <BudgetFilter items={[
                            { label: "Under $25", active: true },
                            { label: "Under $50" },
                            { label: "Under $100" },
                            { label: "Under $200" }
                        ]} />
                        <Stats items={[
                            { value: "2,500+", label: "Budget Items" },
                            { value: "4.8★", label: "Avg Rating" }
                        ]} />
                        <CTA items={[
                            { label: "Shop Budget Finds", href: "/budget", icon: Sparkles },
                            { label: "View All", href: "/shop", variant: "outline", icon: ArrowRight }
                        ]} />
                    </div>
                    <BudgetProducts products={[
                        { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop", name: "Cotton Blend Tee", price: "$19", category: "Top" },
                        { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", name: "Canvas Sneakers", price: "$39", category: "Shoes" },
                        { image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop", name: "Denim Jeans", price: "$45", category: "Bottoms" },
                        { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", name: "Minimal Watch", price: "$49", category: "Accessories" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
