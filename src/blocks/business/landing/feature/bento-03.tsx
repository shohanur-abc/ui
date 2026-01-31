import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Layers, Minus, Plus, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface BentoItem {
    title: string
    description: string
    gridClass: string
    gradient: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Layers} text="Feature Grid" />
                    <Title text="A Platform That" highlight="Adapts to You" />
                    <Description text="Flexible features that grow with your business needs." />
                </div>

                <AsymmetricBento items={[
                    { title: 'Powerful Analytics', description: 'Real-time insights with customizable dashboards and predictive models.', gridClass: '@xl:col-span-2', gradient: 'from-primary/10 to-transparent' },
                    { title: 'Smart Automation', description: 'AI-driven workflows that learn.', gridClass: '', gradient: 'from-accent/10 to-transparent' },
                    { title: 'Security First', description: 'Bank-grade encryption.', gridClass: '', gradient: 'from-primary/5 to-transparent' },
                    { title: 'Global Scale', description: 'Deploy across 200+ edge locations with automatic failover and load balancing for consistent worldwide performance.', gridClass: '@xl:col-span-2 @xl:row-span-2', gradient: 'from-accent/10 to-transparent' },
                    { title: 'Real-time Sync', description: 'Instant updates across devices.', gridClass: '', gradient: 'from-primary/10 to-transparent' },
                    { title: 'Team Tools', description: 'Collaboration built-in.', gridClass: '', gradient: 'from-accent/5 to-transparent' },
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

const AsymmetricBento = ({ items }: { items: BentoItem[] }) => (
    <div className="grid gap-4 @md:gap-5 @md:grid-cols-2 @xl:grid-cols-4">
        {items.map((item) => (
            <Card 
                key={item.title}
                className={`group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-lg ${item.gridClass}`}
            >
                <CardContent className={`p-5 @md:p-6 h-full bg-gradient-to-br ${item.gradient}`}>
                    <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
