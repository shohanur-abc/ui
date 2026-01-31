'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Skill Matrix"
                    title="Categorized Expertise"
                    subtitle="Switch between different skill categories"
                />

                <CategoryTabs
                    categories={[
                        {
                            id: 'primary',
                            label: 'Primary',
                            description: 'Core technologies I use daily',
                            skills: [
                                { name: 'React', level: 95, description: 'Component architecture, hooks, patterns' },
                                { name: 'TypeScript', level: 95, description: 'Type-safe development, generics' },
                                { name: 'Next.js', level: 92, description: 'App Router, SSR, ISR, API routes' },
                                { name: 'Tailwind CSS', level: 95, description: 'Utility-first, responsive design' },
                            ],
                        },
                        {
                            id: 'secondary',
                            label: 'Secondary',
                            description: 'Technologies I use frequently',
                            skills: [
                                { name: 'Node.js', level: 88, description: 'Server-side JavaScript, Express' },
                                { name: 'PostgreSQL', level: 85, description: 'Relational databases, SQL' },
                                { name: 'GraphQL', level: 85, description: 'API design, schema-first' },
                                { name: 'Docker', level: 80, description: 'Containerization, compose' },
                            ],
                        },
                        {
                            id: 'exploring',
                            label: 'Exploring',
                            description: 'Technologies I am currently learning',
                            skills: [
                                { name: 'Rust', level: 45, description: 'Systems programming' },
                                { name: 'Go', level: 55, description: 'Backend services' },
                                { name: 'AI/ML', level: 50, description: 'LLM integration, embeddings' },
                                { name: 'WebAssembly', level: 40, description: 'High-performance web' },
                            ],
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface SectionHeaderProps {
    badge: string
    title: string
    subtitle: string
}

const SectionHeader = ({ badge, title, subtitle }: SectionHeaderProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface Skill {
    name: string
    level: number
    description: string
}

interface Category {
    id: string
    label: string
    description: string
    skills: Skill[]
}

const CategoryTabs = ({ categories }: { categories: Category[] }) => (
    <Tabs defaultValue={categories[0].id} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
            {categories.map(({ id, label }) => (
                <TabsTrigger key={id} value={id}>{label}</TabsTrigger>
            ))}
        </TabsList>

        {categories.map(({ id, description, skills }) => (
            <TabsContent key={id} value={id}>
                <p className="text-muted-foreground text-center mb-8">{description}</p>
                <div className="grid @md:grid-cols-2 gap-4">
                    {skills.map((skill, i) => (
                        <DetailedSkillCard key={i} {...skill} />
                    ))}
                </div>
            </TabsContent>
        ))}
    </Tabs>
)

const DetailedSkillCard = ({ name, level, description }: Skill) => (
    <Card className="group hover:border-primary/50 transition-all">
        <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{name}</h4>
                <Badge variant="secondary">{level}%</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <Progress value={level} className="h-2" />
        </CardContent>
    </Card>
)
