import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Package, Search, ShoppingCart, Truck } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">How It Works</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Simple 4-Step Process</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">From browsing to delivery, we make shopping effortless.</p>
                </div>

                <Timeline items={[
                    { step: 1, icon: Search, title: 'Browse & Discover', description: 'Explore our curated collections and find products you love.' },
                    { step: 2, icon: ShoppingCart, title: 'Add to Cart', description: 'Select your items and customize options as needed.' },
                    { step: 3, icon: Package, title: 'Secure Checkout', description: 'Complete your order with our safe payment options.' },
                    { step: 4, icon: Truck, title: 'Fast Delivery', description: 'Track your package and receive it at your doorstep.' },
                ]} />
            </div>
        </section>
    )
}

interface TimelineItem {
    step: number
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const Timeline = ({ items }: { items: TimelineItem[] }) => (
    <div className="relative">
        {/* Connecting line */}
        <div className="hidden @xl:block absolute top-14 left-0 right-0 h-0.5 bg-border" />

        <ul className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-6 @md:gap-8">
            {items.map(({ step, icon: Icon, title, description }, i) => (
                <li key={i} className="relative">
                    <Card className="h-full py-0 relative z-10">
                        <CardContent className="p-6 @md:p-8 text-center">
                            <div className="relative mx-auto mb-4 @md:mb-5">
                                <div className="size-14 @md:size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground mx-auto">
                                    <Icon className="size-7 @md:size-8" />
                                </div>
                                <span className="absolute -top-2 -right-2 size-7 rounded-full bg-secondary text-sm font-bold flex items-center justify-center border">
                                    {step}
                                </span>
                            </div>
                            <h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                        </CardContent>
                    </Card>
                </li>
            ))}
        </ul>
    </div>
)
