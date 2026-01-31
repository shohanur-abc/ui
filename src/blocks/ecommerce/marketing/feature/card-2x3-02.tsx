import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Gift, MapPin, Package, RefreshCcw, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Delivery Excellence</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">World-Class Shipping</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Fast, reliable, and flexible delivery options to suit your needs.</p>
                </div>

                <FeatureGrid items={[
                    { icon: Truck, title: 'Express Delivery', description: 'Get your order in 1-2 business days', stat: '1-2 Days', color: 'bg-blue-500/10 text-blue-600' },
                    { icon: Package, title: 'Standard Shipping', description: 'Free on orders over $50', stat: 'Free', color: 'bg-green-500/10 text-green-600' },
                    { icon: Clock, title: 'Same Day', description: 'Order by 2pm for same-day delivery', stat: 'By 6pm', color: 'bg-orange-500/10 text-orange-600' },
                    { icon: MapPin, title: 'Click & Collect', description: 'Pick up from 500+ locations', stat: '500+', color: 'bg-purple-500/10 text-purple-600' },
                    { icon: Gift, title: 'Gift Delivery', description: 'Special packaging and messaging', stat: 'Premium', color: 'bg-pink-500/10 text-pink-600' },
                    { icon: RefreshCcw, title: 'Easy Returns', description: 'Free return shipping within 30 days', stat: '30 Days', color: 'bg-cyan-500/10 text-cyan-600' },
                ]} />
            </div>
        </section>
    )
}

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    stat: string
    color: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, stat, color }, i) => (
            <li key={i}>
                <Card className="h-full py-0 group hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <CardContent className="p-5 @md:p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`size-12 @md:size-14 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                                <Icon className="size-6 @md:size-7" />
                            </div>
                            <Badge variant="secondary">{stat}</Badge>
                        </div>
                        <h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
