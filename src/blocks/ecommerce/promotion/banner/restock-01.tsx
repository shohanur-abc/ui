import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const BackInStockCard = ({
    image,
    title,
    price,
    soldCount,
}: {
    image: string
    title: string
    price: string
    soldCount: number
}) => (
    <div className="bg-card rounded-2xl overflow-hidden border border-border/50 group">
        <div className="aspect-square relative">
            <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            <Badge className="absolute top-3 left-3 bg-green-500 text-white border-0">
                Back in Stock
            </Badge>
        </div>
        <div className="p-4">
            <h3 className="font-semibold mb-1 line-clamp-1">{title}</h3>
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">{price}</span>
                <span className="text-xs text-muted-foreground">{soldCount}+ sold</span>
            </div>
        </div>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    subtext: string
}) => (
    <div className="text-center mb-10">
        <Badge className="bg-green-500/10 text-green-500 border-green-500/30 gap-1.5 mb-4">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
            {headline.text}
            <span className="text-green-500"> {headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Sparkles, text: "Restocked" }}
                        headline={{ text: "They're", highlight: "Back!" }}
                        subtext="Your favorite sold-out items are finally back in stock. Grab them before they're gone again!"
                    />
                    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 @md:gap-6">
                        <BackInStockCard
                            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                            title="Smart Watch Pro"
                            price="$299"
                            soldCount={1200}
                        />
                        <BackInStockCard
                            image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
                            title="Wireless Earbuds"
                            price="$149"
                            soldCount={850}
                        />
                        <BackInStockCard
                            image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
                            title="Fitness Tracker"
                            price="$199"
                            soldCount={640}
                        />
                        <BackInStockCard
                            image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
                            title="Power Bank"
                            price="$79"
                            soldCount={920}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
