import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowUpRight, Braces, Cloud, Database, Globe, Layers, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    eyebrow="Skills Gallery"
                    title="Interactive Showcase"
                    description="Explore each skill area in detail"
                />

                <ShowcaseCards
                    items={[
                        { icon: Braces, title: 'TypeScript', description: 'Type-safe JavaScript development', level: 95, highlight: true },
                        { icon: Globe, title: 'React', description: 'Component-based UI development', level: 95, highlight: true },
                        { icon: Layers, title: 'Next.js', description: 'Full-stack React framework', level: 92, highlight: false },
                        { icon: Server, title: 'Node.js', description: 'Server-side JavaScript runtime', level: 88, highlight: false },
                        { icon: Database, title: 'PostgreSQL', description: 'Relational database systems', level: 85, highlight: false },
                        { icon: Cloud, title: 'AWS', description: 'Cloud infrastructure', level: 82, highlight: false },
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

interface SkillItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    level: number
    highlight: boolean
}

const ShowcaseCards = ({ items }: { items: SkillItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items.map((item, i) => (
            <InteractiveCard key={i} {...item} />
        ))}
    </div>
)

const InteractiveCard = ({ icon: Icon, title, description, level, highlight }: SkillItem) => (
    <Card className={`group hover:border-primary/50 transition-all cursor-pointer hover:-translate-y-1 hover:shadow-lg ${highlight ? 'border-primary/30 bg-primary/5' : ''}`}>
        <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div className={`size-12 rounded-xl flex items-center justify-center ${highlight ? 'bg-primary/20' : 'bg-muted'} group-hover:bg-primary/20 transition-colors`}>
                    <Icon className="size-6 text-primary" />
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <div className="flex items-center gap-3">
                <Progress value={level} className="h-2 flex-1" />
                <span className="text-sm font-bold text-primary">{level}%</span>
            </div>
        </CardContent>
    </Card>
)
