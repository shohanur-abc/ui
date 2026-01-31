import { Badge } from '@/components/ui/badge'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <HeaderSection
                    eyebrow="Specializations"
                    title="Core Expertise"
                    description="Deep knowledge in these key areas"
                />

                <RadialSkills
                    skills={[
                        { name: 'React', level: 95 },
                        { name: 'TypeScript', level: 92 },
                        { name: 'Next.js', level: 90 },
                        { name: 'Node.js', level: 88 },
                        { name: 'PostgreSQL', level: 85 },
                        { name: 'AWS', level: 80 },
                        { name: 'Docker', level: 78 },
                        { name: 'Python', level: 75 },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderSectionProps {
    eyebrow: string
    title: string
    description: string
}

const HeaderSection = ({ eyebrow, title, description }: HeaderSectionProps) => (
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
    level: number
}

const RadialSkills = ({ skills }: { skills: Skill[] }) => (
    <div className="grid grid-cols-2 @sm:grid-cols-4 gap-6 @md:gap-8 max-w-4xl mx-auto">
        {skills.map((skill, i) => (
            <RadialSkillItem key={i} {...skill} />
        ))}
    </div>
)

const RadialSkillItem = ({ name, level }: Skill) => {
    const circumference = 2 * Math.PI * 45
    const strokeDashoffset = circumference - (level / 100) * circumference

    return (
        <div className="flex flex-col items-center group">
            <div className="relative size-28 @md:size-32">
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-muted"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        className="text-primary transition-all duration-500 group-hover:text-primary/80"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: strokeDashoffset,
                        }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl @md:text-3xl font-bold">{level}</span>
                </div>
            </div>
            <span className="mt-3 font-medium text-sm @md:text-base">{name}</span>
        </div>
    )
}
