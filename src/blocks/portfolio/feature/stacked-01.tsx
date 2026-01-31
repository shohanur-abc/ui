import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Database, Globe, Palette, Server, Smartphone } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Capabilities" />
                    <Title text="Full-Stack Solutions" />
                    <Description text="End-to-end development capabilities for all your digital needs." />
                </div>

                <StackedCards
                    items={[
                        { icon: Globe, title: 'Web Applications', description: 'Custom web apps built with modern frameworks and best practices.', color: 'bg-blue-500' },
                        { icon: Smartphone, title: 'Mobile Development', description: 'Cross-platform apps for iOS and Android with native performance.', color: 'bg-purple-500' },
                        { icon: Palette, title: 'UI/UX Design', description: 'User-centered design that converts and delights.', color: 'bg-pink-500' },
                        { icon: Server, title: 'Backend Systems', description: 'Scalable APIs and microservices architecture.', color: 'bg-orange-500' },
                        { icon: Database, title: 'Database Design', description: 'Optimized data models and query performance.', color: 'bg-green-500' },
                        { icon: Code2, title: 'DevOps', description: 'CI/CD pipelines and cloud infrastructure.', color: 'bg-cyan-500' },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface StackedItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
}

const StackedCards = ({ items }: { items: StackedItem[] }) => (
    <div className="space-y-3 @md:space-y-4 max-w-3xl mx-auto">
        {items.map(({ icon: Icon, title, description, color }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-all hover:-translate-y-0.5">
                <CardContent className="p-4 @md:p-5 flex items-center gap-4 @md:gap-5">
                    <div className={`size-12 @md:size-14 rounded-xl ${color} flex items-center justify-center shrink-0 text-white shadow-lg`}>
                        <Icon className="size-6 @md:size-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base @md:text-lg mb-0.5">{title}</h3>
                        <p className="text-sm text-muted-foreground truncate @md:whitespace-normal">{description}</p>
                    </div>
                    <div className="size-8 rounded-full border flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-bold">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
