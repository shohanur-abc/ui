import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Undo2, Package, Clock, Shield } from "lucide-react"
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

const Timeline = ({ steps }: { steps: { icon: React.ElementType; title: string; description: string }[] }) => (
    <div className="grid @md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {steps.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="relative text-center">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="size-7 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
                {i < steps.length - 1 && (
                    <ArrowRight className="hidden @md:block absolute top-7 -right-3 size-6 text-muted-foreground" />
                )}
            </div>
        ))}
    </div>
)

const Guarantees = ({ items }: { items: { icon: React.ElementType; title: string; description: string }[] }) => (
    <div className="grid @md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="rounded-2xl border bg-card p-6 text-center">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="size-6 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
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
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-16">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Undo2} text="Easy Returns" />
                    <Title text="Hassle-Free" highlight="Returns" />
                    <Description text="Changed your mind? No problem. Our simple return process makes it easy to return or exchange items within 30 days." />
                </div>
                <Timeline steps={[
                    { icon: Package, title: "Start Return", description: "Request online in seconds" },
                    { icon: Undo2, title: "Pack It Up", description: "Use original packaging" },
                    { icon: Package, title: "Drop Off", description: "Any shipping location" },
                    { icon: Shield, title: "Get Refund", description: "Within 3-5 business days" }
                ]} />
                <Guarantees items={[
                    { icon: Clock, title: "30-Day Window", description: "Full 30 days to decide if it's right for you" },
                    { icon: Package, title: "Free Returns", description: "We cover return shipping on all orders" },
                    { icon: Shield, title: "Full Refund", description: "Get your money back, no questions asked" }
                ]} />
                <CTA label="Start a Return" href="/returns" />
            </div>
        </section>
    )
}
