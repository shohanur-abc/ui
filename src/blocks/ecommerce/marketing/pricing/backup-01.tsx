import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Archive, FolderOpen, Building, HardDrive } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Archive} text="Backup" />
                    <Title text="Backup & Recovery" />
                    <Description text="Secure backup solutions for your data." />
                </div>

                <div className="grid @md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: HardDrive,
                            name: 'Personal',
                            price: '$5',
                            storage: '1TB storage',
                            features: ['1 computer', 'Automatic backup', 'File versioning', 'Mobile app', '30-day retention'],
                            variant: 'outline' as const
                        },
                        {
                            icon: FolderOpen,
                            name: 'Business',
                            price: '$15',
                            storage: '5TB storage',
                            features: ['Unlimited computers', 'Server backup', 'NAS support', 'External drives', '1-year retention', 'Priority restore'],
                            variant: 'default' as const,
                            popular: true
                        },
                        {
                            icon: Building,
                            name: 'Enterprise',
                            price: 'Custom',
                            storage: 'Unlimited storage',
                            features: ['All Business features', 'Hybrid backup', 'Bare metal restore', 'Virtual machine support', 'Compliance reports', 'Dedicated support'],
                            variant: 'outline' as const
                        }
                    ].map((plan, i) => (
                        <Card key={i} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                            {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                            <CardContent className="p-6">
                                <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                                    <plan.icon className="size-6 text-blue-500" />
                                </div>

                                <h3 className="text-xl font-bold">{plan.name}</h3>

                                <div className="my-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-muted-foreground">/mo</span>}
                                </div>
                                <p className="text-sm text-muted-foreground mb-6">{plan.storage}</p>

                                <ul className="space-y-3 mb-6">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm">
                                            <Check className="size-4 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Button variant={plan.variant} className="w-full">
                                    {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
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
