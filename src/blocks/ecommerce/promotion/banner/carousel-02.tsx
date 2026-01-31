import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SlideCard = ({
    src,
    alt,
    badge,
    title,
    price,
    href,
    active,
}: {
    src: string
    alt: string
    badge?: string
    title: string
    price: string
    href: string
    active?: boolean
}) => (
    <Link
        href={href}
        className={`group relative flex-shrink-0 w-[280px] @md:w-[320px] rounded-2xl overflow-hidden bg-card transition-all ${
            active ? "scale-100 opacity-100" : "scale-95 opacity-60"
        }`}
    >
        <div className="aspect-[3/4]">
            <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        {badge && (
            <Badge className="absolute top-4 left-4 shadow-lg">{badge}</Badge>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/80 to-transparent">
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-primary font-bold">{price}</p>
        </div>
    </Link>
)

const CarouselNav = () => (
    <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="size-10 rounded-full">
            <ChevronLeft className="size-5" />
        </Button>
        <Button variant="outline" size="icon" className="size-10 rounded-full">
            <ChevronRight className="size-5" />
        </Button>
    </div>
)

const SectionHeader = ({
    headline,
    cta,
}: {
    headline: string
    cta: { label: string; href: string }
}) => (
    <div className="flex items-center justify-between mb-6 @md:mb-8">
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">{headline}</h2>
        <div className="flex items-center gap-4">
            <Button variant="ghost" className="gap-2 hidden @md:inline-flex" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4" />
                </Link>
            </Button>
            <CarouselNav />
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-7xl mx-auto">
                    <SectionHeader
                        headline="Trending Now"
                        cta={{ label: "View All", href: "/trending" }}
                    />
                    <div className="flex gap-4 @md:gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                        <SlideCard
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                            alt="Watch"
                            badge="SALE"
                            title="Classic Timepiece"
                            price="$199"
                            href="/product/watch"
                            active
                        />
                        <SlideCard
                            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
                            alt="Sneakers"
                            badge="NEW"
                            title="Air Runner Pro"
                            price="$159"
                            href="/product/sneakers"
                        />
                        <SlideCard
                            src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600"
                            alt="Sunglasses"
                            title="Designer Shades"
                            price="$89"
                            href="/product/sunglasses"
                        />
                        <SlideCard
                            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600"
                            alt="Bag"
                            title="Leather Tote"
                            price="$249"
                            href="/product/bag"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
