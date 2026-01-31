import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Code, Server, Cloud, Palette, Brain, Shield } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Code} text="Skills" />
                    <Title text="Technical Expertise" />
                    <Description text="Skills honed through years of hands-on experience." />
                </div>

                <div className="max-w-5xl mx-auto space-y-16">
                    <SkillZigzag
                        icon={Code}
                        title="Frontend Development"
                        description="Expert in building modern, performant, and accessible user interfaces."
                        skills={[
                            { name: 'React / Next.js', level: 95 },
                            { name: 'TypeScript', level: 92 },
                            { name: 'CSS / Tailwind', level: 90 },
                        ]}
                        align="left"
                    />
                    <SkillZigzag
                        icon={Server}
                        title="Backend Development"
                        description="Building robust APIs and services that scale."
                        skills={[
                            { name: 'Node.js', level: 88 },
                            { name: 'Python', level: 75 },
                            { name: 'PostgreSQL', level: 82 },
                        ]}
                        align="right"
                    />
                    <SkillZigzag
                        icon={Cloud}
                        title="Cloud & DevOps"
                        description="Deploying and managing infrastructure at scale."
                        skills={[
                            { name: 'AWS', level: 78 },
                            { name: 'Docker', level: 85 },
                            { name: 'Kubernetes', level: 75 },
                        ]}
                        align="left"
                    />
                    <SkillZigzag
                        icon={Palette}
                        title="Design & UX"
                        description="Creating beautiful and intuitive experiences."
                        skills={[
                            { name: 'Design Systems', level: 90 },
                            { name: 'Figma', level: 75 },
                            { name: 'Accessibility', level: 85 },
                        ]}
                        align="right"
                    />
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

interface Skill {
    name: string
    level: number
}

interface SkillZigzagProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    skills: Skill[]
    align: 'left' | 'right'
}

const SkillZigzag = ({ icon: Icon, title, description, skills, align }: SkillZigzagProps) => (
    <div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center ${align === 'right' ? '' : ''}`}>
        <div className={`${align === 'right' ? '@lg:order-2' : ''}`}>
            <div className="flex items-center gap-3 mb-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <p className="text-muted-foreground">{description}</p>
        </div>
        <div className={`p-6 bg-background rounded-xl border ${align === 'right' ? '@lg:order-1' : ''}`}>
            <div className="space-y-5">
                {skills.map(({ name, level }, i) => (
                    <div key={i}>
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="text-xs text-muted-foreground">{level}%</span>
                        </div>
                        <Progress value={level} className="h-2" />
                    </div>
                ))}
            </div>
        </div>
    </div>
)
