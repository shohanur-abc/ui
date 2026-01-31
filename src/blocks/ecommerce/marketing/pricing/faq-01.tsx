import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Check, CircleHelp, Star } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Star} text="Pricing" />
                    <Title text="Simple Pricing with FAQ" />
                    <Description text="Everything you need, with answers to common questions." />
                </div>

                <div className="grid @xl:grid-cols-5 gap-8">
                    <div className="@xl:col-span-3 grid @md:grid-cols-2 gap-6">
                        {[
                            {
                                name: 'Starter',
                                price: '$19',
                                description: 'Perfect for getting started',
                                features: ['10 projects', '20GB storage', 'Email support', 'Basic analytics'],
                                variant: 'outline' as const
                            },
                            {
                                name: 'Pro',
                                price: '$49',
                                description: 'For growing businesses',
                                features: ['Unlimited projects', '100GB storage', 'Priority support', 'Advanced analytics', 'API access', 'Custom domains'],
                                variant: 'default' as const,
                                popular: true
                            }
                        ].map((plan, i) => (
                            <Card key={i} className={`${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                                {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Popular</Badge>}
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold">{plan.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                                    <div className="mb-6">
                                        <span className="text-4xl font-bold">{plan.price}</span>
                                        <span className="text-muted-foreground">/mo</span>
                                    </div>
                                    <ul className="space-y-2 mb-6">
                                        {plan.features.map((f, j) => (
                                            <li key={j} className="flex items-center gap-2 text-sm">
                                                <Check className="size-4 text-primary" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <Button variant={plan.variant} className="w-full">Get Started</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="@xl:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <CircleHelp className="size-5 text-primary" />
                            <h3 className="text-lg font-semibold">Common Questions</h3>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {[
                                { q: 'Can I change plans later?', a: 'Yes! You can upgrade or downgrade at any time. Changes take effect immediately and billing is prorated.' },
                                { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' },
                                { q: 'Is there a free trial?', a: 'Yes, all plans include a 14-day free trial. No credit card required to start.' },
                                { q: 'What happens if I cancel?', a: 'You can cancel anytime. Your data will be available for export for 30 days after cancellation.' },
                                { q: 'Do you offer discounts?', a: 'Yes! Annual billing gets 2 months free. We also offer discounts for nonprofits and educational institutions.' }
                            ].map((item, i) => (
                                <AccordionItem key={i} value={`item-${i}`}>
                                    <AccordionTrigger className="text-sm text-left">{item.q}</AccordionTrigger>
                                    <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
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
