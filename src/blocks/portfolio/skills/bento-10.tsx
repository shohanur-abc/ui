import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Atom, Box, Cpu, FileCode, Gauge, Globe, Layers, Terminal, Wand2 } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    badge="Tech Stack"
                    heading="My Development Toolkit"
                    subheading="The technologies I use to bring ideas to life"
                />

                <ModularBento
                    hero={{
                        icon: Atom,
                        title: 'React Ecosystem',
                        description: 'Expert-level proficiency in React, Next.js, and the modern frontend toolchain. Building performant, accessible, and delightful user experiences.',
                        tags: ['React 19', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                    }}
                    secondary={[
                        {
                            icon: Terminal,
                            title: 'Backend',
                            description: 'Server-side development',
                            items: ['Node.js', 'Python', 'Go'],
                        },
                        {
                            icon: Layers,
                            title: 'Databases',
                            description: 'Data management',
                            items: ['PostgreSQL', 'MongoDB', 'Redis'],
                        },
                    ]}
                    tertiary={[
                        { icon: Globe, label: 'Web Apps', count: '25+' },
                        { icon: FileCode, label: 'APIs Built', count: '40+' },
                        { icon: Cpu, label: 'Microservices', count: '15+' },
                    ]}
                    extras={[
                        { icon: Box, name: 'Docker', description: 'Containerization' },
                        { icon: Wand2, name: 'AI Tools', description: 'LLM Integration' },
                        { icon: Gauge, name: 'Performance', description: 'Optimization' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleSectionProps {
    badge: string
    heading: string
    subheading: string
}

const TitleSection = ({ badge, heading, subheading }: TitleSectionProps) => (
    <div className="mb-12 @md:mb-16 @xl:mb-20">
        <Badge variant="outline" className="mb-4">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4">
            {heading}
        </h2>
        <p className="text-muted-foreground text-lg @md:text-xl max-w-3xl">
            {subheading}
        </p>
    </div>
)

interface HeroCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    tags: string[]
}

interface SecondaryCardProps {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    items: string[]
}

interface TertiaryCardProps {
    icon: ComponentType<{ className?: string }>
    label: string
    count: string
}

interface ExtraCardProps {
    icon: ComponentType<{ className?: string }>
    name: string
    description: string
}

interface ModularBentoProps {
    hero: HeroCardProps
    secondary: SecondaryCardProps[]
    tertiary: TertiaryCardProps[]
    extras: ExtraCardProps[]
}

const ModularBento = ({ hero, secondary, tertiary, extras }: ModularBentoProps) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
        <HeroCard {...hero} />
        {secondary.map((card, i) => (
            <SecondaryCard key={i} {...card} />
        ))}
        <div className="@md:col-span-2 @xl:col-span-1 grid grid-cols-3 @xl:grid-cols-1 gap-4 @md:gap-6">
            {tertiary.map((card, i) => (
                <StatCard key={i} {...card} />
            ))}
        </div>
        <div className="@md:col-span-2 @xl:col-span-4 grid @sm:grid-cols-3 gap-4 @md:gap-6">
            {extras.map((card, i) => (
                <ExtraCard key={i} {...card} />
            ))}
        </div>
    </div>
)

const HeroCard = ({ icon: Icon, title, description, tags }: HeroCardProps) => (
    <Card className="@md:col-span-2 group hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <CardContent className="p-6 @md:p-8">
            <div className="size-16 rounded-2xl bg-primary flex items-center justify-center mb-6">
                <Icon className="size-8 text-primary-foreground" />
            </div>
            <h3 className="text-2xl @md:text-3xl font-bold mb-3">{title}</h3>
            <p className="text-muted-foreground mb-6">{description}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

const SecondaryCard = ({ icon: Icon, title, description, items }: SecondaryCardProps) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5 @md:p-6 h-full flex flex-col">
            <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5 text-primary" />
            </div>
            <h4 className="font-semibold mb-1">{title}</h4>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
                {items.map((item, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                        {item}
                    </Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

const StatCard = ({ icon: Icon, label, count }: TertiaryCardProps) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-4 flex items-center gap-3 @xl:flex-col @xl:text-center @xl:p-5">
            <Icon className="size-5 text-primary shrink-0" />
            <div>
                <p className="text-xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
        </CardContent>
    </Card>
)

const ExtraCard = ({ icon: Icon, name, description }: ExtraCardProps) => (
    <Card className="group hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-5 flex items-center gap-4">
            <div className="size-11 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div>
                <h5 className="font-semibold">{name}</h5>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        </CardContent>
    </Card>
)
