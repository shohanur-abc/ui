'use client'

import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Separator } from '@/components/ui/separator'
import { Briefcase, GraduationCap, Award } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow text="Background" />
                    <Title text="Complete History" />
                    <Description text="A comprehensive view of my professional background." />
                </div>

                <div className="grid @lg:grid-cols-3 gap-8">
                    <CategoryAccordion
                        icon={Briefcase}
                        title="Work Experience"
                        items={[
                            { id: 'w1', title: 'Staff Engineer', subtitle: 'Google · 2022-Present', content: 'Leading technical initiatives across multiple product teams.' },
                            { id: 'w2', title: 'Senior Engineer', subtitle: 'Meta · 2020-2022', content: 'Built and shipped features for Instagram and Facebook.' },
                            { id: 'w3', title: 'Software Engineer', subtitle: 'Stripe · 2018-2020', content: 'Developed payment processing dashboards.' },
                        ]}
                    />

                    <CategoryAccordion
                        icon={GraduationCap}
                        title="Education"
                        items={[
                            { id: 'e1', title: 'M.S. Computer Science', subtitle: 'Stanford · 2016-2018', content: 'Focus on distributed systems and machine learning.' },
                            { id: 'e2', title: 'B.S. Computer Science', subtitle: 'UC Berkeley · 2012-2016', content: 'Graduated with honors. Minor in Mathematics.' },
                        ]}
                    />

                    <CategoryAccordion
                        icon={Award}
                        title="Certifications"
                        items={[
                            { id: 'c1', title: 'AWS Solutions Architect', subtitle: 'Amazon · 2023', content: 'Professional level certification for cloud architecture.' },
                            { id: 'c2', title: 'Google Cloud Professional', subtitle: 'Google · 2022', content: 'Data engineering and ML specialization.' },
                            { id: 'c3', title: 'Kubernetes Administrator', subtitle: 'CNCF · 2021', content: 'Certified Kubernetes Administrator (CKA).' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">{text}</Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface AccordionItemData {
    id: string
    title: string
    subtitle: string
    content: string
}

interface CategoryAccordionProps {
    icon: ComponentType<{ className?: string }>
    title: string
    items: AccordionItemData[]
}

const CategoryAccordion = ({ icon: Icon, title, items }: CategoryAccordionProps) => (
    <div>
        <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="size-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <Accordion type="single" collapsible>
            {items.map(({ id, title: itemTitle, subtitle, content }, i) => (
                <div key={id}>
                    {i > 0 && <Separator />}
                    <AccordionItem value={id} className="border-0">
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className="text-left">
                                <h4 className="text-sm font-medium">{itemTitle}</h4>
                                <p className="text-xs text-muted-foreground">{subtitle}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                            <p className="text-sm text-muted-foreground">{content}</p>
                        </AccordionContent>
                    </AccordionItem>
                </div>
            ))}
        </Accordion>
    </div>
)
