import Link from "next/link"
import { Mail, ArrowRight, Gift, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2 px-4 py-1.5">
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
    <p className="text-lg text-muted-foreground max-w-xl mx-auto">{text}</p>
)

const NewsletterForm = ({ placeholder, buttonText, note }: { placeholder: string; buttonText: string; note: string }) => (
    <div className="max-w-md mx-auto space-y-4">
        <div className="flex gap-2">
            <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input 
                    type="email" 
                    placeholder={placeholder}
                    className="pl-10 h-12"
                />
            </div>
            <Button size="lg" className="gap-2 shrink-0">
                {buttonText}
                <ArrowRight className="size-4" />
            </Button>
        </div>
        <p className="text-sm text-muted-foreground text-center">{note}</p>
    </div>
)

const Benefits = ({ items }: { items: { icon: React.ElementType; text: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-6 @md:gap-8">
        {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <Icon className="size-5 text-primary" />
                <span>{text}</span>
            </div>
        ))}
    </div>
)

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 size-96 rounded-full bg-accent/10 blur-3xl" />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <GlowDecorative />
            <div className="relative max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36">
                <div className="text-center space-y-8">
                    <Eyebrow icon={Gift} text="Exclusive Access" />
                    <Title text="Join Our" highlight="VIP List" />
                    <Description text="Be the first to know about new arrivals, exclusive offers, and member-only perks. Join 50,000+ fashion enthusiasts." />
                    <NewsletterForm 
                        placeholder="Enter your email"
                        buttonText="Subscribe"
                        note="Get 15% off your first order. Unsubscribe anytime."
                    />
                    <Benefits items={[
                        { icon: Sparkles, text: "Early Access" },
                        { icon: Gift, text: "Exclusive Discounts" },
                        { icon: Mail, text: "Weekly Inspiration" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
