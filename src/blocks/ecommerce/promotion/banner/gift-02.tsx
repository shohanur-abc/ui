import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Gift, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
    </div>
)

const GiftCardContent = ({
    badge,
    headline,
    description,
    amounts,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    description: string
    amounts: string[]
    cta: { label: string; href: string }
}) => (
    <div className="space-y-6">
        <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 gap-1.5">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
            {headline.text}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"> {headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
            {amounts.map((amount, i) => (
                <Button key={i} variant="outline" className="hover:border-pink-500 hover:text-pink-500">
                    {amount}
                </Button>
            ))}
        </div>
        <Button size="lg" className="gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" asChild>
            <Link href={cta.href}>
                <Gift className="size-4" />
                {cta.label}
            </Link>
        </Button>
    </div>
)

const GiftCardVisual = () => (
    <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-3xl blur-2xl" />
        <div className="relative bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 text-white aspect-[16/10]">
            <div className="flex items-center gap-3 mb-auto">
                <Gift className="size-8" />
                <span className="font-bold text-xl">Gift Card</span>
            </div>
            <div className="absolute bottom-8 left-8 right-8">
                <p className="text-sm opacity-80 mb-1">Gift Card Value</p>
                <p className="text-4xl font-black">$100</p>
            </div>
            <div className="absolute top-8 right-8">
                <Heart className="size-6 opacity-50" />
            </div>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <div className="relative max-w-5xl mx-auto">
                    <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
                        <GiftCardContent
                            badge={{ icon: Gift, text: "Gift Cards" }}
                            headline={{ text: "Give the Gift of", highlight: "Choice" }}
                            description="Let them choose exactly what they want with our digital gift cards. Instant delivery, no shipping required."
                            amounts={["$25", "$50", "$100", "$200", "$500"]}
                            cta={{ label: "Buy Gift Card", href: "/gift-cards" }}
                        />
                        <GiftCardVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}
