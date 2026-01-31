import Link from "next/link"
import { ArrowRight, Gift, Users, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const ReferralStats = ({
    items,
}: {
    items: { value: string; label: string }[]
}) => (
    <div className="flex gap-8 mb-6">
        {items.map(({ value, label }, i) => (
            <div key={i}>
                <span className="text-2xl @md:text-3xl font-bold text-primary">{value}</span>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        ))}
    </div>
)

const ReferralLink = ({ code }: { code: string }) => (
    <div className="flex gap-2 max-w-md">
        <Input
            value={`https://shop.com/ref/${code}`}
            readOnly
            className="flex-1 font-mono text-sm"
        />
        <Button className="gap-1.5 shrink-0">
            <Share2 className="size-4" />
            Share
        </Button>
    </div>
)

const ReferralContent = ({
    badge,
    headline,
    description,
    stats,
    referralCode,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    description: string
    stats: { value: string; label: string }[]
    referralCode: string
}) => (
    <div className="space-y-4">
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
            {headline.text}
            <span className="text-primary"> {headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground max-w-md">{description}</p>
        <ReferralStats items={stats} />
        <ReferralLink code={referralCode} />
    </div>
)

const ReferralVisual = () => (
    <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
        <div className="relative bg-card rounded-3xl p-8 @md:p-10 border border-border/50">
            <div className="flex flex-col items-center text-center">
                <div className="size-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <Gift className="size-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Give $20, Get $20</h3>
                <p className="text-sm text-muted-foreground">
                    Both you and your friend receive $20 off when they make their first purchase
                </p>
            </div>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
                        <ReferralContent
                            badge={{ icon: Users, text: "Referral Program" }}
                            headline={{ text: "Invite Friends,", highlight: "Earn Rewards" }}
                            description="Share your unique referral link and earn credits for every friend who makes a purchase."
                            stats={[
                                { value: "$20", label: "You Earn" },
                                { value: "$20", label: "Friend Gets" },
                            ]}
                            referralCode="FRIEND2026"
                        />
                        <ReferralVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}
