import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, Shield, BadgeCheck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const Guarantees = ({ items }: { items: { icon: React.ElementType; title: string; description: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border bg-card">
                <div className="inline-flex size-14 rounded-xl bg-primary/10 items-center justify-center mb-4">
                    <Icon className="size-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        ))}
    </div>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <div className="text-center">
        <Button size="lg" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-5" />
            </Link>
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Shield} text="Our Promise" />
                    <Title text="Shop with" highlight="Confidence" />
                    <Description text="We're committed to your satisfaction. Every purchase is backed by our comprehensive guarantees and customer-first policies." />
                </div>
                <Guarantees items={[
                    { icon: Shield, title: "100% Authentic", description: "Every product guaranteed genuine" },
                    { icon: Award, title: "30-Day Returns", description: "No questions asked, full refund" },
                    { icon: BadgeCheck, title: "Secure Payment", description: "Your data is always protected" },
                    { icon: CheckCircle2, title: "Free Shipping", description: "On all orders over $50" }
                ]} />
                <CTA label="Start Shopping" href="/shop" />
            </div>
        </section>
    )
}
