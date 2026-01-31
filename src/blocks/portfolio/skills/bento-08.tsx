import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Activity, Code, Database, Layout, Layers, Settings } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <HeaderBlock
                    tag="Proficiencies"
                    title="Skill Breakdown"
                    description="A detailed look at my technical capabilities"
                />

                <GradientBento
                    primaryCard={{
                        icon: Code,
                        title: 'Frontend Mastery',
                        subtitle: 'React Ecosystem Expert',
                        skills: [
                            { name: 'React/Next.js', level: 95 },
                            { name: 'TypeScript', level: 92 },
                            { name: 'State Management', level: 90 },
                            { name: 'Testing', level: 88 },
                        ],
                        gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
                    }}
                    secondaryCards={[
                        {
                            icon: Database,
                            title: 'Backend & Data',
                            level: 85,
                            tools: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
                            gradient: 'from-green-500/20 via-green-500/10 to-transparent',
                        },
                        {
                            icon: Layout,
                            title: 'UI/UX Design',
                            level: 80,
                            tools: ['Figma', 'Design Systems', 'Prototyping'],
                            gradient: 'from-purple-500/20 via-purple-500/10 to-transparent',
                        },
                    ]}
                    tertiaryCards={[
                        { icon: Layers, title: 'Architecture', value: '50+', label: 'Systems Designed' },
                        { icon: Activity, title: 'Performance', value: '2x', label: 'Average Improvement' },
                        { icon: Settings, title: 'DevOps', value: '100+', label: 'Deployments' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderBlockProps {
    tag: string
    title: string
    description: string
}

const HeaderBlock = ({ tag, title, description }: HeaderBlockProps) => (
    <div className="mb-12 @md:mb-16">
        <Badge variant="secondary" className="mb-4">{tag}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl">
            {description}
        </p>
    </div>
)

interface PrimaryCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    subtitle: string
    skills: { name: string; level: number }[]
    gradient: string
}

interface SecondaryCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    level: number
    tools: string[]
    gradient: string
}

interface TertiaryCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    value: string
    label: string
}

interface GradientBentoProps {
    primaryCard: PrimaryCardProps
    secondaryCards: SecondaryCardProps[]
    tertiaryCards: TertiaryCardProps[]
}

const GradientBento = ({ primaryCard, secondaryCards, tertiaryCards }: GradientBentoProps) => (
    <div className="grid @lg:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        <PrimarySkillCard {...primaryCard} />
        <div className="space-y-4 @md:space-y-6">
            {secondaryCards.map((card, i) => (
                <SecondarySkillCard key={i} {...card} />
            ))}
        </div>
        <div className="@lg:col-span-2 @xl:col-span-1 grid grid-cols-3 @xl:grid-cols-1 gap-4 @md:gap-6">
            {tertiaryCards.map((card, i) => (
                <TertiarySkillCard key={i} {...card} />
            ))}
        </div>
    </div>
)

const PrimarySkillCard = ({ icon: Icon, title, subtitle, skills, gradient }: PrimaryCardProps) => (
    <Card className={`@xl:row-span-2 group hover:border-primary/50 transition-all duration-300 bg-gradient-to-br ${gradient}`}>
        <CardContent className="p-6 @md:p-8 h-full flex flex-col">
            <div className="size-14 rounded-2xl bg-background/50 flex items-center justify-center mb-6">
                <Icon className="size-7 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">{title}</h3>
            <p className="text-muted-foreground text-sm mb-8">{subtitle}</p>
            <div className="space-y-5 mt-auto">
                {skills.map(({ name, level }, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{name}</span>
                            <span className="text-muted-foreground">{level}%</span>
                        </div>
                        <Progress value={level} className="h-2" />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

const SecondarySkillCard = ({ icon: Icon, title, level, tools, gradient }: SecondaryCardProps) => (
    <Card className={`group hover:border-primary/50 transition-all duration-300 bg-gradient-to-r ${gradient}`}>
        <CardContent className="p-5 @md:p-6">
            <div className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-background/50 flex items-center justify-center shrink-0">
                    <Icon className="size-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{title}</h4>
                        <span className="text-sm font-medium text-primary">{level}%</span>
                    </div>
                    <Progress value={level} className="h-1.5 mb-2" />
                    <div className="flex flex-wrap gap-1.5">
                        {tools.map((tool, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-background/50">
                                {tool}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
)

const TertiarySkillCard = ({ icon: Icon, title, value, label }: TertiaryCardProps) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-4 @md:p-5 text-center @xl:text-left @xl:flex @xl:items-center @xl:gap-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto @xl:mx-0 mb-2 @xl:mb-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5 text-primary" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground">{title}</p>
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
        </CardContent>
    </Card>
)
