import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Gift, Shield, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Eyebrow text="Benefits" />
                    <Title text="Why Customers Love Us" />
                    <Description text="Join millions of satisfied customers who trust us for their shopping needs." />
                </div>

                <FeatureGrid items={[
                    { icon: Truck, title: 'Free Delivery', description: 'Free shipping on orders over $75', stat: '2-Day', statLabel: 'Delivery' },
                    { icon: Clock, title: 'Quick Support', description: 'Get help when you need it most', stat: '<5min', statLabel: 'Response' },
                    { icon: Shield, title: 'Money Back', description: 'Full refund if not satisfied', stat: '30-Day', statLabel: 'Guarantee' },
                    { icon: Gift, title: 'Rewards', description: 'Earn points on every purchase', stat: '5%', statLabel: 'Cashback' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    stat: string
    statLabel: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, description, stat, statLabel }, i) => (
            <li key={i}>
                <Card className="h-full py-0 group hover:border-primary/50 transition-colors">
                    <CardContent className="p-5 @md:p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon className="size-5 @md:size-6" />
                            </div>
                            <div className="text-right">
                                <div className="text-lg @md:text-xl font-bold text-primary">{stat}</div>
                                <div className="text-xs text-muted-foreground">{statLabel}</div>
                            </div>
                        </div>
                        <h3 className="text-base @md:text-lg font-semibold mb-1.5">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
