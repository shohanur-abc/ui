import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Code, Figma, Globe } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Case Studies" />
                    <Title text="Featured Projects" />
                    <Description text="Detailed look at some of my most impactful work." />
                </div>

                <MasonryCards
                    items={[
                        {
                            image: 'https://picsum.photos/seed/case1/700/500',
                            title: 'FinTech Dashboard',
                            description: 'Real-time financial analytics platform with advanced data visualization.',
                            icon: Code,
                            tags: ['React', 'D3.js', 'Node.js'],
                            link: '#project-1',
                            featured: true,
                        },
                        {
                            image: 'https://picsum.photos/seed/case2/500/400',
                            title: 'E-Learning Platform',
                            description: 'Interactive course platform.',
                            icon: Globe,
                            tags: ['Next.js', 'PostgreSQL'],
                            link: '#project-2',
                            featured: false,
                        },
                        {
                            image: 'https://picsum.photos/seed/case3/500/400',
                            title: 'Design System',
                            description: 'Enterprise component library.',
                            icon: Figma,
                            tags: ['Figma', 'Storybook'],
                            link: '#project-3',
                            featured: false,
                        },
                        {
                            image: 'https://picsum.photos/seed/case4/700/500',
                            title: 'Healthcare App',
                            description: 'Patient management system with telemedicine integration.',
                            icon: Globe,
                            tags: ['React Native', 'Firebase', 'HIPAA'],
                            link: '#project-4',
                            featured: true,
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

interface MasonryCardItem {
    image: string
    title: string
    description: string
    icon: ComponentType<{ className?: string }>
    tags: string[]
    link: string
    featured: boolean
}

const MasonryCards = ({ items }: { items: MasonryCardItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-5">
        {items.map(({ image, title, description, icon: Icon, tags, link, featured }, i) => (
            <Card
                key={i}
                className={`py-0 overflow-hidden group cursor-pointer hover:shadow-xl transition-all ${
                    featured ? '@xl:col-span-2' : ''
                }`}
            >
                <a href={link}>
                    <div className={`relative ${featured ? 'aspect-[2/1]' : 'aspect-video'}`}>
                        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-4 right-4 size-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className="size-5" />
                        </div>
                    </div>
                    <CardContent className="p-5 @md:p-6">
                        <div className="flex items-start gap-3 mb-3">
                            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="size-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">{title}</h3>
                                <p className="text-sm text-muted-foreground">{description}</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, j) => (
                                <Badge key={j} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </a>
            </Card>
        ))}
    </div>
)
