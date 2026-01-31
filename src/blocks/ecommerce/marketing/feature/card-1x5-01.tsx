import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, MapPin, Package, Truck, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Truck className="size-3.5" />
                        Delivery Options
                    </Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Fast & Flexible Delivery</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Choose the shipping option that works best for you.</p>
                </div>

                <DeliveryOptions items={[
                    {
                        icon: Truck,
                        title: 'Standard Shipping',
                        time: '5-7 Business Days',
                        price: 'Free on $50+',
                        description: 'Reliable delivery for everyday orders.',
                        popular: false,
                    },
                    {
                        icon: Zap,
                        title: 'Express Shipping',
                        time: '2-3 Business Days',
                        price: '$9.99',
                        description: 'Fast delivery when you need it quick.',
                        popular: true,
                    },
                    {
                        icon: Clock,
                        title: 'Next Day Delivery',
                        time: '1 Business Day',
                        price: '$14.99',
                        description: 'Order by 2pm for next-day arrival.',
                        popular: false,
                    },
                    {
                        icon: Package,
                        title: 'Same Day Delivery',
                        time: 'Within Hours',
                        price: '$19.99',
                        description: 'Available in select metro areas.',
                        popular: false,
                    },
                    {
                        icon: MapPin,
                        title: 'Store Pickup',
                        time: 'Same Day',
                        price: 'Free',
                        description: 'Pick up at your nearest store.',
                        popular: false,
                    },
                ]} />
            </div>
        </section>
    )
}

interface DeliveryItem {
    icon: ComponentType<{ className?: string }>
    title: string
    time: string
    price: string
    description: string
    popular: boolean
}

const DeliveryOptions = ({ items }: { items: DeliveryItem[] }) => (
    <ul className="grid @sm:grid-cols-2 @xl:grid-cols-5 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, time, price, description, popular }, i) => (
            <li key={i}>
                <Card className={`py-0 h-full ${popular ? 'border-primary ring-1 ring-primary' : ''}`}>
                    {popular && (
                        <div className="bg-primary text-primary-foreground text-xs text-center py-1.5 font-medium">Most Popular</div>
                    )}
                    <CardContent className="p-4 @md:p-5">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                            <Icon className="size-5 text-primary" />
                        </div>
                        <h3 className="font-bold text-sm @md:text-base mb-1">{title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">{time}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{description}</p>
                        <div className="text-lg font-bold text-primary">{price}</div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
