import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Braces, Cloud, Layers, Palette } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <IntroSection
                    badge="What I Do"
                    title="Service Offerings"
                    subtitle="Professional development services for your projects"
                />

                <ServiceGrid2x2
                    services={[
                        {
                            icon: Braces,
                            title: 'Full Stack Development',
                            description: 'Complete web application development from database to UI. Modern tech stack with React, Node.js, and cloud services.',
                            tags: ['Web Apps', 'APIs', 'Databases'],
                            href: '#fullstack',
                        },
                        {
                            icon: Layers,
                            title: 'Architecture Consulting',
                            description: 'System design and architecture review. Scalability planning, performance optimization, and technical strategy.',
                            tags: ['System Design', 'Scalability', 'Review'],
                            href: '#consulting',
                        },
                        {
                            icon: Cloud,
                            title: 'Cloud & DevOps',
                            description: 'Cloud infrastructure setup and management. CI/CD pipelines, containerization, and monitoring.',
                            tags: ['AWS', 'Docker', 'CI/CD'],
                            href: '#devops',
                        },
                        {
                            icon: Palette,
                            title: 'UI/UX Development',
                            description: 'Implementation of designs with pixel-perfect precision. Responsive layouts and smooth animations.',
                            tags: ['Tailwind', 'Animations', 'Responsive'],
                            href: '#ui',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface IntroSectionProps {
    badge: string
    title: string
    subtitle: string
}

const IntroSection = ({ badge, title, subtitle }: IntroSectionProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-2xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface ServiceCard {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    tags: string[]
    href: string
}

const ServiceGrid2x2 = ({ services }: { services: ServiceCard[] }) => (
    <div className="grid @md:grid-cols-2 gap-6 @md:gap-8 max-w-5xl mx-auto">
        {services.map((service, i) => (
            <ServiceCardComponent key={i} {...service} />
        ))}
    </div>
)

const ServiceCardComponent = ({ icon: Icon, title, description, tags, href }: ServiceCard) => (
    <Link href={href}>
        <Card className="group h-full hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6 @md:p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                    <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 transition-colors">
                        <Icon className="size-7 text-primary" />
                    </div>
                    <div className="size-10 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:bg-primary group-hover:border-primary">
                        <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                    </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    </Link>
)
