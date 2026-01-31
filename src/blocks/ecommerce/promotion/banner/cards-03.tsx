import Link from "next/link"
import { ArrowRight, Percent, Truck, RefreshCw, Headphones } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const FeatureCard = ({
    icon: Icon,
    title,
    description,
    highlight,
}: {
    icon: React.ElementType
    title: string
    description: string
    highlight?: boolean
}) => (
    <div
        className={`relative p-6 rounded-2xl transition-all hover:scale-[1.02] ${
            highlight
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-card/80 border border-border/50"
        }`}
    >
        <Icon className={`size-8 mb-4 ${highlight ? "opacity-90" : "text-primary"}`} />
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className={`text-sm ${highlight ? "opacity-80" : "text-muted-foreground"}`}>{description}</p>
    </div>
)

const MainPromo = ({
    badge,
    headline,
    description,
    href,
}: {
    badge: string
    headline: { text: string; highlight: string }
    description: string
    href: string
}) => (
    <Link
        href={href}
        className="group relative @lg:col-span-2 p-8 @md:p-10 rounded-2xl bg-gradient-to-br from-primary/20 via-card to-accent/10 border border-primary/20 hover:border-primary/40 transition-all"
    >
        <Badge className="mb-4">{badge}</Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
            {headline.text}
            <span className="text-primary"> {headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
        <span className="inline-flex items-center gap-2 font-medium text-primary group-hover:gap-3 transition-all">
            Learn More
            <ArrowRight className="size-4" />
        </span>
    </Link>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
                        <MainPromo
                            badge="Limited Offer"
                            headline={{ text: "Save Big This", highlight: "Weekend" }}
                            description="Enjoy exclusive discounts on our premium collection. Free shipping on all orders over $50."
                            href="/weekend-sale"
                        />
                        <FeatureCard
                            icon={Percent}
                            title="Up to 50% Off"
                            description="On selected items"
                        />
                        <FeatureCard
                            icon={Truck}
                            title="Free Shipping"
                            description="Orders over $50"
                            highlight
                        />
                        <FeatureCard
                            icon={RefreshCw}
                            title="Easy Returns"
                            description="30-day return policy"
                        />
                        <FeatureCard
                            icon={Headphones}
                            title="24/7 Support"
                            description="Always here to help"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
