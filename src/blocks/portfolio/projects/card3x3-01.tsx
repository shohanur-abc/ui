import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ArrowUpRight, Github, ExternalLink, Grid3x3 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <div>
                        <Eyebrow icon={Grid3x3} text="Work" />
                        <Title text="Project Collection" />
                    </div>
                    <Stats items={[
                        { value: '50+', label: 'Projects' },
                        { value: '100%', label: 'Delivered' },
                    ]} />
                </div>

                <CardGrid3x3
                    items={[
                        { image: 'https://picsum.photos/seed/c3x3a/600/450', title: 'Task Manager', tags: ['React', 'Firebase'], liveUrl: '#', githubUrl: '#' },
                        { image: 'https://picsum.photos/seed/c3x3b/600/450', title: 'Weather App', tags: ['Vue', 'API'], liveUrl: '#', githubUrl: '#' },
                        { image: 'https://picsum.photos/seed/c3x3c/600/450', title: 'Chat Platform', tags: ['Next.js', 'Socket.io'], liveUrl: '#', githubUrl: '#' },
                        { image: 'https://picsum.photos/seed/c3x3d/600/450', title: 'Music Player', tags: ['React', 'Web Audio'], liveUrl: '#', githubUrl: '#' },
                        { image: 'https://picsum.photos/seed/c3x3e/600/450', title: 'Blog CMS', tags: ['Astro', 'MDX'], liveUrl: '#', githubUrl: '#' },
                        { image: 'https://picsum.photos/seed/c3x3f/600/450', title: 'Recipe App', tags: ['React Native', 'Node.js'], liveUrl: '#', githubUrl: '#' },
                        { image: 'https://picsum.photos/seed/c3x3g/600/450', title: 'Portfolio Site', tags: ['Next.js', 'Framer'], liveUrl: '#', githubUrl: '#' },
                        { image: 'https://picsum.photos/seed/c3x3h/600/450', title: 'E-Commerce', tags: ['Shopify', 'React'], liveUrl: '#', githubUrl: '#' },
                        { image: 'https://picsum.photos/seed/c3x3i/600/450', title: 'Dashboard UI', tags: ['React', 'Recharts'], liveUrl: '#', githubUrl: '#' },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex items-center gap-2 mb-2 text-primary">
        <Icon className="size-4" />
        <span className="text-sm font-medium uppercase tracking-wider">{text}</span>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">{text}</h2>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex gap-6">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-2xl @md:text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

interface CardItem {
    image: string
    title: string
    tags: string[]
    liveUrl: string
    githubUrl: string
}

const CardGrid3x3 = ({ items }: { items: CardItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ image, title, tags, liveUrl, githubUrl }, i) => (
            <Card key={i} className="group overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                    <Image 
                        src={image} 
                        alt={title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button size="icon-sm" variant="secondary" asChild>
                            <Link href={liveUrl}>
                                <ExternalLink className="size-4" />
                            </Link>
                        </Button>
                        <Button size="icon-sm" variant="secondary" asChild>
                            <Link href={githubUrl}>
                                <Github className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <CardContent className="py-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
