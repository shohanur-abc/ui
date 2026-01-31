import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Check, Shield } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <Eyebrow icon={Shield} text="Money-Back Guarantee" />
                    <Title text="Risk-Free Pricing" />
                    <Description text="Try us for 30 days. If you're not satisfied, get a full refund. No questions asked." />
                </div>

                <div className="grid @md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <GuaranteeCard
                        title="30-Day Free Trial"
                        description="Experience everything before you commit"
                        features={['Full feature access', 'No credit card required', 'Cancel anytime', 'Keep your data']}
                        cta="Start Free Trial"
                        variant="outline"
                    />

                    <GuaranteeCard
                        title="Money-Back Guarantee"
                        description="Not satisfied? Get your money back"
                        features={['Full refund within 30 days', 'No questions asked', 'Hassle-free process', 'Quick processing']}
                        cta="View Plans"
                        variant="default"
                        highlighted
                    />
                </div>

                <div className="mt-16 max-w-4xl mx-auto">
                    <h3 className="text-center font-semibold text-lg mb-6">Our Pricing Promise</h3>
                    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
                        {[
                            { title: 'No Hidden Fees', desc: 'What you see is what you pay' },
                            { title: 'Price Lock', desc: 'Your rate never increases' },
                            { title: 'Cancel Anytime', desc: 'No long-term contracts' },
                            { title: 'Prorated Billing', desc: 'Fair charges when you change' }
                        ].map((item, i) => (
                            <div key={i} className="text-center p-4 rounded-lg bg-muted/50">
                                <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
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

interface GuaranteeCardProps {
    title: string
    description: string
    features: string[]
    cta: string
    variant: 'default' | 'outline'
    highlighted?: boolean
}

const GuaranteeCard = ({ title, description, features, cta, variant, highlighted }: GuaranteeCardProps) => (
    <Card className={`${highlighted ? 'border-primary bg-primary/5' : ''}`}>
        <CardContent className="p-6 @md:p-8">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{description}</p>

            <ul className="space-y-3 mb-6">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                        <Check className="size-4 text-primary shrink-0" />
                        {f}
                    </li>
                ))}
            </ul>

            <Button variant={variant} className="w-full group">
                {cta}
                <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
        </CardContent>
    </Card>
)
