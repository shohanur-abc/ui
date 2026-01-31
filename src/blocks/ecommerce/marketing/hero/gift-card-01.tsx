import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Gift, CheckCircle2, Sparkles, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const GiftCardOptions = ({ amounts }: { amounts: { value: string; popular?: boolean }[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {amounts.map(({ value, popular }, i) => (
            <Button key={i} variant={popular ? "default" : "outline"} className="relative min-w-20">
                {popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs">Popular</Badge>}
                {value}
            </Button>
        ))}
    </div>
)

const CustomAmount = () => (
    <div className="max-w-xs mx-auto flex gap-2">
        <Input placeholder="Custom amount" type="number" />
        <Button variant="outline">Set</Button>
    </div>
)

const Benefits = ({ items }: { items: { icon: React.ElementType; text: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-6">
        {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-primary" />
                <span>{text}</span>
            </div>
        ))}
    </div>
)

const GiftCardPreview = () => (
    <div className="max-w-md mx-auto">
        <div className="relative aspect-[1.6/1] rounded-2xl overflow-hidden bg-gradient-to-br from-primary via-accent to-primary p-6 text-white">
            <div className="absolute top-0 right-0 size-32 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="text-xl font-bold">Gift Card</div>
                    <Gift className="size-8" />
                </div>
                <div>
                    <div className="text-4xl font-bold">$100</div>
                    <div className="text-sm opacity-80 mt-1">Perfect for any occasion</div>
                </div>
            </div>
        </div>
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
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-10">
                <div className="text-center space-y-6">
                    <Badge variant="secondary" className="gap-2">
                        <Gift className="size-4" />
                        Gift Cards
                    </Badge>
                    <Title text="The Perfect Gift" highlight="Every Time" />
                    <Description text="Can't decide? Give them the gift of choice. Our gift cards never expire and can be used on any product in our store." />
                </div>
                <GiftCardPreview />
                <GiftCardOptions amounts={[
                    { value: "$25" },
                    { value: "$50" },
                    { value: "$100", popular: true },
                    { value: "$200" },
                    { value: "$500" }
                ]} />
                <CustomAmount />
                <Benefits items={[
                    { icon: CheckCircle2, text: "Never expires" },
                    { icon: CreditCard, text: "Instant delivery" },
                    { icon: Sparkles, text: "Personalized message" }
                ]} />
                <CTA label="Purchase Gift Card" href="/gift-cards" />
            </div>
        </section>
    )
}
