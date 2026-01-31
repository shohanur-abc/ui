'use client'

import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Clock, Users, Target } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16">
                    <div className="@xl:sticky @xl:top-8 self-start">
                        <Eyebrow icon={Target} text="Roles" />
                        <Title text="Role Details" />
                        <Description text="In-depth look at my responsibilities and accomplishments in each position." />

                        <Stats items={[
                            { icon: Clock, label: 'Years Active', value: '8+' },
                            { icon: Users, label: 'Team Size Led', value: '20+' },
                            { icon: Target, label: 'Projects Completed', value: '50+' },
                        ]} />
                    </div>

                    <RoleAccordion
                        items={[
                            { id: 'r1', title: 'Principal Engineer', period: '2023 - Present', summary: 'Technical leadership across organization', details: { scope: 'Organization-wide', reports: '0 direct, 15 dotted', focus: 'Architecture, Strategy, Mentorship', highlights: ['Defined technical roadmap', 'Led platform migration', 'Established best practices'] } },
                            { id: 'r2', title: 'Staff Engineer', period: '2021 - 2023', summary: 'Led platform engineering team', details: { scope: 'Multiple teams', reports: '5 engineers', focus: 'Platform, Developer Experience', highlights: ['Built CI/CD pipeline', 'Created design system', 'Improved deploy times'] } },
                            { id: 'r3', title: 'Senior Engineer', period: '2019 - 2021', summary: 'Technical lead for product features', details: { scope: 'Single team', reports: '2 engineers', focus: 'Product Development', highlights: ['Shipped core features', 'Mentored juniors', 'Led code reviews'] } },
                            { id: 'r4', title: 'Software Engineer', period: '2017 - 2019', summary: 'Full-stack development', details: { scope: 'Individual contributor', reports: 'N/A', focus: 'Feature Development', highlights: ['Built user dashboard', 'API development', 'Testing automation'] } },
                        ]}
                    />
                </div>
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
    <p className="text-base @md:text-lg text-muted-foreground mb-8">{text}</p>
)

interface StatItem {
    icon: ComponentType<{ className?: string }>
    label: string
    value: string
}

const Stats = ({ items }: { items: StatItem[] }) => (
    <div className="grid grid-cols-3 gap-4">
        {items.map(({ icon: Icon, label, value }, i) => (
            <div key={i} className="text-center p-4 bg-background rounded-lg border">
                <Icon className="size-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
        ))}
    </div>
)

interface RoleDetails {
    scope: string
    reports: string
    focus: string
    highlights: string[]
}

interface RoleItem {
    id: string
    title: string
    period: string
    summary: string
    details: RoleDetails
}

const RoleAccordion = ({ items }: { items: RoleItem[] }) => (
    <Accordion type="single" collapsible defaultValue={items[0]?.id}>
        {items.map(({ id, title, period, summary, details }) => (
            <AccordionItem key={id} value={id} className="border-b border-border/50">
                <AccordionTrigger className="hover:no-underline py-6">
                    <div className="text-left">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-semibold">{title}</h3>
                            <Badge variant="secondary" className="text-xs font-mono">{period}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{summary}</p>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                    <div className="grid @sm:grid-cols-3 gap-4 mb-4 p-4 bg-background rounded-lg">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Scope</p>
                            <p className="text-sm font-medium">{details.scope}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Reports</p>
                            <p className="text-sm font-medium">{details.reports}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Focus</p>
                            <p className="text-sm font-medium">{details.focus}</p>
                        </div>
                    </div>
                    <h4 className="text-sm font-medium mb-2">Key Highlights</h4>
                    <ul className="space-y-1.5">
                        {details.highlights.map((highlight, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                                <span className="size-1.5 rounded-full bg-primary shrink-0" />
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)
