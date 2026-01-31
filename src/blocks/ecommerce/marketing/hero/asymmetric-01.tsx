import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Eye, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ text }: { text: string }) => (
    <span className="text-sm text-primary font-medium uppercase tracking-wider">{text}</span>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">{text}</h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground max-w-lg">{text}</p>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const ProductCard = ({ 
    image, 
    badge,
    title, 
    price, 
    originalPrice,
    rating 
}: { 
    image: { src: string; alt: string }
    badge?: string
    title: string
    price: string
    originalPrice?: string
    rating: number
}) => (
    <div className="group rounded-2xl border bg-card overflow-hidden">
        <div className="relative aspect-[4/5] overflow-hidden">
            {badge && <Badge variant="destructive" className="absolute top-3 left-3 z-10">{badge}</Badge>}
            <Image src={image.src} alt={image.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1.5">
                        <ShoppingCart className="size-4" />
                        Add to Cart
                    </Button>
                    <Button size="icon-sm" variant="secondary">
                        <Heart className="size-4" />
                    </Button>
                    <Button size="icon-sm" variant="secondary">
                        <Eye className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
        <div className="p-4 space-y-2">
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-3.5 ${i < rating ? "fill-primary text-primary" : "text-muted"}`} />
                ))}
            </div>
            <h3 className="font-medium line-clamp-1">{title}</h3>
            <div className="flex items-center gap-2">
                <span className="font-bold text-primary">{price}</span>
                {originalPrice && <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>}
            </div>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @xl:grid-cols-5 gap-8 @xl:gap-12">
                    <div className="@xl:col-span-2 space-y-6 flex flex-col justify-center">
                        <Eyebrow text="Weekly Picks" />
                        <Title text="Curated Selection" />
                        <Description text="Handpicked favorites from our collection. Discover trending styles loved by our community." />
                        <CTA label="View All Products" href="/products" />
                    </div>
                    <div className="@xl:col-span-3 grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
                        <ProductCard 
                            image={{ src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=500&fit=crop", alt: "Sneakers" }}
                            badge="-30%"
                            title="Sport Runner Pro"
                            price="$129"
                            originalPrice="$185"
                            rating={5}
                        />
                        <ProductCard 
                            image={{ src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop", alt: "Watch" }}
                            title="Classic Timepiece"
                            price="$299"
                            rating={4}
                        />
                        <ProductCard 
                            image={{ src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop", alt: "Bag" }}
                            badge="New"
                            title="Leather Tote Bag"
                            price="$189"
                            rating={5}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
