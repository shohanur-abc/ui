import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Database, Layers, Server, Smartphone, Wrench } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <HeaderBlock
                    eyebrow="Technical Skills"
                    title="My Tech Toolkit"
                    subtitle="Technologies I use to build amazing products"
                />

                <Grid3x2
                    items={[
                        { icon: Code2, title: 'Frontend', technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'] },
                        { icon: Server, title: 'Backend', technologies: ['Node.js', 'Python', 'Go', 'GraphQL', 'REST'] },
                        { icon: Database, title: 'Database', technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
                        { icon: Layers, title: 'Cloud', technologies: ['AWS', 'Vercel', 'Docker', 'Kubernetes'] },
                        { icon: Smartphone, title: 'Mobile', technologies: ['React Native', 'Expo', 'Flutter'] },
                        { icon: Wrench, title: 'Tools', technologies: ['Git', 'Figma', 'Linear', 'VS Code'] },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderBlockProps {
    eyebrow: string
    title: string
    subtitle: string
}

const HeaderBlock = ({ eyebrow, title, subtitle }: HeaderBlockProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface GridItem {
    icon: ComponentType<{ className?: string }>
    title: string
    technologies: string[]
}

const Grid3x2 = ({ items }: { items: GridItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
        {items.map((item, i) => (
            <TechCard key={i} {...item} />
        ))}
    </div>
)

const TechCard = ({ icon: Icon, title, technologies }: GridItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
        <CardContent className="p-5 @md:p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-105 transition-all">
                    <Icon className="size-5 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-bold">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
                {technologies.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)
