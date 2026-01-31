import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Braces, Cloud, Database, Globe, Layers, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    eyebrow="Interactive"
                    title="Hover Cards"
                    description="Explore skills with interactive cards"
                />

                <InteractiveGrid
                    skills={[
                        { icon: Braces, title: 'TypeScript', description: 'Type-safe JavaScript with advanced patterns', level: 95 },
                        { icon: Globe, title: 'React', description: 'Component-based UI development', level: 95 },
                        { icon: Layers, title: 'Next.js', description: 'Full-stack React framework', level: 92 },
                        { icon: Server, title: 'Node.js', description: 'Server-side JavaScript', level: 88 },
                        { icon: Database, title: 'PostgreSQL', description: 'Relational database design', level: 85 },
                        { icon: Cloud, title: 'AWS', description: 'Cloud infrastructure', level: 82 },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleSectionProps {
    eyebrow: string
    title: string
    description: string
}

const TitleSection = ({ eyebrow, title, description }: TitleSectionProps) => (
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

interface Skill {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    level: number
}

const InteractiveGrid = ({ skills }: { skills: Skill[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {skills.map((skill, i) => (
            <HoverCard key={i} {...skill} />
        ))}
    </div>
)

const HoverCard = ({ icon: Icon, title, description, level }: Skill) => (
    <Card className="group relative overflow-hidden hover:border-primary/50 transition-all cursor-pointer">
        <CardContent className="p-6 relative z-10">
            <div className="flex items-start justify-between mb-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-6 text-primary" />
                </div>
                <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4 group-hover:text-muted-foreground/80 transition-colors">{description}</p>
            <Badge>{level}%</Badge>
        </CardContent>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
)
