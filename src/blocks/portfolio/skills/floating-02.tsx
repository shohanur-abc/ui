import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Database, Globe, Layers, Palette, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Featured Skills"
                    title="Floating Tiles"
                    subtitle="Hover to see detailed proficiency levels"
                />

                <FloatingTiles
                    tiles={[
                        { icon: Code2, title: 'Frontend Development', description: 'React, Next.js, TypeScript, Tailwind CSS', level: 95, position: 'top-left' },
                        { icon: Server, title: 'Backend Development', description: 'Node.js, Python, GraphQL, REST APIs', level: 88, position: 'top-right' },
                        { icon: Database, title: 'Database Design', description: 'PostgreSQL, MongoDB, Redis, Prisma', level: 85, position: 'middle-left' },
                        { icon: Layers, title: 'Cloud & DevOps', description: 'AWS, Docker, Kubernetes, CI/CD', level: 82, position: 'middle-right' },
                        { icon: Palette, title: 'UI/UX Design', description: 'Figma, Design Systems, Prototyping', level: 78, position: 'bottom-left' },
                        { icon: Globe, title: 'Web Performance', description: 'Core Web Vitals, SEO, Accessibility', level: 85, position: 'bottom-right' },
                    ]}
                />
            </div>
        </section>
    )
}

interface SectionHeaderProps {
    badge: string
    title: string
    subtitle: string
}

const SectionHeader = ({ badge, title, subtitle }: SectionHeaderProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface Tile {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    level: number
    position: string
}

const FloatingTiles = ({ tiles }: { tiles: Tile[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {tiles.map((tile, i) => (
            <FloatCard key={i} {...tile} index={i} />
        ))}
    </div>
)

interface FloatCardProps extends Tile {
    index: number
}

const FloatCard = ({ icon: Icon, title, description, level, index }: FloatCardProps) => {
    const transforms = [
        'hover:-translate-y-3 hover:rotate-1',
        'hover:-translate-y-2 hover:-rotate-1',
        'hover:-translate-y-4',
        'hover:-translate-y-2 hover:rotate-2',
        'hover:-translate-y-3 hover:-rotate-1',
        'hover:-translate-y-4 hover:rotate-1',
    ]
    const transform = transforms[index % transforms.length]

    return (
        <Card className={`group transition-all duration-300 hover:shadow-xl hover:border-primary/50 ${transform}`}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-6 text-primary" />
                    </div>
                    <Badge className="opacity-0 group-hover:opacity-100 transition-opacity">{level}%</Badge>
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
}
