import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, Layers2, Palette, Code, Smartphone, Globe, Server } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Layers2} text="Services" />
                    <Title text="Work by Service" />
                    <Description text="Projects categorized by type of service delivered." />
                </div>

                <ServiceCategories
                    categories={[
                        {
                            icon: Palette,
                            title: 'UI/UX Design',
                            count: 12,
                            projects: [
                                { image: 'https://picsum.photos/seed/svc1a/400/300', title: 'Dashboard UI', href: '#' },
                                { image: 'https://picsum.photos/seed/svc1b/400/300', title: 'Mobile App', href: '#' },
                            ],
                        },
                        {
                            icon: Globe,
                            title: 'Web Development',
                            count: 18,
                            projects: [
                                { image: 'https://picsum.photos/seed/svc2a/400/300', title: 'E-Commerce', href: '#' },
                                { image: 'https://picsum.photos/seed/svc2b/400/300', title: 'SaaS Platform', href: '#' },
                            ],
                        },
                        {
                            icon: Smartphone,
                            title: 'Mobile Apps',
                            count: 8,
                            projects: [
                                { image: 'https://picsum.photos/seed/svc3a/400/300', title: 'Fitness App', href: '#' },
                                { image: 'https://picsum.photos/seed/svc3b/400/300', title: 'Banking App', href: '#' },
                            ],
                        },
                        {
                            icon: Server,
                            title: 'Backend/API',
                            count: 6,
                            projects: [
                                { image: 'https://picsum.photos/seed/svc4a/400/300', title: 'API Gateway', href: '#' },
                                { image: 'https://picsum.photos/seed/svc4b/400/300', title: 'Microservices', href: '#' },
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
    href: string
}

interface Category {
    icon: ComponentType<{ className?: string }>
    title: string
    count: number
    projects: Project[]
}

const ServiceCategories = ({ categories }: { categories: Category[] }) => (
    <div className="grid @md:grid-cols-2 gap-6">
        {categories.map(({ icon: Icon, title, count, projects }, i) => (
            <Card key={i} className="group border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0">
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="size-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">{title}</CardTitle>
                                <p className="text-sm text-muted-foreground">{count} projects</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="gap-1" asChild>
                            <Link href={`#${title.toLowerCase().replace(/\s/g, '-')}`}>
                                View All <ArrowUpRight className="size-3.5" />
                            </Link>
                        </Button>
                    </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-3">
                        {projects.map(({ image, title: projectTitle, href }, j) => (
                            <Link key={j} href={href} className="group/item block rounded-lg overflow-hidden bg-muted">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <Image 
                                        src={image} 
                                        alt={projectTitle} 
                                        fill 
                                        className="object-cover transition-transform duration-300 group-hover/item:scale-105" 
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">{projectTitle}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
