import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Tag, ShoppingCart, Percent, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const PromoBanner = ({ 
    icon: Icon,
    title, 
    code,
    discount,
    description,
    cta
}: { 
    icon: React.ElementType
    title: string
    code: string
    discount: string
    description: string
    cta: { label: string; href: string }
}) => (
    <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-card to-accent/10 p-8 @lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 size-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative grid @lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <Badge variant="secondary" className="gap-2">
                    <Icon className="size-4" />
                    Limited Time Offer
                </Badge>
                <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight">
                    {title}
                    <span className="block text-primary">{discount}</span>
                </h1>
                <p className="text-lg text-muted-foreground">{description}</p>
                <div className="flex items-center gap-4">
                    <div className="rounded-lg border-2 border-dashed border-primary px-4 py-2 bg-primary/5">
                        <span className="text-xs text-muted-foreground">Use code:</span>
                        <span className="block text-xl font-bold text-primary">{code}</span>
                    </div>
                    <Button size="lg" className="gap-2" asChild>
                        <Link href={cta.href}>
                            {cta.label}
                            <ArrowRight className="size-5" />
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <PromoCard 
                    image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop"
                    alt="Shoes"
                    discount="40% OFF"
                />
                <PromoCard 
                    image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
                    alt="Watch"
                    discount="30% OFF"
                />
                <PromoCard 
                    image="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop"
                    alt="Bag"
                    discount="50% OFF"
                />
                <PromoCard 
                    image="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=300&fit=crop"
                    alt="Accessories"
                    discount="25% OFF"
                />
            </div>
        </div>
    </div>
)

const PromoCard = ({ image, alt, discount }: { image: string; alt: string; discount: string }) => (
    <div className="relative aspect-square rounded-xl overflow-hidden group">
        <Badge variant="destructive" className="absolute top-2 left-2 z-10 text-xs">{discount}</Badge>
        <Image src={image} alt={alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <PromoBanner 
                    icon={Tag}
                    title="Summer Sale"
                    code="SUMMER50"
                    discount="Up to 50% Off"
                    description="Shop our biggest summer sale ever. Thousands of items at unbeatable prices."
                    cta={{ label: "Shop Sale", href: "/sale" }}
                />
            </div>
        </section>
    )
}
