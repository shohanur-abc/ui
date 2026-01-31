import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Check, Infinity, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface PricingTier {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    cta: string
    highlighted?: boolean
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Sparkles} text="Pricing" />
                    <Title text="Simple, Transparent" highlight="Pricing" />
                    <Description text="Choose the plan that fits your needs. All plans include a 14-day free trial." />
                </div>

                <PricingCards items={[
                    {
                        name: 'Starter',
                        price: '$0',
                        period: 'forever',
                        description: 'Perfect for trying out our platform',
                        features: ['Up to 3 projects', '1 GB storage', 'Basic analytics', 'Email support'],
                        cta: 'Get Started',
                    },
                    {
                        name: 'Pro',
                        price: '$29',
                        period: 'per month',
                        description: 'Best for growing teams',
                        features: ['Unlimited projects', '50 GB storage', 'Advanced analytics', 'Priority support', 'Team collaboration', 'Custom integrations'],
                        cta: 'Start Free Trial',
                        highlighted: true,
                    },
                    {
                        name: 'Enterprise',
                        price: 'Custom',
                        period: 'tailored',
                        description: 'For large organizations',
                        features: ['Everything in Pro', 'Unlimited storage', 'SSO / SAML', 'Dedicated support', 'Custom SLA', 'On-premise option'],
                        cta: 'Contact Sales',
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const PricingCards = ({ items }: { items: PricingTier[] }) => (
    <div className="grid gap-6 @lg:grid-cols-3 max-w-5xl mx-auto">
        {items.map((tier) => (
            <Card 
                key={tier.name}
                className={`relative border-border/50 transition-all ${tier.highlighted ? 'bg-primary/5 border-primary/40 shadow-xl shadow-primary/10 scale-105' : 'bg-card/50 backdrop-blur-sm'}`}
            >
                {tier.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                    </div>
                )}
                <CardContent className="p-6 @md:p-8">
                    <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
                    <div className="mb-4">
                        <span className="text-4xl font-bold">{tier.price}</span>
                        <span className="text-sm text-muted-foreground ml-1">/{tier.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                    <ul className="space-y-3 mb-6">
                        {tier.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                                <Check className="size-4 text-primary shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <Button className="w-full gap-2" variant={tier.highlighted ? 'default' : 'outline'} asChild>
                        <Link href={tier.name === 'Enterprise' ? '/contact' : '/signup'}>
                            {tier.cta}
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
