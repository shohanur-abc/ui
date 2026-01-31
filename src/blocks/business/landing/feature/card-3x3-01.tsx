import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, Globe, Layers, Lock, Rocket, Settings, Shield, Sparkles, Users, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Layers} text="Feature Overview" />
                    <Title text="A Complete Suite of" highlight="Business Tools" />
                    <Description text="Everything you need to run your business efficiently, all in one integrated platform." />
                </div>

                <Card3x3Grid items={[
                    { icon: Zap, title: 'Instant Actions', description: 'Trigger automations and updates in real-time with zero latency.' },
                    { icon: Shield, title: 'Advanced Security', description: 'Enterprise-grade protection with encryption and compliance.' },
                    { icon: Users, title: 'Team Management', description: 'Organize teams, roles, and permissions effortlessly.' },
                    { icon: Globe, title: 'Global Reach', description: 'Multi-region deployment for worldwide availability.' },
                    { icon: Sparkles, title: 'AI Features', description: 'Smart suggestions and automation powered by ML.' },
                    { icon: Settings, title: 'Customization', description: 'Tailor every aspect to match your workflow.' },
                    { icon: Rocket, title: 'Fast Deployment', description: 'Go from development to production in minutes.' },
                    { icon: Lock, title: 'Access Control', description: 'Fine-grained permissions at every level.' },
                    { icon: Briefcase, title: 'Enterprise Ready', description: 'Built for scale with dedicated support.' },
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

const Card3x3Grid = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid gap-4 @md:gap-5 @sm:grid-cols-2 @xl:grid-cols-3">
        {items.map((item) => (
            <Card key={item.title} className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-5 @md:p-6">
                    <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:scale-105">
                        <item.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
