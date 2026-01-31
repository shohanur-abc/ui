import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ArrowUpRight, Clock, Timer, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Clock} text="Duration" />
                    <Title text="Project Timelines" />
                    <Description text="Projects organized by development duration and complexity." />
                </div>

                <DurationCategories
                    categories={[
                        {
                            label: 'Quick Sprints',
                            duration: '1-2 weeks',
                            projects: [
                                { image: 'https://picsum.photos/seed/dur1a/400/300', title: 'Landing Page', days: 5, href: '#' },
                                { image: 'https://picsum.photos/seed/dur1b/400/300', title: 'Email Template', days: 3, href: '#' },
                                { image: 'https://picsum.photos/seed/dur1c/400/300', title: 'Portfolio Site', days: 10, href: '#' },
                            ],
                        },
                        {
                            label: 'Standard Projects',
                            duration: '1-2 months',
                            projects: [
                                { image: 'https://picsum.photos/seed/dur2a/400/300', title: 'E-Commerce Store', days: 45, href: '#' },
                                { image: 'https://picsum.photos/seed/dur2b/400/300', title: 'Mobile App MVP', days: 60, href: '#' },
                                { image: 'https://picsum.photos/seed/dur2c/400/300', title: 'Dashboard Suite', days: 40, href: '#' },
                            ],
                        },
                        {
                            label: 'Enterprise Scale',
                            duration: '3-6 months',
                            projects: [
                                { image: 'https://picsum.photos/seed/dur3a/400/300', title: 'Banking Platform', days: 120, href: '#' },
                                { image: 'https://picsum.photos/seed/dur3b/400/300', title: 'Healthcare System', days: 150, href: '#' },
                                { image: 'https://picsum.photos/seed/dur3c/400/300', title: 'ERP Integration', days: 180, href: '#' },
                            ],
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

interface Project {
    image: string
    title: string
    days: number
    href: string
}

interface DurationCategory {
    label: string
    duration: string
    projects: Project[]
}

const formatDays = (days: number): string => {
    if (days < 7) return `${days} days`
    if (days < 30) return `${Math.round(days / 7)} weeks`
    return `${Math.round(days / 30)} months`
}

const DurationCategories = ({ categories }: { categories: DurationCategory[] }) => (
    <div className="space-y-12">
        {categories.map(({ label, duration, projects }, i) => (
            <div key={i}>
                {/* Category header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Timer className="size-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{label}</h3>
                            <p className="text-sm text-muted-foreground">{duration}</p>
                        </div>
                    </div>
                    <Badge variant="secondary">{projects.length} projects</Badge>
                </div>
                
                {/* Projects */}
                <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
                    {projects.map(({ image, title, days, href }, j) => (
                        <Card key={j} className="group overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0">
                            <Link href={href} className="block">
                                <div className="relative aspect-video overflow-hidden">
                                    <Image 
                                        src={image} 
                                        alt={title} 
                                        fill 
                                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                                </div>
                                
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">{title}</h4>
                                        <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                    </div>
                                    
                                    {/* Duration bar */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground flex items-center gap-1">
                                                <Calendar className="size-3.5" />
                                                Duration
                                            </span>
                                            <span className="font-medium">{formatDays(days)}</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                            <div 
                                                className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all" 
                                                style={{ width: `${Math.min((days / 180) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>
        ))}
    </div>
)
