import { Badge } from '@/components/ui/badge'
import { Code, Server, Cloud, Palette, Brain, Shield } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Code} text="Skills" />
                    <Title text="Technical Expertise" />
                    <Description text="Technologies and tools I've mastered throughout my career." />
                </div>

                <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6 @md:gap-8 max-w-5xl mx-auto">
                    <SkillBlock
                        icon={Code}
                        title="Frontend"
                        skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL']}
                    />
                    <SkillBlock
                        icon={Server}
                        title="Backend"
                        skills={['Node.js', 'Python', 'PostgreSQL', 'Redis', 'REST APIs']}
                    />
                    <SkillBlock
                        icon={Cloud}
                        title="Cloud"
                        skills={['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform']}
                    />
                    <SkillBlock
                        icon={Palette}
                        title="Design"
                        skills={['Figma', 'Design Systems', 'Accessibility', 'UI/UX']}
                    />
                    <SkillBlock
                        icon={Brain}
                        title="AI/ML"
                        skills={['TensorFlow', 'PyTorch', 'LLMs', 'Vector DBs']}
                    />
                    <SkillBlock
                        icon={Shield}
                        title="Security"
                        skills={['OAuth', 'OWASP', 'Encryption', 'Security Audits']}
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

interface SkillBlockProps {
    icon: ComponentType<{ className?: string }>
    title: string
    skills: string[]
}

const SkillBlock = ({ icon: Icon, title, skills }: SkillBlockProps) => (
    <div className="text-center group">
        <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
            <Icon className="size-7 text-primary" />
        </div>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill, i) => (
                <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
            ))}
        </div>
    </div>
)
