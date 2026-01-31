'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight, Code2, Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-3 gap-8 @lg:gap-12">
                    {/* Left sidebar with tabs */}
                    <div className="@lg:col-span-1">
                        <Eyebrow icon={Code2} text="Projects" />
                        <Title text="Tech Stack Focus" />
                        <Description text="Projects organized by primary technology stack and framework." />
                    </div>

                    {/* Right content area */}
                    <div className="@lg:col-span-2">
                        <VerticalTabs
                            tabs={[
                                { id: 'react', label: 'React / Next.js' },
                                { id: 'vue', label: 'Vue / Nuxt' },
                                { id: 'node', label: 'Node.js' },
                                { id: 'python', label: 'Python' },
                            ]}
                            content={{
                                react: [
                                    {
                                        image: 'https://picsum.photos/seed/vtab1a/600/400',
                                        title: 'E-Commerce Platform',
                                        description: 'Full-stack marketplace with SSR and edge caching.',
                                        tags: ['Next.js 14', 'TypeScript', 'Prisma'],
                                        liveUrl: '#',
                                        githubUrl: '#',
                                    },
                                    {
                                        image: 'https://picsum.photos/seed/vtab1b/600/400',
                                        title: 'Real-time Collaboration',
                                        description: 'Document editing with live cursors and presence.',
                                        tags: ['React', 'Socket.io', 'Redis'],
                                        liveUrl: '#',
                                        githubUrl: '#',
                                    },
                                ],
                                vue: [
                                    {
                                        image: 'https://picsum.photos/seed/vtab2a/600/400',
                                        title: 'Analytics Dashboard',
                                        description: 'Interactive charts and data visualization platform.',
                                        tags: ['Vue 3', 'Pinia', 'D3.js'],
                                        liveUrl: '#',
                                        githubUrl: '#',
                                    },
                                    {
                                        image: 'https://picsum.photos/seed/vtab2b/600/400',
                                        title: 'CMS Application',
                                        description: 'Headless content management with Nuxt.',
                                        tags: ['Nuxt 3', 'Sanity', 'TailwindCSS'],
                                        liveUrl: '#',
                                    },
                                ],
                                node: [
                                    {
                                        image: 'https://picsum.photos/seed/vtab3a/600/400',
                                        title: 'API Gateway',
                                        description: 'Microservices orchestration layer with auth.',
                                        tags: ['Express', 'GraphQL', 'JWT'],
                                        githubUrl: '#',
                                    },
                                    {
                                        image: 'https://picsum.photos/seed/vtab3b/600/400',
                                        title: 'Queue Processor',
                                        description: 'Background job processing system.',
                                        tags: ['Bull', 'Redis', 'PostgreSQL'],
                                        githubUrl: '#',
                                    },
                                ],
                                python: [
                                    {
                                        image: 'https://picsum.photos/seed/vtab4a/600/400',
                                        title: 'ML Pipeline',
                                        description: 'Machine learning training and inference pipeline.',
                                        tags: ['FastAPI', 'PyTorch', 'Celery'],
                                        githubUrl: '#',
                                    },
                                    {
                                        image: 'https://picsum.photos/seed/vtab4b/600/400',
                                        title: 'Data ETL System',
                                        description: 'Extract, transform, load automation.',
                                        tags: ['Pandas', 'Airflow', 'dbt'],
                                        liveUrl: '#',
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex items-center gap-2 mb-3 text-primary">
        <Icon className="size-4" />
        <span className="text-sm font-medium uppercase tracking-wider">{text}</span>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground">{text}</p>
)

interface ProjectItem {
    image: string
    title: string
    description: string
    tags: string[]
    liveUrl?: string
    githubUrl?: string
}

interface VerticalTabsProps {
    tabs: { id: string; label: string }[]
    content: Record<string, ProjectItem[]>
}

const VerticalTabs = ({ tabs, content }: VerticalTabsProps) => (
    <Tabs defaultValue={tabs[0].id} className="w-full">
        <TabsList className="w-full flex flex-wrap gap-2 bg-transparent h-auto p-0 mb-6">
            {tabs.map(({ id, label }) => (
                <TabsTrigger 
                    key={id} 
                    value={id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border"
                >
                    {label}
                </TabsTrigger>
            ))}
        </TabsList>

        {Object.entries(content).map(([tabId, projects]) => (
            <TabsContent key={tabId} value={tabId} className="mt-0 space-y-4">
                {projects.map(({ image, title, description, tags, liveUrl, githubUrl }, i) => (
                    <Card key={i} className="group overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
                        <div className="flex flex-col @md:flex-row">
                            <div className="relative @md:w-48 @lg:w-56 shrink-0 aspect-video @md:aspect-auto overflow-hidden">
                                <Image 
                                    src={image} 
                                    alt={title} 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <div className="flex-1 p-4 @md:p-5">
                                <CardHeader className="p-0 mb-2">
                                    <CardTitle className="text-lg">{title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <p className="text-sm text-muted-foreground mb-3">{description}</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {tags.map((tag, j) => (
                                            <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-0 mt-4 gap-2">
                                    {liveUrl && (
                                        <Button size="sm" variant="outline" className="gap-1.5" asChild>
                                            <Link href={liveUrl}>
                                                <ExternalLink className="size-3.5" />
                                                Live
                                            </Link>
                                        </Button>
                                    )}
                                    {githubUrl && (
                                        <Button size="sm" variant="ghost" className="gap-1.5" asChild>
                                            <Link href={githubUrl}>
                                                <Github className="size-3.5" />
                                                Code
                                            </Link>
                                        </Button>
                                    )}
                                </CardFooter>
                            </div>
                        </div>
                    </Card>
                ))}
            </TabsContent>
        ))}
    </Tabs>
)
