import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Heart, Package, Star, TrendingUp, Users } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">By The Numbers</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Trusted by Millions</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Our numbers speak for themselves. Join a community of satisfied shoppers.</p>
                </div>

                <StatGrid items={[
                    { icon: Users, value: '2M+', label: 'Happy Customers', description: 'Shoppers trust us worldwide' },
                    { icon: Package, value: '10M+', label: 'Orders Shipped', description: 'Delivered safely on time' },
                    { icon: Star, value: '4.9', label: 'Average Rating', description: 'From verified reviews' },
                    { icon: Award, value: '500+', label: 'Premium Brands', description: 'Curated selection' },
                    { icon: Heart, value: '98%', label: 'Satisfaction Rate', description: 'Customer happiness' },
                    { icon: TrendingUp, value: '50M+', label: 'Products Sold', description: 'And counting' },
                ]} />
            </div>
        </section>
    )
}

interface StatItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
    description: string
}

const StatGrid = ({ items }: { items: StatItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, value, label, description }, i) => (
            <li key={i}>
                <Card className="h-full py-0 text-center group hover:shadow-lg transition-all hover:-translate-y-0.5">
                    <CardContent className="p-6 @md:p-8">
                        <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="size-6 @md:size-7" />
                        </div>
                        <div className="text-3xl @md:text-4xl font-bold mb-1">{value}</div>
                        <div className="font-semibold text-sm @md:text-base mb-1">{label}</div>
                        <div className="text-xs @md:text-sm text-muted-foreground">{description}</div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
