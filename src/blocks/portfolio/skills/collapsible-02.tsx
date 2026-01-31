'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Braces, Globe, Server, Database } from 'lucide-react'
import { ComponentType, useState } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleBlock
                    eyebrow="Detailed Skills"
                    title="In-Depth Expertise"
                    description="Expand each category to see detailed breakdowns"
                />

                <CollapsibleSkills
                    categories={[
                        {
                            icon: Braces,
                            title: 'Languages',
                            overall: 90,
                            skills: [
                                { name: 'TypeScript', level: 95 },
                                { name: 'JavaScript', level: 95 },
                                { name: 'Python', level: 82 },
                                { name: 'Go', level: 70 },
                            ],
                        },
                        {
                            icon: Globe,
                            title: 'Frontend',
                            overall: 94,
                            skills: [
                                { name: 'React', level: 95 },
                                { name: 'Next.js', level: 92 },
                                { name: 'Tailwind CSS', level: 95 },
                                { name: 'Vue.js', level: 75 },
                            ],
                        },
                        {
                            icon: Server,
                            title: 'Backend',
                            overall: 86,
                            skills: [
                                { name: 'Node.js', level: 90 },
                                { name: 'Express', level: 88 },
                                { name: 'FastAPI', level: 78 },
                                { name: 'GraphQL', level: 85 },
                            ],
                        },
                        {
                            icon: Database,
                            title: 'Database',
                            overall: 84,
                            skills: [
                                { name: 'PostgreSQL', level: 88 },
                                { name: 'MongoDB', level: 82 },
                                { name: 'Redis', level: 80 },
                                { name: 'Prisma', level: 85 },
                            ],
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleBlockProps {
    eyebrow: string
    title: string
    description: string
}

const TitleBlock = ({ eyebrow, title, description }: TitleBlockProps) => (
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

interface Category {
    icon: ComponentType<{ className?: string }>
    title: string
    overall: number
    skills: Skill[]
}

const CollapsibleSkills = ({ categories }: { categories: Category[] }) => (
    <div className="max-w-2xl mx-auto space-y-4">
        {categories.map((category, i) => (
            <CollapsibleCard key={i} {...category} />
        ))}
    </div>
)

const CollapsibleCard = ({ icon: Icon, title, overall, skills }: Category) => {
    const [open, setOpen] = useState(false)

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <Card className={`transition-all ${open ? 'border-primary/50' : ''}`}>
                <CollapsibleTrigger asChild>
                    <CardContent className="p-5 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <Icon className="size-6 text-primary" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold mb-1">{title}</h4>
                                <div className="flex items-center gap-3">
                                    <Progress value={overall} className="h-2 flex-1" />
                                    <span className="text-sm font-bold text-primary">{overall}%</span>
                                </div>
                            </div>
                            <ChevronDown className={`size-5 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
                        </div>
                    </CardContent>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="px-5 pb-5 pt-2 space-y-3">
                        {skills.map(({ name, level }, i) => (
                            <div key={i} className="flex items-center gap-4 pl-16">
                                <span className="text-sm w-24">{name}</span>
                                <Progress value={level} className="h-1.5 flex-1" />
                                <span className="text-sm text-muted-foreground w-10 text-right">{level}%</span>
                            </div>
                        ))}
                    </div>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    )
}
