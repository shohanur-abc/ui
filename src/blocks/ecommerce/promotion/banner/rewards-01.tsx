import Link from "next/link"
import { ArrowRight, Award, Sparkles, Star, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const PointsCard = ({
    points,
    tier,
    nextTier,
    pointsToNext,
}: {
    points: number
    tier: string
    nextTier: string
    pointsToNext: number
}) => (
    <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-6 @md:p-8">
        <div className="flex items-center justify-between mb-6">
            <div>
                <p className="text-sm text-muted-foreground mb-1">Your Points</p>
                <span className="text-4xl @md:text-5xl font-black text-primary">{points.toLocaleString()}</span>
            </div>
            <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Crown className="size-8 text-primary" />
            </div>
        </div>
        <div className="space-y-2 mb-6">
            <div className="flex justify-between text-sm">
                <span className="font-semibold">{tier} Member</span>
                <span className="text-muted-foreground">{pointsToNext} pts to {nextTier}</span>
            </div>
            <Progress value={75} className="h-2" />
        </div>
        <Button className="w-full gap-2" asChild>
            <Link href="/rewards">
                Redeem Points
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

const RewardsList = ({
    items,
}: {
    items: { points: number; reward: string }[]
}) => (
    <div className="space-y-3">
        <h3 className="font-semibold mb-4">Available Rewards</h3>
        {items.map(({ points, reward }, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-card rounded-xl border border-border/50">
                <span>{reward}</span>
                <Badge variant="secondary">{points} pts</Badge>
            </div>
        ))}
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
    <div className="mb-8">
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-4">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">{headline}</h2>
        <p className="text-muted-foreground">{subtext}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12">
                        <div>
                            <SectionHeader
                                badge={{ icon: Award, text: "Rewards Program" }}
                                headline="Earn Points, Get Rewards"
                                subtext="Every purchase earns you points. Redeem them for exclusive discounts and perks."
                            />
                            <RewardsList
                                items={[
                                    { points: 500, reward: "$5 off your next order" },
                                    { points: 1000, reward: "Free shipping for a month" },
                                    { points: 2500, reward: "$25 store credit" },
                                    { points: 5000, reward: "VIP early access" },
                                ]}
                            />
                        </div>
                        <PointsCard
                            points={2350}
                            tier="Gold"
                            nextTier="Platinum"
                            pointsToNext={650}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
