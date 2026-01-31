import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Cloud, Server, HardDrive, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Cloud} text="Hosting Plans" />
                    <Title text="Cloud Hosting Pricing" />
                    <Description text="Scalable cloud infrastructure for your applications." />
                </div>

                <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-6">
                    {[
                        {
                            icon: Zap,
                            name: 'Starter',
                            specs: '1 vCPU • 1GB RAM',
                            price: '$5',
                            storage: '25GB SSD',
                            bandwidth: '1TB transfer',
                            features: ['Shared resources', 'Basic monitoring', 'Daily backups'],
                            variant: 'outline' as const
                        },
                        {
                            icon: Cloud,
                            name: 'Standard',
                            specs: '2 vCPU • 4GB RAM',
                            price: '$20',
                            storage: '80GB SSD',
                            bandwidth: '4TB transfer',
                            features: ['Dedicated resources', 'Advanced monitoring', 'Hourly backups', 'Auto-scaling'],
                            variant: 'default' as const,
                            popular: true
                        },
                        {
                            icon: Server,
                            name: 'Professional',
                            specs: '4 vCPU • 8GB RAM',
                            price: '$40',
                            storage: '160GB SSD',
                            bandwidth: '8TB transfer',
                            features: ['Everything in Standard', 'Load balancing', 'DDoS protection', 'CDN included'],
                            variant: 'outline' as const
                        },
                        {
                            icon: HardDrive,
                            name: 'Enterprise',
                            specs: '8 vCPU • 32GB RAM',
                            price: '$160',
                            storage: '640GB SSD',
                            bandwidth: 'Unlimited',
                            features: ['Everything in Pro', 'Dedicated support', 'Custom configs', 'SLA 99.99%'],
                            variant: 'outline' as const
                        }
                    ].map((plan, i) => (
                        <Card key={i} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                            {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Popular</Badge>}
                            <CardContent className="p-5">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                                    <plan.icon className="size-5 text-primary" />
                                </div>

                                <h3 className="font-bold">{plan.name}</h3>
                                <p className="text-xs text-muted-foreground font-mono mb-3">{plan.specs}</p>

                                <div className="mb-3">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    <span className="text-muted-foreground">/mo</span>
                                </div>

                                <div className="space-y-1 text-xs mb-4 pb-4 border-b">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Storage</span>
                                        <span className="font-medium">{plan.storage}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Bandwidth</span>
                                        <span className="font-medium">{plan.bandwidth}</span>
                                    </div>
                                </div>

                                <ul className="space-y-2 mb-4">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-xs">
                                            <Check className="size-3 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Button variant={plan.variant} className="w-full" size="sm">
                                    Deploy Now
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
