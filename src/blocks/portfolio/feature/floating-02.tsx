import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <FloatingShowcase
                    header={{
                        eyebrow: 'Featured',
                        title: 'Signature Project',
                        description: 'A deep dive into my most impactful work.',
                    }}
                    project={{
                        image: 'https://picsum.photos/seed/showcase/900/600',
                        title: 'Enterprise Analytics Platform',
                        description: 'A comprehensive analytics solution processing millions of data points in real-time, providing actionable insights for Fortune 500 companies.',
                        stats: [
                            { value: '10M+', label: 'Data points/day' },
                            { value: '99.9%', label: 'Uptime SLA' },
                            { value: '50ms', label: 'Avg response' },
                        ],
                        tags: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
                        href: '#case-study',
                    }}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    eyebrow: string
    title: string
    description: string
}

interface StatItem {
    value: string
    label: string
}

interface ProjectProps {
    image: string
    title: string
    description: string
    stats: StatItem[]
    tags: string[]
    href: string
}

interface FloatingShowcaseProps {
    header: HeaderProps
    project: ProjectProps
}

const FloatingShowcase = ({ header, project }: FloatingShowcaseProps) => (
    <div>
        <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
            <Badge variant="secondary" className="mb-3 @md:mb-4 gap-1.5">
                <Star className="size-3.5" />
                {header.eyebrow}
            </Badge>
            <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
                {header.title}
            </h2>
            <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
                {header.description}
            </p>
        </div>

        <Card className="py-0 overflow-hidden group">
            <div className="grid @xl:grid-cols-2">
                <div className="relative aspect-video @xl:aspect-auto min-h-[300px]">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                </div>

                <CardContent className="p-6 @md:p-8 @xl:p-10 flex flex-col justify-center">
                    <h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-4">{project.title}</h3>
                    <p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-6">
                        {project.description}
                    </p>

                    <div className="flex gap-6 @md:gap-8 mb-6">
                        {project.stats.map(({ value, label }, i) => (
                            <div key={i}>
                                <div className="text-xl @md:text-2xl font-bold text-primary">{value}</div>
                                <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <div>
                        <Button asChild>
                            <Link href={project.href}>
                                View Case Study
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    </div>
)
