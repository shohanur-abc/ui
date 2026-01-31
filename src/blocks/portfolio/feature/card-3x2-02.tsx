import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Cpu, GitBranch, Globe2, Layers, Palette, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Approach" />
                    <Title text="How I Build Products" />
                    <Description text="A methodical approach ensuring quality, performance, and maintainability." />
                </div>

                <NumberedGrid
                    items={[
                        { icon: Palette, title: 'Design First', description: 'Starting with user-centered design ensures the final product meets real needs.' },
                        { icon: Layers, title: 'Component Architecture', description: 'Building reusable components for consistency and faster development.' },
                        { icon: Cpu, title: 'Performance Focus', description: 'Optimizing every aspect for speed and smooth user experience.' },
                        { icon: Globe2, title: 'Accessibility', description: 'Making sure everyone can use the product regardless of ability.' },
                        { icon: GitBranch, title: 'Version Control', description: 'Maintaining clean git history for easy collaboration and rollbacks.' },
                        { icon: Zap, title: 'Continuous Delivery', description: 'Automated pipelines for fast, reliable deployments.' },
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

interface GridItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const NumberedGrid = ({ items }: { items: GridItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8">
        {items.map(({ icon: Icon, title, description }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-all relative overflow-hidden">
                <CardContent className="p-6 @md:p-8">
                    <div className="absolute top-4 right-4 text-5xl @md:text-6xl font-bold text-muted-foreground/10 group-hover:text-primary/10 transition-colors">
                        {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all relative z-10">
                        <Icon className="size-6 @md:size-7" />
                    </div>

                    <h3 className="font-bold text-lg @md:text-xl mb-2 relative z-10">{title}</h3>
                    <p className="text-sm @md:text-base text-muted-foreground leading-relaxed relative z-10">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
