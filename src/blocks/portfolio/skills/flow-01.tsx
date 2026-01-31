import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Code2, Database, Globe, Layers, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    eyebrow="Skill Flow"
                    title="Connected Expertise"
                    subtitle="How my skills work together"
                />

                <FlowDiagram
                    nodes={[
                        { icon: Code2, title: 'Frontend', description: 'React, Next.js, TypeScript', position: 'start' },
                        { icon: Globe, title: 'API Layer', description: 'GraphQL, REST, tRPC', position: 'middle' },
                        { icon: Server, title: 'Backend', description: 'Node.js, Python, Go', position: 'middle' },
                        { icon: Database, title: 'Data', description: 'PostgreSQL, MongoDB, Redis', position: 'middle' },
                        { icon: Layers, title: 'Infrastructure', description: 'AWS, Docker, K8s', position: 'end' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleBlockProps {
    eyebrow: string
    title: string
    description: string
}

const TitleBlock = ({ eyebrow, title, description }: TitleBlockProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {description}
        </p>
    </div>
)

interface FlowNode {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    position: 'start' | 'middle' | 'end'
}

const FlowDiagram = ({ nodes }: { nodes: FlowNode[] }) => (
    <div className="max-w-5xl mx-auto">
        <div className="hidden @lg:flex items-center justify-between">
            {nodes.map((node, i) => (
                <div key={i} className="flex items-center">
                    <FlowCard {...node} />
                    {i < nodes.length - 1 && (
                        <ArrowRight className="size-6 text-primary mx-2 shrink-0" />
                    )}
                </div>
            ))}
        </div>

        <div className="@lg:hidden space-y-4">
            {nodes.map((node, i) => (
                <div key={i}>
                    <MobileFlowCard {...node} />
                    {i < nodes.length - 1 && (
                        <div className="flex justify-center my-2">
                            <ArrowRight className="size-5 text-primary rotate-90" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
)

const FlowCard = ({ icon: Icon, title, description }: FlowNode) => (
    <Card className="group hover:border-primary/50 transition-all w-40">
        <CardContent className="p-4 text-center">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5 text-primary" />
            </div>
            <h4 className="font-bold text-sm mb-1">{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

const MobileFlowCard = ({ icon: Icon, title, description }: FlowNode) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-4 flex items-center gap-4">
            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-6 text-primary" />
            </div>
            <div>
                <h4 className="font-bold">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </CardContent>
    </Card>
)
