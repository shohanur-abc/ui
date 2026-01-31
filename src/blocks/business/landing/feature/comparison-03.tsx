import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { CheckCircle2, Minus, Plus, Sparkles, X } from 'lucide-react'
import { ComponentType } from 'react'

interface PlanComparison {
    feature: string
    free: boolean | string
    pro: boolean | string
    enterprise: boolean | string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Sparkles} text="Plan Comparison" />
                    <Title text="Compare Plans and" highlight="Features" />
                    <Description text="See what's included in each plan to make the best choice for your team." />
                </div>

                <FeatureComparisonTable 
                    plans={['Free', 'Pro', 'Enterprise']}
                    features={[
                        { feature: 'Projects', free: '3', pro: 'Unlimited', enterprise: 'Unlimited' },
                        { feature: 'Team members', free: '1', pro: '10', enterprise: 'Unlimited' },
                        { feature: 'Storage', free: '1 GB', pro: '50 GB', enterprise: 'Unlimited' },
                        { feature: 'API access', free: false, pro: true, enterprise: true },
                        { feature: 'Custom integrations', free: false, pro: true, enterprise: true },
                        { feature: 'Advanced analytics', free: false, pro: true, enterprise: true },
                        { feature: 'Priority support', free: false, pro: true, enterprise: true },
                        { feature: 'SSO / SAML', free: false, pro: false, enterprise: true },
                        { feature: 'Custom SLA', free: false, pro: false, enterprise: true },
                        { feature: 'On-premise option', free: false, pro: false, enterprise: true },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const FeatureComparisonTable = ({ plans, features }: { plans: string[]; features: PlanComparison[] }) => {
    const renderValue = (value: boolean | string) => {
        if (typeof value === 'string') return <span className="text-sm">{value}</span>
        if (value) return <CheckCircle2 className="size-5 text-primary mx-auto" />
        return <X className="size-5 text-muted-foreground/50 mx-auto" />
    }

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
                {/* Header */}
                <div className="grid grid-cols-4 border-b border-border/50">
                    <div className="p-4 @md:p-6">
                        <span className="text-sm font-medium text-muted-foreground">Features</span>
                    </div>
                    {plans.map((plan, index) => (
                        <div key={plan} className={`p-4 @md:p-6 text-center ${index === 1 ? 'bg-primary/5' : ''}`}>
                            <span className="font-semibold">{plan}</span>
                        </div>
                    ))}
                </div>

                {/* Features */}
                {features.map((row, index) => (
                    <div 
                        key={row.feature}
                        className={`grid grid-cols-4 ${index < features.length - 1 ? 'border-b border-border/50' : ''}`}
                    >
                        <div className="p-4 @md:p-5 flex items-center">
                            <span className="text-sm">{row.feature}</span>
                        </div>
                        <div className="p-4 @md:p-5 flex items-center justify-center">
                            {renderValue(row.free)}
                        </div>
                        <div className="p-4 @md:p-5 flex items-center justify-center bg-primary/5">
                            {renderValue(row.pro)}
                        </div>
                        <div className="p-4 @md:p-5 flex items-center justify-center">
                            {renderValue(row.enterprise)}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
