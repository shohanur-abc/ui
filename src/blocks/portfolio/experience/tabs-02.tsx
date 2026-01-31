'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, Users, Rocket } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Briefcase} text="Career" />
                    <Title text="Experience by Role" />
                    <Description text="View my experience organized by role type." />
                </div>

                <RoleTabs
                    tabs={[
                        { id: 'leadership', label: 'Leadership', roles: [
                            { company: 'TechCorp', role: 'Director of Engineering', period: '2023-Present', team: '40+ engineers', achievements: ['Built org from 15 to 40', 'Established tech strategy', '3 products launched'] },
                            { company: 'StartupX', role: 'Engineering Manager', period: '2021-2023', team: '12 engineers', achievements: ['Grew team 4x', 'Improved velocity 50%', 'Zero attrition'] },
                        ]},
                        { id: 'individual', label: 'Individual Contributor', roles: [
                            { company: 'DataFlow', role: 'Staff Engineer', period: '2019-2021', team: 'Platform team', achievements: ['Led architecture', 'Built design system', 'Mentored 10+ devs'] },
                            { company: 'CodeLab', role: 'Senior Engineer', period: '2017-2019', team: 'Product team', achievements: ['Shipped 5 features', 'Performance lead', 'Hiring committee'] },
                        ]},
                        { id: 'consulting', label: 'Consulting', roles: [
                            { company: 'Various Clients', role: 'Technical Consultant', period: '2020-Present', team: 'Freelance', achievements: ['15+ projects', 'Startups to Fortune 500', 'Architecture reviews'] },
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

interface Role {
    company: string
    role: string
    period: string
    team: string
    achievements: string[]
}

interface Tab {
    id: string
    label: string
    roles: Role[]
}

const RoleTabs = ({ tabs }: { tabs: Tab[] }) => (
    <Tabs defaultValue={tabs[0]?.id}>
        <TabsList className="mb-8">
            {tabs.map(({ id, label }) => (
                <TabsTrigger key={id} value={id}>{label}</TabsTrigger>
            ))}
        </TabsList>
        {tabs.map(({ id, roles }) => (
            <TabsContent key={id} value={id} className="mt-0">
                <div className="grid @md:grid-cols-2 gap-6">
                    {roles.map(({ company, role, period, team, achievements }, i) => (
                        <Card key={i} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <CardTitle className="text-lg">{role}</CardTitle>
                                        <p className="text-sm text-primary">{company}</p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs font-mono shrink-0">{period}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <Users className="size-4" />
                                    <span>{team}</span>
                                </div>
                                <ul className="space-y-1.5">
                                    {achievements.map((achievement, j) => (
                                        <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Rocket className="size-3 text-primary shrink-0" />
                                            {achievement}
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
