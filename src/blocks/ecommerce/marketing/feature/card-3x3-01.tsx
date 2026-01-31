import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Clock, Gift, Heart, Package, Percent, Shield, Star, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Full Service</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Complete Shopping Solution</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Everything you need for a perfect online shopping experience.</p>
                </div>

                <FeatureGrid items={[
                    { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
                    { icon: Shield, title: 'Secure Checkout', description: 'Bank-level encryption' },
                    { icon: Package, title: 'Quality Packaging', description: 'Premium protection' },
                    { icon: Clock, title: 'Fast Delivery', description: '2-day express available' },
                    { icon: Heart, title: 'Wishlist', description: 'Save for later' },
                    { icon: Gift, title: 'Gift Wrapping', description: 'Beautiful presentation' },
                    { icon: Percent, title: 'Member Discounts', description: 'Exclusive savings' },
                    { icon: Star, title: 'Rewards Points', description: 'Earn on every order' },
                    { icon: BarChart3, title: 'Price Tracking', description: 'Get price drop alerts' },
                ]} />
            </div>
        </section>
    )
}

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @xs:grid-cols-2 @md:grid-cols-3 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i}>
                <Card className="h-full py-0 group hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 @md:p-5 flex items-center gap-4">
                        <div className="size-10 @md:size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="size-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm @md:text-base">{title}</h3>
                            <p className="text-xs @md:text-sm text-muted-foreground">{description}</p>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
