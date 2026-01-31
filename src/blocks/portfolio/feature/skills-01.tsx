import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @xl:gap-16 items-start">
                    <div>
                        <Eyebrow text="Skills" />
                        <Title text="Technical Proficiency" />
                        <Description text="A visual representation of my expertise across different technologies and domains." />
                    </div>

                    <SkillBars
                        items={[
                            { name: 'Frontend Development', percentage: 95, description: 'React, Next.js, TypeScript, CSS' },
                            { name: 'Backend Development', percentage: 88, description: 'Node.js, Python, APIs' },
                            { name: 'Database Management', percentage: 82, description: 'PostgreSQL, MongoDB, Redis' },
                            { name: 'DevOps & Cloud', percentage: 75, description: 'AWS, Docker, CI/CD' },
                            { name: 'UI/UX Design', percentage: 78, description: 'Figma, Design Systems' },
                            { name: 'Mobile Development', percentage: 70, description: 'React Native, Expo' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface SkillItem {
    name: string
    percentage: number
    description: string
}

const SkillBars = ({ items }: { items: SkillItem[] }) => (
    <div className="space-y-6 @md:space-y-8">
        {items.map(({ name, percentage, description }, i) => (
            <div key={i}>
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h3 className="font-semibold text-sm @md:text-base">{name}</h3>
                        <p className="text-xs @md:text-sm text-muted-foreground">{description}</p>
                    </div>
                    <span className="text-sm @md:text-base font-bold text-primary">{percentage}%</span>
                </div>
                <Progress value={percentage} className="h-2 @md:h-2.5" />
            </div>
        ))}
    </div>
)
