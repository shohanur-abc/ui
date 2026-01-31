import { Badge } from '@/components/ui/badge'
import { Award, Box, Clock, CreditCard, Globe, Headphones, Leaf, Shield, Sparkles, Star, Truck, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-4 gap-6">
                    <div className="@xl:col-span-1">
                        <Badge variant="outline" className="mb-3 @md:mb-4">Benefits</Badge>
                        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4">Why Shop With Us</h2>
                        <p className="text-sm @md:text-base text-muted-foreground leading-relaxed">Discover all the advantages of shopping with our trusted store.</p>
                    </div>

                    <div className="@xl:col-span-3">
                        <FeatureList items={[
                            { icon: Truck, title: 'Free Shipping', description: 'On all orders over $50' },
                            { icon: Box, title: 'Easy Returns', description: '30-day hassle-free returns' },
                            { icon: Shield, title: 'Secure Checkout', description: 'SSL encrypted payments' },
                            { icon: Headphones, title: '24/7 Support', description: 'Always here to help' },
                            { icon: Star, title: 'Rewards Program', description: 'Earn on every purchase' },
                            { icon: Clock, title: 'Fast Processing', description: 'Same-day order handling' },
                            { icon: CreditCard, title: 'Pay Later', description: 'Interest-free installments' },
                            { icon: Globe, title: 'Global Shipping', description: 'We ship worldwide' },
                            { icon: Leaf, title: 'Eco-Friendly', description: 'Sustainable packaging' },
                            { icon: Award, title: 'Quality Guarantee', description: 'Only authentic products' },
                            { icon: Sparkles, title: 'Exclusive Drops', description: 'Member-only releases' },
                            { icon: Zap, title: 'Express Delivery', description: 'Next-day available' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureList = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @xs:grid-cols-2 @lg:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-4 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold text-sm mb-0.5">{title}</h3>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </li>
        ))}
    </ul>
)
