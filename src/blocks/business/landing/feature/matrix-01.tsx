import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Check, Layers, X } from 'lucide-react'
import { ComponentType } from 'react'

interface TierFeature {
    name: string
    starter: boolean | string
    pro: boolean | string
    enterprise: boolean | string
}

interface TierHeader {
    name: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Layers} text="Feature Matrix" />
                    <Title text="Compare Plans" highlight="Side by Side" />
                    <Description text="Find the perfect plan for your team with our detailed feature comparison." />
                </div>

                <FeatureMatrix 
                    tiers={[
                        { name: 'Starter', description: 'For individuals' },
                        { name: 'Pro', description: 'For teams' },
                        { name: 'Enterprise', description: 'For organizations' },
                    ]}
                    features={[
                        { name: 'Users', starter: 'Up to 5', pro: 'Up to 50', enterprise: 'Unlimited' },
                        { name: 'Storage', starter: '10 GB', pro: '100 GB', enterprise: 'Unlimited' },
                        { name: 'API Requests', starter: '10K/mo', pro: '100K/mo', enterprise: 'Unlimited' },
                        { name: 'Integrations', starter: '5', pro: '50', enterprise: '500+' },
                        { name: 'Analytics', starter: 'Basic', pro: 'Advanced', enterprise: 'Custom' },
                        { name: 'SSO / SAML', starter: false, pro: true, enterprise: true },
                        { name: 'Audit Logs', starter: false, pro: true, enterprise: true },
                        { name: 'Custom Domains', starter: false, pro: true, enterprise: true },
                        { name: 'SLA', starter: false, pro: '99.9%', enterprise: '99.99%' },
                        { name: 'Dedicated Support', starter: false, pro: false, enterprise: true },
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

const FeatureMatrix = ({ tiers, features }: { tiers: TierHeader[]; features: TierFeature[] }) => (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
            {/* Header */}
            <div className="grid grid-cols-4 border-b border-border/50">
                <div className="p-4 @md:p-5 bg-muted/30">
                    <span className="text-sm font-medium text-muted-foreground">Features</span>
                </div>
                {tiers.map((tier, index) => (
                    <div key={tier.name} className={`p-4 @md:p-5 text-center ${index === 1 ? 'bg-primary/5' : ''}`}>
                        <p className="font-semibold">{tier.name}</p>
                        <p className="text-xs text-muted-foreground">{tier.description}</p>
                    </div>
                ))}
            </div>
            
            {/* Features */}
            {features.map((feature, index) => (
                <div 
                    key={feature.name} 
                    className={`grid grid-cols-4 ${index < features.length - 1 ? 'border-b border-border/50' : ''}`}
                >
                    <div className="p-4 @md:p-5 text-sm">{feature.name}</div>
                    <FeatureCell value={feature.starter} />
                    <FeatureCell value={feature.pro} highlighted />
                    <FeatureCell value={feature.enterprise} />
                </div>
            ))}
        </CardContent>
    </Card>
)

const FeatureCell = ({ value, highlighted }: { value: boolean | string; highlighted?: boolean }) => (
    <div className={`p-4 @md:p-5 flex justify-center items-center ${highlighted ? 'bg-primary/5' : ''}`}>
        {typeof value === 'boolean' ? (
            value ? (
                <Check className="size-5 text-primary" />
            ) : (
                <X className="size-5 text-muted-foreground/30" />
            )
        ) : (
            <span className="text-sm font-medium">{value}</span>
        )}
    </div>
)
