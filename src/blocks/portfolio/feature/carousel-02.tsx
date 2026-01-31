'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6 mb-10 @md:mb-14">
                    <div className="max-w-2xl">
                        <Eyebrow text="Portfolio" />
                        <Title text="Recent Work" />
                        <Description text="A selection of projects I'm proud to have worked on." />
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="#all-projects">
                            View All Projects
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <ProjectCarousel
                    items={[
                        {
                            image: 'https://picsum.photos/seed/work1/800/600',
                            title: 'E-Commerce Platform',
                            category: 'Web Development',
                            description: 'Full-stack e-commerce solution with real-time inventory.',
                            href: '#project-1',
                        },
                        {
                            image: 'https://picsum.photos/seed/work2/800/600',
                            title: 'Healthcare Dashboard',
                            category: 'UI/UX Design',
                            description: 'Patient management system for medical professionals.',
                            href: '#project-2',
                        },
                        {
                            image: 'https://picsum.photos/seed/work3/800/600',
                            title: 'Fintech Mobile App',
                            category: 'Mobile Development',
                            description: 'Investment tracking app for iOS and Android.',
                            href: '#project-3',
                        },
                        {
                            image: 'https://picsum.photos/seed/work4/800/600',
                            title: 'SaaS Analytics',
                            category: 'Full-Stack',
                            description: 'Real-time analytics dashboard for SaaS products.',
                            href: '#project-4',
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
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-3 @md:mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface ProjectItem {
    image: string
    title: string
    category: string
    description: string
    href: string
}

const ProjectCarousel = ({ items }: { items: ProjectItem[] }) => (
    <Carousel
        opts={{
            align: 'start',
            loop: true,
        }}
        className="w-full"
    >
        <CarouselContent className="-ml-4 @md:-ml-6">
            {items.map(({ image, title, category, description, href }, i) => (
                <CarouselItem key={i} className="pl-4 @md:pl-6 @md:basis-1/2 @xl:basis-1/3">
                    <a href={href} className="group block">
                        <div className="relative aspect-[4/3] rounded-xl @md:rounded-2xl overflow-hidden mb-4">
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                            {category}
                        </Badge>
                        <h3 className="font-bold text-lg @md:text-xl mb-1 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </a>
                </CarouselItem>
            ))}
        </CarouselContent>
        <div className="flex items-center justify-center gap-2 mt-8">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
        </div>
    </Carousel>
)
