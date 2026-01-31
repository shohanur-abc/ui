import { Badge } from '@/components/ui/badge'
import { Box, CreditCard, RefreshCcw, Shield, Star, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Our Promises</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">The Shopping Experience You Deserve</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">We go above and beyond to ensure every interaction exceeds your expectations.</p>
                </div>

                <IconList items={[
                    { icon: Truck, title: 'Express Delivery', description: 'Get your orders in 1-2 business days with our express shipping option.', stat: '1-2 Days' },
                    { icon: RefreshCcw, title: 'Easy Returns', description: 'Not satisfied? Return within 30 days for a full refund, no questions asked.', stat: '30 Days' },
                    { icon: Shield, title: 'Secure Checkout', description: 'Your payment information is protected with enterprise-grade encryption.', stat: '256-bit' },
                    { icon: Star, title: 'Top Rated', description: 'Join millions of satisfied customers who rate us 5 stars.', stat: '4.9/5' },
                    { icon: Box, title: 'Quality Packaging', description: 'Every item is carefully packed to ensure it arrives in perfect condition.', stat: '100%' },
                    { icon: CreditCard, title: 'Flexible Payment', description: 'Choose from credit cards, PayPal, or interest-free installments.', stat: '0% APR' },
                ]} />
            </div>
        </section>
    )
}

interface IconListItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    stat: string
}

const IconList = ({ items }: { items: IconListItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-8 @md:gap-10">
        {items.map(({ icon: Icon, title, description, stat }, i) => (
            <li key={i} className="flex gap-4 group">
                <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Icon className="size-6 @md:size-7" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{title}</h3>
                        <Badge variant="secondary" className="text-xs">{stat}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
            </li>
        ))}
    </ul>
)
