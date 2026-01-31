import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SplitContent
                    left={{
                        badge: 'Expertise',
                        title: 'Technical Skills',
                        description: 'Years of experience building modern web applications with cutting-edge technologies.',
                        stats: [
                            { value: '8+', label: 'Years Experience' },
                            { value: '50+', label: 'Projects Completed' },
                            { value: '15+', label: 'Technologies Mastered' },
                        ],
                        cta: 'View Projects',
                    }}
                    right={{
                        categories: [
                            { title: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
                            { title: 'Backend', skills: ['Node.js', 'Python', 'GraphQL', 'REST'] },
                            { title: 'Database', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'] },
                            { title: 'DevOps', skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes'] },
                        ],
                    }}
                />
            </div>
        </section>
    )
}

interface Stat {
    value: string
    label: string
}

interface LeftContent {
    badge: string
    title: string
    description: string
    stats: Stat[]
    cta: string
}

interface Category {
    title: string
    skills: string[]
}

interface RightContent {
    categories: Category[]
}

interface SplitContentProps {
    left: LeftContent
    right: RightContent
}

const SplitContent = ({ left, right }: SplitContentProps) => (
    <div className="grid @lg:grid-cols-2 gap-10 @xl:gap-16 items-center">
        <div>
            <Badge className="mb-4">
                <Sparkles className="size-3 mr-1" />
                {left.badge}
            </Badge>
            <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
                {left.title}
            </h2>
            <p className="text-muted-foreground text-base @md:text-lg mb-8">
                {left.description}
            </p>
            <div className="flex flex-wrap gap-8 mb-8">
                {left.stats.map(({ value, label }, i) => (
                    <div key={i}>
                        <div className="text-3xl font-bold text-primary">{value}</div>
                        <div className="text-sm text-muted-foreground">{label}</div>
                    </div>
                ))}
            </div>
            <Button className="gap-2">
                {left.cta}
                <ArrowRight className="size-4" />
            </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {right.categories.map((category, i) => (
                <CategoryCard key={i} {...category} />
            ))}
        </div>
    </div>
)

const CategoryCard = ({ title, skills }: Category) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-4 @md:p-5">
            <h4 className="font-bold mb-3">{title}</h4>
            <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)
