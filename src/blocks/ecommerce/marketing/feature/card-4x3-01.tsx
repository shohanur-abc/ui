import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Box, Clock, CreditCard, Globe, Heart, Package, Percent, Shield, Sparkles, Star, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">All Benefits</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Everything We Offer</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">A comprehensive list of benefits that come with every purchase.</p>
                </div>

                <FeatureGrid items={[
                    { icon: Truck, title: 'Free Shipping', description: 'On orders over $50' },
                    { icon: Shield, title: 'Buyer Protection', description: 'Full guarantee coverage' },
                    { icon: Package, title: 'Quality Packaging', description: 'Premium presentation' },
                    { icon: Clock, title: 'Fast Processing', description: 'Same-day dispatch' },
                    { icon: CreditCard, title: 'Secure Payment', description: 'Encrypted checkout' },
                    { icon: Percent, title: 'Member Discounts', description: 'Exclusive savings' },
                    { icon: Heart, title: 'Wishlist', description: 'Save favorites' },
                    { icon: Star, title: 'Rewards', description: 'Earn on purchases' },
                    { icon: Globe, title: 'Global Shipping', description: '100+ countries' },
                    { icon: Award, title: 'Authenticity', description: 'Verified products' },
                    { icon: Box, title: 'Easy Returns', description: '30-day policy' },
                    { icon: Sparkles, title: 'New Arrivals', description: 'Weekly updates' },
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
    <ul className="grid @xs:grid-cols-2 @sm:grid-cols-3 @xl:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i}>
                <Card className="h-full py-0 text-center group hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 @md:p-5">
                        <div className="size-10 @md:size-11 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="size-5" />
                        </div>
                        <h3 className="font-semibold text-sm @md:text-base mb-0.5">{title}</h3>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
