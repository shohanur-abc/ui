import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Check, Sparkles } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Sparkles} text="Lifetime Access" />
                    <Title text="Pay Once, Use Forever" />
                    <Description text="No subscriptions. No recurring fees. One-time payment for lifetime access." />
                </div>

                <LifetimeCards items={[
                    {
                        name: 'Personal',
                        price: '$99',
                        originalPrice: '$199',
                        description: 'For individual use',
                        features: ['Lifetime updates', '1 user license', 'All current features', 'Community support', 'Future updates included'],
                        cta: 'Buy Now'
                    },
                    {
                        name: 'Professional',
                        price: '$249',
                        originalPrice: '$499',
                        description: 'For professionals',
                        features: ['Everything in Personal', '5 user licenses', 'Priority support', 'Source code access', 'Commercial license'],
                        cta: 'Buy Now',
                        popular: true
                    },
                    {
                        name: 'Team',
                        price: '$499',
                        originalPrice: '$999',
                        description: 'For organizations',
                        features: ['Everything in Professional', 'Unlimited licenses', 'Dedicated support', 'Custom branding', 'White-label rights'],
                        cta: 'Buy Now'
                    }
                ]} />

                <div className="text-center mt-8 text-sm text-muted-foreground">
                    30-day money-back guarantee. No questions asked.
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4">
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

interface LifetimeItem {
    name: string
    price: string
    originalPrice: string
    description: string
    features: string[]
    cta: string
    popular?: boolean
}

const LifetimeCards = ({ items }: { items: LifetimeItem[] }) => (
    <div className="grid @md:grid-cols-3 gap-6">
        {items.map((item, i) => (
            <Card key={i} className={`flex flex-col ${item.popular ? 'border-primary shadow-lg relative' : ''}`}>
                {item.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Best Value</Badge>}
                <CardHeader className="pb-2">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="flex items-baseline gap-2 mb-6">
                        <span className="text-4xl font-bold">{item.price}</span>
                        <span className="text-lg text-muted-foreground line-through">{item.originalPrice}</span>
                    </div>
                    <ul className="space-y-3">
                        {item.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm">
                                <Check className="size-4 text-primary shrink-0" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button variant={item.popular ? 'default' : 'outline'} className="w-full">
                        {item.cta}
                    </Button>
                </CardFooter>
            </Card>
        ))}
    </div>
)
