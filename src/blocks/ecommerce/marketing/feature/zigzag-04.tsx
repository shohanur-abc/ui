import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Crown, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <ZigzagFeatures items={[
                    {
                        image: 'https://picsum.photos/seed/zigzag8/800/600',
                        badge: { icon: Crown, text: 'VIP Benefits' },
                        title: 'Exclusive Member Perks',
                        description: 'Join our VIP program and unlock a world of exclusive benefits.',
                        features: [
                            'Early access to sales and new arrivals',
                            'Double points on all purchases',
                            'Free express shipping on every order',
                            'Priority customer support',
                        ],
                        reverse: false,
                    },
                    {
                        image: 'https://picsum.photos/seed/zigzag9/800/600',
                        badge: { icon: Sparkles, text: 'Smart Features' },
                        title: 'Shop Smarter with AI',
                        description: 'Our intelligent platform learns your preferences to deliver a personalized experience.',
                        features: [
                            'Personalized product recommendations',
                            'Smart size suggestions',
                            'Price drop notifications',
                            'Restock alerts for favorites',
                        ],
                        reverse: true,
                    },
                ]} />
            </div>
        </section>
    )
}

interface ZigzagItem {
    image: string
    badge: { icon: ComponentType<{ className?: string }>; text: string }
    title: string
    description: string
    features: string[]
    reverse: boolean
}

const ZigzagFeatures = ({ items }: { items: ZigzagItem[] }) => (
    <div className="space-y-16 @md:space-y-24">
        {items.map(({ image, badge, title, description, features, reverse }, i) => (
            <div key={i} className={`grid @3xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center`}>
                <div className={`relative ${reverse ? '@3xl:order-2' : ''}`}>
                    <div className="aspect-4/3 rounded-2xl @md:rounded-3xl overflow-hidden">
                        <Image src={image} alt={title} fill className="object-cover" />
                    </div>
                </div>

                <div className={reverse ? '@3xl:order-1' : ''}>
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <badge.icon className="size-3.5" />
                        {badge.text}
                    </Badge>
                    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{title}</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6">{description}</p>

                    <Card className="py-0">
                        <CardContent className="p-5 @md:p-6">
                            <ul className="space-y-3">
                                {features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <div className="size-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                                            <Check className="size-3 text-primary-foreground" />
                                        </div>
                                        <span className="text-sm @md:text-base">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        ))}
    </div>
)
