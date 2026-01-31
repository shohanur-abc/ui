import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Code, Server, Cloud, Database, TestTube } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16 items-start">
                    <div className="@xl:sticky @xl:top-8">
                        <Eyebrow icon={Code} text="Tech Stack" />
                        <Title text="Technical Expertise" />
                        <Description text="Technologies I've mastered through years of hands-on experience building production systems." />

                        <div className="grid grid-cols-3 gap-4 mt-8 @md:mt-12">
                            <StatBlock value="10+" label="Years" />
                            <StatBlock value="25+" label="Technologies" />
                            <StatBlock value="5" label="Platforms" />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <SkillCategory
                            icon={Code}
                            title="Frontend"
                            skills={[
                                { name: 'React / Next.js', level: 95 },
                                { name: 'TypeScript', level: 92 },
                                { name: 'CSS / Tailwind', level: 90 },
                            ]}
                        />
                        <SkillCategory
                            icon={Server}
                            title="Backend"
                            skills={[
                                { name: 'Node.js', level: 88 },
                                { name: 'Python', level: 75 },
                                { name: 'Go', level: 65 },
                            ]}
                        />
                        <SkillCategory
                            icon={Database}
                            title="Databases"
                            skills={[
                                { name: 'PostgreSQL', level: 85 },
                                { name: 'MongoDB', level: 80 },
                                { name: 'Redis', level: 78 },
                            ]}
                        />
                        <SkillCategory
                            icon={Cloud}
                            title="Cloud & DevOps"
                            skills={[
                                { name: 'AWS', level: 82 },
                                { name: 'Docker', level: 88 },
                                { name: 'Kubernetes', level: 75 },
                            ]}
                        />
                        <SkillCategory
                            icon={TestTube}
                            title="Testing"
                            skills={[
                                { name: 'Jest', level: 90 },
                                { name: 'Playwright', level: 85 },
                                { name: 'Cypress', level: 82 },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const StatBlock = ({ value, label }: { value: string; label: string }) => (
    <div className="text-center p-4 bg-background rounded-lg border">
        <p className="text-2xl @md:text-3xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
    </div>
)

interface Skill {
    name: string
    level: number
}

interface SkillCategoryProps {
    icon: ComponentType<{ className?: string }>
    title: string
    skills: Skill[]
}

const SkillCategory = ({ icon: Icon, title, skills }: SkillCategoryProps) => (
    <div className="p-6 bg-background rounded-xl border">
        <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="size-5 text-primary" />
            </div>
            <h3 className="font-bold">{title}</h3>
        </div>
        <div className="space-y-4">
            {skills.map(({ name, level }, i) => (
                <div key={i}>
                    <div className="flex justify-between mb-1.5">
                        <span className="text-sm">{name}</span>
                        <span className="text-xs text-muted-foreground">{level}%</span>
                    </div>
                    <Progress value={level} className="h-2" />
                </div>
            ))}
        </div>
    </div>
)
