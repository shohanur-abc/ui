import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-primary/20 rounded-full blur-3xl" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge className="gap-1.5 mb-4">
        <Icon className="size-3" />
        {text}
    </Badge>
)

const Headline = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold tracking-tight mb-4">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto mb-6 @md:mb-8">
        {text}
    </p>
)

const CTA = ({
    items,
}: {
    items: { label: string; href: string; variant?: "default" | "outline"; icon?: React.ElementType }[]
}) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
        {items.map(({ label, href, variant = "default", icon: Icon }, i) => (
            <Button key={i} variant={variant} size="lg" className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <div className="relative max-w-4xl mx-auto text-center">
                    <Eyebrow icon={Zap} text="New Arrival" />
                    <Headline text="The Future of" highlight="Shopping" />
                    <Description text="Discover our newest collection with exclusive deals and limited-time offers. Shop now and save big on premium products." />
                    <CTA
                        items={[
                            { label: "Shop Collection", href: "/collection", icon: ArrowRight },
                            { label: "Learn More", href: "/about", variant: "outline" },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}
