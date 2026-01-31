import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowRight, Check, Minus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface PlanFeature {
    name: string
    included: boolean
}

interface PlanItem {
    name: string
    description: string
    price: string
    period: string
    features: PlanFeature[]
    highlighted?: boolean
    ctaLabel: string
    ctaHref: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Sparkles} text="Feature Comparison" />
                    <Title text="Choose the Right Plan for" highlight="Your Team" />
                    <Description text="Compare features across our plans to find the perfect fit for your needs." />
                </div>

                <PricingCards items={[
                    {
                        name: 'Starter',
                        description: 'Perfect for small teams getting started.',
                        price: '$29',
                        period: 'per month',
                        features: [
                            { name: 'Up to 5 users', included: true },
                            { name: 'Basic analytics', included: true },
                            { name: 'Email support', included: true },
                            { name: 'API access', included: false },
                            { name: 'Custom integrations', included: false },
                            { name: 'SSO / SAML', included: false },
                        ],
                        ctaLabel: 'Get Started',
                        ctaHref: '/signup?plan=starter',
                    },
                    {
                        name: 'Professional',
                        description: 'For growing teams that need more power.',
                        price: '$99',
                        period: 'per month',
                        highlighted: true,
                        features: [
                            { name: 'Up to 25 users', included: true },
                            { name: 'Advanced analytics', included: true },
                            { name: 'Priority support', included: true },
                            { name: 'API access', included: true },
                            { name: 'Custom integrations', included: true },
                            { name: 'SSO / SAML', included: false },
                        ],
                        ctaLabel: 'Start Free Trial',
                        ctaHref: '/signup?plan=pro',
                    },
                    {
                        name: 'Enterprise',
                        description: 'For large organizations with custom needs.',
                        price: 'Custom',
                        period: 'contact us',
                        features: [
                            { name: 'Unlimited users', included: true },
                            { name: 'Custom analytics', included: true },
                            { name: 'Dedicated support', included: true },
                            { name: 'API access', included: true },
                            { name: 'Custom integrations', included: true },
                            { name: 'SSO / SAML', included: true },
                        ],
                        ctaLabel: 'Contact Sales',
                        ctaHref: '/contact',
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
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

const PricingCards = ({ items }: { items: PlanItem[] }) => (
    <div className="grid gap-6 @lg:grid-cols-3">
        {items.map((plan) => (
            <Card 
                key={plan.name}
                className={`border-border/50 transition-all ${plan.highlighted ? 'border-primary shadow-lg ring-1 ring-primary/20' : 'hover:border-primary/30'}`}
            >
                {plan.highlighted && (
                    <div className="bg-primary text-primary-foreground text-center py-1.5 text-sm font-medium">
                        Most Popular
                    </div>
                )}
                <CardHeader className="text-center pb-4">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-sm text-muted-foreground ml-1">/{plan.period}</span>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                            <li key={feature.name} className="flex items-center gap-3 text-sm">
                                {feature.included ? (
                                    <Check className="size-4 text-primary shrink-0" />
                                ) : (
                                    <Minus className="size-4 text-muted-foreground/50 shrink-0" />
                                )}
                                <span className={feature.included ? '' : 'text-muted-foreground'}>{feature.name}</span>
                            </li>
                        ))}
                    </ul>
                    <Button 
                        className="w-full gap-2" 
                        variant={plan.highlighted ? 'default' : 'outline'}
                        asChild
                    >
                        <Link href={plan.ctaHref}>
                            {plan.ctaLabel}
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
