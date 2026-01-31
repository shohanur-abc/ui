import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Users2, UserPlus, Building } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Users2} text="Team Plans" />
                    <Title text="Pricing for Teams" />
                    <Description text="Scale your team with flexible team pricing." />
                </div>

                <div className="grid @md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: UserPlus,
                            name: 'Small Team',
                            teamSize: '2-5 members',
                            price: '$19',
                            perUser: 'per user/month',
                            minBilled: 'Min $38/month',
                            features: ['Shared workspace', 'Team chat', 'Basic permissions', '10GB per user'],
                            variant: 'outline' as const
                        },
                        {
                            icon: Users2,
                            name: 'Growing Team',
                            teamSize: '6-25 members',
                            price: '$15',
                            perUser: 'per user/month',
                            minBilled: 'Min $90/month',
                            features: ['Everything in Small', 'Advanced permissions', 'Analytics dashboard', '25GB per user', 'Priority support'],
                            variant: 'default' as const,
                            popular: true
                        },
                        {
                            icon: Building,
                            name: 'Large Team',
                            teamSize: '26+ members',
                            price: '$12',
                            perUser: 'per user/month',
                            minBilled: 'Min $312/month',
                            features: ['Everything in Growing', 'SSO/SAML', 'Custom integrations', 'Unlimited storage', 'Dedicated success manager'],
                            variant: 'outline' as const
                        }
                    ].map((plan, i) => (
                        <Card key={i} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                            {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                            <CardContent className="p-6">
                                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <plan.icon className="size-6 text-primary" />
                                </div>

                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{plan.teamSize}</p>

                                <div className="mb-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{plan.perUser}</p>
                                <p className="text-xs text-muted-foreground/70 mb-6">{plan.minBilled}</p>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm">
                                            <Check className="size-4 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Button variant={plan.variant} className="w-full">
                                    Start Free Trial
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    All plans include a 14-day free trial. No credit card required.
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
