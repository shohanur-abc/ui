import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Droplets, Recycle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge className="gap-2 bg-emerald-500/20 text-emerald-500 border-emerald-500/30">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-emerald-500">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const ImpactStats = ({ stats }: { stats: { icon: React.ElementType; value: string; label: string }[] }) => (
    <div className="grid grid-cols-3 gap-6">
        {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center">
                <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="size-6 text-emerald-500" />
                </div>
                <div className="text-2xl @md:text-3xl font-bold text-emerald-500">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className={`gap-2 ${variant === "default" ? "bg-emerald-600 hover:bg-emerald-700" : ""}`} asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const ProductGrid = ({ products }: { products: { image: string; name: string; badge: string }[] }) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4">
        {products.map((product, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Badge className="absolute top-3 left-3 z-10 bg-emerald-500">{product.badge}</Badge>
                <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4">
                    <p className="text-white font-medium text-sm">{product.name}</p>
                </div>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Leaf} text="Sustainability" />
                    <Title text="Fashion That" highlight="Gives Back" />
                    <Description text="Every purchase contributes to a greener planet. Our sustainable collection is made from recycled materials and eco-friendly processes." />
                </div>
                <ImpactStats stats={[
                    { icon: Recycle, value: "2M+", label: "Bottles Recycled" },
                    { icon: Droplets, value: "50M", label: "Liters Saved" },
                    { icon: Heart, value: "100K", label: "Trees Planted" }
                ]} />
                <ProductGrid products={[
                    { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop", name: "Organic Cotton Tee", badge: "100% Organic" },
                    { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop", name: "Recycled Sneakers", badge: "Recycled" },
                    { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop", name: "Vegan Leather Bag", badge: "Vegan" },
                    { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop", name: "Bamboo Watch", badge: "Natural" }
                ]} />
                <CTA items={[
                    { label: "Shop Sustainable", href: "/sustainable", icon: Leaf },
                    { label: "Our Impact", href: "/impact", variant: "outline", icon: ArrowRight }
                ]} />
            </div>
        </section>
    )
}
