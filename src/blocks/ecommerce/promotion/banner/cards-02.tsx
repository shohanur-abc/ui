import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Heart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const ProductCard = ({
    src,
    alt,
    badge,
    title,
    originalPrice,
    salePrice,
    href,
}: {
    src: string
    alt: string
    badge?: string
    title: string
    originalPrice: string
    salePrice: string
    href: string
}) => (
    <Card className="group relative overflow-hidden bg-card border-border/50 hover:border-primary/30 transition-all">
        <div className="relative aspect-square overflow-hidden">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {badge && (
                <Badge className="absolute top-3 left-3 shadow-lg">{badge}</Badge>
            )}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <Button size="icon-sm" variant="secondary" className="size-8 shadow-lg">
                    <Heart className="size-4" />
                </Button>
                <Button size="icon-sm" variant="secondary" className="size-8 shadow-lg">
                    <Eye className="size-4" />
                </Button>
            </div>
        </div>
        <div className="p-4">
            <h3 className="font-medium mb-2 truncate group-hover:text-primary transition-colors">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-primary">{salePrice}</span>
                <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
            </div>
        </div>
        <Link href={href} className="absolute inset-0" />
    </Card>
)

const SectionHeader = ({
    eyebrow,
    headline,
    cta,
}: {
    eyebrow: string
    headline: string
    cta: { label: string; href: string }
}) => (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8 @md:mb-10">
        <div>
            <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">{eyebrow}</p>
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">{headline}</h2>
        </div>
        <Button variant="outline" className="gap-2" asChild>
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
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        eyebrow="🔥 Hot Deals"
                        headline="Today's Best Sellers"
                        cta={{ label: "View All", href: "/bestsellers" }}
                    />
                    <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4 @md:gap-6">
                        <ProductCard
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                            alt="Watch"
                            badge="50% OFF"
                            title="Premium Chronograph Watch"
                            originalPrice="$299"
                            salePrice="$149"
                            href="/product/watch"
                        />
                        <ProductCard
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
                            alt="Sneakers"
                            badge="NEW"
                            title="Air Runner Sneakers"
                            originalPrice="$180"
                            salePrice="$129"
                            href="/product/sneakers"
                        />
                        <ProductCard
                            src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600"
                            alt="Sunglasses"
                            title="Designer Sunglasses"
                            originalPrice="$220"
                            salePrice="$159"
                            href="/product/sunglasses"
                        />
                        <ProductCard
                            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600"
                            alt="Bag"
                            badge="BESTSELLER"
                            title="Leather Crossbody Bag"
                            originalPrice="$189"
                            salePrice="$139"
                            href="/product/bag"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
