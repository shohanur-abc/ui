'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Building, Rocket, GraduationCap, Heart } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-[350px_1fr] gap-12 @xl:gap-16">
                    <div>
                        <Eyebrow icon={Building} text="Journey" />
                        <Title text="Full Background" />
                        <Description text="Every aspect of my professional and personal journey." />
                    </div>

                    <BackgroundTabs
                        tabs={[
                            { id: 'work', icon: Building, label: 'Work', items: [
                                { year: '2022', title: 'Principal Engineer', location: 'TechCorp', description: 'Leading technical direction.' },
                                { year: '2020', title: 'Staff Engineer', location: 'StartupX', description: 'Architecture and mentorship.' },
                                { year: '2018', title: 'Senior Engineer', location: 'Meta', description: 'Product development.' },
                                { year: '2016', title: 'Software Engineer', location: 'Stripe', description: 'Full-stack development.' },
                            ]},
                            { id: 'startups', icon: Rocket, label: 'Side Projects', items: [
                                { year: '2023', title: 'DevTools SaaS', location: 'Co-founder', description: 'Developer productivity tool with 10K users.' },
                                { year: '2021', title: 'Open Source Library', location: 'Creator', description: 'Popular React hooks library with 5K stars.' },
                                { year: '2019', title: 'Tech Blog', location: 'Author', description: 'Writing about engineering and career.' },
                            ]},
                            { id: 'education', icon: GraduationCap, label: 'Education', items: [
                                { year: '2023', title: 'Executive MBA', location: 'Business School', description: 'Leadership and strategy.' },
                                { year: '2018', title: 'M.S. Computer Science', location: 'Stanford', description: 'Distributed systems focus.' },
                                { year: '2016', title: 'B.S. Computer Science', location: 'UC Berkeley', description: 'Honors graduate.' },
                            ]},
                            { id: 'community', icon: Heart, label: 'Community', items: [
                                { year: '2023', title: 'Mentor', location: 'Various Programs', description: '20+ mentees helped.' },
                                { year: '2022', title: 'Conference Speaker', location: 'Global Events', description: '10+ talks delivered.' },
                                { year: '2021', title: 'OSS Contributor', location: 'Major Projects', description: '100+ contributions.' },
                            ]},
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
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface Item {
    year: string
    title: string
    location: string
    description: string
}

interface Tab {
    id: string
    icon: ComponentType<{ className?: string }>
    label: string
    items: Item[]
}

const BackgroundTabs = ({ tabs }: { tabs: Tab[] }) => (
    <Tabs defaultValue={tabs[0]?.id}>
        <TabsList className="flex w-full @md:w-auto mb-8">
            {tabs.map(({ id, icon: Icon, label }) => (
                <TabsTrigger key={id} value={id} className="gap-2 flex-1 @md:flex-initial">
                    <Icon className="size-4 hidden @sm:block" />
                    {label}
                </TabsTrigger>
            ))}
        </TabsList>
        {tabs.map(({ id, items }) => (
            <TabsContent key={id} value={id} className="mt-0">
                <div className="space-y-0">
                    {items.map(({ year, title, location, description }, i) => (
                        <div key={i}>
                            {i > 0 && <Separator className="my-6" />}
                            <div className="flex gap-6">
                                <div className="w-16 shrink-0">
                                    <span className="text-sm font-mono text-muted-foreground">{year}</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">{title}</h3>
                                    <p className="text-sm text-primary mb-1">{location}</p>
                                    <p className="text-sm text-muted-foreground">{description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </TabsContent>
        ))}
    </Tabs>
)
