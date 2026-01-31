import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ThumbsUp, Package, Sparkles, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const RecommendedCard = ({
    image,
    title,
    price,
    reason,
}: {
    image: string
    title: string
    price: string
    reason: string
}) => (
    <div className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all">
        <div className="aspect-square relative">
            <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-4">
            <p className="text-xs text-primary mb-1">{reason}</p>
            <h3 className="font-semibold mb-2 line-clamp-1">{title}</h3>
            <div className="flex items-center justify-between">
                <span className="font-bold">{price}</span>
                <Button size="sm" className="gap-1.5">
                    <ShoppingCart className="size-3" />
                    Add
                </Button>
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
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-4">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
            {headline.text}
            <span className="text-primary"> {headline.highlight}</span>
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
                        badge={{ icon: ThumbsUp, text: "For You" }}
                        headline={{ text: "Recommended", highlight: "Just for You" }}
                        subtext="Based on your browsing history and preferences"
                    />
                    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
                        <RecommendedCard
                            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                            title="Smart Watch Pro"
                            price="$299"
                            reason="Because you viewed similar"
                        />
                        <RecommendedCard
                            image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
                            title="Wireless Earbuds"
                            price="$149"
                            reason="Trending in your area"
                        />
                        <RecommendedCard
                            image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
                            title="Fitness Tracker"
                            price="$199"
                            reason="Popular with shoppers like you"
                        />
                        <RecommendedCard
                            image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
                            title="Power Bank"
                            price="$79"
                            reason="Frequently bought together"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
