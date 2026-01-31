import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Calendar, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
    </div>
)

const FeaturedNewArrival = ({
    image,
    badge,
    headline,
    description,
    price,
    cta,
}: {
    image: string
    badge: { icon: React.ElementType; text: string }
    headline: string
    description: string
    price: { current: string; original?: string }
    cta: { label: string; href: string }
}) => (
    <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
        <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image src={image} alt={headline} fill className="object-cover" />
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground border-0 gap-1">
                <Sparkles className="size-3" />
                New
            </Badge>
        </div>
        <div className="space-y-6">
            <Badge variant="outline" className="border-primary/50 text-primary gap-1.5">
                <badge.icon className="size-3" />
                {badge.text}
            </Badge>
            <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold">{headline}</h2>
            <p className="text-muted-foreground text-base @md:text-lg">{description}</p>
            <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-primary">{price.current}</span>
                {price.original && (
                    <span className="text-xl text-muted-foreground line-through">{price.original}</span>
                )}
            </div>
            <Button size="lg" className="gap-2" asChild>
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
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <div className="relative max-w-6xl mx-auto">
                    <FeaturedNewArrival
                        image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"
                        badge={{ icon: Calendar, text: "Just Arrived" }}
                        headline="Premium Wireless Headphones"
                        description="Experience studio-quality sound with our newest addition. Featuring 40-hour battery life, active noise cancellation, and premium comfort for all-day wear."
                        price={{ current: "$349", original: "$449" }}
                        cta={{ label: "Shop Now", href: "/product/headphones" }}
                    />
                </div>
            </div>
        </section>
    )
}
