import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Rocket, TrendingUp, ArrowRight } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Rocket} text="For Startups" />
                    <Title text="Startup Program" />
                    <Description text="Special pricing and resources for early-stage startups." />
                </div>

                <Card className="border-primary overflow-hidden">
                    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 @md:p-8">
                        <div className="grid @xl:grid-cols-2 gap-8">
                            <div>
                                <Badge className="mb-4">Startup Exclusive</Badge>
                                <h3 className="text-3xl font-bold mb-4">90% Off for Startups</h3>
                                <p className="text-muted-foreground mb-6">
                                    Qualified startups get our Pro plan at a fraction of the cost.
                                    Focus on building, not budgeting.
                                </p>

                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className="text-muted-foreground line-through text-xl">$49</span>
                                    <span className="text-5xl font-bold text-primary">$5</span>
                                    <span className="text-muted-foreground">/month</span>
                                </div>

                                <ul className="grid @sm:grid-cols-2 gap-2 mb-6">
                                    {['All Pro features', 'Unlimited projects', 'Priority support', 'API access', '100GB storage', 'Team collaboration'].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <Check className="size-4 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <Button size="lg">
                                    Apply Now
                                    <ArrowRight className="size-4 ml-2" />
                                </Button>
                            </div>

                            <div className="bg-background rounded-xl p-6">
                                <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <TrendingUp className="size-5 text-primary" />
                                    Eligibility Requirements
                                </h4>
                                <ul className="space-y-3">
                                    {[
                                        { req: 'Less than 2 years old', desc: 'Company must be incorporated within last 24 months' },
                                        { req: 'Under $1M funding', desc: 'Total funding raised below $1 million' },
                                        { req: 'Under 10 employees', desc: 'Team size of 10 or fewer full-time employees' },
                                        { req: 'New customer', desc: 'Not currently or previously a paying customer' }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className="size-4 text-primary mt-1 shrink-0" />
                                            <div>
                                                <div className="font-medium text-sm">{item.req}</div>
                                                <div className="text-xs text-muted-foreground">{item.desc}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 pt-6 border-t">
                                    <div className="text-sm text-muted-foreground">
                                        Program duration: <span className="font-medium text-foreground">12 months</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground mt-1">
                                        After program: <span className="font-medium text-foreground">50% off regular pricing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
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
