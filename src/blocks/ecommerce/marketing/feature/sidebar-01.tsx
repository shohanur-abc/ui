import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Box, Clock, CreditCard, Shield, Truck, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-3 gap-6 @xl:gap-8">
                    <div className="@xl:col-span-1">
                        <Badge variant="outline" className="mb-3 @md:mb-4">Service Promise</Badge>
                        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-5 leading-tight">What We Guarantee</h2>
                        <p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-6">Our commitment to you goes beyond just selling products. We ensure a complete satisfaction at every step.</p>
                        <Link
                            href="/guarantees"
                            className="inline-flex items-center gap-2 text-primary font-medium hover:underline group"
                        >
                            View All Guarantees
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="@xl:col-span-2">
                        <FeatureGrid items={[
                            { icon: Truck, title: 'Free Shipping', description: 'On orders $50+', stat: '2-Day' },
                            { icon: Undo2, title: 'Easy Returns', description: 'No questions asked', stat: '30 Days' },
                            { icon: Shield, title: 'Secure Shopping', description: 'Protected checkout', stat: '256-bit' },
                            { icon: Clock, title: 'Fast Support', description: 'Quick response time', stat: '<5 min' },
                            { icon: Box, title: 'Quality Assured', description: 'Authentic products', stat: '100%' },
                            { icon: CreditCard, title: 'Flexible Pay', description: 'Multiple options', stat: '0% APR' },
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
    stat: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @2xl:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, title, description, stat }, i) => (
            <li key={i}>
                <Card className="h-full py-0 hover:shadow-md transition-shadow">
                    <CardContent className="p-4 @md:p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="size-5 text-primary" />
                            </div>
                            <Badge variant="secondary" className="text-xs">{stat}</Badge>
                        </div>
                        <h3 className="font-semibold mb-0.5">{title}</h3>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
