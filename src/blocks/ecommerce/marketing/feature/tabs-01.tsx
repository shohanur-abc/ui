'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Leaf, Shield, Star, Truck } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Our Advantages</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Why Choose Us</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Explore what makes us the preferred choice for millions of shoppers.</p>
                </div>

                <FeatureTabs items={[
                    {
                        id: 'shipping',
                        icon: Truck,
                        label: 'Shipping',
                        title: 'Fast & Free Delivery',
                        description: 'Get your orders delivered quickly with our extensive logistics network. Free shipping on orders over $50.',
                        features: ['2-day express shipping', 'Free returns', 'Real-time tracking', 'Secure packaging'],
                        image: 'https://picsum.photos/seed/tabs1/800/500',
                    },
                    {
                        id: 'quality',
                        icon: Star,
                        label: 'Quality',
                        title: 'Premium Quality Guaranteed',
                        description: 'Every product undergoes strict quality checks. We only partner with trusted brands and suppliers.',
                        features: ['100% authentic products', 'Quality inspections', '2-year warranty', 'Expert reviews'],
                        image: 'https://picsum.photos/seed/tabs2/800/500',
                    },
                    {
                        id: 'security',
                        icon: Shield,
                        label: 'Security',
                        title: 'Shop with Confidence',
                        description: 'Your security is our priority. We use industry-leading encryption and fraud protection.',
                        features: ['SSL encryption', 'Fraud protection', 'Secure payments', 'Privacy guaranteed'],
                        image: 'https://picsum.photos/seed/tabs3/800/500',
                    },
                    {
                        id: 'sustainability',
                        icon: Leaf,
                        label: 'Eco',
                        title: 'Sustainable Shopping',
                        description: 'We&apos;re committed to reducing our environmental impact through sustainable practices.',
                        features: ['Carbon neutral shipping', 'Recyclable packaging', 'Ethical sourcing', 'Green initiatives'],
                        image: 'https://picsum.photos/seed/tabs4/800/500',
                    },
                ]} />
            </div>
        </section>
    )
}

interface FeatureTabItem {
    id: string
    icon: ComponentType<{ className?: string }>
    label: string
    title: string
    description: string
    features: string[]
    image: string
}

const FeatureTabs = ({ items }: { items: FeatureTabItem[] }) => (
    <Tabs defaultValue={items[0].id} className="w-full">
        <TabsList className="w-full @md:w-auto h-auto flex-wrap justify-center gap-1 @md:gap-2 p-1.5 mb-8 @md:mb-10">
            {items.map(({ id, icon: Icon, label }) => (
                <TabsTrigger key={id} value={id} className="gap-2 px-4 py-2.5">
                    <Icon className="size-4" />
                    <span className="hidden @sm:inline">{label}</span>
                </TabsTrigger>
            ))}
        </TabsList>

        {items.map(({ id, title, description, features, image }) => (
            <TabsContent key={id} value={id}>
                <Card className="overflow-hidden py-0">
                    <div className="grid @xl:grid-cols-2">
                        <div className="relative aspect-video @xl:aspect-auto min-h-64">
                            <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                        <CardContent className="p-6 @md:p-8 @xl:p-10 flex flex-col justify-center">
                            <h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-3 @md:mb-4">{title}</h3>
                            <p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-5 @md:mb-6">{description}</p>
                            <ul className="grid @sm:grid-cols-2 gap-3">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm @md:text-base">
                                        <div className="size-1.5 rounded-full bg-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </div>
                </Card>
            </TabsContent>
        ))}
    </Tabs>
)
