import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <HeroBlock
                    badge="Full Stack Developer"
                    title="Skills That Ship Products"
                    description="I bring a unique combination of technical expertise and product thinking to every project."
                />

                <SkillColumns
                    columns={[
                        {
                            title: 'Frontend',
                            skills: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'State Management', 'Testing', 'Performance'],
                        },
                        {
                            title: 'Backend',
                            skills: ['Node.js', 'Python', 'REST & GraphQL', 'Authentication', 'Microservices', 'WebSockets'],
                        },
                        {
                            title: 'Database',
                            skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Data Modeling', 'Query Optimization'],
                        },
                        {
                            title: 'DevOps',
                            skills: ['AWS', 'Docker', 'CI/CD', 'Monitoring', 'Serverless', 'Edge Computing'],
                        },
                    ]}
                />

                <CTABlock
                    text="Ready to build something amazing?"
                    button={{ label: 'Get in Touch', href: '#contact' }}
                />
            </div>
        </section>
    )
}

interface HeroBlockProps {
    badge: string
    title: string
    description: string
}

const HeroBlock = ({ badge, title, description }: HeroBlockProps) => (
    <div className="text-center mb-12 @md:mb-16 @xl:mb-20">
        <Badge variant="outline" className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg @xl:text-xl max-w-2xl mx-auto">
            {description}
        </p>
    </div>
)

interface Column {
    title: string
    skills: string[]
}

const SkillColumns = ({ columns }: { columns: Column[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-8 @md:gap-10 mb-12 @md:mb-16">
        {columns.map((column, i) => (
            <SkillColumn key={i} {...column} />
        ))}
    </div>
)

const SkillColumn = ({ title, skills }: Column) => (
    <div>
        <h3 className="text-lg font-bold mb-4 pb-2 border-b">{title}</h3>
        <ul className="space-y-3">
            {skills.map((skill, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-primary shrink-0" />
                    <span>{skill}</span>
                </li>
            ))}
        </ul>
    </div>
)

interface CTABlockProps {
    text: string
    button: { label: string; href: string }
}

const CTABlock = ({ text, button }: CTABlockProps) => (
    <div className="text-center">
        <p className="text-muted-foreground mb-4">{text}</p>
        <Button size="lg" asChild>
            <Link href={button.href}>
                {button.label}
                <ArrowRight className="size-4 ml-2" />
            </Link>
        </Button>
    </div>
)
