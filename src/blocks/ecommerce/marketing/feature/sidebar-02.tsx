import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Check, Crown, Sparkles, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-12 gap-6 @xl:gap-8">
                    {/* Sidebar content */}
                    <div className="@xl:col-span-4 @xl:sticky @xl:top-24 @xl:self-start">
                        <Badge variant="outline" className="mb-3 @md:mb-4">
                            <Crown className="size-3.5" />
                            VIP Membership
                        </Badge>
                        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-5 leading-tight">Join the Elite</h2>
                        <p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-6">Unlock exclusive benefits and rewards as a VIP member. Experience shopping like never before.</p>
                        <Button className="w-full @md:w-auto" asChild>
                            <Link href="/vip">
                                Become a VIP <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Main content */}
                    <div className="@xl:col-span-8">
                        <BenefitsList items={[
                            {
                                icon: Sparkles,
                                title: 'Exclusive Access',
                                description: 'Be the first to shop new collections and limited editions.',
                                perks: ['Early access to sales', 'Member-only products', 'Preview new arrivals'],
                            },
                            {
                                icon: Zap,
                                title: 'Priority Service',
                                description: 'Skip the queue with priority processing and support.',
                                perks: ['Express checkout', 'Dedicated support line', 'Priority shipping'],
                            },
                            {
                                icon: Star,
                                title: 'Extra Rewards',
                                description: 'Earn more points and unlock better rewards.',
                                perks: ['2x points on all orders', 'Birthday bonus', 'Exclusive discounts'],
                            },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface BenefitItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    perks: string[]
}

const BenefitsList = ({ items }: { items: BenefitItem[] }) => (
    <ul className="space-y-4 @md:space-y-6">
        {items.map(({ icon: Icon, title, description, perks }, i) => (
            <li key={i}>
                <Card className="py-0 hover:shadow-md transition-shadow">
                    <CardContent className="p-5 @md:p-6">
                        <div className="flex gap-4 @md:gap-5">
                            <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="size-6 @md:size-7 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg @md:text-xl font-semibold mb-1">{title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                                <ul className="flex flex-wrap gap-2">
                                    {perks.map((perk, j) => (
                                        <li key={j} className="flex items-center gap-1.5 text-sm bg-secondary px-3 py-1 rounded-full">
                                            <Check className="size-3.5 text-primary" />
                                            {perk}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
