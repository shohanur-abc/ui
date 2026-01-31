'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2, Calendar, MapPin } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-[1fr_2fr] gap-12 @xl:gap-16 items-start">
                    <div className="@xl:sticky @xl:top-8">
                        <Eyebrow icon={Building2} text="Companies" />
                        <Title text="Company Experience" />
                        <Description text="Select a company to view my role and contributions." />
                    </div>

                    <CompanyTabs
                        companies={[
                            { id: 'google', logo: 'https://github.com/google.png', initials: 'G', name: 'Google', role: 'Staff Software Engineer', period: 'Jan 2022 - Present', location: 'Mountain View, CA', description: 'Leading the design system team, building tools that serve 500+ engineers across the organization. Focused on improving developer experience and component accessibility.', skills: ['React', 'TypeScript', 'Design Systems', 'Accessibility'] },
                            { id: 'meta', logo: 'https://github.com/facebook.png', initials: 'M', name: 'Meta', role: 'Senior Software Engineer', period: 'Mar 2020 - Dec 2021', location: 'Menlo Park, CA', description: 'Worked on Instagram Stories and Reels, shipping features to billions of users. Led performance optimization initiatives that improved key metrics.', skills: ['React Native', 'GraphQL', 'Performance', 'A/B Testing'] },
                            { id: 'stripe', logo: 'https://github.com/stripe.png', initials: 'S', name: 'Stripe', role: 'Software Engineer', period: 'Jun 2018 - Feb 2020', location: 'San Francisco, CA', description: 'Built merchant dashboards and payment processing UIs. Contributed to the internal component library used across products.', skills: ['Ruby', 'React', 'Payments', 'Security'] },
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

interface Company {
    id: string
    logo: string
    initials: string
    name: string
    role: string
    period: string
    location: string
    description: string
    skills: string[]
}

const CompanyTabs = ({ companies }: { companies: Company[] }) => (
    <Tabs defaultValue={companies[0]?.id} orientation="vertical">
        <TabsList className="flex @lg:flex-col h-auto w-full @lg:w-48 shrink-0 mb-6 @lg:mb-0 @lg:mr-8">
            {companies.map(({ id, logo, initials, name }) => (
                <TabsTrigger key={id} value={id} className="justify-start gap-3 w-full">
                    <Avatar className="size-6 rounded-md">
                        <AvatarImage src={logo} alt={name} />
                        <AvatarFallback className="rounded-md text-xs">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="hidden @sm:inline">{name}</span>
                </TabsTrigger>
            ))}
        </TabsList>
        {companies.map(({ id, name, role, period, location, description, skills }) => (
            <TabsContent key={id} value={id} className="mt-0 flex-1">
                <div className="p-6 bg-card rounded-xl border">
                    <h3 className="text-2xl font-bold mb-1">{role}</h3>
                    <p className="text-lg text-primary mb-4">{name}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1.5"><Calendar className="size-4" />{period}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="size-4" />{location}</span>
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, i) => (
                            <Badge key={i} variant="secondary">{skill}</Badge>
                        ))}
                    </div>
                </div>
            </TabsContent>
        ))}
    </Tabs>
)
