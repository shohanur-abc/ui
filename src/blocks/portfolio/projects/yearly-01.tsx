import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, History, Calendar, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={History} text="Timeline" />
                    <Title text="Project History" />
                    <Description text="A chronological journey through our work over the years." />
                </div>

                <YearTimeline
                    years={[
                        {
                            year: '2025',
                            projects: [
                                { image: 'https://picsum.photos/seed/yr25a/600/400', title: 'AI Platform Launch', month: 'Jan', href: '#' },
                                { image: 'https://picsum.photos/seed/yr25b/600/400', title: 'Enterprise Dashboard', month: 'Feb', href: '#' },
                            ],
                        },
                        {
                            year: '2024',
                            projects: [
                                { image: 'https://picsum.photos/seed/yr24a/600/400', title: 'E-Commerce Redesign', month: 'Nov', href: '#' },
                                { image: 'https://picsum.photos/seed/yr24b/600/400', title: 'Mobile Banking App', month: 'Aug', href: '#' },
                                { image: 'https://picsum.photos/seed/yr24c/600/400', title: 'Healthcare Portal', month: 'May', href: '#' },
                                { image: 'https://picsum.photos/seed/yr24d/600/400', title: 'Design System', month: 'Feb', href: '#' },
                            ],
                        },
                        {
                            year: '2023',
                            projects: [
                                { image: 'https://picsum.photos/seed/yr23a/600/400', title: 'SaaS Platform', month: 'Oct', href: '#' },
                                { image: 'https://picsum.photos/seed/yr23b/600/400', title: 'Startup MVP', month: 'Jun', href: '#' },
                                { image: 'https://picsum.photos/seed/yr23c/600/400', title: 'Educational App', month: 'Mar', href: '#' },
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
    month: string
    href: string
}

interface Year {
    year: string
    projects: Project[]
}

const YearTimeline = ({ years }: { years: Year[] }) => (
    <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 @md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />
        
        <div className="space-y-12">
            {years.map(({ year, projects }, i) => (
                <div key={i} className="relative">
                    {/* Year marker */}
                    <div className="relative flex items-center justify-start @md:justify-center mb-8">
                        <div className="absolute left-6 @md:left-1/2 -translate-x-1/2 size-4 rounded-full bg-primary border-4 border-background z-10" />
                        <Badge 
                            variant="outline" 
                            className="text-lg font-bold py-2 px-4 ml-14 @md:ml-0 bg-background"
                        >
                            <Calendar className="size-4 mr-2" />
                            {year}
                        </Badge>
                    </div>
                    
                    {/* Projects grid */}
                    <div className="ml-14 @md:ml-0">
                        <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4">
                            {projects.map(({ image, title, month, href }, j) => (
                                <Card key={j} className="group overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0">
                                    <Link href={href} className="block">
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <Image 
                                                src={image} 
                                                alt={title} 
                                                fill 
                                                className="object-cover transition-transform duration-500 group-hover:scale-105" 
                                            />
                                            <Badge className="absolute top-2 left-2 gap-1 bg-black/70 backdrop-blur-sm text-xs">
                                                <Clock className="size-3" />
                                                {month}
                                            </Badge>
                                        </div>
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-medium text-sm group-hover:text-primary transition-colors truncate">{title}</h4>
                                                <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
        {/* End marker */}
        <div className="relative flex items-center justify-start @md:justify-center mt-12">
            <div className="absolute left-6 @md:left-1/2 -translate-x-1/2 size-3 rounded-full bg-muted border-2 border-border z-10" />
            <span className="text-sm text-muted-foreground ml-14 @md:ml-0">And counting...</span>
        </div>
    </div>
)
