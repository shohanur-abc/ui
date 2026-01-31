import { Badge } from '@/components/ui/badge'
import { Award, Globe, Heart, Package, ShoppingBag, Star, TrendingUp, Users } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-primary text-primary-foreground">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="secondary" className="mb-3 @md:mb-4">Our Impact</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">By the Numbers</h2>
                    <p className="text-base @md:text-lg text-primary-foreground/80 leading-relaxed">See the impact we&apos;ve made together with our amazing community.</p>
                </div>

                <ImpactStats items={[
                    { icon: Users, value: '2M+', label: 'Happy Customers' },
                    { icon: ShoppingBag, value: '10M+', label: 'Orders Shipped' },
                    { icon: Globe, value: '150+', label: 'Countries Served' },
                    { icon: Star, value: '4.9', label: 'Average Rating' },
                    { icon: Heart, value: '98%', label: 'Satisfaction Rate' },
                    { icon: Award, value: '50+', label: 'Awards Won' },
                    { icon: TrendingUp, value: '300%', label: 'YoY Growth' },
                    { icon: Package, value: '500K+', label: 'Products Listed' },
                ]} />
            </div>
        </section>
    )
}

interface StatItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

const ImpactStats = ({ items }: { items: StatItem[] }) => (
    <ul className="grid grid-cols-2 @md:grid-cols-4 gap-6 @md:gap-8">
        {items.map(({ icon: Icon, value, label }, i) => (
            <li key={i} className="text-center">
                <div className="size-12 @md:size-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="size-6 @md:size-7" />
                </div>
                <div className="text-3xl @md:text-4xl font-bold mb-1">{value}</div>
                <div className="text-sm text-primary-foreground/70">{label}</div>
            </li>
        ))}
    </ul>
)
