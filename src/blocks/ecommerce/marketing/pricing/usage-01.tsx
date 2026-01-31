import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Check, Gauge, TrendingUp, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Gauge} text="Usage-Based" />
                    <Title text="Pay For What You Use" />
                    <Description text="Start free and only pay when you scale. Fair and transparent." />
                </div>

                <UsageCards items={[
                    {
                        name: 'API Calls',
                        icon: Zap,
                        free: '10,000/mo',
                        price: '$0.001',
                        unit: 'per call after',
                        description: 'First 10K free every month',
                        tiers: [
                            { range: '0 - 10K', price: 'Free' },
                            { range: '10K - 100K', price: '$0.001/call' },
                            { range: '100K - 1M', price: '$0.0008/call' },
                            { range: '1M+', price: '$0.0005/call' }
                        ]
                    },
                    {
                        name: 'Storage',
                        icon: TrendingUp,
                        free: '5 GB',
                        price: '$0.10',
                        unit: 'per GB after',
                        description: 'First 5GB included free',
                        popular: true,
                        tiers: [
                            { range: '0 - 5GB', price: 'Free' },
                            { range: '5GB - 50GB', price: '$0.10/GB' },
                            { range: '50GB - 500GB', price: '$0.08/GB' },
                            { range: '500GB+', price: '$0.05/GB' }
                        ]
                    },
                    {
                        name: 'Bandwidth',
                        icon: Gauge,
                        free: '100 GB',
                        price: '$0.05',
                        unit: 'per GB after',
                        description: 'First 100GB included free',
                        tiers: [
                            { range: '0 - 100GB', price: 'Free' },
                            { range: '100GB - 1TB', price: '$0.05/GB' },
                            { range: '1TB - 10TB', price: '$0.04/GB' },
                            { range: '10TB+', price: '$0.02/GB' }
                        ]
                    }
                ]} />

                <div className="text-center mt-12">
                    <Button size="lg">Calculate Your Price</Button>
                    <p className="text-sm text-muted-foreground mt-4">No minimum commitment. Cancel anytime.</p>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4">
        <Icon className="size-4 mr-1" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface UsageTier {
    range: string
    price: string
}

interface UsageItem {
    name: string
    icon: ComponentType<{ className?: string }>
    free: string
    price: string
    unit: string
    description: string
    tiers: UsageTier[]
    popular?: boolean
}

const UsageCards = ({ items }: { items: UsageItem[] }) => (
    <div className="grid @md:grid-cols-3 gap-6">
        {items.map((item, i) => (
            <Card key={i} className={`${item.popular ? 'border-primary shadow-lg' : ''}`}>
                {item.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Used</Badge>}
                <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <item.icon className="size-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-3xl font-bold">{item.free}</span>
                        <span className="text-muted-foreground">free</span>
                    </div>

                    <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs font-medium text-muted-foreground mb-2">Volume Pricing</div>
                        {item.tiers.map((tier, j) => (
                            <div key={j} className="flex justify-between text-sm">
                                <span>{tier.range}</span>
                                <span className={tier.price === 'Free' ? 'text-primary font-medium' : ''}>{tier.price}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
