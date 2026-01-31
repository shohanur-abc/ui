import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Star, Sparkles, ArrowUpRight } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Sparkles} text="Limited Offer" />
                    <Title text="Exclusive Early Bird Pricing" />
                    <Description text="Lock in these special rates before they're gone forever." />
                </div>

                <div className="max-w-xl mx-auto mb-12">
                    <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg mb-4">
                        <span className="font-medium">Only 47 spots left at this price</span>
                        <Badge variant="destructive">Selling Fast</Badge>
                    </div>
                </div>

                <Card className="max-w-3xl mx-auto border-primary overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <Badge className="bg-white/20 border-0 mb-2">Early Bird Special</Badge>
                                <h3 className="text-2xl font-bold">Lifetime Access</h3>
                            </div>
                            <div className="text-right">
                                <div className="text-lg line-through opacity-70">$997</div>
                                <div className="text-4xl font-bold">$297</div>
                                <div className="text-sm opacity-80">one-time payment</div>
                            </div>
                        </div>
                    </div>
                    <CardContent className="p-6">
                        <div className="grid @sm:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <Star className="size-4 text-primary" />
                                    What&apos;s Included
                                </h4>
                                <ul className="space-y-2">
                                    {['Full platform access', 'All current features', 'All future updates', 'Source code access', 'Private community'].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <Check className="size-4 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                    <Sparkles className="size-4 text-primary" />
                                    Bonus Items
                                </h4>
                                <ul className="space-y-2">
                                    {['1-on-1 onboarding call', 'Exclusive templates', 'Priority support forever', 'Early access to beta', 'Founder badge'].map((f, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm">
                                            <Check className="size-4 text-primary" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 bg-muted rounded-lg mb-6">
                            <div className="flex items-center justify-between text-sm">
                                <span>This price will never be offered again</span>
                                <span className="font-bold text-green-600">Save $700</span>
                            </div>
                        </div>

                        <Button className="w-full" size="lg">
                            Claim Early Bird Price
                            <ArrowUpRight className="size-4 ml-2" />
                        </Button>

                        <p className="text-center text-xs text-muted-foreground mt-4">
                            30-day money-back guarantee. No questions asked.
                        </p>
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
