'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { ArrowRight, Eye, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 mb-10 @md:mb-14">
                    <div className="text-center max-w-3xl mx-auto">
                        <Eyebrow icon={Zap} text="Showcase" />
                        <Title text="Immersive Projects" />
                        <Description text="Full-width project slider for an impactful visual experience." />
                    </div>
                </div>

                <FullWidthCarousel
                    items={[
                        {
                            image: 'https://picsum.photos/seed/fcar1/1600/900',
                            title: 'Smart City Dashboard',
                            subtitle: 'IoT Integration Platform',
                            description: 'Unified monitoring system for urban infrastructure management.',
                            category: 'Enterprise',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/fcar2/1600/900',
                            title: 'Virtual Event Platform',
                            subtitle: 'Live Streaming Solution',
                            description: 'End-to-end virtual conference platform with networking features.',
                            category: 'SaaS',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/fcar3/1600/900',
                            title: 'Autonomous Vehicle UI',
                            subtitle: 'In-Car Experience',
                            description: 'Next-generation interface for self-driving vehicle controls.',
                            category: 'Automotive',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/fcar4/1600/900',
                            title: 'Medical Imaging AI',
                            subtitle: 'Healthcare Technology',
                            description: 'AI-assisted radiology platform for faster diagnostics.',
                            category: 'Healthcare',
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

interface CarouselItemData {
    image: string
    title: string
    subtitle: string
    description: string
    category: string
    href: string
}

const FullWidthCarousel = ({ items }: { items: CarouselItemData[] }) => (
    <Carousel
        opts={{
            align: 'center',
            loop: true,
        }}
        className="w-full"
    >
        <CarouselContent className="-ml-4">
            {items.map(({ image, title, subtitle, description, category, href }, i) => (
                <CarouselItem key={i} className="pl-4 @md:basis-4/5 @xl:basis-3/4 @3xl:basis-2/3">
                    <div className="group relative rounded-2xl @md:rounded-3xl overflow-hidden bg-card border transition-all hover:shadow-2xl hover:shadow-primary/10">
                        <div className="relative aspect-[16/9]">
                            <Image 
                                src={image} 
                                alt={title} 
                                fill 
                                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                            
                            {/* Category badge */}
                            <Badge className="absolute top-6 left-6 bg-primary/90 backdrop-blur-sm">{category}</Badge>
                            
                            {/* Content overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8 @xl:p-12">
                                <div className="max-w-xl">
                                    <p className="text-primary text-sm font-medium mb-2">{subtitle}</p>
                                    <h3 className="text-white text-2xl @md:text-3xl @xl:text-4xl font-bold mb-3">{title}</h3>
                                    <p className="text-white/80 mb-6 hidden @md:block">{description}</p>
                                    <div className="flex gap-3">
                                        <Button className="gap-2" asChild>
                                            <Link href={href}>
                                                View Project <ArrowRight className="size-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="icon" className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" asChild>
                                            <Link href={href}>
                                                <Eye className="size-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 flex justify-between items-center mt-8">
            <div className="flex gap-2">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
            </div>
            <Button variant="ghost" className="gap-2" asChild>
                <Link href="#all-projects">
                    See All Projects <ArrowRight className="size-4" />
                </Link>
            </Button>
        </div>
    </Carousel>
)
