import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, Repeat, Shield, Gift } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
            <LoyaltyPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center text-white max-w-3xl mx-auto">
                    <Eyebrow icon={Award} text="Rewards Program" />
                    <Title text="Earn" highlight="Points" suffix="Get Rewards" />
                    <Description text="Join our loyalty program and turn every purchase into rewards. Earn points, unlock exclusive perks, and enjoy VIP benefits." />

                    <PointsCalculator />

                    <RewardTiers items={[
                        { tier: 'Bronze', points: '0+', perks: 'Free shipping' },
                        { tier: 'Silver', points: '500+', perks: '10% off always' },
                        { tier: 'Gold', points: '1000+', perks: '20% off + early access' },
                        { tier: 'Platinum', points: '2500+', perks: 'VIP everything' },
                    ]} />

                    <CTA items={[
                        { label: 'Join Now - It\'s Free', href: '/rewards', icon: ArrowRight },
                        { label: 'Learn More', href: '/rewards/info', variant: 'outline' },
                    ]} />

                    <TrustIndicators />
                </div>
            </div>
        </section>
    )
}

const LoyaltyPattern = () => (
    <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20">
            <Award className="size-32" />
        </div>
        <div className="absolute bottom-20 right-32">
            <Gift className="size-24" />
        </div>
        <div className="absolute top-1/2 left-1/4">
            <Award className="size-16" />
        </div>
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-white/20 text-white border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="text-yellow-300">{highlight}</span>,
        <br />
        {suffix}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 @md:mb-10">
        {text}
    </p>
)

const PointsCalculator = () => (
    <div className="max-w-md mx-auto mb-8 @md:mb-10 p-5 rounded-2xl bg-white/10 backdrop-blur-sm">
        <div className="text-sm text-white/80 mb-3">How it works</div>
        <div className="grid grid-cols-3 gap-4 text-center">
            <div>
                <div className="text-2xl font-bold">$1</div>
                <div className="text-xs text-white/70">spent</div>
            </div>
            <div className="flex items-center justify-center">
                <ArrowRight className="size-5" />
            </div>
            <div>
                <div className="text-2xl font-bold text-yellow-300">10 pts</div>
                <div className="text-xs text-white/70">earned</div>
            </div>
        </div>
    </div>
)

const RewardTiers = ({ items }: { items: { tier: string; points: string; perks: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-3 @md:gap-4 mb-10 @md:mb-12">
        {items.map(({ tier, points, perks }, i) => (
            <div
                key={tier}
                className={`p-4 rounded-xl ${i === items.length - 1 ? 'bg-yellow-400 text-black' : 'bg-white/10'}`}
            >
                <div className={`font-bold text-lg ${i === items.length - 1 ? '' : 'text-white'}`}>{tier}</div>
                <div className={`text-sm mb-2 ${i === items.length - 1 ? 'text-black/70' : 'text-white/70'}`}>{points} points</div>
                <div className={`text-xs ${i === items.length - 1 ? 'text-black/80' : 'text-white/60'}`}>{perks}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-8 @md:mb-10">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-white text-orange-600 hover:bg-white/90' : 'border-white/30 text-white hover:bg-white/20'}`}
                asChild
            >
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const TrustIndicators = () => (
    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
        <span className="flex items-center gap-1.5">
            <Shield className="size-4" /> Points never expire
        </span>
        <span className="flex items-center gap-1.5">
            <Repeat className="size-4" /> Easy redemption
        </span>
        <span className="flex items-center gap-1.5">
            <Gift className="size-4" /> Birthday bonus
        </span>
    </div>
)
