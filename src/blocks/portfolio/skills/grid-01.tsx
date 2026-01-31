import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    eyebrow="Tech Links"
                    title="Skills & Resources"
                    description="Technologies I work with and recommend"
                />

                <LinkGrid
                    skills={[
                        { name: 'React', category: 'Frontend', url: '#' },
                        { name: 'Next.js', category: 'Framework', url: '#' },
                        { name: 'TypeScript', category: 'Language', url: '#' },
                        { name: 'Tailwind CSS', category: 'Styling', url: '#' },
                        { name: 'Node.js', category: 'Runtime', url: '#' },
                        { name: 'PostgreSQL', category: 'Database', url: '#' },
                        { name: 'Prisma', category: 'ORM', url: '#' },
                        { name: 'Docker', category: 'DevOps', url: '#' },
                        { name: 'AWS', category: 'Cloud', url: '#' },
                        { name: 'Vercel', category: 'Hosting', url: '#' },
                        { name: 'GitHub', category: 'VCS', url: '#' },
                        { name: 'Figma', category: 'Design', url: '#' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleSectionProps {
    eyebrow: string
    title: string
    description: string
}

const TitleSection = ({ eyebrow, title, description }: TitleSectionProps) => (
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
    category: string
    url: string
}

const LinkGrid = ({ skills }: { skills: Skill[] }) => (
    <div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {skills.map((skill, i) => (
            <LinkCard key={i} {...skill} />
        ))}
    </div>
)

const LinkCard = ({ name, category, url }: Skill) => (
    <Card className="group hover:border-primary/50 transition-all cursor-pointer">
        <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{name}</h4>
                <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <Badge variant="secondary" className="text-xs">{category}</Badge>
        </CardContent>
    </Card>
)
