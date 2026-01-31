import Link from "next/link"
import { ArrowRight, CreditCard, Shield, Smartphone, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const PaymentMethod = ({
    icon: Icon,
    name,
}: {
    icon: React.ElementType
    name: string
}) => (
    <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-xl border border-border/50">
        <Icon className="size-5 text-muted-foreground" />
        <span className="font-medium">{name}</span>
    </div>
)

const PaymentContent = ({
    badge,
    headline,
    subtext,
    methods,
    security,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: string
    subtext: string
    methods: { icon: React.ElementType; name: string }[]
    security: { icon: React.ElementType; text: string }[]
}) => (
    <div className="text-center">
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-6">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl font-bold mb-3">{headline}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-8">{subtext}</p>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {methods.map((method, i) => (
                <PaymentMethod key={i} {...method} />
            ))}
        </div>
        <div className="flex flex-wrap justify-center gap-6">
            {security.map(({ icon: Icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="size-4 text-green-500" />
                    <span>{text}</span>
                </div>
            ))}
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-12 @md:py-16 px-4 @sm:px-6 @2xl:px-8">
                <PaymentContent
                    badge={{ icon: CreditCard, text: "Payment Options" }}
                    headline="Flexible Payment Methods"
                    subtext="Choose from a variety of secure payment options that work best for you"
                    methods={[
                        { icon: CreditCard, name: "Credit Card" },
                        { icon: Wallet, name: "PayPal" },
                        { icon: Smartphone, name: "Apple Pay" },
                        { icon: Smartphone, name: "Google Pay" },
                    ]}
                    security={[
                        { icon: Shield, text: "256-bit SSL encryption" },
                        { icon: Shield, text: "PCI DSS compliant" },
                    ]}
                />
            </div>
        </section>
    )
}
