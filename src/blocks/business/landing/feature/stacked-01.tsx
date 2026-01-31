import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Layers } from 'lucide-react'
import { ComponentType } from 'react'

interface StackItem {
    title: string
    description: string
    color: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-12 @md:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Layers} text="Platform Architecture" />
                    <Title text="Built on a Solid" highlight="Foundation" />
                    <Description text="Every layer of our platform is designed for performance, security, and scalability." />
                </div>

                <StackedLayers items={[
                    { title: 'Application Layer', description: 'React-based UI with server-side rendering and edge caching for instant page loads.', color: 'from-primary/20 to-primary/5' },
                    { title: 'API Gateway', description: 'GraphQL and REST endpoints with rate limiting, authentication, and request validation.', color: 'from-accent/20 to-accent/5' },
                    { title: 'Business Logic', description: 'Microservices architecture with event-driven communication and automatic scaling.', color: 'from-primary/15 to-primary/5' },
                    { title: 'Data Layer', description: 'Distributed database with multi-region replication and point-in-time recovery.', color: 'from-accent/15 to-accent/5' },
                    { title: 'Infrastructure', description: 'Kubernetes clusters across multiple availability zones with auto-healing and zero-downtime deployments.', color: 'from-primary/10 to-primary/5' },
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

const StackedLayers = ({ items }: { items: StackItem[] }) => (
    <div className="max-w-4xl mx-auto space-y-4">
        {items.map((item, index) => (
            <Card 
                key={item.title}
                className={`border-border/50 bg-gradient-to-r ${item.color} backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-lg`}
                style={{ 
                    marginLeft: `${index * 2}%`,
                    marginRight: `${index * 2}%`,
                }}
            >
                <CardContent className="p-5 @md:p-6">
                    <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-2">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Badge variant="outline" className="w-fit shrink-0">Layer {index + 1}</Badge>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
