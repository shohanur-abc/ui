import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Crown, Sparkles, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Membership</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Loyalty Tiers</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Unlock more benefits as you level up your membership.</p>
                </div>

                <TierCards items={[
                    {
                        tier: 'Bronze',
                        icon: Star,
                        color: 'bg-amber-700/10 text-amber-700 dark:text-amber-400 border-amber-700/20',
                        requirement: '0+ Points',
                        benefits: ['5% rewards on purchases', 'Birthday discount', 'Free standard shipping'],
                    },
                    {
                        tier: 'Silver',
                        icon: Sparkles,
                        color: 'bg-slate-400/10 text-slate-600 dark:text-slate-300 border-slate-400/20',
                        requirement: '500+ Points',
                        benefits: ['10% rewards on purchases', 'Early sale access', 'Free express shipping', 'Exclusive offers'],
                    },
                    {
                        tier: 'Gold',
                        icon: Crown,
                        color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
                        requirement: '2000+ Points',
                        benefits: ['15% rewards on purchases', 'Priority customer service', 'Free gift wrapping', 'VIP events access', 'Double point days'],
                        featured: true,
                    },
                    {
                        tier: 'Platinum',
                        icon: Zap,
                        color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
                        requirement: '5000+ Points',
                        benefits: ['20% rewards on purchases', 'Personal shopper', 'Exclusive products', 'Free alterations', 'Concierge service', 'Annual gift'],
                    },
                ]} />

                <div className="text-center mt-10">
                    <Button asChild>
                        <Link href="/rewards">
                            Join Now <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

interface TierItem {
    tier: string
    icon: ComponentType<{ className?: string }>
    color: string
    requirement: string
    benefits: string[]
    featured?: boolean
}

const TierCards = ({ items }: { items: TierItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @2xl:grid-cols-4 gap-6">
        {items.map(({ tier, icon: Icon, color, requirement, benefits, featured }, i) => (
            <li key={i}>
                <Card className={`py-0 h-full ${featured ? 'ring-2 ring-primary' : ''}`}>
                    {featured && (
                        <div className="bg-primary text-primary-foreground text-xs text-center py-1.5 font-medium">Most Popular</div>
                    )}
                    <CardContent className="p-5 @md:p-6">
                        <div className={`size-12 rounded-xl border flex items-center justify-center mb-4 ${color}`}>
                            <Icon className="size-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">{tier}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{requirement}</p>
                        <ul className="space-y-2">
                            {benefits.map((benefit, j) => (
                                <li key={j} className="flex items-start gap-2 text-sm">
                                    <Star className="size-3.5 text-primary shrink-0 mt-0.5" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
