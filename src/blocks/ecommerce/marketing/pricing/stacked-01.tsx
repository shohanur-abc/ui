import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, ChevronRight, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Zap} text="Flexible Pricing" />
                    <Title text="Stacked Pricing Cards" />
                    <Description text="Vertically stacked cards with progressive feature unlocks." />
                </div>

                <div className="max-w-md mx-auto space-y-4">
                    {[
                        {
                            name: 'Free',
                            price: '$0',
                            description: 'Get started for free',
                            features: ['3 projects', '1GB storage', 'Community support'],
                            cta: 'Get Started',
                            variant: 'outline' as const
                        },
                        {
                            name: 'Starter',
                            price: '$9',
                            description: 'Everything in Free, plus:',
                            features: ['10 projects', '10GB storage', 'Email support', 'Basic analytics'],
                            cta: 'Start Trial',
                            variant: 'outline' as const
                        },
                        {
                            name: 'Pro',
                            price: '$29',
                            description: 'Everything in Starter, plus:',
                            features: ['Unlimited projects', '100GB storage', 'Priority support', 'Advanced analytics', 'API access'],
                            cta: 'Go Pro',
                            variant: 'default' as const,
                            popular: true
                        },
                        {
                            name: 'Enterprise',
                            price: 'Custom',
                            description: 'Everything in Pro, plus:',
                            features: ['Unlimited storage', 'Dedicated manager', 'SLA guarantee', 'Custom integrations'],
                            cta: 'Contact Us',
                            variant: 'outline' as const
                        }
                    ].map((plan, i) => (
                        <Card key={i} className={`group hover:shadow-lg transition-shadow ${plan.popular ? 'border-primary shadow-md' : ''}`}>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold">{plan.name}</h3>
                                            {plan.popular && <Badge>Popular</Badge>}
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {plan.features.map((f, j) => (
                                                <span key={j} className="flex items-center gap-1 text-xs bg-muted/50 px-2 py-0.5 rounded">
                                                    <Check className="size-3 text-primary" />
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <div className="text-xl font-bold">{plan.price}</div>
                                        {plan.price !== 'Custom' && <div className="text-xs text-muted-foreground">/month</div>}
                                        <Button variant={plan.variant} size="sm" className="mt-2 group-hover:shadow-sm">
                                            {plan.cta}
                                            <ChevronRight className="size-4 ml-1" />
                                        </Button>
                                    </div>
                                </div>
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
