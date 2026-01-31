import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Code, GitBranch, Terminal, Cpu } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Code} text="Developer Plans" />
                    <Title text="Pricing for Developers" />
                    <Description text="Tools and features developers love, at prices they'll appreciate." />
                </div>

                <div className="grid @md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Terminal,
                            name: 'Hobby',
                            tagline: 'Side projects',
                            price: '$0',
                            features: ['CLI access', '3 deployments/day', '1GB bandwidth', 'Community support', 'Public repos'],
                            limits: '100 build minutes/mo',
                            variant: 'outline' as const
                        },
                        {
                            icon: GitBranch,
                            name: 'Pro',
                            tagline: 'Serious projects',
                            price: '$20',
                            features: ['Everything in Hobby', 'Unlimited deployments', '100GB bandwidth', 'Priority support', 'Private repos', 'Preview environments', 'Team members'],
                            limits: '1000 build minutes/mo',
                            variant: 'default' as const,
                            popular: true
                        },
                        {
                            icon: Cpu,
                            name: 'Team',
                            tagline: 'Production apps',
                            price: '$50',
                            features: ['Everything in Pro', 'Unlimited bandwidth', '24/7 support', 'SSO/SAML', 'Audit logs', 'SLA 99.99%', 'Dedicated resources'],
                            limits: 'Unlimited build minutes',
                            variant: 'outline' as const
                        }
                    ].map((plan, i) => (
                        <Card key={i} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                            {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <plan.icon className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{plan.name}</h3>
                                        <p className="text-xs text-muted-foreground">{plan.tagline}</p>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== '$0' && <span className="text-muted-foreground">/mo</span>}
                                </div>

                                <div className="bg-muted/50 rounded px-3 py-2 mb-4 font-mono text-xs">
                                    {plan.limits}
                                </div>

                                <ul className="space-y-2 mb-6">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm">
                                            <Check className="size-4 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Button variant={plan.variant} className="w-full">
                                    {plan.price === '$0' ? 'Start Free' : 'Subscribe'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <code className="text-sm bg-muted px-3 py-1 rounded">npx create-app@latest --plan=pro</code>
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
