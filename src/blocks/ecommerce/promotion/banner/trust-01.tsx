import Link from "next/link"
import { ArrowRight, CreditCard, Shield, Lock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const TrustBadge = ({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType
    title: string
    description: string
}) => (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-card/50 hover:bg-card transition-colors">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="size-5 text-primary" />
        </div>
        <div>
            <h3 className="font-semibold mb-0.5">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
)

const SectionHeader = ({ headline, subtext }: { headline: string; subtext: string }) => (
    <div className="text-center mb-8 @md:mb-10">
        <h2 className="text-2xl @sm:text-3xl font-bold mb-2">{headline}</h2>
        <p className="text-muted-foreground">{subtext}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-muted/50 py-12 @md:py-16 @xl:py-20 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader
                        headline="Shop with Confidence"
                        subtext="Your security and satisfaction are our top priorities"
                    />
                    <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4">
                        <TrustBadge
                            icon={Shield}
                            title="Buyer Protection"
                            description="Full refund if item isn't as described"
                        />
                        <TrustBadge
                            icon={Lock}
                            title="Secure Payments"
                            description="256-bit SSL encryption"
                        />
                        <TrustBadge
                            icon={CreditCard}
                            title="Easy Returns"
                            description="30-day hassle-free returns"
                        />
                        <TrustBadge
                            icon={CheckCircle2}
                            title="Quality Guarantee"
                            description="Authentic products only"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
