import { Badge } from '@/components/ui/badge'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface FeatureItem {
    title: string
    features: string[]
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Sparkles} text="Minimal Design" />
                    <Title text="Simple Tools for" highlight="Complex Problems" />
                    <Description text="We believe in simplicity. Our platform does more with less, focusing on what truly matters." />
                </div>

                <MinimalList items={[
                    { title: 'Analytics & Insights', features: ['Real-time dashboards', 'Custom reports', 'Predictive analytics', 'Data export'] },
                    { title: 'Automation', features: ['Workflow builder', 'Scheduled tasks', 'API triggers', 'Error handling'] },
                    { title: 'Collaboration', features: ['Team workspaces', 'Real-time editing', 'Comments', 'Version history'] },
                    { title: 'Security', features: ['End-to-end encryption', 'SSO / SAML', 'Audit logs', 'Compliance'] },
                ]} />
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

const MinimalList = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid gap-8 @md:gap-10 @lg:grid-cols-2 max-w-4xl mx-auto">
        {items.map((item) => (
            <div key={item.title} className="border-l-2 border-primary/30 pl-6 transition-all hover:border-primary">
                <h3 className="mb-4 text-lg @md:text-xl font-semibold">{item.title}</h3>
                <ul className="space-y-2">
                    {item.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="size-4 text-primary shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>
)
