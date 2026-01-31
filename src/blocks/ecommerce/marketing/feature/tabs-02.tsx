'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Box, CreditCard, Headphones, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-3 gap-8 @xl:gap-12 items-start">
                    <div className="@3xl:col-span-1">
                        <Badge variant="outline" className="mb-3 @md:mb-4">How It Works</Badge>
                        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">Simple Steps to Shop</h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">We&apos;ve streamlined the shopping experience to make it as easy as possible.</p>
                    </div>

                    <div className="@3xl:col-span-2">
                        <ProcessTabs items={[
                            {
                                id: 'browse',
                                step: '01',
                                icon: Box,
                                title: 'Browse & Select',
                                description: 'Explore our extensive catalog of products. Use filters to find exactly what you&apos;re looking for.',
                                details: ['Smart search functionality', 'Category filters', 'Price range options', 'Customer reviews'],
                            },
                            {
                                id: 'checkout',
                                step: '02',
                                icon: CreditCard,
                                title: 'Secure Checkout',
                                description: 'Add items to your cart and checkout securely with your preferred payment method.',
                                details: ['Multiple payment options', 'Guest checkout available', 'Save for later', 'Apply discount codes'],
                            },
                            {
                                id: 'delivery',
                                step: '03',
                                icon: Truck,
                                title: 'Fast Delivery',
                                description: 'We&apos;ll pack and ship your order quickly. Track your package in real-time.',
                                details: ['Express shipping options', 'Real-time tracking', 'Signature confirmation', 'Delivery notifications'],
                            },
                            {
                                id: 'support',
                                step: '04',
                                icon: Headphones,
                                title: 'Ongoing Support',
                                description: 'Our team is here to help with any questions or concerns after your purchase.',
                                details: ['24/7 customer support', 'Easy returns process', 'Product assistance', 'Warranty claims'],
                            },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface ProcessItem {
    id: string
    step: string
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    details: string[]
}

const ProcessTabs = ({ items }: { items: ProcessItem[] }) => (
    <Tabs defaultValue={items[0].id} className="w-full">
        <TabsList className="w-full h-auto grid grid-cols-4 gap-1 p-1 mb-6">
            {items.map(({ id, step, icon: Icon }) => (
                <TabsTrigger key={id} value={id} className="flex-col gap-1 py-3 data-[state=active]:shadow-md">
                    <Icon className="size-5" />
                    <span className="text-xs font-bold">{step}</span>
                </TabsTrigger>
            ))}
        </TabsList>

        {items.map(({ id, step, title, description, details }) => (
            <TabsContent key={id} value={id}>
                <Card className="py-0">
                    <CardContent className="p-6 @md:p-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl font-bold text-primary/20">{step}</span>
                            <h3 className="text-xl @md:text-2xl font-bold">{title}</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">{description}</p>
                        <ul className="grid @sm:grid-cols-2 gap-3">
                            {details.map((detail, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm">
                                    <div className="size-1.5 rounded-full bg-primary" />
                                    {detail}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>
        ))}
    </Tabs>
)
