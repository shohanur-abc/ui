import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Bell, Gift, Heart, Percent, Sparkles, Star, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Bell className="size-3.5" />
                        Smart Alerts
                    </Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Never Miss a Deal</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Set up personalized notifications to stay informed about the things you care about.</p>
                </div>

                <NotificationCards items={[
                    {
                        icon: Percent,
                        title: 'Price Drops',
                        description: 'Get notified when items on your wishlist go on sale.',
                        enabled: true,
                    },
                    {
                        icon: Sparkles,
                        title: 'Back in Stock',
                        description: 'Know immediately when sold-out items return.',
                        enabled: true,
                    },
                    {
                        icon: Gift,
                        title: 'New Arrivals',
                        description: 'Be first to see new products in your favorite categories.',
                        enabled: false,
                    },
                    {
                        icon: Zap,
                        title: 'Flash Sales',
                        description: 'Early access alerts for limited-time deals.',
                        enabled: true,
                    },
                    {
                        icon: Star,
                        title: 'Rewards Updates',
                        description: 'Track your points and rewards status.',
                        enabled: false,
                    },
                    {
                        icon: Heart,
                        title: 'Brand Alerts',
                        description: 'Updates from your followed brands.',
                        enabled: true,
                    },
                ]} />

                <div className="text-center mt-10">
                    <Button variant="outline" asChild>
                        <Link href="/notifications">
                            Manage Preferences <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

interface NotificationItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    enabled: boolean
}

const NotificationCards = ({ items }: { items: NotificationItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, description, enabled }, i) => (
            <li key={i}>
                <Card className={`py-0 h-full group hover:shadow-md transition-all ${enabled ? 'border-primary/30' : ''}`}>
                    <CardContent className="p-5 @md:p-6">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`size-10 rounded-lg flex items-center justify-center ${enabled ? 'bg-primary/10' : 'bg-muted'}`}>
                                <Icon className={`size-5 ${enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                            </div>
                            <Badge variant={enabled ? 'default' : 'secondary'} className="text-xs">
                                {enabled ? 'Enabled' : 'Disabled'}
                            </Badge>
                        </div>
                        <h3 className="font-bold text-base mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
