import { Badge } from '@/components/ui/badge'
import { Award, Box, CreditCard, Globe, Headphones, Heart, Shield, Star, Truck, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Trust Indicators</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Shop With Confidence</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Trusted by millions of customers worldwide.</p>
                </div>

                <TrustGrid items={[
                    { icon: Shield, value: 'SSL', label: 'Encrypted' },
                    { icon: Award, value: '100%', label: 'Authentic' },
                    { icon: Star, value: '4.9★', label: 'Rated' },
                    { icon: Truck, value: 'Free', label: 'Shipping' },
                    { icon: Box, value: '30-Day', label: 'Returns' },
                    { icon: Headphones, value: '24/7', label: 'Support' },
                    { icon: CreditCard, value: 'Secure', label: 'Payment' },
                    { icon: Heart, value: '2M+', label: 'Customers' },
                    { icon: Globe, value: '150+', label: 'Countries' },
                    { icon: Zap, value: 'Fast', label: 'Checkout' },
                ]} />
            </div>
        </section>
    )
}

interface TrustItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

const TrustGrid = ({ items }: { items: TrustItem[] }) => (
    <ul className="grid grid-cols-2 @sm:grid-cols-5 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, value, label }, i) => (
            <li key={i} className="text-center p-4 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <div className="size-10 @md:size-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="size-5 @md:size-6 text-primary" />
                </div>
                <div className="font-bold text-lg @md:text-xl">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
            </li>
        ))}
    </ul>
)
