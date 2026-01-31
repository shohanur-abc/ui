'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Package, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6 mb-10 @md:mb-14 @xl:mb-16">
                    <div className="max-w-2xl">
                        <Badge variant="outline" className="mb-3 @md:mb-4">Service Tiers</Badge>
                        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">Choose Your Experience</h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Select the service level that fits your needs.</p>
                    </div>
                </div>

                <ServiceTabs items={[
                    {
                        id: 'standard',
                        icon: Package,
                        label: 'Standard',
                        title: 'Essential Shopping',
                        description: 'Great value with all the basics covered.',
                        image: 'https://picsum.photos/seed/standard/600/400',
                        features: ['Free shipping on $50+', 'Standard returns', 'Email support'],
                        price: 'Free',
                    },
                    {
                        id: 'plus',
                        icon: Star,
                        label: 'Plus',
                        title: 'Enhanced Experience',
                        description: 'Upgraded benefits for frequent shoppers.',
                        image: 'https://picsum.photos/seed/plus/600/400',
                        features: ['Free shipping on all orders', 'Extended returns', 'Priority support', '2x rewards points'],
                        price: '$4.99/mo',
                    },
                    {
                        id: 'premium',
                        icon: Sparkles,
                        label: 'Premium',
                        title: 'VIP Treatment',
                        description: 'The ultimate shopping experience.',
                        image: 'https://picsum.photos/seed/premium/600/400',
                        features: ['Same-day shipping', 'Free returns', '24/7 concierge', '3x rewards', 'Exclusive access', 'Birthday gift'],
                        price: '$14.99/mo',
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
    description: string
    image: string
    features: string[]
    price: string
}

const ServiceTabs = ({ items }: { items: ServiceItem[] }) => (
    <Tabs defaultValue={items[0].id} className="w-full">
        <TabsList className="w-full @md:w-auto h-auto flex-wrap justify-center gap-2 p-1.5 mb-8">
            {items.map(({ id, icon: Icon, label, price }) => (
                <TabsTrigger key={id} value={id} className="gap-2 px-5 py-3 data-[state=active]:shadow-md">
                    <Icon className="size-4" />
                    <span>{label}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">{price}</Badge>
                </TabsTrigger>
            ))}
        </TabsList>

        {items.map(({ id, title, description, image, features, price }) => (
            <TabsContent key={id} value={id}>
                <Card className="py-0 overflow-hidden">
                    <div className="grid @xl:grid-cols-2">
                        <div className="relative aspect-video @xl:aspect-auto @xl:min-h-80">
                            <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                        <CardContent className="p-6 @md:p-8 flex flex-col justify-center">
                            <h3 className="text-2xl @md:text-3xl font-bold mb-2">{title}</h3>
                            <p className="text-muted-foreground mb-6">{description}</p>
                            <ul className="space-y-2 mb-6">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                        <Star className="size-4 text-primary shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center gap-4">
                                <div className="text-2xl font-bold text-primary">{price}</div>
                                <Button asChild>
                                    <Link href="/join">
                                        Get Started <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </TabsContent>
        ))}
    </Tabs>
)
