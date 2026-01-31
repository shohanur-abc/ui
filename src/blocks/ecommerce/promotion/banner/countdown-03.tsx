import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const PulsingDotDecorative = () => (
    <span className="relative flex size-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
        <span className="relative inline-flex rounded-full size-2 bg-red-500" />
    </span>
)

const LiveBadge = ({ text }: { text: string }) => (
    <Badge variant="destructive" className="gap-1.5">
        <PulsingDotDecorative />
        {text}
    </Badge>
)

const CountdownInline = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="inline-flex items-center gap-1 font-mono text-lg @md:text-xl font-bold">
        {items.map((item, i) => (
            <span key={i} className="flex items-center">
                <span className="bg-card px-2 py-1 rounded">{item.value}</span>
                {i < items.length - 1 && <span className="mx-1 text-muted-foreground">:</span>}
            </span>
        ))}
    </div>
)

const ProductPreview = ({ images, moreCount }: { images: { src: string; alt: string }[]; moreCount: number }) => (
    <div className="flex items-center gap-2">
        <div className="flex -space-x-3">
            {images.map((img, i) => (
                <div key={i} className="relative size-12 @md:size-14 rounded-lg overflow-hidden border-2 border-background">
                    <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
            ))}
        </div>
        <span className="text-sm text-muted-foreground">+{moreCount} items</span>
    </div>
)

const DealInfo = ({
    badge,
    headline,
    countdown,
    products,
    cta,
}: {
    badge: string
    headline: string
    countdown: { value: string; label: string }[]
    products: { images: { src: string; alt: string }[]; moreCount: number }
    cta: { label: string; href: string }
}) => (
    <div className="flex flex-col @lg:flex-row items-start @lg:items-center justify-between gap-6">
        <div className="space-y-4">
            <LiveBadge text={badge} />
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">{headline}</h2>
            <div className="flex items-center gap-3">
                <Clock className="size-5 text-muted-foreground" />
                <span className="text-muted-foreground">Ends in</span>
                <CountdownInline items={countdown} />
            </div>
        </div>
        <div className="flex flex-col @sm:flex-row items-start @sm:items-center gap-4 @md:gap-6">
            <ProductPreview images={products.images} moreCount={products.moreCount} />
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
            <div className="bg-background border-y border-border py-8 @md:py-10 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-7xl mx-auto">
                    <DealInfo
                        badge="LIVE NOW"
                        headline="Lightning Deals — Up to 60% Off"
                        countdown={[
                            { value: "05", label: "h" },
                            { value: "23", label: "m" },
                            { value: "47", label: "s" },
                        ]}
                        products={{
                            images: [
                                { src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100", alt: "Watch" },
                                { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100", alt: "Shoe" },
                                { src: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100", alt: "Sunglasses" },
                            ],
                            moreCount: 47,
                        }}
                        cta={{ label: "View All Deals", href: "/lightning-deals" }}
                    />
                </div>
            </div>
        </section>
    )
}
