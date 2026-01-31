import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, Clock, CreditCard, LineChart, Repeat, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 @3xl:gap-16 items-center">
                    <div className="order-2 @3xl:order-1">
                        <Eyebrow text="Subscribe & Save" />
                        <Title text="Never Run Out of Essentials" />
                        <Description text="Set up automatic deliveries for your favorite products and enjoy exclusive subscriber discounts." />

                        <FeatureGrid items={[
                            { icon: Repeat, title: 'Auto-Delivery', description: 'Choose your delivery frequency' },
                            { icon: LineChart, title: 'Save 15%', description: 'On every subscription order' },
                            { icon: Clock, title: 'Skip Anytime', description: 'Full control over deliveries' },
                            { icon: CreditCard, title: 'Easy Billing', description: 'Automatic secure payments' },
                            { icon: Shield, title: 'Price Lock', description: 'Protected from price increases' },
                            { icon: BarChart3, title: 'Track Usage', description: 'Smart reorder suggestions' },
                        ]} />

                        <Button className="mt-6 @md:mt-8" asChild>
                            <Link href="/subscribe">
                                Start Subscribing <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="order-1 @3xl:order-2">
                        <div className="relative aspect-square rounded-2xl @md:rounded-3xl overflow-hidden">
                            <Image
                                src="https://picsum.photos/seed/split5/800/800"
                                alt="Subscription products"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-4 left-4 right-4 bg-background/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-semibold">Your Next Delivery</div>
                                        <div className="text-sm text-muted-foreground">3 items • Dec 15</div>
                                    </div>
                                    <Badge variant="secondary">-15%</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <ul className="grid @xs:grid-cols-2 @lg:grid-cols-3 gap-4 mt-6">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i} className="flex items-start gap-3">
                <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-4 text-primary" />
                </div>
                <div>
                    <h3 className="font-medium text-sm">{title}</h3>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </li>
        ))}
    </ul>
)
