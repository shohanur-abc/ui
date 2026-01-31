'use client'

import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown, Code2, Globe, Server, Smartphone } from 'lucide-react'
import { ComponentType, useState } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Expertise" />
                    <Title text="Areas of Specialization" />
                    <Description text="Deep expertise across multiple domains of software development." />
                </div>

                <CollapsibleCards
                    items={[
                        {
                            icon: Globe,
                            title: 'Frontend Development',
                            preview: 'React, Next.js, TypeScript, and modern CSS.',
                            details: 'Building responsive, accessible, and performant user interfaces with a focus on user experience. Expert in component architecture, state management, and performance optimization.',
                            skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                        },
                        {
                            icon: Server,
                            title: 'Backend Development',
                            preview: 'Node.js, Python, databases, and APIs.',
                            details: 'Designing and implementing scalable server-side solutions. Expertise in RESTful APIs, GraphQL, microservices architecture, and database optimization.',
                            skills: ['Node.js', 'Python', 'PostgreSQL', 'GraphQL', 'Redis'],
                        },
                        {
                            icon: Smartphone,
                            title: 'Mobile Development',
                            preview: 'React Native for iOS and Android.',
                            details: 'Creating cross-platform mobile applications that feel native. Experience with app store deployments, push notifications, and offline-first architecture.',
                            skills: ['React Native', 'Expo', 'iOS', 'Android', 'Push Notifications'],
                        },
                        {
                            icon: Code2,
                            title: 'DevOps & Cloud',
                            preview: 'AWS, Docker, CI/CD pipelines.',
                            details: 'Setting up robust deployment pipelines and cloud infrastructure. Expertise in containerization, serverless functions, and infrastructure as code.',
                            skills: ['AWS', 'Docker', 'GitHub Actions', 'Vercel', 'Terraform'],
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface CollapsibleItem {
    icon: ComponentType<{ className?: string }>
    title: string
    preview: string
    details: string
    skills: string[]
}

const CollapsibleCards = ({ items }: { items: CollapsibleItem[] }) => {
    const [openItems, setOpenItems] = useState<number[]>([])

    const toggleItem = (index: number) => {
        setOpenItems((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        )
    }

    return (
        <div className="grid @md:grid-cols-2 gap-4 @md:gap-5 max-w-4xl mx-auto">
            {items.map(({ icon: Icon, title, preview, details, skills }, i) => (
                <Collapsible key={i} open={openItems.includes(i)} onOpenChange={() => toggleItem(i)}>
                    <Card className="py-0">
                        <CardContent className="p-5 @md:p-6">
                            <CollapsibleTrigger className="w-full text-left">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="size-10 @md:size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                            <Icon className="size-5 @md:size-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-base @md:text-lg mb-1">{title}</h3>
                                            <p className="text-sm text-muted-foreground">{preview}</p>
                                        </div>
                                    </div>
                                    <ChevronDown className={`size-5 text-muted-foreground shrink-0 transition-transform ${openItems.includes(i) ? 'rotate-180' : ''}`} />
                                </div>
                            </CollapsibleTrigger>

                            <CollapsibleContent>
                                <div className="mt-4 pt-4 border-t">
                                    <p className="text-sm text-muted-foreground mb-4">{details}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, j) => (
                                            <Badge key={j} variant="secondary" className="text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </CardContent>
                    </Card>
                </Collapsible>
            ))}
        </div>
    )
}
