import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Box, Gift, Headphones, Shield, Star, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Quick Stats</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Numbers That Matter</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Key metrics that showcase our commitment to excellence.</p>
                </div>

                <StatsGrid items={[
                    { icon: Star, value: '4.9', label: 'Customer Rating', sublabel: 'Based on 50K+ reviews' },
                    { icon: Truck, value: '24hr', label: 'Average Delivery', sublabel: 'In metro areas' },
                    { icon: Box, value: '99%', label: 'On-Time Delivery', sublabel: 'Last 12 months' },
                    { icon: Headphones, value: '<2min', label: 'Support Response', sublabel: 'Average wait time' },
                    { icon: Shield, value: '100%', label: 'Secure Checkout', sublabel: 'SSL encrypted' },
                    { icon: Gift, value: '500K+', label: 'Rewards Redeemed', sublabel: 'This year' },
                ]} />
            </div>
        </section>
    )
}

interface StatItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
    sublabel: string
}

const StatsGrid = ({ items }: { items: StatItem[] }) => (
    <ul className="grid @xs:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, value, label, sublabel }, i) => (
            <li key={i}>
                <Card className="py-0 h-full text-center group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 @md:p-8">
                        <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="size-7" />
                        </div>
                        <div className="text-4xl @md:text-5xl font-bold text-primary mb-2">{value}</div>
                        <h3 className="font-bold text-lg mb-1">{label}</h3>
                        <p className="text-sm text-muted-foreground">{sublabel}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
