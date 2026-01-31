import Link from "next/link"
import { ArrowRight, Eye, Clock, Heart, ShoppingCart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const RecentlyViewedItem = ({
    title,
    price,
    viewedAgo,
}: {
    title: string
    price: string
    viewedAgo: string
}) => (
    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border/50 hover:border-primary/30 transition-all">
        <div className="flex items-center gap-4">
            <div className="size-12 rounded-lg bg-muted flex items-center justify-center">
                <Sparkles className="size-6 text-muted-foreground" />
            </div>
            <div>
                <h3 className="font-semibold">{title}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" />
                    <span>Viewed {viewedAgo}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-4">
            <span className="font-bold text-primary">{price}</span>
            <div className="flex gap-1">
                <Button size="icon" variant="ghost" className="size-8">
                    <Heart className="size-4" />
                </Button>
                <Button size="icon" variant="ghost" className="size-8">
                    <ShoppingCart className="size-4" />
                </Button>
            </div>
        </div>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: string
    subtext: string
    cta: { label: string; href: string }
}) => (
    <div className="flex flex-col @md:flex-row @md:items-end justify-between gap-4 mb-8">
        <div>
            <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-4">
                <badge.icon className="size-3" />
                {badge.text}
            </Badge>
            <h2 className="text-2xl @sm:text-3xl font-bold mb-2">{headline}</h2>
            <p className="text-muted-foreground">{subtext}</p>
        </div>
        <Button variant="outline" className="gap-2 shrink-0" asChild>
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
                <div className="max-w-3xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Eye, text: "Recently Viewed" }}
                        headline="Continue Shopping"
                        subtext="Pick up where you left off"
                        cta={{ label: "View History", href: "/history" }}
                    />
                    <div className="space-y-3">
                        <RecentlyViewedItem title="Smart Watch Pro" price="$299" viewedAgo="5 min ago" />
                        <RecentlyViewedItem title="Wireless Earbuds" price="$149" viewedAgo="1 hour ago" />
                        <RecentlyViewedItem title="Fitness Tracker" price="$199" viewedAgo="2 hours ago" />
                        <RecentlyViewedItem title="Power Bank" price="$79" viewedAgo="Yesterday" />
                    </div>
                </div>
            </div>
        </section>
    )
}
