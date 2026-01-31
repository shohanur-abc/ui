import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, CheckCircle2, ShoppingBag, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const HowItWorks = ({ steps }: { steps: { number: string; title: string; description: string }[] }) => (
    <div className="space-y-4">
        {steps.map(({ number, title, description }, i) => (
            <div key={i} className="flex gap-4">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
                    {number}
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        ))}
    </div>
)

const Benefits = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-primary" />
                <span>{item}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const BoxPreview = ({ items }: { items: { image: string; alt: string }[] }) => (
    <div className="relative">
        <div className="relative aspect-square rounded-3xl overflow-hidden border bg-gradient-to-br from-primary/10 to-accent/10 p-8">
            <div className="grid grid-cols-2 gap-4 h-full">
                {items.map((item, i) => (
                    <div key={i} className="relative rounded-2xl overflow-hidden shadow-lg">
                        <Image src={item.image} alt={item.alt} fill className="object-cover" />
                    </div>
                ))}
            </div>
        </div>
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">$49/month</Badge>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Package} text="Subscription Box" />
                        <Title text="Curated Style" highlight="Delivered Monthly" />
                        <Description text="Get a personalized box of premium fashion items delivered to your door every month. Handpicked by stylists based on your preferences." />
                        <HowItWorks steps={[
                            { number: "1", title: "Take the Quiz", description: "Tell us about your style preferences" },
                            { number: "2", title: "Get Your Box", description: "Receive 4-6 items monthly" },
                            { number: "3", title: "Keep What You Love", description: "Return what doesn't fit" }
                        ]} />
                        <Benefits items={["Free shipping", "Free returns", "Skip anytime", "Personal stylist"]} />
                        <CTA items={[
                            { label: "Start Subscription", href: "/subscribe", icon: ShoppingBag },
                            { label: "How It Works", href: "/how-it-works", variant: "outline", icon: ArrowRight }
                        ]} />
                    </div>
                    <BoxPreview items={[
                        { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=300&fit=crop", alt: "Item 1" },
                        { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", alt: "Item 2" },
                        { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop", alt: "Item 3" },
                        { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", alt: "Item 4" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
