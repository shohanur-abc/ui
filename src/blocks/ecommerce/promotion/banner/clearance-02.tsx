import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Tag, Percent, Clock, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-500/5 to-transparent" />
    </div>
)

const ClearanceProductCard = ({
    image,
    title,
    originalPrice,
    salePrice,
    discount,
}: {
    image: string
    title: string
    originalPrice: string
    salePrice: string
    discount: string
}) => (
    <div className="bg-card rounded-2xl overflow-hidden border border-red-500/20 group">
        <div className="aspect-square relative">
            <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">
                {discount}
            </Badge>
        </div>
        <div className="p-4">
            <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>
            <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-500">{salePrice}</span>
                <span className="text-sm text-muted-foreground line-through">{originalPrice}</span>
            </div>
        </div>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    timer,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    timer: string
}) => (
    <div className="flex flex-col @lg:flex-row @lg:items-center justify-between gap-4 mb-10">
        <div>
            <Badge className="bg-red-500 text-white border-0 gap-1.5 mb-4">
                <badge.icon className="size-3" />
                {badge.text}
            </Badge>
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
                {headline.text}
                <span className="text-red-500"> {headline.highlight}</span>
            </h2>
        </div>
        <div className="flex items-center gap-2 text-red-500">
            <Clock className="size-5" />
            <span className="font-mono font-bold text-xl">{timer}</span>
            <span className="text-sm text-muted-foreground">left</span>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <div className="relative max-w-6xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Tag, text: "Clearance Event" }}
                        headline={{ text: "Everything Must", highlight: "Go!" }}
                        timer="23:45:12"
                    />
                    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mb-8">
                        <ClearanceProductCard
                            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                            title="Smart Watch"
                            originalPrice="$299"
                            salePrice="$99"
                            discount="-67%"
                        />
                        <ClearanceProductCard
                            image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
                            title="Earbuds Pro"
                            originalPrice="$149"
                            salePrice="$59"
                            discount="-60%"
                        />
                        <ClearanceProductCard
                            image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
                            title="Fitness Band"
                            originalPrice="$129"
                            salePrice="$49"
                            discount="-62%"
                        />
                        <ClearanceProductCard
                            image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
                            title="Power Bank"
                            originalPrice="$79"
                            salePrice="$29"
                            discount="-63%"
                        />
                    </div>
                    <div className="text-center">
                        <Button size="lg" className="gap-2 bg-red-500 hover:bg-red-600" asChild>
                            <Link href="/clearance">
                                Shop All Clearance
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
