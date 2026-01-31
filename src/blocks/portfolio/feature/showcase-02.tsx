import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ExternalLink, Github, Star } from 'lucide-react'
import Image from 'next/image'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Portfolio" />
                    <Title text="Featured Work" />
                    <Description text="Selected projects demonstrating my expertise across different domains." />
                </div>

                <ShowcaseGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/show1/800/600',
                            title: 'AI Content Platform',
                            description: 'Content generation tool powered by GPT-4.',
                            featured: true,
                            links: { demo: '#', github: '#' },
                            stats: { stars: '1.2k', users: '5k+' },
                        },
                        {
                            image: 'https://picsum.photos/seed/show2/600/400',
                            title: 'Design System',
                            description: 'Component library for enterprise apps.',
                            featured: false,
                            links: { demo: '#', github: '#' },
                        },
                        {
                            image: 'https://picsum.photos/seed/show3/600/400',
                            title: 'Analytics Dashboard',
                            description: 'Real-time data visualization.',
                            featured: false,
                            links: { demo: '#' },
                        },
                        {
                            image: 'https://picsum.photos/seed/show4/800/600',
                            title: 'E-Learning Platform',
                            description: 'Interactive courses with progress tracking.',
                            featured: true,
                            links: { demo: '#', github: '#' },
                            stats: { stars: '890', users: '10k+' },
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

interface ShowcaseItem {
    image: string
    title: string
    description: string
    featured: boolean
    links: { demo?: string; github?: string }
    stats?: { stars: string; users: string }
}

const ShowcaseGrid = ({ items }: { items: ShowcaseItem[] }) => (
    <div className="grid @md:grid-cols-2 gap-4 @md:gap-6">
        {items.map(({ image, title, description, featured, links, stats }, i) => (
            <Card
                key={i}
                className={`py-0 overflow-hidden group ${featured ? '@md:col-span-2' : ''}`}
            >
                <div className={`grid ${featured ? '@lg:grid-cols-2' : ''}`}>
                    <div className={`relative ${featured ? 'aspect-video @lg:aspect-auto min-h-[250px]' : 'aspect-video'}`}>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {featured && (
                            <div className="absolute top-4 left-4">
                                <Badge variant="default" className="gap-1">
                                    <Star className="size-3" />
                                    Featured
                                </Badge>
                            </div>
                        )}
                    </div>

                    <CardContent className={`p-5 @md:p-6 ${featured ? '@lg:flex @lg:flex-col @lg:justify-center' : ''}`}>
                        <h3 className={`font-bold mb-2 ${featured ? 'text-xl @md:text-2xl' : 'text-lg'}`}>
                            {title}
                        </h3>
                        <p className="text-sm @md:text-base text-muted-foreground mb-4">
                            {description}
                        </p>

                        {stats && (
                            <div className="flex gap-4 mb-4">
                                <div className="flex items-center gap-1.5 text-sm">
                                    <Star className="size-4 text-yellow-500" />
                                    <span>{stats.stars}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {stats.users} users
                                </div>
                            </div>
                        )}

                        <div className="flex gap-3">
                            {links.demo && (
                                <a
                                    href={links.demo}
                                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                                >
                                    <ExternalLink className="size-4" />
                                    Live Demo
                                </a>
                            )}
                            {links.github && (
                                <a
                                    href={links.github}
                                    className="flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors"
                                >
                                    <Github className="size-4" />
                                    Source
                                </a>
                            )}
                        </div>
                    </CardContent>
                </div>
            </Card>
        ))}
    </div>
)
