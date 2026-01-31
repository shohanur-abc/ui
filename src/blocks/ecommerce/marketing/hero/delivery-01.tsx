import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, Truck, Clock, CheckCircle2 } from "lucide-react"
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

const Timeline = ({ steps }: { steps: { icon: React.ElementType; title: string; description: string; completed?: boolean }[] }) => (
    <div className="flex flex-col @md:flex-row justify-between max-w-4xl mx-auto">
        {steps.map(({ icon: Icon, title, description, completed }, i) => (
            <div key={i} className="flex @md:flex-col items-center @md:items-center gap-4 @md:text-center relative pb-8 @md:pb-0">
                <div className={`size-12 rounded-full flex items-center justify-center shrink-0 ${completed ? "bg-primary text-primary-foreground" : "border-2 border-muted bg-background"}`}>
                    {completed ? <CheckCircle2 className="size-6" /> : <Icon className="size-6 text-muted-foreground" />}
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {i < steps.length - 1 && (
                    <div className="hidden @md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-muted" />
                )}
            </div>
        ))}
    </div>
)

const Features = ({ items }: { items: { icon: React.ElementType; title: string; description: string }[] }) => (
    <div className="grid @md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="text-center p-6 rounded-2xl border bg-card">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="size-6 text-primary" />
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
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-16">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Truck} text="Fast Delivery" />
                    <Title text="Order Today, Get It" highlight="Tomorrow" />
                    <Description text="Experience lightning-fast delivery with our express shipping. Track your order in real-time and receive it within 24 hours." />
                </div>
                <Timeline steps={[
                    { icon: Package, title: "Order Placed", description: "Instantly confirmed", completed: true },
                    { icon: Package, title: "Processing", description: "Packed with care", completed: true },
                    { icon: Truck, title: "In Transit", description: "On the way", completed: false },
                    { icon: CheckCircle2, title: "Delivered", description: "At your door", completed: false }
                ]} />
                <Features items={[
                    { icon: Clock, title: "Same Day Dispatch", description: "Order before 2PM for same day shipping" },
                    { icon: Truck, title: "Free Express", description: "Free express shipping on orders $75+" },
                    { icon: Package, title: "Easy Returns", description: "30-day hassle-free returns" }
                ]} />
                <CTA label="Start Shopping" href="/shop" />
            </div>
        </section>
    )
}
