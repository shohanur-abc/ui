import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart, Cloud, Globe, Layers, Lock, Server, Shield, Sparkles, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface TechItem {
    icon: ComponentType<{ className?: string }>
    name: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Layers} text="Tech Stack" />
                    <Title text="Built on" highlight="Modern Technology" />
                    <Description text="Our platform leverages cutting-edge technology to deliver unmatched performance, security, and reliability." />
                </div>

                <TechStackGrid items={[
                    { icon: Cloud, name: 'Cloud Native', description: 'Built from the ground up for the cloud with Kubernetes orchestration.' },
                    { icon: Globe, name: 'Edge Computing', description: 'Deploy at the edge for ultra-low latency worldwide.' },
                    { icon: Lock, name: 'Zero Trust', description: 'Security architecture that never trusts, always verifies.' },
                    { icon: Server, name: 'Microservices', description: 'Modular architecture for scalability and maintainability.' },
                    { icon: Zap, name: 'Real-time', description: 'WebSocket connections for instant updates and collaboration.' },
                    { icon: BarChart, name: 'Analytics', description: 'Advanced data pipeline for actionable insights.' },
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

const TechStackGrid = ({ items }: { items: TechItem[] }) => (
    <div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-3 max-w-5xl mx-auto">
        {items.map((tech) => (
            <Card key={tech.name} className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
                <CardContent className="p-5 @md:p-6 flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15">
                        <tech.icon className="size-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
