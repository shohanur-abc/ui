'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Code, Palette, Rocket, Settings } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Services" />
                    <Title text="What I Can Do For You" />
                    <Description text="Comprehensive solutions tailored to bring your vision to life." />
                </div>

                <ServiceAccordion
                    items={[
                        {
                            icon: Code,
                            title: 'Web Development',
                            summary: 'Modern, responsive websites and web applications.',
                            details: [
                                'Custom web applications built with React & Next.js',
                                'E-commerce solutions with payment integration',
                                'Progressive Web Apps (PWAs) for offline access',
                                'API development and third-party integrations',
                            ],
                        },
                        {
                            icon: Palette,
                            title: 'UI/UX Design',
                            summary: 'User-centered design that converts.',
                            details: [
                                'User research and persona development',
                                'Wireframing and interactive prototyping',
                                'Design systems and component libraries',
                                'Usability testing and optimization',
                            ],
                        },
                        {
                            icon: Settings,
                            title: 'Technical Consulting',
                            summary: 'Strategic guidance for your tech stack.',
                            details: [
                                'Architecture review and recommendations',
                                'Technology stack selection',
                                'Performance audits and optimization',
                                'Security assessments and best practices',
                            ],
                        },
                        {
                            icon: Rocket,
                            title: 'MVP Development',
                            summary: 'Launch your product faster.',
                            details: [
                                'Rapid prototyping and validation',
                                'Lean development methodology',
                                'Iterative improvements based on feedback',
                                'Scalable foundation for future growth',
                            ],
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

interface ServiceItem {
    icon: ComponentType<{ className?: string }>
    title: string
    summary: string
    details: string[]
}

const ServiceAccordion = ({ items }: { items: ServiceItem[] }) => (
    <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3 @md:space-y-4">
            {items.map(({ icon: Icon, title, summary, details }, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-0">
                    <Card className="py-0">
                        <CardContent className="p-0">
                            <AccordionTrigger className="px-5 @md:px-6 py-4 @md:py-5 hover:no-underline">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 @md:size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <Icon className="size-5 @md:size-6 text-primary" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-base @md:text-lg">{title}</h3>
                                        <p className="text-sm text-muted-foreground">{summary}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 @md:px-6 pb-5 @md:pb-6">
                                <ul className="space-y-2 ml-14 @md:ml-16">
                                    {details.map((detail, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm @md:text-base text-muted-foreground">
                                            <div className="size-1.5 rounded-full bg-primary shrink-0" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </CardContent>
                    </Card>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
)
