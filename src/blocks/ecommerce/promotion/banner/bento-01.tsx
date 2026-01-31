import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GridItem = ({
    src,
    alt,
    badge,
    title,
    href,
    size = "default",
}: {
    src: string
    alt: string
    badge?: string
    title: string
    href: string
    size?: "default" | "large"
}) => (
    <Link
        href={href}
        className={`group relative overflow-hidden rounded-2xl bg-card ${
            size === "large" ? "@lg:row-span-2" : ""
        }`}
    >
        <div className="aspect-square @lg:aspect-auto @lg:absolute @lg:inset-0">
            <Image
                src={src}
                alt={alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 @md:p-6">
            {badge && (
                <Badge className="mb-2 shadow-lg">{badge}</Badge>
            )}
            <h3 className="text-lg @md:text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                Shop Now
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
        </div>
    </Link>
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
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight">{headline}</h2>
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
                        eyebrow="Featured Categories"
                        headline="Shop by Category"
                        cta={{ label: "View All", href: "/categories" }}
                    />
                    <div className="grid grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
                        <GridItem
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                            alt="Electronics"
                            badge="New"
                            title="Electronics"
                            href="/category/electronics"
                            size="large"
                        />
                        <GridItem
                            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600"
                            alt="Fashion"
                            title="Fashion"
                            href="/category/fashion"
                        />
                        <GridItem
                            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600"
                            alt="Home & Living"
                            badge="Sale"
                            title="Home & Living"
                            href="/category/home"
                        />
                        <GridItem
                            src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600"
                            alt="Beauty"
                            title="Beauty"
                            href="/category/beauty"
                        />
                        <GridItem
                            src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600"
                            alt="Accessories"
                            title="Accessories"
                            href="/category/accessories"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
