import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, CreditCard, Gift, Globe, Lock, Percent, RefreshCw, Shield, Sparkles, Star, Truck } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Complete Overview</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Everything in One Place</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">A comprehensive guide to all the features and benefits we offer.</p>
                </div>

                <FeatureSections items={[
                    {
                        category: 'Shopping',
                        features: [
                            { icon: Truck, title: 'Free Shipping', description: 'On orders $50+' },
                            { icon: RefreshCw, title: 'Easy Returns', description: '30 days policy' },
                            { icon: Globe, title: 'Worldwide', description: '100+ countries' },
                        ],
                    },
                    {
                        category: 'Payment',
                        features: [
                            { icon: CreditCard, title: 'All Cards', description: 'Major brands accepted' },
                            { icon: Percent, title: 'Pay Later', description: 'Split into 4' },
                            { icon: Lock, title: 'Secure', description: 'SSL encrypted' },
                        ],
                    },
                    {
                        category: 'Rewards',
                        features: [
                            { icon: Star, title: 'Earn Points', description: '1 point per $1' },
                            { icon: Gift, title: 'Birthday Gift', description: 'Annual surprise' },
                            { icon: Sparkles, title: 'VIP Access', description: 'Early launches' },
                        ],
                    },
                    {
                        category: 'Protection',
                        features: [
                            { icon: Shield, title: 'Guarantee', description: 'Authentic products' },
                            { icon: Box, title: 'Packaging', description: 'Premium quality' },
                            { icon: Lock, title: 'Privacy', description: 'Data protected' },
                        ],
                    },
                ]} />

                <div className="text-center mt-10 @md:mt-12">
                    <Button size="lg" asChild>
                        <Link href="/features">
                            Explore All Features <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

interface SectionItem {
    category: string
    features: {
        icon: ComponentType<{ className?: string }>
        title: string
        description: string
    }[]
}

const FeatureSections = ({ items }: { items: SectionItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6 @md:gap-8">
        {items.map(({ category, features }, i) => (
            <div key={i}>
                <h3 className="font-bold text-lg mb-4">{category}</h3>
                <ul className="space-y-3">
                    {features.map(({ icon: Icon, title, description }, j) => (
                        <li key={j}>
                            <Card className="py-0 hover:shadow-sm transition-shadow">
                                <CardContent className="p-3 flex items-center gap-3">
                                    <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <Icon className="size-4 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">{title}</div>
                                        <div className="text-xs text-muted-foreground">{description}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
)
