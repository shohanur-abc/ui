import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Trophy, Zap, Gift, Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-lg">{text}</p>
)

const PointsDisplay = ({ points, nextTier, progress }: { points: string; nextTier: string; progress: number }) => (
    <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground">Your Points</p>
                <p className="text-3xl font-bold text-primary">{points}</p>
            </div>
            <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Coins className="size-7 text-primary" />
            </div>
        </div>
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>Progress to {nextTier}</span>
                <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
        </div>
    </div>
)

const EarnMethods = ({ items }: { items: { icon: React.ElementType; action: string; points: string }[] }) => (
    <div className="space-y-3">
        <h3 className="font-semibold">Ways to Earn:</h3>
        {items.map(({ icon: Icon, action, points }, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                <Icon className="size-5 text-primary" />
                <span className="flex-1 text-sm">{action}</span>
                <Badge variant="outline">+{points}</Badge>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Tiers = ({ items }: { items: { name: string; icon: React.ElementType; color: string }[] }) => (
    <div className="flex justify-center gap-4">
        {items.map(({ name, icon: Icon, color }, i) => (
            <div key={i} className={`text-center p-4 rounded-xl border ${i === 1 ? "border-primary bg-primary/5" : "bg-card"}`}>
                <Icon className={`size-8 mx-auto mb-2 ${color}`} />
                <p className="text-sm font-medium">{name}</p>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Trophy} text="Loyalty Program" />
                        <Title text="Earn Rewards" highlight="Every Purchase" />
                        <Description text="Join our loyalty program and start earning points on every order. Redeem for exclusive discounts, free products, and special perks." />
                        <EarnMethods items={[
                            { icon: Zap, action: "Every $1 spent", points: "10 pts" },
                            { icon: Star, action: "Write a review", points: "50 pts" },
                            { icon: Gift, action: "Refer a friend", points: "500 pts" }
                        ]} />
                        <CTA items={[
                            { label: "Join Rewards", href: "/rewards", icon: Trophy },
                            { label: "View Benefits", href: "/rewards/benefits", variant: "outline", icon: ArrowRight }
                        ]} />
                    </div>
                    <div className="space-y-6">
                        <PointsDisplay points="2,450" nextTier="Gold" progress={65} />
                        <Tiers items={[
                            { name: "Silver", icon: Star, color: "text-gray-400" },
                            { name: "Gold", icon: Star, color: "text-yellow-500" },
                            { name: "Platinum", icon: Trophy, color: "text-primary" }
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}
