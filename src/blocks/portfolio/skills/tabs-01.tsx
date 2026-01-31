'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Code2, Database, Palette, Server } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionHeader
                    badge="Technical Skills"
                    title="Expertise by Domain"
                    subtitle="Explore my skills across different areas"
                />

                <TabbedSkills
                    tabs={[
                        {
                            id: 'frontend',
                            label: 'Frontend',
                            icon: Code2,
                            content: {
                                title: 'Frontend Development',
                                description: 'Building modern, responsive, and accessible web interfaces',
                                skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Query', 'Zustand'],
                            },
                        },
                        {
                            id: 'backend',
                            label: 'Backend',
                            icon: Server,
                            content: {
                                title: 'Backend Development',
                                description: 'Creating scalable and secure server-side applications',
                                skills: ['Node.js', 'Python', 'Go', 'GraphQL', 'REST APIs', 'WebSockets', 'Authentication'],
                            },
                        },
                        {
                            id: 'database',
                            label: 'Database',
                            icon: Database,
                            content: {
                                title: 'Data & Storage',
                                description: 'Designing efficient data models and storage solutions',
                                skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Prisma', 'Data Modeling'],
                            },
                        },
                        {
                            id: 'design',
                            label: 'Design',
                            icon: Palette,
                            content: {
                                title: 'UI/UX Design',
                                description: 'Creating beautiful and user-friendly interfaces',
                                skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research', 'Accessibility'],
                            },
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

interface TabContent {
    title: string
    description: string
    skills: string[]
}

interface TabItem {
    id: string
    label: string
    icon: ComponentType<{ className?: string }>
    content: TabContent
}

const TabbedSkills = ({ tabs }: { tabs: TabItem[] }) => (
    <Tabs defaultValue={tabs[0].id} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 mb-8">
            {tabs.map(({ id, label, icon: Icon }) => (
                <TabsTrigger key={id} value={id} className="gap-2">
                    <Icon className="size-4 hidden @sm:block" />
                    {label}
                </TabsTrigger>
            ))}
        </TabsList>

        {tabs.map(({ id, content }) => (
            <TabsContent key={id} value={id}>
                <Card>
                    <CardContent className="p-6 @md:p-8">
                        <h3 className="text-2xl font-bold mb-2">{content.title}</h3>
                        <p className="text-muted-foreground mb-6">{content.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {content.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-sm px-3 py-1">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        ))}
    </Tabs>
)
