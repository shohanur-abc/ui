import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Clock, Layers } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Clock} text="Journey" />
                    <Title text="Project Timeline" />
                    <Description text="A chronological view of key projects and milestones." />
                </div>

                <ProjectTimeline
                    items={[
                        {
                            year: '2025',
                            title: 'AI-Powered Analytics',
                            description: 'Enterprise analytics platform with machine learning predictions and automated insights generation.',
                            image: 'https://picsum.photos/seed/time1a/800/500',
                            tags: ['Python', 'TensorFlow', 'React'],
                            href: '#',
                        },
                        {
                            year: '2024',
                            title: 'Healthcare Management',
                            description: 'Complete patient management system with telemedicine, scheduling, and EHR integration.',
                            image: 'https://picsum.photos/seed/time1b/800/500',
                            tags: ['Next.js', 'PostgreSQL', 'WebRTC'],
                            href: '#',
                        },
                        {
                            year: '2024',
                            title: 'Fintech Mobile App',
                            description: 'Digital banking application with biometric authentication and real-time transactions.',
                            image: 'https://picsum.photos/seed/time1c/800/500',
                            tags: ['React Native', 'Node.js', 'Stripe'],
                            href: '#',
                        },
                        {
                            year: '2023',
                            title: 'E-Commerce Platform',
                            description: 'Multi-vendor marketplace with advanced inventory management and analytics.',
                            image: 'https://picsum.photos/seed/time1d/800/500',
                            tags: ['Vue.js', 'Laravel', 'Redis'],
                            href: '#',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex justify-center mb-4">
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

interface TimelineItem {
    year: string
    title: string
    description: string
    image: string
    tags: string[]
    href: string
}

const ProjectTimeline = ({ items }: { items: TimelineItem[] }) => (
    <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 @md:left-1/2 top-0 bottom-0 w-px bg-border @md:-translate-x-1/2" />

        <div className="space-y-12 @md:space-y-16">
            {items.map(({ year, title, description, image, tags, href }, i) => (
                <div key={i} className={`relative flex flex-col @md:flex-row gap-6 @md:gap-12 ${i % 2 === 0 ? '@md:flex-row' : '@md:flex-row-reverse'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-4 @md:left-1/2 w-3 h-3 rounded-full bg-primary ring-4 ring-background @md:-translate-x-1/2 translate-y-2" />
                    
                    {/* Year badge - mobile */}
                    <div className="ml-10 @md:hidden">
                        <Badge variant="secondary" className="text-sm font-semibold">{year}</Badge>
                    </div>

                    {/* Content */}
                    <div className={`ml-10 @md:ml-0 @md:w-1/2 ${i % 2 === 0 ? '@md:pr-12 @md:text-right' : '@md:pl-12'}`}>
                        {/* Year badge - desktop */}
                        <div className="hidden @md:block mb-3">
                            <Badge variant="secondary" className="text-sm font-semibold">{year}</Badge>
                        </div>
                        <h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
                        <p className="text-muted-foreground mb-4">{description}</p>
                        <div className={`flex flex-wrap gap-2 mb-4 ${i % 2 === 0 ? '@md:justify-end' : ''}`}>
                            {tags.map((tag, j) => (
                                <Badge key={j} variant="outline">{tag}</Badge>
                            ))}
                        </div>
                        <Button variant="outline" className="gap-2" asChild>
                            <Link href={href}>
                                View Project <ArrowUpRight className="size-4" />
                            </Link>
                        </Button>
                    </div>

                    {/* Image */}
                    <div className={`ml-10 @md:ml-0 @md:w-1/2 ${i % 2 === 0 ? '@md:pl-12' : '@md:pr-12'}`}>
                        <Link href={href} className="group block rounded-xl overflow-hidden bg-card border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30">
                            <div className="relative aspect-video overflow-hidden">
                                <Image 
                                    src={image} 
                                    alt={title} 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
)
