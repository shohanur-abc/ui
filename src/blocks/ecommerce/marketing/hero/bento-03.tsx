import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Percent, Gift, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const PromoCard = ({ 
    icon: Icon,
    title, 
    subtitle,
    cta, 
    color,
    size = "default"
}: { 
    icon: React.ElementType
    title: string
    subtitle: string
    cta: { label: string; href: string }
    color: string
    size?: "default" | "large"
}) => (
    <div className={`rounded-2xl border bg-card p-6 @md:p-8 flex flex-col ${size === "large" ? "justify-between min-h-[280px]" : ""}`}>
        <div className={`size-12 @md:size-14 rounded-2xl ${color} flex items-center justify-center mb-4`}>
            <Icon className="size-6 @md:size-7 text-primary-foreground" />
        </div>
        <div className="space-y-2 mb-6">
            <h3 className={`font-bold ${size === "large" ? "text-2xl @md:text-3xl" : "text-xl"}`}>{title}</h3>
            <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <Button variant="outline" className="w-fit gap-2 mt-auto" asChild>
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

const FeaturedProduct = ({ 
    image, 
    badge,
    title, 
    price, 
    originalPrice,
    rating,
    cta 
}: { 
    image: { src: string; alt: string }
    badge?: string
    title: string
    price: string
    originalPrice?: string
    rating: number
    cta: { label: string; href: string }
}) => (
    <div className="rounded-2xl border bg-card overflow-hidden group">
        <div className="relative aspect-square">
            {badge && <Badge className="absolute top-4 left-4 z-10">{badge}</Badge>}
            <Image src={image.src} alt={image.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-6 space-y-3">
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-4 ${i < rating ? "fill-primary text-primary" : "text-muted"}`} />
                ))}
            </div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">{price}</span>
                {originalPrice && <span className="text-muted-foreground line-through">{originalPrice}</span>}
            </div>
            <Button className="w-full gap-2" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4" />
                </Link>
            </Button>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-3 gap-4 @md:gap-6">
                    <div className="@lg:col-span-2 grid @sm:grid-cols-2 gap-4 @md:gap-6">
                        <PromoCard 
                            icon={Percent}
                            title="Summer Sale"
                            subtitle="Up to 60% off on selected items"
                            cta={{ label: "Shop Now", href: "/sale" }}
                            color="bg-primary"
                            size="large"
                        />
                        <PromoCard 
                            icon={Gift}
                            title="Gift Cards"
                            subtitle="The perfect present for any occasion"
                            cta={{ label: "Buy Gift Card", href: "/gift-cards" }}
                            color="bg-accent"
                            size="large"
                        />
                    </div>
                    <FeaturedProduct 
                        image={{ src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop", alt: "Smart watch" }}
                        badge="Best Seller"
                        title="Premium Smart Watch"
                        price="$299"
                        originalPrice="$399"
                        rating={5}
                        cta={{ label: "View Product", href: "/product/smart-watch" }}
                    />
                </div>
            </div>
        </section>
    )
}
