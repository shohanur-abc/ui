import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Code, Server, Cloud, Palette, Brain, Shield, Database, TestTube } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Code} text="Skills" />
                    <Title text="Technical Skills" />
                    <Description text="Technologies I've worked with extensively." />
                </div>

                <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    <SkillCard
                        icon={Code}
                        title="Frontend"
                        skills={[
                            { name: 'React', level: 95 },
                            { name: 'TypeScript', level: 92 },
                            { name: 'Next.js', level: 90 },
                            { name: 'Tailwind', level: 88 },
                        ]}
                    />
                    <SkillCard
                        icon={Server}
                        title="Backend"
                        skills={[
                            { name: 'Node.js', level: 88 },
                            { name: 'Python', level: 75 },
                            { name: 'GraphQL', level: 82 },
                            { name: 'REST APIs', level: 90 },
                        ]}
                    />
                    <SkillCard
                        icon={Database}
                        title="Databases"
                        skills={[
                            { name: 'PostgreSQL', level: 85 },
                            { name: 'MongoDB', level: 80 },
                            { name: 'Redis', level: 78 },
                            { name: 'Prisma', level: 85 },
                        ]}
                    />
                    <SkillCard
                        icon={Cloud}
                        title="Cloud"
                        skills={[
                            { name: 'AWS', level: 82 },
                            { name: 'Docker', level: 88 },
                            { name: 'Kubernetes', level: 75 },
                            { name: 'Terraform', level: 70 },
                        ]}
                    />
                    <SkillCard
                        icon={TestTube}
                        title="Testing"
                        skills={[
                            { name: 'Jest', level: 90 },
                            { name: 'Playwright', level: 85 },
                            { name: 'Cypress', level: 82 },
                            { name: 'Storybook', level: 88 },
                        ]}
                    />
                    <SkillCard
                        icon={Palette}
                        title="Design"
                        skills={[
                            { name: 'Figma', level: 75 },
                            { name: 'Design Systems', level: 92 },
                            { name: 'Accessibility', level: 88 },
                            { name: 'Animation', level: 78 },
                        ]}
                    />
                    <SkillCard
                        icon={Brain}
                        title="AI/ML"
                        skills={[
                            { name: 'TensorFlow', level: 65 },
                            { name: 'LLMs', level: 72 },
                            { name: 'OpenAI API', level: 80 },
                            { name: 'Vector DBs', level: 70 },
                        ]}
                    />
                    <SkillCard
                        icon={Shield}
                        title="Security"
                        skills={[
                            { name: 'OAuth 2.0', level: 85 },
                            { name: 'OWASP', level: 80 },
                            { name: 'Encryption', level: 78 },
                            { name: 'Security Audits', level: 75 },
                        ]}
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

interface SkillCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    skills: Skill[]
}

const SkillCard = ({ icon: Icon, title, skills }: SkillCardProps) => (
    <Card className="group hover:shadow-lg transition-all">
        <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" />
                </div>
                <h3 className="font-bold">{title}</h3>
            </div>
            <div className="space-y-3">
                {skills.map(({ name, level }, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                            <span>{name}</span>
                            <span className="text-muted-foreground">{level}%</span>
                        </div>
                        <Progress value={level} className="h-1.5" />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)
