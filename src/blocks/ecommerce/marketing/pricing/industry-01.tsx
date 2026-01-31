import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Briefcase, ShoppingCart, Palette, Code } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Briefcase} text="Industry Pricing" />
                    <Title text="Plans for Your Industry" />
                    <Description text="Tailored pricing and features for different industries." />
                </div>

                <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
                    {[
                        {
                            icon: ShoppingCart,
                            industry: 'E-commerce',
                            price: '$79',
                            description: 'Built for online stores',
                            features: ['Product management', 'Inventory tracking', 'Order processing', 'Payment integration', 'Shipping automation'],
                            color: 'text-orange-500',
                            bgColor: 'bg-orange-500/10'
                        },
                        {
                            icon: Palette,
                            industry: 'Creative',
                            price: '$59',
                            description: 'For designers & artists',
                            features: ['Portfolio hosting', 'Client proofing', 'Asset management', 'Brand guidelines', 'Version control'],
                            color: 'text-pink-500',
                            bgColor: 'bg-pink-500/10',
                            popular: true
                        },
                        {
                            icon: Code,
                            industry: 'SaaS',
                            price: '$99',
                            description: 'For software companies',
                            features: ['Usage analytics', 'Subscription billing', 'Multi-tenancy', 'API management', 'Feature flags'],
                            color: 'text-blue-500',
                            bgColor: 'bg-blue-500/10'
                        },
                        {
                            icon: Briefcase,
                            industry: 'Agency',
                            price: '$129',
                            description: 'For marketing agencies',
                            features: ['Client management', 'White-label', 'Team collaboration', 'Reporting tools', 'Multiple workspaces'],
                            color: 'text-green-500',
                            bgColor: 'bg-green-500/10'
                        }
                    ].map((plan, i) => (
                        <Card key={i} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                            {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Popular</Badge>}
                            <CardContent className="p-6">
                                <div className={`size-12 rounded-xl ${plan.bgColor} flex items-center justify-center mb-4`}>
                                    <plan.icon className={`size-6 ${plan.color}`} />
                                </div>

                                <h3 className="text-lg font-bold">{plan.industry}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                                <div className="mb-4">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/mo</span>
                                </div>

                                <ul className="space-y-2 mb-6">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm">
                                            <Check className={`size-4 ${plan.color}`} />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Button variant={plan.popular ? 'default' : 'outline'} className="w-full" size="sm">
                                    Get Started
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
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
