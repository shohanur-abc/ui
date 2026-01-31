import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Check, Crown, Flame, Rocket, Star, X } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Crown} text="Premium Tiers" />
                    <Title text="Unlock Your Potential" />
                    <Description text="From startups to enterprises, we have the perfect plan for you." />
                </div>

                <PricingCards items={[
                    {
                        icon: Star,
                        name: 'Starter',
                        tagline: 'For individuals',
                        price: '$0',
                        period: 'forever free',
                        features: [
                            { text: '3 projects', included: true },
                            { text: 'Basic analytics', included: true },
                            { text: 'Community support', included: true },
                            { text: 'API access', included: false },
                            { text: 'Custom domain', included: false },
                        ],
                        cta: 'Get Started',
                        color: 'from-gray-500/20 to-gray-600/20'
                    },
                    {
                        icon: Flame,
                        name: 'Growth',
                        tagline: 'For teams',
                        price: '$49',
                        period: 'per month',
                        features: [
                            { text: 'Unlimited projects', included: true },
                            { text: 'Advanced analytics', included: true },
                            { text: 'Priority support', included: true },
                            { text: 'API access', included: true },
                            { text: 'Custom domain', included: false },
                        ],
                        cta: 'Start Free Trial',
                        popular: true,
                        color: 'from-orange-500/20 to-red-500/20'
                    },
                    {
                        icon: Rocket,
                        name: 'Scale',
                        tagline: 'For enterprises',
                        price: '$199',
                        period: 'per month',
                        features: [
                            { text: 'Unlimited everything', included: true },
                            { text: 'Enterprise analytics', included: true },
                            { text: '24/7 dedicated support', included: true },
                            { text: 'Full API access', included: true },
                            { text: 'Custom domain', included: true },
                        ],
                        cta: 'Contact Sales',
                        color: 'from-purple-500/20 to-indigo-500/20'
                    }
                ]} />
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

interface FeatureItem {
    text: string
    included: boolean
}

interface PricingItem {
    icon: ComponentType<{ className?: string }>
    name: string
    tagline: string
    price: string
    period: string
    features: FeatureItem[]
    cta: string
    popular?: boolean
    color: string
}

const PricingCards = ({ items }: { items: PricingItem[] }) => (
    <div className="grid @md:grid-cols-3 gap-6">
        {items.map((item, i) => (
            <Card key={i} className={`relative overflow-hidden group ${item.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                {item.popular && <Badge className="absolute top-4 right-4 z-10">Popular</Badge>}
                <CardHeader className="relative pb-2">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                        <item.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.tagline}</p>
                </CardHeader>
                <CardContent className="relative">
                    <div className="mb-6">
                        <span className="text-4xl font-bold">{item.price}</span>
                        <span className="text-muted-foreground text-sm ml-1">{item.period}</span>
                    </div>
                    <ul className="space-y-3 mb-6">
                        {item.features.map((f, j) => (
                            <li key={j} className={`flex items-center gap-2 text-sm ${!f.included ? 'text-muted-foreground' : ''}`}>
                                {f.included ? <Check className="size-4 text-primary" /> : <X className="size-4 text-muted-foreground/50" />}
                                {f.text}
                            </li>
                        ))}
                    </ul>
                    <Button variant={item.popular ? 'default' : 'outline'} className="w-full">
                        {item.cta}
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
