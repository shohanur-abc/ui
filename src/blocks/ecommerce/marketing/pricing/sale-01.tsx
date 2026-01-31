import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Clock, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-gradient-to-b from-background to-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Clock} text="Limited Time" />
                    <Title text="Black Friday Special" highlight="70% OFF" />
                    <Description text="Our biggest sale of the year. Lock in these prices forever!" />
                    <CountdownTimer days={3} hours={14} minutes={28} seconds={45} />
                </div>

                <PricingCards items={[
                    {
                        name: 'Starter',
                        originalPrice: '$29',
                        salePrice: '$9',
                        period: '/month',
                        features: ['5 users', '25GB storage', 'Basic support'],
                        cta: 'Grab This Deal'
                    },
                    {
                        name: 'Professional',
                        originalPrice: '$99',
                        salePrice: '$29',
                        period: '/month',
                        features: ['25 users', '100GB storage', 'Priority support', 'API access', 'Integrations'],
                        cta: 'Grab This Deal',
                        popular: true
                    },
                    {
                        name: 'Enterprise',
                        originalPrice: '$299',
                        salePrice: '$89',
                        period: '/month',
                        features: ['Unlimited users', 'Unlimited storage', '24/7 support', 'Full API', 'Custom solutions'],
                        cta: 'Grab This Deal'
                    }
                ]} />

                <p className="text-center text-sm text-muted-foreground mt-8">
                    * Sale prices are locked in for the lifetime of your subscription
                </p>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="destructive" className="mb-4">
        <Icon className="size-4 mr-1" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
        {text} <span className="text-destructive">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground mb-6">{text}</p>
)

const CountdownTimer = ({ days, hours, minutes, seconds }: { days: number; hours: number; minutes: number; seconds: number }) => (
    <div className="flex items-center justify-center gap-3">
        {[
            { value: days, label: 'Days' },
            { value: hours, label: 'Hours' },
            { value: minutes, label: 'Mins' },
            { value: seconds, label: 'Secs' }
        ].map((item, i) => (
            <div key={i} className="text-center">
                <div className="bg-card border rounded-lg px-3 py-2 min-w-[60px]">
                    <div className="text-2xl font-bold text-primary">{item.value.toString().padStart(2, '0')}</div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
            </div>
        ))}
    </div>
)

interface PricingItem {
    name: string
    originalPrice: string
    salePrice: string
    period: string
    features: string[]
    cta: string
    popular?: boolean
}

const PricingCards = ({ items }: { items: PricingItem[] }) => (
    <div className="grid @md:grid-cols-3 gap-6 mt-8">
        {items.map((item, i) => (
            <Card key={i} className={`relative overflow-hidden ${item.popular ? 'border-destructive shadow-lg scale-105' : ''}`}>
                {item.popular && (
                    <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
                        Best Value
                    </div>
                )}
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3">{item.name}</h3>
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-4xl font-bold">{item.salePrice}</span>
                        <span className="text-lg text-muted-foreground line-through">{item.originalPrice}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{item.period}</span>

                    <ul className="space-y-2 my-6">
                        {item.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                                <Check className="size-4 text-primary" />
                                {f}
                            </li>
                        ))}
                    </ul>

                    <Button variant={item.popular ? 'destructive' : 'outline'} className="w-full">
                        <Zap className="size-4 mr-2" />
                        {item.cta}
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
