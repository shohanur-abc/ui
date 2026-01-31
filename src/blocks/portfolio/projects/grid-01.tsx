import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 ">
                <div className="text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Github} text="Portfolio" />
                    <Title text="Featured Projects" />
                    <Description text="A selection of my best work across different industries and technologies." />
                </div>

                <ProjectGrid items={[
                    {
                        image: 'https://picsum.photos/seed/project1/800/600',
                        title: 'E-Commerce Platform',
                        description: 'A full-featured online store with real-time inventory, payments, and admin dashboard.',
                        tags: ['Next.js', 'Stripe', 'PostgreSQL'],
                        liveUrl: '#',
                        githubUrl: '#',
                    },
                    {
                        image: 'https://picsum.photos/seed/project2/800/600',
                        title: 'Analytics Dashboard',
                        description: 'Real-time analytics platform with customizable widgets and data visualization.',
                        tags: ['React', 'D3.js', 'Node.js'],
                        liveUrl: '#',
                        githubUrl: '#',
                    },
                    {
                        image: 'https://picsum.photos/seed/project3/800/600',
                        title: 'SaaS Starter Kit',
                        description: 'Production-ready starter template with auth, billing, and team management.',
                        tags: ['TypeScript', 'Prisma', 'Tailwind'],
                        liveUrl: '#',
                        githubUrl: '#',
                    },
                ]} />

                <div className="text-center mt-12 @md:mt-16">
                    <Button variant="outline" size="lg" asChild>
                        <Link href="#all-projects">View All Projects</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="outline">
            {Icon && <Icon className="size-4 mr-2" />}
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground mb-12 @md:mb-16">{text}</p>
)

interface ProjectItem {
    image: string
    title: string
    description: string
    tags: string[]
    liveUrl?: string
    githubUrl?: string
}

const ProjectGrid = ({ items }: { items: ProjectItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8">
        {items.map(({ image, title, description, tags, liveUrl, githubUrl }, i) => (
            <li key={i}>
                <Card className="group overflow-hidden h-full py-0">
                    <div className="relative aspect-video overflow-hidden">
                        <Image src={image} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                            {liveUrl && (
                                <Button size="sm" variant="secondary" className="gap-1" asChild>
                                    <Link href={liveUrl}>
                                        Live <ArrowUpRight className="size-3" />
                                    </Link>
                                </Button>
                            )}
                            {githubUrl && (
                                <Button size="sm" variant="secondary" className="gap-1" asChild>
                                    <Link href={githubUrl}>
                                        <Github className="size-4" />
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                    <CardContent className="px-5 pb-6 @md:px-6">
                        <h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, j) => (
                                <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
