import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    eyebrow="Project Count"
                    title="Skills by Projects"
                    description="Number of projects completed with each technology"
                />

                <ProjectCountGrid
                    skills={[
                        { name: 'React', projects: 50, highlight: true },
                        { name: 'TypeScript', projects: 45, highlight: true },
                        { name: 'Next.js', projects: 30, highlight: false },
                        { name: 'Node.js', projects: 35, highlight: false },
                        { name: 'PostgreSQL', projects: 25, highlight: false },
                        { name: 'MongoDB', projects: 20, highlight: false },
                        { name: 'GraphQL', projects: 15, highlight: false },
                        { name: 'Docker', projects: 20, highlight: false },
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

interface Skill {
    name: string
    projects: number
    highlight: boolean
}

const ProjectCountGrid = ({ skills }: { skills: Skill[] }) => (
    <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {skills.map((skill, i) => (
            <CountCard key={i} {...skill} />
        ))}
    </div>
)

const CountCard = ({ name, projects, highlight }: Skill) => (
    <Card className={`group hover:border-primary/50 transition-all ${highlight ? 'border-primary/30 bg-primary/5' : ''}`}>
        <CardContent className="p-5 text-center">
            <span className="text-4xl @md:text-5xl font-bold text-primary">{projects}</span>
            <p className="text-lg font-semibold mt-2">{name}</p>
            <p className="text-sm text-muted-foreground">projects</p>
        </CardContent>
    </Card>
)
