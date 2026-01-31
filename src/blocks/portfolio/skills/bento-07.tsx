import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Boxes, Globe2, Laptop, PenTool, Server, Smartphone } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <SectionTitle
                    eyebrow="Services"
                    title="What I Do Best"
                    subtitle="Specialized expertise in building digital products"
                />

                <InteractiveBento
                    cards={[
                        {
                            icon: Laptop,
                            title: 'Web Applications',
                            description: 'Full-stack web apps with React, Next.js, and modern backend technologies. From SaaS platforms to e-commerce solutions.',
                            link: { label: 'View Projects', href: '#projects' },
                            span: 'wide',
                        },
                        {
                            icon: Smartphone,
                            title: 'Mobile Apps',
                            description: 'Cross-platform mobile applications with React Native.',
                            link: { label: 'Learn More', href: '#mobile' },
                            span: 'normal',
                        },
                        {
                            icon: Server,
                            title: 'API Design',
                            description: 'RESTful and GraphQL APIs that scale.',
                            link: { label: 'See Examples', href: '#apis' },
                            span: 'normal',
                        },
                        {
                            icon: PenTool,
                            title: 'UI/UX Design',
                            description: 'User-centered design with Figma, prototyping, and design systems that ensure consistency.',
                            link: { label: 'Design Work', href: '#design' },
                            span: 'normal',
                        },
                        {
                            icon: Globe2,
                            title: 'SEO Optimization',
                            description: 'Technical SEO, Core Web Vitals optimization.',
                            link: { label: 'Case Studies', href: '#seo' },
                            span: 'normal',
                        },
                        {
                            icon: Boxes,
                            title: 'DevOps & Infrastructure',
                            description: 'Cloud architecture, CI/CD pipelines, containerization, and monitoring. Ensuring your apps are reliable and scalable.',
                            link: { label: 'Infrastructure', href: '#devops' },
                            span: 'wide',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface SectionTitleProps {
    eyebrow: string
    title: string
    subtitle: string
}

const SectionTitle = ({ eyebrow, title, subtitle }: SectionTitleProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {subtitle}
        </p>
    </div>
)

interface BentoCardData {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    link: { label: string; href: string }
    span: 'normal' | 'wide'
}

const InteractiveBento = ({ cards }: { cards: BentoCardData[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
        {cards.map((card, i) => (
            <ServiceCard key={i} {...card} />
        ))}
    </div>
)

const ServiceCard = ({ icon: Icon, title, description, link, span }: BentoCardData) => (
    <Card className={`group hover:border-primary/50 transition-all duration-300 hover:shadow-xl ${span === 'wide' ? '@xl:col-span-2' : ''}`}>
        <CardContent className="p-6 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon className="size-6" />
                </div>
                <Link
                    href={link.href}
                    className="size-8 rounded-full border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
                >
                    <ArrowUpRight className="size-4" />
                </Link>
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground flex-grow">{description}</p>
            <Link
                href={link.href}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-4 group-hover:gap-2 transition-all"
            >
                {link.label}
                <ArrowUpRight className="size-3" />
            </Link>
        </CardContent>
    </Card>
)
