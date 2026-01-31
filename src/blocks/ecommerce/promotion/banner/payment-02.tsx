import Link from "next/link"
import { ArrowRight, CreditCard, Calendar, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </div>
)

const BNPLOption = ({
    installments,
    amount,
    selected,
}: {
    installments: number
    amount: string
    selected?: boolean
}) => (
    <div className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
        <div className="flex items-center justify-between mb-2">
            <span className="font-bold">{installments}x</span>
            {selected && <Check className="size-4 text-primary" />}
        </div>
        <span className="text-lg font-bold text-primary">{amount}</span>
        <p className="text-xs text-muted-foreground">/month</p>
    </div>
)

const BNPLContent = ({
    badge,
    headline,
    description,
    total,
    options,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    description: string
    total: string
    options: { installments: number; amount: string; selected?: boolean }[]
    cta: { label: string; href: string }
}) => (
    <div className="relative max-w-lg mx-auto text-center">
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-6">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-4">
            {headline.text}
            <span className="text-primary"> {headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <p className="text-sm text-muted-foreground mb-4">Total: <span className="font-bold text-foreground">{total}</span></p>
        <div className="grid grid-cols-4 gap-3 mb-8">
            {options.map((option, i) => (
                <BNPLOption key={i} {...option} />
            ))}
        </div>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                <Calendar className="size-4" />
                {cta.label}
            </Link>
        </Button>
        <p className="text-xs text-muted-foreground mt-4">0% APR. No hidden fees. Subject to approval.</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <BNPLContent
                    badge={{ icon: CreditCard, text: "Buy Now, Pay Later" }}
                    headline={{ text: "Split Your", highlight: "Payment" }}
                    description="Pay in easy installments with 0% interest. Choose the plan that works for you."
                    total="$299.00"
                    options={[
                        { installments: 3, amount: "$99.67" },
                        { installments: 4, amount: "$74.75", selected: true },
                        { installments: 6, amount: "$49.83" },
                        { installments: 12, amount: "$24.92" },
                    ]}
                    cta={{ label: "Pay in Installments", href: "/checkout" }}
                />
            </div>
        </section>
    )
}
