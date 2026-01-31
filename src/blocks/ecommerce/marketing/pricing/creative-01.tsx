import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Paintbrush, Layers, Palette, Wand2 } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Paintbrush} text="Creative Plans" />
                    <Title text="Pricing for Creatives" />
                    <Description text="Powerful tools for designers, artists, and creative professionals." />
                </div>

                <div className="grid @md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: Paintbrush,
                            name: 'Individual',
                            description: 'For solo creators',
                            price: '$15',
                            features: ['100 exports/month', '10GB cloud storage', 'Basic templates', 'Standard fonts', 'Email support'],
                            variant: 'outline' as const
                        },
                        {
                            icon: Layers,
                            name: 'Professional',
                            description: 'For freelancers',
                            price: '$39',
                            features: ['Unlimited exports', '100GB cloud storage', 'Premium templates', 'All fonts included', 'Priority support', 'Remove watermark', 'Brand kit'],
                            variant: 'default' as const,
                            popular: true
                        },
                        {
                            icon: Wand2,
                            name: 'Studio',
                            description: 'For agencies',
                            price: '$99',
                            features: ['Everything in Pro', 'Unlimited storage', 'Team collaboration', 'Client workspaces', 'White-label exports', 'Custom templates', 'API access'],
                            variant: 'outline' as const
                        }
                    ].map((plan, i) => (
                        <Card key={i} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                            {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Best for Freelancers</Badge>}
                            <CardContent className="p-6">
                                <div className="size-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                                    <plan.icon className="size-7 text-primary" />
                                </div>

                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                                <div className="mb-6">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/mo</span>
                                </div>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm">
                                            <Check className="size-4 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Button variant={plan.variant} className="w-full">
                                    Start Creating
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
