'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, CreditCard, Headphones, Truck, Undo2 } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Service Hub</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Customer Care</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Learn about the services that make shopping with us exceptional.</p>
                </div>

                <ServiceTabs items={[
                    {
                        id: 'shipping',
                        icon: Truck,
                        label: 'Shipping',
                        title: 'Fast & Free Shipping',
                        features: [
                            { title: 'Free Standard', description: 'On orders over $50' },
                            { title: 'Express Delivery', description: '1-2 business days' },
                            { title: 'Same Day', description: 'Order by 2pm' },
                        ],
                        cta: { text: 'Learn More', href: '/shipping' },
                    },
                    {
                        id: 'returns',
                        icon: Undo2,
                        label: 'Returns',
                        title: 'Easy Returns',
                        features: [
                            { title: '30-Day Policy', description: 'Full refund guarantee' },
                            { title: 'Free Returns', description: 'Pre-paid labels included' },
                            { title: 'Instant Credit', description: 'No waiting period' },
                        ],
                        cta: { text: 'Start Return', href: '/returns' },
                    },
                    {
                        id: 'payment',
                        icon: CreditCard,
                        label: 'Payment',
                        title: 'Flexible Payment',
                        features: [
                            { title: 'All Cards', description: 'Visa, MC, Amex, Discover' },
                            { title: 'Pay Later', description: 'Interest-free installments' },
                            { title: 'Digital Wallets', description: 'Apple Pay, Google Pay' },
                        ],
                        cta: { text: 'Payment Options', href: '/payment' },
                    },
                    {
                        id: 'support',
                        icon: Headphones,
                        label: 'Support',
                        title: '24/7 Support',
                        features: [
                            { title: 'Live Chat', description: 'Instant assistance' },
                            { title: 'Phone', description: 'Call anytime' },
                            { title: 'Email', description: 'Quick response' },
                        ],
                        cta: { text: 'Contact Us', href: '/support' },
                    },
                ]} />
            </div>
        </section>
    )
}

interface ServiceItem {
    id: string
    icon: ComponentType<{ className?: string }>
    label: string
    title: string
    features: { title: string; description: string }[]
    cta: { text: string; href: string }
}

const ServiceTabs = ({ items }: { items: ServiceItem[] }) => (
    <Tabs defaultValue={items[0].id} className="w-full">
        <TabsList className="w-full h-auto grid @sm:grid-cols-4 gap-1 p-1 mb-6">
            {items.map(({ id, icon: Icon, label }) => (
                <TabsTrigger key={id} value={id} className="flex-col gap-1 py-3 data-[state=active]:shadow-md">
                    <Icon className="size-5" />
                    <span className="text-xs">{label}</span>
                </TabsTrigger>
            ))}
        </TabsList>

        {items.map(({ id, title, features, cta }) => (
            <TabsContent key={id} value={id}>
                <Card className="py-0">
                    <CardContent className="p-6 @md:p-8">
                        <h3 className="text-xl @md:text-2xl font-bold mb-6">{title}</h3>
                        <ul className="grid @sm:grid-cols-3 gap-6 mb-6">
                            {features.map(({ title, description }, i) => (
                                <li key={i}>
                                    <div className="font-semibold mb-1">{title}</div>
                                    <div className="text-sm text-muted-foreground">{description}</div>
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" asChild>
                            <Link href={cta.href}>
                                {cta.text} <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </TabsContent>
        ))}
    </Tabs>
)
