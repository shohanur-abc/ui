'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Layers, CheckCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Layers} text="Projects" />
                    <Title text="Project Experience" />
                    <Description text="Key projects organized by the company where I worked on them." />
                </div>

                <ProjectTabs
                    tabs={[
                        { id: 'google', company: 'Google', projects: [
                            { name: 'Design System Platform', role: 'Tech Lead', impact: '500+ engineers', link: '#', highlights: ['Component library', 'Documentation', 'Migration tooling'] },
                            { name: 'Core Web Vitals', role: 'Lead Engineer', impact: '40% improvement', link: '#', highlights: ['Performance audit', 'Optimization', 'Monitoring'] },
                        ]},
                        { id: 'meta', company: 'Meta', projects: [
                            { name: 'Instagram Stories', role: 'Senior Engineer', impact: '1B+ users', link: '#', highlights: ['Story creation', 'Effects engine', 'Analytics'] },
                            { name: 'Reels MVP', role: 'Engineer', impact: 'Launch feature', link: '#', highlights: ['Video player', 'Editor UI', 'Sharing flow'] },
                        ]},
                        { id: 'stripe', company: 'Stripe', projects: [
                            { name: 'Merchant Dashboard', role: 'Engineer', impact: '23% conversion', link: '#', highlights: ['Analytics UI', 'Payment flow', 'Reporting'] },
                            { name: 'Checkout Redesign', role: 'Frontend Lead', impact: '15% faster', link: '#', highlights: ['Form optimization', 'Error handling', 'Mobile UX'] },
                        ]},
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface Project {
    name: string
    role: string
    impact: string
    link: string
    highlights: string[]
}

interface Tab {
    id: string
    company: string
    projects: Project[]
}

const ProjectTabs = ({ tabs }: { tabs: Tab[] }) => (
    <Tabs defaultValue={tabs[0]?.id}>
        <TabsList className="mb-8">
            {tabs.map(({ id, company }) => (
                <TabsTrigger key={id} value={id}>{company}</TabsTrigger>
            ))}
        </TabsList>
        {tabs.map(({ id, projects }) => (
            <TabsContent key={id} value={id} className="mt-0">
                <div className="grid @md:grid-cols-2 gap-6">
                    {projects.map(({ name, role, impact, link, highlights }, i) => (
                        <Card key={i} className="group hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <h3 className="text-lg font-semibold">{name}</h3>
                                    <Link href={link} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ExternalLink className="size-4 text-muted-foreground hover:text-foreground" />
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge variant="secondary" className="text-xs">{role}</Badge>
                                    <Badge variant="outline" className="text-xs">{impact}</Badge>
                                </div>
                                <ul className="space-y-2">
                                    {highlights.map((highlight, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle className="size-4 text-primary shrink-0" />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        ))}
    </Tabs>
)
