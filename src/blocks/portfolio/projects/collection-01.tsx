import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, Puzzle, Package, Layers, BoxSelect } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Package} text="Collections" />
                    <Title text="Project Series" />
                    <Description text="Related projects grouped into cohesive collections." />
                </div>

                <CollectionGrid
                    collections={[
                        {
                            title: 'E-Commerce Suite',
                            description: 'Complete e-commerce solutions from storefront to checkout.',
                            icon: BoxSelect,
                            projectCount: 5,
                            projects: [
                                { image: 'https://picsum.photos/seed/col1a/400/300', title: 'Storefront' },
                                { image: 'https://picsum.photos/seed/col1b/400/300', title: 'Admin Dashboard' },
                                { image: 'https://picsum.photos/seed/col1c/400/300', title: 'Mobile App' },
                            ],
                            href: '#ecommerce',
                        },
                        {
                            title: 'Healthcare Platform',
                            description: 'Digital health solutions for providers and patients.',
                            icon: Layers,
                            projectCount: 4,
                            projects: [
                                { image: 'https://picsum.photos/seed/col2a/400/300', title: 'Patient Portal' },
                                { image: 'https://picsum.photos/seed/col2b/400/300', title: 'Provider Dashboard' },
                                { image: 'https://picsum.photos/seed/col2c/400/300', title: 'Telehealth' },
                            ],
                            href: '#healthcare',
                        },
                        {
                            title: 'Fintech Products',
                            description: 'Financial technology applications and services.',
                            icon: Puzzle,
                            projectCount: 6,
                            projects: [
                                { image: 'https://picsum.photos/seed/col3a/400/300', title: 'Banking App' },
                                { image: 'https://picsum.photos/seed/col3b/400/300', title: 'Investment Portal' },
                                { image: 'https://picsum.photos/seed/col3c/400/300', title: 'Crypto Wallet' },
                            ],
                            href: '#fintech',
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
}

interface Collection {
    title: string
    description: string
    icon: ComponentType<{ className?: string }>
    projectCount: number
    projects: Project[]
    href: string
}

const CollectionGrid = ({ collections }: { collections: Collection[] }) => (
    <div className="grid @lg:grid-cols-3 gap-6">
        {collections.map(({ title, description, icon: Icon, projectCount, projects, href }, i) => (
            <Card key={i} className="group border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20">
                <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon className="size-6 text-primary" />
                        </div>
                        <Badge variant="secondary">{projectCount} projects</Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardHeader>
                
                <CardContent>
                    {/* Project previews stack */}
                    <div className="relative h-32 mb-4">
                        {projects.slice(0, 3).map(({ image, title: projectTitle }, j) => (
                            <div 
                                key={j}
                                className="absolute rounded-lg overflow-hidden border-2 border-card shadow-lg transition-transform group-hover:translate-y-0"
                                style={{
                                    width: '70%',
                                    aspectRatio: '4/3',
                                    left: `${j * 15}%`,
                                    top: `${j * 8}px`,
                                    zIndex: 3 - j,
                                    transform: `translateY(${j * 4}px)`,
                                }}
                            >
                                <Image 
                                    src={image} 
                                    alt={projectTitle} 
                                    fill 
                                    className="object-cover" 
                                />
                            </div>
                        ))}
                    </div>
                    
                    {/* Project names */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {projects.map(({ title: projectTitle }, j) => (
                            <Badge key={j} variant="outline" className="text-xs">{projectTitle}</Badge>
                        ))}
                        {projectCount > 3 && (
                            <Badge variant="outline" className="text-xs">+{projectCount - 3} more</Badge>
                        )}
                    </div>
                    
                    <Button variant="outline" className="w-full gap-2" asChild>
                        <Link href={href}>
                            Explore Collection <ArrowUpRight className="size-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
