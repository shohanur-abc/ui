import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Check, Gift, Sparkles, Star, Truck, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Calendar className="size-3.5" />
                        Order Timeline
                    </Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">From Order to Doorstep</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Follow your order every step of the way.</p>
                </div>

                <OrderTimeline steps={[
                    {
                        icon: Sparkles,
                        title: 'Order Placed',
                        time: 'Instant',
                        description: 'Your order is confirmed and payment processed.',
                    },
                    {
                        icon: Check,
                        title: 'Processing',
                        time: '1-2 Hours',
                        description: 'We pick and carefully pack your items.',
                    },
                    {
                        icon: Zap,
                        title: 'Shipped',
                        time: 'Same Day',
                        description: 'Your package is on its way with tracking.',
                    },
                    {
                        icon: Truck,
                        title: 'In Transit',
                        time: '2-5 Days',
                        description: 'Follow your package as it travels to you.',
                    },
                    {
                        icon: Gift,
                        title: 'Delivered',
                        time: 'Arrival',
                        description: 'Your order arrives beautifully packaged.',
                    },
                    {
                        icon: Star,
                        title: 'Review',
                        time: 'Earn Points',
                        description: 'Share your feedback and earn reward points.',
                    },
                ]} />

                <div className="text-center mt-10">
                    <Button variant="outline" asChild>
                        <Link href="/track">
                            Track Your Order <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

interface TimelineStep {
    icon: ComponentType<{ className?: string }>
    title: string
    time: string
    description: string
}

const OrderTimeline = ({ steps }: { steps: TimelineStep[] }) => (
    <div className="relative">
        <div className="hidden @xl:block absolute top-8 left-0 right-0 h-0.5 bg-border" />

        <ul className="grid @sm:grid-cols-2 @xl:grid-cols-6 gap-6 @xl:gap-4">
            {steps.map(({ icon: Icon, title, time, description }, i) => (
                <li key={i} className="relative">
                    <div className="flex @xl:flex-col @xl:items-center @xl:text-center gap-4">
                        <div className="size-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 relative z-10">
                            <Icon className="size-7" />
                        </div>
                        <div>
                            <h3 className="font-bold text-base mb-1">{title}</h3>
                            <Badge variant="secondary" className="mb-2 text-xs">{time}</Badge>
                            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)
