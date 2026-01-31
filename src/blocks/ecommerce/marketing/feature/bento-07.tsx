import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Clock, Gift, Percent, Sparkles, Star, Truck, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6 mb-10 @md:mb-14 @xl:mb-16">
                    <div className="max-w-2xl">
                        <Badge variant="outline" className="mb-3 @md:mb-4">Flash Sale</Badge>
                        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">Limited Time Offers</h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Don&apos;t miss out on these exclusive deals, available for a limited time only.</p>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="size-5" />
                        <span className="text-sm">Ends in 23:59:59</span>
                    </div>
                </div>

                <BentoDeals items={[
                    {
                        icon: Percent,
                        title: '50% Off',
                        subtitle: 'First Order',
                        description: 'New customers get half off their first purchase.',
                        color: 'bg-red-500/10 text-red-600 dark:text-red-400',
                        size: 'large',
                    },
                    {
                        icon: Truck,
                        title: 'Free Shipping',
                        subtitle: 'This Weekend',
                        description: 'No minimum order required.',
                        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                        size: 'normal',
                    },
                    {
                        icon: Gift,
                        title: 'Free Gift',
                        subtitle: 'Orders $100+',
                        description: 'Mystery gift with qualifying orders.',
                        color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
                        size: 'normal',
                    },
                    {
                        icon: Star,
                        title: '3x Points',
                        subtitle: 'Members Only',
                        description: 'Triple rewards on all purchases today.',
                        color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
                        size: 'normal',
                    },
                    {
                        icon: Zap,
                        title: 'Lightning Deals',
                        subtitle: 'Every Hour',
                        description: 'New flash sales every hour.',
                        color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
                        size: 'normal',
                    },
                    {
                        icon: Sparkles,
                        title: 'Clearance',
                        subtitle: 'Up to 70% Off',
                        description: 'Final markdowns on seasonal items.',
                        color: 'bg-green-500/10 text-green-600 dark:text-green-400',
                        size: 'large',
                    },
                ]} />
            </div>
        </section>
    )
}

interface DealItem {
    icon: ComponentType<{ className?: string }>
    title: string
    subtitle: string
    description: string
    color: string
    size: 'normal' | 'large'
}

const BentoDeals = ({ items }: { items: DealItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, subtitle, description, color, size }, i) => (
            <li key={i} className={size === 'large' ? '@xl:col-span-2' : ''}>
                <Card className="py-0 h-full group hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-5 @md:p-6 h-full flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`size-12 @md:size-14 rounded-xl flex items-center justify-center ${color}`}>
                                <Icon className="size-6 @md:size-7" />
                            </div>
                            <Badge variant="outline" className="text-xs">
                                <CheckCircle2 className="size-3" />
                                Active
                            </Badge>
                        </div>
                        <h3 className="text-xl @md:text-2xl font-bold mb-1">{title}</h3>
                        <p className="text-sm font-medium text-primary mb-2">{subtitle}</p>
                        <p className="text-sm text-muted-foreground mt-auto">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
