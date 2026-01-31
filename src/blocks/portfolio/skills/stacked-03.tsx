import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Braces, Cloud, Database, Layout, Server, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleArea
                    badge="Specializations"
                    title="Areas of Focus"
                    subtitle="Deep expertise in these key domains"
                />

                <AccordionStyleStack
                    items={[
                        {
                            icon: Braces,
                            title: 'Frontend Architecture',
                            description: 'Building scalable component systems with React, Next.js, and TypeScript. Expert in state management, code splitting, and performance optimization.',
                            tags: ['React', 'Next.js', 'TypeScript'],
                            link: '#frontend',
                        },
                        {
                            icon: Server,
                            title: 'API Development',
                            description: 'Designing and implementing RESTful and GraphQL APIs. Focus on security, performance, and developer experience.',
                            tags: ['Node.js', 'GraphQL', 'REST'],
                            link: '#api',
                        },
                        {
                            icon: Database,
                            title: 'Data Layer',
                            description: 'Database design, optimization, and management. Experience with SQL, NoSQL, and hybrid architectures.',
                            tags: ['PostgreSQL', 'MongoDB', 'Redis'],
                            link: '#data',
                        },
                        {
                            icon: Cloud,
                            title: 'Cloud Infrastructure',
                            description: 'AWS architecture, serverless computing, and infrastructure as code. Ensuring scalability and reliability.',
                            tags: ['AWS', 'Serverless', 'Terraform'],
                            link: '#cloud',
                        },
                        {
                            icon: Layout,
                            title: 'Design Systems',
                            description: 'Creating cohesive component libraries and design tokens. Bridging the gap between design and development.',
                            tags: ['Figma', 'Storybook', 'Tailwind'],
                            link: '#design',
                        },
                        {
                            icon: Zap,
                            title: 'Performance',
                            description: 'Web vitals optimization, caching strategies, and runtime performance. Making applications fast and efficient.',
                            tags: ['Core Web Vitals', 'Caching', 'Profiling'],
                            link: '#performance',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleAreaProps {
    badge: string
    title: string
    subtitle: string
}

const TitleArea = ({ badge, title, subtitle }: TitleAreaProps) => (
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

interface StackItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    tags: string[]
    link: string
}

const AccordionStyleStack = ({ items }: { items: StackItem[] }) => (
    <div className="max-w-3xl mx-auto space-y-3">
        {items.map((item, i) => (
            <ExpandableCard key={i} {...item} />
        ))}
    </div>
)

const ExpandableCard = ({ icon: Icon, title, description, tags, link }: StackItem) => (
    <Card className="group hover:border-primary/50 transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
            <Link href={link} className="block p-5 @md:p-6">
                <div className="flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all">
                        <Icon className="size-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold">{title}</h3>
                            <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </CardContent>
    </Card>
)
