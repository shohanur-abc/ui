import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Crown, Star, Gift } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <VIPPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center text-white max-w-3xl mx-auto">
                    <Eyebrow icon={Crown} text="VIP Membership" />
                    <Title text="Join the" highlight="Elite" suffix="Circle" />
                    <Description text="Unlock exclusive benefits, early access to new collections, and personalized shopping experiences. Become a VIP member today." />

                    <MembershipTiers />

                    <CTA items={[
                        { label: 'Become a VIP', href: '/vip', icon: ArrowRight },
                        { label: 'Learn More', href: '/benefits', variant: 'outline' },
                    ]} />

                    <MemberCount count="50,000+" />
                </div>
            </div>
        </section>
    )
}

const VIPPattern = () => (
    <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.1) 35px, rgba(255,255,255,0.1) 70px)`,
        }} />
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
        <span className="text-yellow-400">{highlight}</span>{' '}
        {suffix}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10 @md:mb-12">
        {text}
    </p>
)

const MembershipTiers = () => (
    <div className="grid @sm:grid-cols-3 gap-4 @md:gap-6 mb-10 @md:mb-12">
        <TierCard
            tier="Silver"
            benefit="5% off all orders"
            icon={Star}
        />
        <TierCard
            tier="Gold"
            benefit="15% off + Free shipping"
            icon={Star}
            featured
        />
        <TierCard
            tier="Platinum"
            benefit="25% off + VIP events"
            icon={Crown}
        />
    </div>
)

const TierCard = ({ tier, benefit, icon: Icon, featured }: { tier: string; benefit: string; icon: ComponentType<{ className?: string }>; featured?: boolean }) => (
    <div className={`p-5 @md:p-6 rounded-2xl ${featured ? 'bg-yellow-400 text-gray-900' : 'bg-white/10 backdrop-blur-sm'}`}>
        <Icon className={`size-8 mb-3 mx-auto ${featured ? 'text-gray-900' : 'text-yellow-400'}`} />
        <div className={`font-bold text-lg mb-1 ${featured ? '' : 'text-white'}`}>{tier}</div>
        <div className={`text-sm ${featured ? 'text-gray-700' : 'text-white/70'}`}>{benefit}</div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-8 @md:mb-10">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : 'border-white/30 text-white hover:bg-white/20'}`}
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

const MemberCount = ({ count }: { count: string }) => (
    <div className="flex items-center justify-center gap-2 text-white/70">
        <Gift className="size-5" />
        <span>{count} VIP members and counting</span>
    </div>
)
