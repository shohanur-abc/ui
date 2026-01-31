import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Clock, Gift, Package, Sparkles, Star, Truck, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Member Journey</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Your Rewards Timeline</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">From first purchase to VIP status—see the benefits you&apos;ll unlock.</p>
                </div>

                <MemberTimeline items={[
                    {
                        icon: Star,
                        period: 'Day 1',
                        title: 'Welcome Bonus',
                        description: 'Get 100 points instantly when you create an account.',
                        reward: '100 Points',
                    },
                    {
                        icon: Package,
                        period: 'First Order',
                        title: 'Double Points',
                        description: 'Earn 2x points on your first purchase.',
                        reward: '2x Rewards',
                    },
                    {
                        icon: Calendar,
                        period: 'Month 1',
                        title: 'Member Discount',
                        description: 'Unlock your 10% member discount after 30 days.',
                        reward: '10% Off',
                    },
                    {
                        icon: Gift,
                        period: 'Birthday',
                        title: 'Birthday Gift',
                        description: 'Receive a special gift during your birthday month.',
                        reward: 'Free Gift',
                    },
                    {
                        icon: Truck,
                        period: 'Month 3',
                        title: 'Free Shipping',
                        description: 'Qualify for free shipping on all orders.',
                        reward: 'Free Ship',
                    },
                    {
                        icon: Sparkles,
                        period: 'Month 6',
                        title: 'Early Access',
                        description: 'Shop new arrivals and sales before everyone else.',
                        reward: '24h Early',
                    },
                    {
                        icon: Clock,
                        period: 'Year 1',
                        title: 'Anniversary Reward',
                        description: 'Celebrate your first year with bonus points.',
                        reward: '500 Points',
                    },
                    {
                        icon: Zap,
                        period: 'VIP Status',
                        title: 'VIP Benefits',
                        description: 'Unlock exclusive VIP perks and priority service.',
                        reward: 'All Access',
                    },
                ]} />

                <div className="text-center mt-12">
                    <Button size="lg" asChild>
                        <Link href="/join">
                            Start Your Journey <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

interface TimelineItem {
    icon: ComponentType<{ className?: string }>
    period: string
    title: string
    description: string
    reward: string
}

const MemberTimeline = ({ items }: { items: TimelineItem[] }) => (
    <div className="relative">
        <div className="absolute left-4 @md:left-1/2 @md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

        <ul className="space-y-8 @md:space-y-12">
            {items.map(({ icon: Icon, period, title, description, reward }, i) => (
                <li key={i} className={`relative pl-12 @md:pl-0 @md:w-1/2 ${i % 2 === 0 ? '@md:pr-12 @md:text-right' : '@md:ml-auto @md:pl-12'}`}>
                    <div className={`absolute size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center left-0 @md:left-auto ${i % 2 === 0 ? '@md:right-0 @md:translate-x-1/2' : '@md:left-0 @md:-translate-x-1/2'}`}>
                        <Icon className="size-4" />
                    </div>

                    <Badge variant="secondary" className="mb-2">{period}</Badge>
                    <h3 className="text-lg font-bold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{description}</p>
                    <span className="text-sm font-semibold text-primary">{reward}</span>
                </li>
            ))}
        </ul>
    </div>
)
