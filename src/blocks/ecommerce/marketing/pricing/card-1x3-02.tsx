import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Crown, X } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Crown} text="Premium Plans" />
                    <Title text="Invest in Your Success" />
                    <Description text="Unlock premium features and take your business to the next level." />
                </div>

                <PricingCards items={[
                    {
                        name: 'Basic',
                        price: '$19',
                        period: 'per month',
                        features: [
                            { text: '5 team members', included: true },
                            { text: '20GB storage', included: true },
                            { text: 'Basic support', included: true },
                            { text: 'Advanced analytics', included: false },
                            { text: 'Custom branding', included: false },
                        ],
                        cta: 'Choose Basic',
                        highlighted: false
                    },
                    {
                        name: 'Growth',
                        price: '$49',
                        period: 'per month',
                        features: [
                            { text: '25 team members', included: true },
                            { text: '100GB storage', included: true },
                            { text: 'Priority support', included: true },
                            { text: 'Advanced analytics', included: true },
                            { text: 'Custom branding', included: false },
                        ],
                        cta: 'Choose Growth',
                        highlighted: true
                    },
                    {
                        name: 'Scale',
                        price: '$99',
                        period: 'per month',
                        features: [
                            { text: 'Unlimited members', included: true },
                            { text: 'Unlimited storage', included: true },
                            { text: '24/7 support', included: true },
                            { text: 'Advanced analytics', included: true },
                            { text: 'Custom branding', included: true },
                        ],
                        cta: 'Choose Scale',
                        highlighted: false
                    }
                ]} />
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

interface FeatureItem {
    text: string
    included: boolean
}

interface PricingItem {
    name: string
    price: string
    period: string
    features: FeatureItem[]
    cta: string
    highlighted: boolean
}

const PricingCards = ({ items }: { items: PricingItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map((item, i) => (
            <Card key={i} className={`relative overflow-hidden ${item.highlighted ? 'border-primary bg-primary/5' : ''}`}>
                {item.highlighted && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">
                        Recommended
                    </div>
                )}
                <CardContent className="p-6 @md:p-8">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">{item.price}</span>
                            <span className="text-muted-foreground text-sm">/{item.period}</span>
                        </div>
                    </div>
                    <ul className="space-y-3 mb-8">
                        {item.features.map((feature, j) => (
                            <li key={j} className={`flex items-center gap-3 text-sm ${!feature.included ? 'text-muted-foreground' : ''}`}>
                                {feature.included ? (
                                    <Check className="size-4 text-primary shrink-0" />
                                ) : (
                                    <X className="size-4 text-muted-foreground/50 shrink-0" />
                                )}
                                {feature.text}
                            </li>
                        ))}
                    </ul>
                    <Button variant={item.highlighted ? 'default' : 'outline'} className="w-full">
                        {item.cta}
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
