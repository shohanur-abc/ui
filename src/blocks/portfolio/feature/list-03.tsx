import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink, Github, Globe } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6 mb-10 @md:mb-14">
                    <div className="max-w-2xl">
                        <Eyebrow text="Projects" />
                        <Title text="Open Source Contributions" />
                        <Description text="Projects I've built and maintained for the developer community." />
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="https://github.com">
                            View GitHub
                            <Github className="size-4" />
                        </Link>
                    </Button>
                </div>

                <ProjectList
                    items={[
                        {
                            title: 'React Component Library',
                            description: 'A collection of 50+ accessible React components with TypeScript support.',
                            stars: '2.5k',
                            language: 'TypeScript',
                            links: { github: '#', demo: '#' },
                        },
                        {
                            title: 'API Rate Limiter',
                            description: 'Flexible rate limiting middleware for Express and Fastify.',
                            stars: '1.2k',
                            language: 'JavaScript',
                            links: { github: '#', demo: '#' },
                        },
                        {
                            title: 'CLI Tool Generator',
                            description: 'Scaffold CLI applications with best practices built-in.',
                            stars: '890',
                            language: 'Go',
                            links: { github: '#' },
                        },
                        {
                            title: 'Schema Validator',
                            description: 'High-performance runtime type validation for JavaScript objects.',
                            stars: '650',
                            language: 'TypeScript',
                            links: { github: '#', demo: '#' },
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-3 @md:mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface ProjectItem {
    title: string
    description: string
    stars: string
    language: string
    links: { github: string; demo?: string }
}

const ProjectList = ({ items }: { items: ProjectItem[] }) => (
    <div className="space-y-4">
        {items.map(({ title, description, stars, language, links }, i) => (
            <div
                key={i}
                className="group flex flex-col @md:flex-row @md:items-center gap-4 p-5 @md:p-6 rounded-xl border hover:border-primary/30 hover:bg-muted/30 transition-all"
            >
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>

                <div className="flex items-center gap-4 @md:gap-6 shrink-0">
                    <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5">
                            <svg viewBox="0 0 16 16" className="size-4 fill-current text-yellow-500">
                                <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                            </svg>
                            {stars}
                        </span>
                        <Badge variant="outline" className="text-xs">{language}</Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button size="icon-sm" variant="ghost" asChild>
                            <a href={links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="size-4" />
                            </a>
                        </Button>
                        {links.demo && (
                            <Button size="icon-sm" variant="ghost" asChild>
                                <a href={links.demo} target="_blank" rel="noopener noreferrer">
                                    <Globe className="size-4" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        ))}
    </div>
)
