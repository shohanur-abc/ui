import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Binary, Boxes, Cpu, Globe, Layers, Terminal } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @3xl:grid-cols-2 gap-12 @xl:gap-20">
                    <LeftPanel
                        badge="Core Skills"
                        title="Programming Languages"
                        description="Proficient in multiple programming paradigms and languages"
                        languages={[
                            { name: 'TypeScript', level: 95, years: 6 },
                            { name: 'JavaScript', level: 95, years: 8 },
                            { name: 'Python', level: 85, years: 5 },
                            { name: 'Go', level: 75, years: 3 },
                            { name: 'Rust', level: 60, years: 1 },
                        ]}
                    />

                    <RightPanel
                        categories={[
                            { icon: Globe, title: 'Web Technologies', skills: ['React', 'Next.js', 'Vue', 'Svelte', 'HTML/CSS'] },
                            { icon: Terminal, title: 'Backend Frameworks', skills: ['Node.js', 'Express', 'FastAPI', 'Django', 'Gin'] },
                            { icon: Layers, title: 'Databases', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Prisma'] },
                            { icon: Boxes, title: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
                            { icon: Cpu, title: 'Tools & Others', skills: ['Git', 'Linux', 'Vim', 'VS Code', 'Figma'] },
                            { icon: Binary, title: 'Concepts', skills: ['REST', 'GraphQL', 'Microservices', 'CI/CD', 'TDD'] },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface LanguageItem {
    name: string
    level: number
    years: number
}

interface LeftPanelProps {
    badge: string
    title: string
    description: string
    languages: LanguageItem[]
}

const LeftPanel = ({ badge, title, description, languages }: LeftPanelProps) => (
    <div>
        <Badge className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg mb-8">
            {description}
        </p>

        <div className="space-y-6">
            {languages.map((lang, i) => (
                <LanguageBar key={i} {...lang} />
            ))}
        </div>
    </div>
)

const LanguageBar = ({ name, level, years }: LanguageItem) => (
    <div>
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
                <span className="font-semibold">{name}</span>
                <Badge variant="outline" className="text-xs">{years} years</Badge>
            </div>
            <span className="text-sm text-muted-foreground">{level}%</span>
        </div>
        <Progress value={level} className="h-2.5" />
    </div>
)

interface CategoryItem {
    icon: ComponentType<{ className?: string }>
    title: string
    skills: string[]
}

const RightPanel = ({ categories }: { categories: CategoryItem[] }) => (
    <div className="grid @sm:grid-cols-2 gap-4 @md:gap-6">
        {categories.map((category, i) => (
            <CategoryCard key={i} {...category} />
        ))}
    </div>
)

const CategoryCard = ({ icon: Icon, title, skills }: CategoryItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-4">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-4 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{title}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)
