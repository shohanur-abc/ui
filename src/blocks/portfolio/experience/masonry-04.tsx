import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { FileCode, Star, GitFork, ExternalLink, Heart } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={FileCode} text="Open Source" />
                    <Title text="Projects & Contributions" />
                    <Description text="Open source work I've created and contributed to." />
                </div>

                <div className="columns-1 @sm:columns-2 @lg:columns-3 gap-4 space-y-4">
                    <ProjectCard
                        name="design-system"
                        description="A comprehensive React component library with 200+ accessible components."
                        stars={2450}
                        forks={180}
                        href="https://github.com/username/design-system"
                        featured
                    />
                    <StatTile icon={Heart} value="100+" label="PRs Merged" />
                    <ProjectCard
                        name="cache-layer"
                        description="Intelligent caching middleware for Node.js."
                        stars={890}
                        forks={95}
                        href="https://github.com/username/cache-layer"
                    />
                    <ContributionCard
                        repo="facebook/react"
                        prs={12}
                        description="Performance optimizations"
                    />
                    <ProjectCard
                        name="form-builder"
                        description="Drag-and-drop form builder with validation."
                        stars={650}
                        forks={78}
                        href="https://github.com/username/form-builder"
                    />
                    <StatTile icon={Star} value="4K+" label="Total Stars" />
                    <ContributionCard
                        repo="vercel/next.js"
                        prs={8}
                        description="Documentation improvements"
                    />
                    <ProjectCard
                        name="api-client"
                        description="Type-safe API client generator from OpenAPI."
                        stars={420}
                        forks={45}
                        href="https://github.com/username/api-client"
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

interface ProjectCardProps {
    name: string
    description: string
    stars: number
    forks: number
    href: string
    featured?: boolean
}

const ProjectCard = ({ name, description, stars, forks, href, featured }: ProjectCardProps) => (
    <Link href={href} target="_blank" className="block group">
        <Card className={`break-inside-avoid hover:shadow-lg transition-all ${featured ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-mono font-bold text-sm group-hover:text-primary transition-colors">{name}</h4>
                    <ExternalLink className="size-3.5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground mb-3">{description}</p>
                <div className="flex gap-4 text-xs">
                    <span className="flex items-center gap-1">
                        <Star className="size-3 text-yellow-500 fill-current" />
                        {stars.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                        <GitFork className="size-3" />
                        {forks}
                    </span>
                </div>
            </CardContent>
        </Card>
    </Link>
)

interface ContributionCardProps {
    repo: string
    prs: number
    description: string
}

const ContributionCard = ({ repo, prs, description }: ContributionCardProps) => (
    <Card className="break-inside-avoid bg-muted/50">
        <CardContent className="p-5">
            <h4 className="font-mono text-sm mb-1">{repo}</h4>
            <p className="text-xs text-muted-foreground mb-2">{description}</p>
            <Badge variant="secondary" className="text-xs">{prs} PRs merged</Badge>
        </CardContent>
    </Card>
)

interface StatTileProps {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

const StatTile = ({ icon: Icon, value, label }: StatTileProps) => (
    <Card className="break-inside-avoid bg-primary text-primary-foreground">
        <CardContent className="p-5 flex items-center gap-3">
            <Icon className="size-8 opacity-80" />
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs opacity-80">{label}</p>
            </div>
        </CardContent>
    </Card>
)
