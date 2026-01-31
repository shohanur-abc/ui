import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Bell, Clock, Gift, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Gift className="size-3.5" />
                        Subscribe & Save
                    </Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Never Run Out Again</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Set up subscriptions for your favorite products and save up to 15% on every delivery.</p>
                </div>

                <FeatureCards items={[
                    {
                        icon: Clock,
                        title: 'Flexible Schedule',
                        description: 'Choose weekly, monthly, or custom delivery intervals that work for you.',
                        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                    },
                    {
                        icon: Sparkles,
                        title: '15% Savings',
                        description: 'Get an automatic discount on every subscription order, no coupons needed.',
                        color: 'bg-green-500/10 text-green-600 dark:text-green-400',
                    },
                    {
                        icon: Zap,
                        title: 'Priority Processing',
                        description: 'Subscription orders ship first, ensuring you never wait for essentials.',
                        color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
                    },
                    {
                        icon: Bell,
                        title: 'Easy Management',
                        description: 'Skip, pause, or cancel anytime. Full control at your fingertips.',
                        color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
                    },
                ]} />

                <div className="text-center mt-10">
                    <Button size="lg" asChild>
                        <Link href="/subscribe">
                            Start Subscribing <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
}

const FeatureCards = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, description, color }, i) => (
            <li key={i}>
                <Card className="py-0 h-full text-center group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                        <div className={`size-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${color}`}>
                            <Icon className="size-7" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
