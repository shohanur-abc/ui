import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Braces, Cloud, Cpu, Layers, Paintbrush, Terminal } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Technical Skills"
                    title="Crafting Digital Excellence"
                    subtitle="Mastery across the full stack of modern web development"
                />

                <SkillBento
                    primarySkill={{
                        icon: Braces,
                        category: 'Frontend',
                        title: 'Modern Web Development',
                        description: 'Expert in building performant, accessible web applications with cutting-edge technologies',
                        proficiencies: [
                            { name: 'React & Next.js', level: 95 },
                            { name: 'TypeScript', level: 90 },
                            { name: 'CSS/Tailwind', level: 92 },
                        ],
                    }}
                    secondarySkills={[
                        { icon: Terminal, title: 'Backend', level: 88, tools: 'Node.js, Python, Go' },
                        { icon: Cloud, title: 'Cloud & DevOps', level: 82, tools: 'AWS, Docker, K8s' },
                        { icon: Layers, title: 'Databases', level: 85, tools: 'PostgreSQL, MongoDB' },
                        { icon: Cpu, title: 'System Design', level: 80, tools: 'Microservices, APIs' },
                        { icon: Paintbrush, title: 'UI/UX', level: 78, tools: 'Figma, Design Systems' },
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
        <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface PrimarySkillProps {
    icon: ComponentType<{ className?: string }>
    category: string
    title: string
    description: string
    proficiencies: { name: string; level: number }[]
}

interface SecondarySkillProps {
    icon: ComponentType<{ className?: string }>
    title: string
    level: number
    tools: string
}

interface SkillBentoProps {
    primarySkill: PrimarySkillProps
    secondarySkills: SecondarySkillProps[]
}

const SkillBento = ({ primarySkill, secondarySkills }: SkillBentoProps) => (
    <div className="grid @lg:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        <PrimarySkillCard {...primarySkill} />
        <div className="@xl:col-span-2 grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
            {secondarySkills.map((skill, i) => (
                <SecondarySkillCard key={i} {...skill} />
            ))}
        </div>
    </div>
)

const PrimarySkillCard = ({ icon: Icon, category, title, description, proficiencies }: PrimarySkillProps) => (
    <Card className="@xl:row-span-2 group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-6 @md:p-8 h-full flex flex-col">
            <Badge variant="outline" className="w-fit mb-4">
                <Icon className="size-3 mr-1" />
                {category}
            </Badge>
            <h3 className="text-xl @md:text-2xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground text-sm mb-6 flex-grow">{description}</p>
            <div className="space-y-4">
                {proficiencies.map(({ name, level }, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5">
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

const SecondarySkillCard = ({ icon: Icon, title, level, tools }: SecondarySkillProps) => (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-md">
        <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" />
                </div>
                <div>
                    <h4 className="font-semibold">{title}</h4>
                    <p className="text-xs text-muted-foreground">{tools}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Progress value={level} className="h-1.5 flex-1" />
                <span className="text-xs font-medium text-muted-foreground">{level}%</span>
            </div>
        </CardContent>
    </Card>
)
