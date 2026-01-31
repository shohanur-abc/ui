'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Code, Server, Cloud, Palette, Brain, Users } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Expertise" />
                    <Title text="Skills & Expertise" />
                    <Description text="Technical and professional skills developed throughout my career." />
                </div>

                <SkillTabs
                    tabs={[
                        { id: 'frontend', icon: Code, label: 'Frontend', skills: [
                            { name: 'React / Next.js', level: 95, years: '7 years' },
                            { name: 'TypeScript', level: 92, years: '5 years' },
                            { name: 'CSS / Tailwind', level: 90, years: '8 years' },
                            { name: 'Testing', level: 85, years: '6 years' },
                        ]},
                        { id: 'backend', icon: Server, label: 'Backend', skills: [
                            { name: 'Node.js', level: 88, years: '6 years' },
                            { name: 'Python', level: 75, years: '4 years' },
                            { name: 'PostgreSQL', level: 82, years: '5 years' },
                            { name: 'GraphQL', level: 80, years: '4 years' },
                        ]},
                        { id: 'devops', icon: Cloud, label: 'DevOps', skills: [
                            { name: 'AWS', level: 78, years: '5 years' },
                            { name: 'Docker', level: 85, years: '5 years' },
                            { name: 'Kubernetes', level: 70, years: '3 years' },
                            { name: 'CI/CD', level: 88, years: '6 years' },
                        ]},
                        { id: 'design', icon: Palette, label: 'Design', skills: [
                            { name: 'Figma', level: 75, years: '4 years' },
                            { name: 'Design Systems', level: 90, years: '5 years' },
                            { name: 'Accessibility', level: 85, years: '4 years' },
                            { name: 'UX Principles', level: 80, years: '5 years' },
                        ]},
                        { id: 'soft', icon: Users, label: 'Leadership', skills: [
                            { name: 'Team Leadership', level: 90, years: '5 years' },
                            { name: 'Mentorship', level: 92, years: '6 years' },
                            { name: 'Communication', level: 88, years: '8 years' },
                            { name: 'Strategy', level: 85, years: '4 years' },
                        ]},
                    ]}
                />
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

interface Skill {
    name: string
    level: number
    years: string
}

interface Tab {
    id: string
    icon: ComponentType<{ className?: string }>
    label: string
    skills: Skill[]
}

const SkillTabs = ({ tabs }: { tabs: Tab[] }) => (
    <Tabs defaultValue={tabs[0]?.id} className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-5 mb-8">
            {tabs.map(({ id, icon: Icon, label }) => (
                <TabsTrigger key={id} value={id} className="gap-2">
                    <Icon className="size-4" />
                    <span className="hidden @md:inline">{label}</span>
                </TabsTrigger>
            ))}
        </TabsList>
        {tabs.map(({ id, skills }) => (
            <TabsContent key={id} value={id} className="mt-0">
                <div className="space-y-6 p-6 bg-card rounded-xl border">
                    {skills.map(({ name, level, years }, i) => (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{name}</span>
                                <div className="flex items-center gap-3">
                                    <Badge variant="outline" className="text-xs">{years}</Badge>
                                    <span className="text-sm text-muted-foreground w-10 text-right">{level}%</span>
                                </div>
                            </div>
                            <Progress value={level} className="h-2" />
                        </div>
                    ))}
                </div>
            </TabsContent>
        ))}
    </Tabs>
)
