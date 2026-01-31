import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, ShoppingCart, Star, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ProductCard = ({ 
    image, 
    badge,
    category,
    title, 
    price, 
    originalPrice,
    rating,
    href
}: { 
    image: { src: string; alt: string }
    badge?: { text: string; variant?: "default" | "destructive" | "secondary" }
    category: string
    title: string
    price: string
    originalPrice?: string
    rating: number
    href: string
}) => (
    <div className="group rounded-2xl border bg-card overflow-hidden">
        <div className="relative aspect-[3/4]">
            {badge && <Badge variant={badge.variant} className="absolute top-4 left-4 z-10">{badge.text}</Badge>}
            <Button size="icon" variant="secondary" className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="size-4" />
            </Button>
            <Image src={image.src} alt={image.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-background to-transparent pt-20">
                <div className="flex gap-2">
                    <Button className="flex-1 gap-2" asChild>
                        <Link href={href}>
                            <ShoppingCart className="size-4" />
                            Add to Cart
                        </Link>
                    </Button>
                    <Button size="icon" variant="outline">
                        <Eye className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
        <div className="p-5 space-y-3">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">{category}</span>
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            <div className="flex items-center gap-2">
                <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`size-4 ${i < rating ? "fill-primary text-primary" : "text-muted"}`} />
                    ))}
                </div>
                <span className="text-sm text-muted-foreground">({rating}.0)</span>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-primary">{price}</span>
                {originalPrice && <span className="text-muted-foreground line-through">{originalPrice}</span>}
            </div>
        </div>
    </div>
)

const SectionHeader = ({ title, cta }: { title: string; cta: { label: string; href: string } }) => (
    <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl @md:text-3xl font-bold">{title}</h2>
        <Button variant="ghost" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <SectionHeader title="Trending This Week" cta={{ label: "View All", href: "/trending" }} />
                <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
                    <ProductCard 
                        image={{ src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=533&fit=crop", alt: "Fashion model" }}
                        badge={{ text: "New In", variant: "default" }}
                        category="Dresses"
                        title="Silk Evening Dress"
                        price="$289"
                        rating={5}
                        href="/product/silk-dress"
                    />
                    <ProductCard 
                        image={{ src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop", alt: "Sneakers" }}
                        badge={{ text: "-40%", variant: "destructive" }}
                        category="Footwear"
                        title="Pro Runner Max"
                        price="$119"
                        originalPrice="$199"
                        rating={4}
                        href="/product/pro-runner"
                    />
                    <ProductCard 
                        image={{ src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop", alt: "Leather bag" }}
                        category="Bags"
                        title="Italian Leather Tote"
                        price="$349"
                        rating={5}
                        href="/product/leather-tote"
                    />
                    <ProductCard 
                        image={{ src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop", alt: "Watch" }}
                        badge={{ text: "Limited", variant: "secondary" }}
                        category="Accessories"
                        title="Chronograph Watch"
                        price="$499"
                        rating={5}
                        href="/product/chronograph"
                    />
                </div>
            </div>
        </section>
    )
}
