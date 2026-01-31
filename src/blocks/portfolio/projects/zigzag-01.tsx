import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">

                <Eyebrow icon={ArrowUpRight} text="Case Studies" />
                <Title text="Featured Work" />
                <Description text="Deep dives into my most impactful projects." />

                <ProjectList items={[
                    {
                        image: 'https://picsum.photos/seed/case1/1200/800',
                        title: 'Redesigning TechFlow\'s User Dashboard',
                        description: 'Led a complete redesign of the analytics dashboard, improving user engagement by 45% and reducing support tickets by 30%.',
                        tags: ['Product Design', 'Frontend', 'User Research'],
                        year: '2024',
                        liveUrl: '#',
                    },
                    {
                        image: 'https://picsum.photos/seed/case2/1200/800',
                        title: 'Building a Scalable E-Commerce Platform',
                        description: 'Architected and built a headless e-commerce solution handling 10,000+ orders daily with 99.9% uptime.',
                        tags: ['Full-Stack', 'System Design', 'Performance'],
                        year: '2023',
                        liveUrl: '#',
                        githubUrl: '#',
                    },
                    {
                        image: 'https://picsum.photos/seed/case3/1200/800',
                        title: 'Open Source Design System',
                        description: 'Created and maintained a React component library used by 5,000+ developers with 2,000+ GitHub stars.',
                        tags: ['Open Source', 'Design System', 'Documentation'],
                        year: '2023',
                        githubUrl: '#',
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-4" />}
        {text}
    </Badge>
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
    year: string
    liveUrl?: string
    githubUrl?: string
}

const ProjectList = ({ items }: { items: ProjectItem[] }) => (
    <div className="space-y-12 @md:space-y-16">
        {items.map(({ image, title, description, tags, year, liveUrl, githubUrl }, i) => (
            <article key={i} className={`grid @3xl:grid-cols-2 gap-8 @lg:gap-12 items-center ${i % 2 === 1 ? '' : ''}`}>
                <div className={`relative aspect-video rounded-2xl overflow-hidden group ${i % 2 === 1 ? '@3xl:order-2' : ''}`}>
                    <Image src={image} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>

                <div className={i % 2 === 1 ? '@3xl:order-1' : ''}>
                    <Badge variant="outline" className="mb-4">{year}</Badge>
                    <h3 className="text-2xl @md:text-3xl @xl:text-4xl font-bold mb-4 leading-tight">{title}</h3>
                    <p className="text-base @md:text-lg text-muted-foreground mb-6 leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {tags.map((tag, j) => (
                            <Badge key={j} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    <div className="flex gap-3">
                        {liveUrl && (
                            <Button className="gap-2" asChild>
                                <Link href={liveUrl}>
                                    View Case Study
                                    <ArrowUpRight className="size-4" />
                                </Link>
                            </Button>
                        )}
                        {githubUrl && (
                            <Button variant="outline" className="gap-2" asChild>
                                <Link href={githubUrl}>
                                    <Github className="size-4" />
                                    Source Code
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </article>
        ))}
    </div>
)
