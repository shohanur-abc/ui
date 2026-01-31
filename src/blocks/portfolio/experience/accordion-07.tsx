'use client'

import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Rocket, Star } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Rocket} text="Milestones" />
                    <Title text="Career Milestones" />
                    <Description text="Significant achievements that marked turning points in my career." />
                </div>

                <MilestoneAccordion
                    items={[
                        { id: 'm1', year: '2024', milestone: 'Promoted to Principal', category: 'Leadership', description: 'Recognized for technical leadership and organizational impact.', impact: 'Now guiding technical direction across 5 product teams.' },
                        { id: 'm2', year: '2023', milestone: 'Design System Launch', category: 'Product', description: 'Successfully launched company-wide design system.', impact: 'Adopted by 200+ engineers, saving 1000+ dev hours monthly.' },
                        { id: 'm3', year: '2022', milestone: 'First Patent Filed', category: 'Innovation', description: 'Filed patent for novel caching algorithm.', impact: 'Reduced database load by 60% in production systems.' },
                        { id: 'm4', year: '2021', milestone: 'Team Leadership', category: 'Management', description: 'Started leading a team of 8 engineers.', impact: 'Shipped 3 major features while maintaining team happiness.' },
                        { id: 'm5', year: '2020', milestone: 'First Conference Talk', category: 'Community', description: 'Spoke at React Conf about performance optimization.', impact: 'Talk viewed 50K+ times, led to new opportunities.' },
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

interface MilestoneItem {
    id: string
    year: string
    milestone: string
    category: string
    description: string
    impact: string
}

const MilestoneAccordion = ({ items }: { items: MilestoneItem[] }) => (
    <Accordion type="single" collapsible className="max-w-3xl">
        {items.map(({ id, year, milestone, category, description, impact }) => (
            <AccordionItem key={id} value={id} className="border-l-2 border-border pl-8 relative mb-2">
                <div className="absolute left-0 top-6 -translate-x-1/2 size-4 rounded-full bg-primary" />
                <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex flex-col @sm:flex-row @sm:items-center gap-2 @sm:gap-4 text-left">
                        <span className="text-sm font-mono text-muted-foreground w-12">{year}</span>
                        <div className="flex items-center gap-2">
                            <Star className="size-4 text-primary" />
                            <span className="font-semibold">{milestone}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs w-fit">{category}</Badge>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 @sm:pl-16">
                    <p className="text-sm text-muted-foreground mb-3">{description}</p>
                    <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                        <p className="text-sm"><span className="font-medium">Impact:</span> <span className="text-muted-foreground">{impact}</span></p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)
