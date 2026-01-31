import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star, GitFork, ExternalLink } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Open Source" />
                    <Title text="Featured Repositories" />
                    <Description text="Projects I've built and maintain for the community." />
                </div>

                <RepoGrid
                    items={[
                        {
                            name: 'ui-components',
                            description: 'A collection of accessible, customizable React components.',
                            language: 'TypeScript',
                            languageColor: '#3178c6',
                            stars: '2.4k',
                            forks: '340',
                            href: 'https://github.com',
                        },
                        {
                            name: 'api-toolkit',
                            description: 'Lightweight utilities for building REST APIs with Node.js.',
                            language: 'JavaScript',
                            languageColor: '#f1e05a',
                            stars: '1.2k',
                            forks: '89',
                            href: 'https://github.com',
                        },
                        {
                            name: 'data-fetcher',
                            description: 'A powerful data fetching library with caching and retry logic.',
                            language: 'TypeScript',
                            languageColor: '#3178c6',
                            stars: '890',
                            forks: '67',
                            href: 'https://github.com',
                        },
                        {
                            name: 'cli-tools',
                            description: 'Developer productivity tools for the command line.',
                            language: 'Go',
                            languageColor: '#00ADD8',
                            stars: '456',
                            forks: '34',
                            href: 'https://github.com',
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface RepoItem {
    name: string
    description: string
    language: string
    languageColor: string
    stars: string
    forks: string
    href: string
}

const RepoGrid = ({ items }: { items: RepoItem[] }) => (
    <div className="grid @md:grid-cols-2 gap-4 @md:gap-5">
        {items.map(({ name, description, language, languageColor, stars, forks, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
                <Card className="py-0 group hover:shadow-lg transition-all hover:border-primary/30 cursor-pointer h-full">
                    <CardContent className="p-5 @md:p-6 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="font-bold text-base @md:text-lg font-mono text-primary group-hover:underline">
                                {name}
                            </h3>
                            <ExternalLink className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <span
                                    className="size-3 rounded-full"
                                    style={{ backgroundColor: languageColor }}
                                />
                                {language}
                            </div>
                            <div className="flex items-center gap-1">
                                <Star className="size-4" />
                                {stars}
                            </div>
                            <div className="flex items-center gap-1">
                                <GitFork className="size-4" />
                                {forks}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </a>
        ))}
    </div>
)
