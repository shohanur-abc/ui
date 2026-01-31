import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, CreditCard, Globe, Headphones, Heart, Leaf, Percent, Shield, Sparkles, Star, Truck, Undo2 } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Feature Highlights</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Why Customers Love Us</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Discover all the reasons our customers keep coming back.</p>
                </div>

                <MasonryFeatures items={[
                    { icon: Truck, title: 'Free Shipping', description: 'Free on orders over $50', size: 'small' },
                    { icon: Shield, title: 'Buyer Protection', description: 'Full coverage on every order with money-back guarantee', size: 'medium' },
                    { icon: Star, title: 'Rewards', description: 'Earn points on every purchase', size: 'small' },
                    { icon: Undo2, title: 'Easy Returns', description: '30-day hassle-free return policy', size: 'small' },
                    { icon: CreditCard, title: 'Flexible Payment', description: 'Pay in 4 interest-free installments', size: 'small' },
                    { icon: Sparkles, title: 'VIP Access', description: 'Get early access to new arrivals and exclusive sales', size: 'medium' },
                    { icon: Clock, title: 'Fast Processing', description: 'Same-day order processing', size: 'small' },
                    { icon: Globe, title: 'Global Shipping', description: 'We deliver to 100+ countries worldwide', size: 'medium' },
                    { icon: Headphones, title: '24/7 Support', description: 'Round-the-clock customer service', size: 'small' },
                    { icon: Heart, title: 'Wishlist', description: 'Save your favorites', size: 'small' },
                    { icon: Percent, title: 'Member Discounts', description: 'Exclusive savings for members', size: 'small' },
                    { icon: Leaf, title: 'Eco-Friendly', description: 'Committed to sustainable practices and recyclable packaging', size: 'medium' },
                ]} />
            </div>
        </section>
    )
}

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    size: 'small' | 'medium'
}

const MasonryFeatures = ({ items }: { items: FeatureItem[] }) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 @3xl:columns-4 gap-4 space-y-4">
        {items.map(({ icon: Icon, title, description, size }, i) => (
            <Card key={i} className="py-0 break-inside-avoid group hover:border-primary/50 transition-colors">
                <CardContent className={`${size === 'medium' ? 'p-5 @md:p-6' : 'p-4'}`}>
                    <div className={`${size === 'medium' ? 'size-12 mb-4' : 'size-9 mb-3'} rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors`}>
                        <Icon className={size === 'medium' ? 'size-6' : 'size-4'} />
                    </div>
                    <h3 className={`font-bold mb-1 ${size === 'medium' ? 'text-lg' : 'text-sm'}`}>{title}</h3>
                    <p className={`text-muted-foreground ${size === 'medium' ? 'text-sm' : 'text-xs'}`}>{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
