import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Building2, Check, Star } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface PlanItem {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    highlighted?: boolean
    badge?: string
    ctaLabel: string
    ctaHref: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Star} text="Simple Pricing" />
                    <Title text="Transparent Pricing for" highlight="Every Stage" />
                    <Description text="Start free and scale as you grow. No hidden fees, no surprises." />
                </div>

                <PricingPlans items={[
                    {
                        name: 'Free',
                        price: '$0',
                        period: 'forever',
                        description: 'For individuals exploring the platform.',
                        features: ['1 user', '3 projects', 'Basic features', 'Community support'],
                        ctaLabel: 'Get Started',
                        ctaHref: '/signup',
                    },
                    {
                        name: 'Team',
                        price: '$49',
                        period: 'per month',
                        description: 'For small teams ready to collaborate.',
                        features: ['Up to 10 users', 'Unlimited projects', 'Advanced features', 'Priority support', 'API access'],
                        highlighted: true,
                        badge: 'Popular',
                        ctaLabel: 'Start Free Trial',
                        ctaHref: '/signup?plan=team',
                    },
                    {
                        name: 'Enterprise',
                        price: 'Custom',
                        period: 'contact us',
                        description: 'For organizations with custom needs.',
                        features: ['Unlimited users', 'Custom features', 'Dedicated support', 'SLA guarantee', 'On-premise option'],
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

const PricingPlans = ({ items }: { items: PlanItem[] }) => (
    <div className="grid gap-6 @lg:grid-cols-3 max-w-5xl mx-auto">
        {items.map((plan) => (
            <Card 
                key={plan.name}
                className={`relative border-border/50 bg-card/50 backdrop-blur-sm transition-all ${plan.highlighted ? 'border-primary shadow-xl shadow-primary/10 scale-105' : 'hover:border-primary/30'}`}
            >
                {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="shadow-lg">{plan.badge}</Badge>
                    </div>
                )}
                <CardContent className="p-6 @md:p-8">
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-sm text-muted-foreground">/{plan.period}</span>
                        </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm">
                                <Check className="size-4 text-primary shrink-0" />
                                {feature}
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
