import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Star, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const QuickViewGrid = ({ products }: { products: { image: string; name: string; price: string; rating: number }[] }) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
        {products.map((product, i) => (
            <div key={i} className="group rounded-2xl border bg-card overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <Button size="icon" variant="secondary" className="size-10 rounded-full">
                            <Eye className="size-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="size-10 rounded-full">
                            <Heart className="size-4" />
                        </Button>
                        <Button size="icon" variant="secondary" className="size-10 rounded-full">
                            <ShoppingBag className="size-4" />
                        </Button>
                    </div>
                </div>
                <div className="p-4 space-y-2">
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`size-3 ${j < product.rating ? "fill-primary text-primary" : "text-muted"}`} />
                        ))}
                    </div>
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-primary font-bold">{product.price}</p>
                </div>
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
                    <Eyebrow icon={Eye} text="Quick View" />
                    <Title text="Shop with" highlight="Quick View" />
                    <Description text="Hover over any product to instantly preview, add to wishlist, or shop. The fastest way to explore our collection." />
                </div>
                <QuickViewGrid products={[
                    { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop", name: "Elegant Dress", price: "$159", rating: 5 },
                    { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop", name: "Sport Sneakers", price: "$129", rating: 4 },
                    { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop", name: "Designer Bag", price: "$299", rating: 5 },
                    { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop", name: "Classic Watch", price: "$249", rating: 5 }
                ]} />
                <CTA label="Explore Collection" href="/shop" />
            </div>
        </section>
    )
}
