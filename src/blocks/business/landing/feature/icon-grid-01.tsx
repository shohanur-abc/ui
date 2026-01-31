import { Badge } from '@/components/ui/badge'
import { Activity, BarChart, Cpu, Database, Globe, Lock, Rocket, Server, Shield, Sparkles, Users, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface IconItem {
    icon: ComponentType<{ className?: string }>
    label: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Sparkles} text="Comprehensive Platform" />
                    <Title text="Everything You Need," highlight="Nothing You Don't" />
                    <Description text="A complete suite of tools carefully selected to help you build, grow, and scale your business." />
                </div>

                <IconGrid items={[
                    { icon: Zap, label: 'Fast Performance' },
                    { icon: Shield, label: 'Secure by Default' },
                    { icon: Users, label: 'Team Collaboration' },
                    { icon: Globe, label: 'Global CDN' },
                    { icon: Database, label: 'Managed Database' },
                    { icon: BarChart, label: 'Analytics' },
                    { icon: Cpu, label: 'Edge Computing' },
                    { icon: Lock, label: 'SSO & Auth' },
                    { icon: Activity, label: 'Monitoring' },
                    { icon: Rocket, label: 'Quick Deploy' },
                    { icon: Server, label: 'Auto Scaling' },
                    { icon: Sparkles, label: 'AI Features' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
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

const IconGrid = ({ items }: { items: IconItem[] }) => (
    <div className="grid grid-cols-3 @sm:grid-cols-4 @lg:grid-cols-6 gap-4 @md:gap-6">
        {items.map((item) => (
            <div 
                key={item.label} 
                className="group flex flex-col items-center gap-3 p-4 @md:p-6 rounded-xl border border-border/50 bg-card/50 transition-all hover:border-primary/30 hover:shadow-md"
            >
                <div className="flex size-12 @md:size-14 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15 group-hover:scale-105">
                    <item.icon className="size-6 @md:size-7 text-primary" />
                </div>
                <span className="text-xs @md:text-sm font-medium text-center">{item.label}</span>
            </div>
        ))}
    </div>
)
