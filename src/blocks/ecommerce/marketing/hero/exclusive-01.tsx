import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Crown, Star, Lock, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge className="gap-2 bg-amber-500/20 text-amber-500 border-amber-500/30">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const Benefits = ({ items }: { items: { icon: React.ElementType; text: string }[] }) => (
    <div className="grid @sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <Icon className="size-5 text-amber-500" />
                <span className="text-sm">{text}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className={`gap-2 ${variant === "default" ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" : ""}`} asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const ExclusiveProducts = ({ products }: { products: { image: string; title: string; price: string }[] }) => (
    <div className="grid grid-cols-2 gap-4">
        {products.map((product, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Badge className="absolute top-3 left-3 z-10 bg-amber-500/90">
                    <Lock className="size-3 mr-1" />
                    VIP Only
                </Badge>
                <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <p className="font-medium">{product.title}</p>
                    <p className="text-amber-400 font-bold">{product.price}</p>
                </div>
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
                        <Eyebrow icon={Crown} text="VIP Access" />
                        <Title text="Unlock" highlight="Exclusive Drops" />
                        <Description text="Get early access to limited edition pieces before anyone else. Join our VIP club for exclusive products, special discounts, and premium perks." />
                        <Benefits items={[
                            { icon: Lock, text: "48-hour early access" },
                            { icon: Gift, text: "Exclusive member pricing" },
                            { icon: Star, text: "Limited edition products" },
                            { icon: Crown, text: "Priority customer support" }
                        ]} />
                        <CTA items={[
                            { label: "Join VIP Club", href: "/vip", icon: Crown },
                            { label: "Learn More", href: "/vip/benefits", variant: "outline", icon: ArrowRight }
                        ]} />
                    </div>
                    <ExclusiveProducts products={[
                        { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop", title: "Limited Watch", price: "$599" },
                        { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop", title: "Exclusive Bag", price: "$449" },
                        { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop", title: "Rare Sneakers", price: "$329" },
                        { image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=533&fit=crop", title: "VIP Fragrance", price: "$189" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
