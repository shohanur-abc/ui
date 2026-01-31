import Link from "next/link"
import { Gift, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ParticleDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
            <div
                key={i}
                className="absolute size-1 rounded-full bg-primary/40"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                }}
            />
        ))}
    </div>
)

const GiftIcon = () => (
    <div className="relative inline-flex items-center justify-center size-20 @md:size-24 rounded-2xl bg-gradient-to-br from-primary to-accent text-primary-foreground mb-6 @md:mb-8 shadow-lg shadow-primary/25">
        <Gift className="size-10 @md:size-12" />
        <Sparkles className="absolute -top-2 -right-2 size-6 text-primary" />
    </div>
)

const Headline = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
        {text}
        <span className="block text-primary mt-1">{highlight}</span>
    </h2>
)

const OfferDetails = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-2 mb-6 @md:mb-8">
        {items.map((item, i) => (
            <Badge key={i} variant="secondary" className="text-sm">
                {item}
            </Badge>
        ))}
    </div>
)

const CTAButton = ({
    label,
    href,
    icon: Icon,
}: {
    label: string
    href: string
    icon: React.ElementType
}) => (
    <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
        <Link href={href}>
            {label}
            <Icon className="size-4" />
        </Link>
    </Button>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <ParticleDecorative />
                <div className="relative max-w-3xl mx-auto text-center">
                    <GiftIcon />
                    <Headline text="Unwrap Your" highlight="Exclusive Reward" />
                    <OfferDetails
                        items={[
                            "Free Gift with Purchase",
                            "VIP Early Access",
                            "Double Points Weekend",
                        ]}
                    />
                    <CTAButton label="Claim Your Gift" href="/rewards" icon={ArrowRight} />
                </div>
            </div>
        </section>
    )
}
