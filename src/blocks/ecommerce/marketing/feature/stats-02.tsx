import { Badge } from '@/components/ui/badge'
import { Award, Globe, Package, Star, Truck, Users } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
                    <div>
                        <Badge variant="outline" className="mb-3 @md:mb-4">Our Impact</Badge>
                        <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">Making a Difference Every Day</h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">From local beginnings to global reach, we&apos;ve grown together with our customers.</p>
                    </div>

                    <StatsGrid items={[
                        { icon: Users, value: '5M+', label: 'Customers Served' },
                        { icon: Package, value: '20M+', label: 'Orders Fulfilled' },
                        { icon: Globe, value: '100+', label: 'Countries Reached' },
                        { icon: Star, value: '4.9/5', label: 'Customer Rating' },
                        { icon: Truck, value: '99.8%', label: 'On-Time Delivery' },
                        { icon: Award, value: '1000+', label: 'Brands Available' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

interface StatItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

const StatsGrid = ({ items }: { items: StatItem[] }) => (
    <ul className="grid grid-cols-2 @md:grid-cols-3 gap-6 @md:gap-8">
        {items.map(({ icon: Icon, value, label }, i) => (
            <li key={i} className="text-center @md:text-left">
                <div className="size-10 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto @md:mx-0 mb-3">
                    <Icon className="size-5 @md:size-6 text-primary" />
                </div>
                <div className="text-2xl @md:text-3xl font-bold mb-0.5">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </li>
        ))}
    </ul>
)
