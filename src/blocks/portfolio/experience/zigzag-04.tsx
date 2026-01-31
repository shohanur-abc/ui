import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileCode, Star, GitFork, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={FileCode} text="Open Source" />
                    <Title text="Featured Projects" />
                    <Description text="Projects I've built and contributed to." />
                </div>

                <div className="max-w-5xl mx-auto space-y-16">
                    <ProjectZigzag
                        name="design-system"
                        description="A comprehensive React component library with 200+ accessible components, built with TypeScript and Tailwind CSS."
                        stars={2450}
                        forks={180}
                        tags={['React', 'TypeScript', 'Tailwind']}
                        href="https://github.com/username/design-system"
                        align="left"
                    />
                    <ProjectZigzag
                        name="cache-layer"
                        description="Intelligent caching middleware for Node.js applications with support for Redis, Memcached, and in-memory storage."
                        stars={890}
                        forks={95}
                        tags={['Node.js', 'Redis', 'Performance']}
                        href="https://github.com/username/cache-layer"
                        align="right"
                    />
                    <ProjectZigzag
                        name="form-builder"
                        description="Drag-and-drop form builder with validation, conditional logic, and multiple export formats."
                        stars={650}
                        forks={78}
                        tags={['React', 'DnD', 'Forms']}
                        href="https://github.com/username/form-builder"
                        align="left"
                    />
                </div>

                <div className="text-center mt-12">
                    <Button variant="outline" asChild>
                        <Link href="https://github.com/username" target="_blank">
                            View All Projects <ExternalLink className="size-4 ml-2" />
                        </Link>
                    </Button>
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

interface ProjectZigzagProps {
    name: string
    description: string
    stars: number
    forks: number
    tags: string[]
    href: string
    align: 'left' | 'right'
}

const ProjectZigzag = ({ name, description, stars, forks, tags, href, align }: ProjectZigzagProps) => (
    <div className={`grid @lg:grid-cols-2 gap-8 @lg:gap-16 items-center`}>
        <div className={`${align === 'right' ? '@lg:order-2' : ''}`}>
            <h3 className="text-2xl @md:text-3xl font-bold font-mono mb-2">{name}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">{tag}</Badge>
                ))}
            </div>
            <Link href={href} target="_blank" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
                View on GitHub <ArrowRight className="size-4" />
            </Link>
        </div>
        <div className={`p-8 bg-background rounded-xl border ${align === 'right' ? '@lg:order-1' : ''}`}>
            <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                        <Star className="size-5 fill-current" />
                        <span className="text-3xl font-bold text-foreground">{stars.toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Stars</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                        <GitFork className="size-5 text-muted-foreground" />
                        <span className="text-3xl font-bold">{forks}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Forks</p>
                </div>
            </div>
        </div>
    </div>
)
