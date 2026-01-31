import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Database, Globe, Layers, Palette, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <IntroSection
                    eyebrow="What I Do"
                    heading="Areas of Expertise"
                    subheading="Specialized skills developed through years of building real-world applications"
                />

                <HexagonGrid
                    skills={[
                        { icon: Code2, title: 'Frontend', description: 'React, Next.js, TypeScript', level: 95 },
                        { icon: Server, title: 'Backend', description: 'Node.js, Python, Go', level: 88 },
                        { icon: Database, title: 'Database', description: 'PostgreSQL, MongoDB', level: 85 },
                        { icon: Globe, title: 'APIs', description: 'REST, GraphQL, tRPC', level: 90 },
                        { icon: Layers, title: 'DevOps', description: 'AWS, Docker, K8s', level: 80 },
                        { icon: Palette, title: 'Design', description: 'Figma, UI/UX', level: 75 },
                    ]}
                />
            </div>
        </section>
    )
}

interface IntroSectionProps {
    eyebrow: string
    heading: string
    subheading: string
}

const IntroSection = ({ eyebrow, heading, subheading }: IntroSectionProps) => (
    <div className="text-center mb-12 @md:mb-16 @xl:mb-20">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
            {heading}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg @xl:text-xl max-w-3xl mx-auto">
            {subheading}
        </p>
    </div>
)

interface SkillItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    level: number
}

const HexagonGrid = ({ skills }: { skills: SkillItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6 max-w-5xl mx-auto">
        {skills.map((skill, i) => (
            <SkillHexCard key={i} {...skill} />
        ))}
    </div>
)

const SkillHexCard = ({ icon: Icon, title, description, level }: SkillItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardContent className="p-6 @md:p-8 text-center">
            <div className="relative inline-block mb-4">
                <div className="size-16 @md:size-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-8 @md:size-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 size-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {level}
                </div>
            </div>
            <h3 className="text-lg @md:text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)
