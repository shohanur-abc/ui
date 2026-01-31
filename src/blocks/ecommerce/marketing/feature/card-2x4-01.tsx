import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronRight, CreditCard, Globe, Headphones, Package, RefreshCw, Shield, Star, Truck } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Help Center</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Browse by Topic</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Find answers to common questions organized by category.</p>
                </div>

                <TopicGrid items={[
                    { icon: Truck, title: 'Shipping', description: 'Delivery options, tracking, and times', count: 12, href: '/help/shipping' },
                    { icon: RefreshCw, title: 'Returns', description: 'Return policy, exchanges, and refunds', count: 8, href: '/help/returns' },
                    { icon: Package, title: 'Orders', description: 'Order status, changes, and history', count: 15, href: '/help/orders' },
                    { icon: CreditCard, title: 'Payment', description: 'Payment methods and billing', count: 10, href: '/help/payment' },
                    { icon: Star, title: 'Rewards', description: 'Points, tiers, and redemption', count: 7, href: '/help/rewards' },
                    { icon: Shield, title: 'Account', description: 'Security, settings, and preferences', count: 11, href: '/help/account' },
                    { icon: Globe, title: 'International', description: 'Global shipping and duties', count: 6, href: '/help/international' },
                    { icon: Headphones, title: 'Contact Us', description: 'Get in touch with support', count: 4, href: '/help/contact' },
                ]} />
            </div>
        </section>
    )
}

interface TopicItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    count: number
    href: string
}

const TopicGrid = ({ items }: { items: TopicItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
        {items.map(({ icon: Icon, title, description, count, href }, i) => (
            <li key={i}>
                <Link href={href}>
                    <Card className="py-0 h-full group hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
                        <CardContent className="p-5 @md:p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="size-11 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Icon className="size-5 @md:size-6" />
                                </div>
                                <ChevronRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="font-bold text-base @md:text-lg mb-1">{title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{description}</p>
                            <Badge variant="secondary" className="text-xs">{count} articles</Badge>
                        </CardContent>
                    </Card>
                </Link>
            </li>
        ))}
    </ul>
)
