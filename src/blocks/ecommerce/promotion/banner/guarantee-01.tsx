import Link from "next/link"
import { ArrowRight, Shield, Award, Truck, Clock, RefreshCw, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GuaranteeCard = ({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType
    title: string
    description: string
}) => (
    <div className="flex gap-4 p-4 rounded-xl bg-card border border-border/50">
        <div className="size-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
            <Icon className="size-6 text-green-500" />
        </div>
        <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: string
    subtext: string
}) => (
    <div className="text-center mb-10">
        <Badge className="bg-green-500/10 text-green-500 border-green-500/30 gap-1.5 mb-4">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">{headline}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Shield, text: "Our Promise" }}
                        headline="Shop with Confidence"
                        subtext="We stand behind every product with our comprehensive guarantee program"
                    />
                    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
                        <GuaranteeCard
                            icon={Shield}
                            title="Money-Back Guarantee"
                            description="100% refund if you're not completely satisfied within 30 days"
                        />
                        <GuaranteeCard
                            icon={Award}
                            title="Quality Assurance"
                            description="Every product undergoes rigorous quality testing"
                        />
                        <GuaranteeCard
                            icon={Truck}
                            title="Free Shipping"
                            description="Complimentary shipping on all orders over $50"
                        />
                        <GuaranteeCard
                            icon={Clock}
                            title="Fast Delivery"
                            description="Express delivery options for urgent orders"
                        />
                        <GuaranteeCard
                            icon={RefreshCw}
                            title="Easy Returns"
                            description="Hassle-free returns with prepaid shipping labels"
                        />
                        <GuaranteeCard
                            icon={HeadphonesIcon}
                            title="24/7 Support"
                            description="Our team is here to help anytime you need"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
