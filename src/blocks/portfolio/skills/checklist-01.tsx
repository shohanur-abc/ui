import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    eyebrow="Competencies"
                    title="Skill Checklist"
                    description="Verified technical competencies"
                />

                <ChecklistGrid
                    categories={[
                        {
                            title: 'Frontend',
                            items: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'State Management', 'Testing', 'Performance'],
                        },
                        {
                            title: 'Backend',
                            items: ['Node.js', 'Python', 'REST APIs', 'GraphQL', 'Authentication', 'Caching'],
                        },
                        {
                            title: 'Database',
                            items: ['PostgreSQL', 'MongoDB', 'Redis', 'Data Modeling', 'Query Optimization', 'Migrations'],
                        },
                        {
                            title: 'DevOps',
                            items: ['Docker', 'CI/CD', 'AWS', 'Monitoring', 'Logging', 'Security'],
                        },
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

interface Category {
    title: string
    items: string[]
}

const ChecklistGrid = ({ categories }: { categories: Category[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((category, i) => (
            <ChecklistCard key={i} {...category} />
        ))}
    </div>
)

const ChecklistCard = ({ title, items }: Category) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-5 @md:p-6">
            <h4 className="font-bold text-lg mb-5">{title}</h4>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="size-4 text-green-500 shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
)
