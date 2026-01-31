import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Clock, Gift, Sparkles } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Clock} text="Free Trial" />
                    <Title text="Try Before You Buy" />
                    <Description text="14 days of full access. No credit card required. Cancel anytime." />
                </div>

                <Card className="max-w-3xl mx-auto border-primary">
                    <CardContent className="p-6 @md:p-10">
                        <div className="grid @md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">What You Get in Your Trial</h3>
                                <ul className="space-y-4">
                                    {[
                                        { icon: Sparkles, text: 'Full access to all features' },
                                        { icon: Gift, text: 'Unlimited projects and storage' },
                                        { icon: Clock, text: '14 days to explore everything' },
                                        { icon: Check, text: 'No credit card required' }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <item.icon className="size-5 text-primary" />
                                            </div>
                                            <span className="font-medium">{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-col justify-center">
                                <div className="bg-muted/50 rounded-lg p-6 text-center">
                                    <div className="text-5xl font-bold text-primary mb-2">14</div>
                                    <div className="text-lg font-semibold mb-1">Days Free</div>
                                    <p className="text-sm text-muted-foreground mb-6">Then $29/month. Cancel anytime.</p>

                                    <Button size="lg" className="w-full mb-3">
                                        Start Your Free Trial
                                    </Button>
                                    <p className="text-xs text-muted-foreground">
                                        No credit card needed. Instant access.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t">
                            <h4 className="font-semibold text-center mb-4">After Your Trial</h4>
                            <div className="grid @sm:grid-cols-3 gap-4 text-center">
                                {[
                                    { step: '1', title: 'Choose a Plan', desc: 'Pick the plan that fits your needs' },
                                    { step: '2', title: 'Keep Your Data', desc: 'All your work stays intact' },
                                    { step: '3', title: 'Continue Growing', desc: 'Unlock even more features' }
                                ].map((item, i) => (
                                    <div key={i} className="p-4">
                                        <div className="size-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center mx-auto mb-2">
                                            {item.step}
                                        </div>
                                        <div className="font-medium text-sm">{item.title}</div>
                                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
