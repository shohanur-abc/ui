import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowUpRight, LayoutGrid } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <div className="max-w-2xl">
                        <Eyebrow icon={LayoutGrid} text="Portfolio" />
                        <Title text="Stacked Project View" />
                        <Description text="Horizontal card layout for detailed project presentation." />
                    </div>
                    <Button variant="outline" className="gap-2 w-fit" asChild>
                        <Link href="#archive">
                            View Archive <ArrowUpRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <StackedList
                    items={[
                        {
                            image: 'https://picsum.photos/seed/sl1/600/400',
                            title: 'Cloud Infrastructure Dashboard',
                            description: 'Real-time monitoring and management platform for multi-cloud environments with automated scaling.',
                            tags: ['React', 'Go', 'Kubernetes', 'Prometheus'],
                            year: '2025',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/sl2/600/400',
                            title: 'AI-Powered CRM System',
                            description: 'Customer relationship management with predictive analytics and automated workflow triggers.',
                            tags: ['Next.js', 'Python', 'TensorFlow', 'PostgreSQL'],
                            year: '2024',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/sl3/600/400',
                            title: 'Blockchain Supply Chain',
                            description: 'Transparent supply chain tracking with smart contracts and real-time verification.',
                            tags: ['Solidity', 'React', 'Node.js', 'IPFS'],
                            year: '2024',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/sl4/600/400',
                            title: 'Video Conferencing Platform',
                            description: 'Enterprise video communication with screen sharing, recording, and AI transcription.',
                            tags: ['WebRTC', 'React', 'Node.js', 'FFmpeg'],
                            year: '2023',
                            href: '#',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex items-center gap-2 mb-3 text-primary">
        <Icon className="size-4" />
        <span className="text-sm font-medium uppercase tracking-wider">{text}</span>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface StackedItem {
    image: string
    title: string
    description: string
    tags: string[]
    year: string
    href: string
}

const StackedList = ({ items }: { items: StackedItem[] }) => (
    <ul className="divide-y divide-border">
        {items.map(({ image, title, description, tags, year, href }, i) => (
            <li key={i}>
                <Link href={href} className="group grid @md:grid-cols-[200px_1fr] @xl:grid-cols-[280px_1fr] gap-6 py-8 first:pt-0 last:pb-0">
                    {/* Thumbnail */}
                    <div className="relative aspect-video @md:aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-border rounded-lg" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge variant="secondary">{year}</Badge>
                        </div>
                        <h3 className="text-xl @md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                            {title}
                            <ArrowUpRight className="size-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, j) => (
                                <Badge key={j} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                </Link>
            </li>
        ))}
    </ul>
)
