import Link from "next/link"
import { ArrowRight, Gift, PartyPopper, Cake, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const ConfettiDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
            <div
                key={i}
                className="absolute size-2 rounded-full"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: ['#f472b6', '#a855f7', '#3b82f6', '#22c55e', '#eab308'][Math.floor(Math.random() * 5)],
                    opacity: 0.3,
                }}
            />
        ))}
    </div>
)

const BirthdayContent = ({
    badge,
    headline,
    description,
    discount,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: string
    description: string
    discount: { value: string; label: string }
    cta: { label: string; href: string }
}) => (
    <div className="relative text-center max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white mb-6">
            <Cake className="size-10" />
        </div>
        <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 gap-1.5">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">{headline}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-2xl p-6 mb-6">
            <span className="text-5xl @md:text-6xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {discount.value}
            </span>
            <p className="text-muted-foreground mt-2">{discount.label}</p>
        </div>
        <Button size="lg" className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" asChild>
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
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <ConfettiDecorative />
                <BirthdayContent
                    badge={{ icon: PartyPopper, text: "Happy Birthday!" }}
                    headline="🎂 It's Your Special Day!"
                    description="Celebrate with an exclusive birthday discount just for you. Valid for the entire month!"
                    discount={{ value: "25% OFF", label: "Your Birthday Reward" }}
                    cta={{ label: "Claim Your Gift", href: "/birthday-reward" }}
                />
            </div>
        </section>
    )
}
