import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Box, Cube, View } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <div className="max-w-2xl">
                        <Eyebrow icon={Cube} text="3D Work" />
                        <Title text="3D & WebGL Projects" />
                        <Description text="Immersive 3D experiences and WebGL applications." />
                    </div>
                    <Button variant="outline" className="gap-2 w-fit" asChild>
                        <Link href="#all3d">
                            View All <ArrowUpRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <ThreeDGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/3d1/800/600',
                            title: 'Product Configurator',
                            description: 'Interactive 3D product visualization for e-commerce.',
                            tech: ['Three.js', 'React Three Fiber', 'GLTF'],
                            hasDemo: true,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/3d2/800/600',
                            title: 'Virtual Gallery',
                            description: 'Immersive 3D art gallery experience.',
                            tech: ['WebXR', 'Three.js', 'Blender'],
                            hasDemo: true,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/3d3/800/600',
                            title: 'Data Visualization',
                            description: '3D data exploration and analysis tool.',
                            tech: ['D3.js', 'Three.js', 'WebGL'],
                            hasDemo: false,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/3d4/800/600',
                            title: 'Architectural Walkthrough',
                            description: 'Real-time architectural visualization.',
                            tech: ['Unity', 'WebGL', 'C#'],
                            hasDemo: true,
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

interface ThreeDItem {
    image: string
    title: string
    description: string
    tech: string[]
    hasDemo: boolean
    href: string
}

const ThreeDGrid = ({ items }: { items: ThreeDItem[] }) => (
    <div className="grid @md:grid-cols-2 gap-6">
        {items.map(({ image, title, description, tech, hasDemo, href }, i) => (
            <Card key={i} className="group overflow-hidden border transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 bg-gradient-to-br from-card to-muted/50 p-0">
                <Link href={href} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                        
                        {/* 3D badge */}
                        <Badge className="absolute top-3 left-3 gap-1.5 bg-primary/90">
                            <Box className="size-3" />
                            3D
                        </Badge>
                        
                        {/* Demo button */}
                        {hasDemo && (
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                className="absolute top-3 right-3 gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <View className="size-3.5" />
                                Live Demo
                            </Button>
                        )}
                    </div>
                    
                    <CardContent className="p-5">
                        <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{description}</p>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1.5">
                                {tech.map((t, j) => (
                                    <Badge key={j} variant="outline" className="text-xs">{t}</Badge>
                                ))}
                            </div>
                            <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </CardContent>
                </Link>
            </Card>
        ))}
    </div>
)
