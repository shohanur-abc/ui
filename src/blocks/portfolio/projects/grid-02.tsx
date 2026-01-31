import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowUpRight, Layers } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Layers} text="Portfolio" />
                    <Title text="Recent Work" />
                    <Description text="Explore my latest projects showcasing modern design and development." />
                </div>

                <ProjectGrid items={[
                    {
                        image: 'https://picsum.photos/seed/grid2a/800/600',
                        title: 'Finance Dashboard',
                        description: 'Real-time financial analytics with interactive charts.',
                        tags: ['React', 'TypeScript', 'Recharts'],
                        href: '#',
                    },
                    {
                        image: 'https://picsum.photos/seed/grid2b/800/600',
                        title: 'Healthcare Platform',
                        description: 'Telemedicine solution with video consultations.',
                        tags: ['Next.js', 'WebRTC', 'PostgreSQL'],
                        href: '#',
                    },
                    {
                        image: 'https://picsum.photos/seed/grid2c/800/600',
                        title: 'Learning Management',
                        description: 'EdTech platform for online courses and certifications.',
                        tags: ['Vue.js', 'Node.js', 'MongoDB'],
                        href: '#',
                    },
                    {
                        image: 'https://picsum.photos/seed/grid2d/800/600',
                        title: 'Social Network',
                        description: 'Community platform with real-time messaging.',
                        tags: ['React Native', 'Firebase', 'GraphQL'],
                        href: '#',
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface ProjectItem {
    image: string
    title: string
    description: string
    tags: string[]
    href: string
}

const ProjectGrid = ({ items }: { items: ProjectItem[] }) => (
    <ul className="grid @sm:grid-cols-2 gap-6 @lg:gap-8">
        {items.map(({ image, title, description, tags, href }, i) => (
            <li key={i}>
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20">
                    <div className="relative aspect-video overflow-hidden">
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            {title}
                            <Button variant="ghost" size="icon-sm" asChild>
                                <Link href={href}>
                                    <ArrowUpRight className="size-4" />
                                </Link>
                            </Button>
                        </CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex-wrap gap-2">
                        {tags.map((tag, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                        ))}
                    </CardFooter>
                </Card>
            </li>
        ))}
    </ul>
)
