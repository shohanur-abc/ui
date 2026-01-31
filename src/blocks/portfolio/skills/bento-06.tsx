import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Brain, Cloud, Code2, Palette, Server, Wrench } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <PageHeader
                    badge="Skill Set"
                    heading="Technical Arsenal"
                    description="From concept to deployment, I bring a comprehensive toolkit"
                />

                <HexagonalBento
                    centerSkill={{
                        icon: Code2,
                        title: 'Core Development',
                        yearsExperience: 8,
                        expertise: 'Frontend Architecture, State Management, Performance Optimization',
                    }}
                    surroundingSkills={[
                        { icon: Server, title: 'Backend', description: 'Node.js, Python, APIs', color: 'from-blue-500/20 to-blue-500/5' },
                        { icon: Cloud, title: 'Cloud', description: 'AWS, GCP, Serverless', color: 'from-purple-500/20 to-purple-500/5' },
                        { icon: Palette, title: 'Design', description: 'UI/UX, Figma, Systems', color: 'from-pink-500/20 to-pink-500/5' },
                        { icon: Brain, title: 'AI/ML', description: 'LLMs, RAG, Embeddings', color: 'from-green-500/20 to-green-500/5' },
                        { icon: Wrench, title: 'DevOps', description: 'CI/CD, Docker, K8s', color: 'from-orange-500/20 to-orange-500/5' },
                    ]}
                />
            </div>
        </section>
    )
}

interface PageHeaderProps {
    badge: string
    heading: string
    description: string
}

const PageHeader = ({ badge, heading, description }: PageHeaderProps) => (
    <div className="text-center mb-12 @md:mb-16 @xl:mb-20">
        <Badge variant="outline" className="mb-4">
            {badge}
        </Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {heading}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
            {description}
        </p>
    </div>
)

interface CenterSkillProps {
    icon: ComponentType<{ className?: string }>
    title: string
    yearsExperience: number
    expertise: string
}

interface SurroundingSkillProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    color: string
}

interface HexagonalBentoProps {
    centerSkill: CenterSkillProps
    surroundingSkills: SurroundingSkillProps[]
}

const HexagonalBento = ({ centerSkill, surroundingSkills }: HexagonalBentoProps) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
        <div className="@sm:col-span-2 @lg:col-span-1 @lg:row-span-2">
            <CenterCard {...centerSkill} />
        </div>
        {surroundingSkills.map((skill, i) => (
            <SurroundingCard key={i} {...skill} />
        ))}
    </div>
)

const CenterCard = ({ icon: Icon, title, yearsExperience, expertise }: CenterSkillProps) => (
    <Card className="h-full group hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-primary/10 to-transparent">
        <CardContent className="p-6 @md:p-8 h-full flex flex-col justify-center">
            <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/30 transition-colors">
                <Icon className="size-8 text-primary" />
            </div>
            <h3 className="text-2xl @md:text-3xl font-bold mb-2">{title}</h3>
            <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold text-primary">{yearsExperience}</span>
                <span className="text-muted-foreground">years</span>
            </div>
            <p className="text-muted-foreground text-sm">{expertise}</p>
        </CardContent>
    </Card>
)

const SurroundingCard = ({ icon: Icon, title, description, color }: SurroundingSkillProps) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className={`p-5 h-full bg-gradient-to-br ${color}`}>
            <div className="size-11 rounded-xl bg-background/50 flex items-center justify-center mb-4 group-hover:bg-background/70 transition-colors">
                <Icon className="size-5 text-primary" />
            </div>
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)
