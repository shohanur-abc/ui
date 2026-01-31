import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={ImageIcon} text="Gallery" />
                    <Title text="Visual Portfolio" />
                    <Description text="A dynamic masonry layout showcasing diverse project visuals." />
                </div>

                <MasonryVariant
                    items={[
                        { image: 'https://picsum.photos/seed/mas3a/600/900', title: 'Mobile Banking UI', category: 'Fintech', size: 'tall', href: '#' },
                        { image: 'https://picsum.photos/seed/mas3b/600/400', title: 'Dashboard Design', category: 'SaaS', size: 'wide', href: '#' },
                        { image: 'https://picsum.photos/seed/mas3c/400/400', title: 'Brand Identity', category: 'Branding', size: 'square', href: '#' },
                        { image: 'https://picsum.photos/seed/mas3d/600/400', title: 'E-Commerce Site', category: 'Web', size: 'wide', href: '#' },
                        { image: 'https://picsum.photos/seed/mas3e/600/800', title: 'Fitness App', category: 'Mobile', size: 'tall', href: '#' },
                        { image: 'https://picsum.photos/seed/mas3f/400/400', title: 'Icon System', category: 'Design', size: 'square', href: '#' },
                        { image: 'https://picsum.photos/seed/mas3g/600/400', title: 'Landing Page', category: 'Marketing', size: 'wide', href: '#' },
                        { image: 'https://picsum.photos/seed/mas3h/400/400', title: 'Logo Collection', category: 'Branding', size: 'square', href: '#' },
                        { image: 'https://picsum.photos/seed/mas3i/600/800', title: 'Travel App', category: 'Mobile', size: 'tall', href: '#' },
                    ]}
                />

                <div className="text-center mt-12">
                    <Button variant="outline" size="lg" className="gap-2" asChild>
                        <Link href="#all">
                            View All Work <ArrowUpRight className="size-4" />
                        </Link>
                    </Button>
                </div>
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

interface MasonryItem {
    image: string
    title: string
    category: string
    size: 'tall' | 'wide' | 'square'
    href: string
}

const MasonryVariant = ({ items }: { items: MasonryItem[] }) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 @md:gap-6 space-y-4 @md:space-y-6">
        {items.map(({ image, title, category, size, href }, i) => {
            const aspectRatios = {
                tall: 'aspect-[3/4]',
                wide: 'aspect-[4/3]',
                square: 'aspect-square',
            }

            return (
                <Link 
                    key={i} 
                    href={href} 
                    className="group block break-inside-avoid relative rounded-xl overflow-hidden bg-card border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
                >
                    <div className={`relative ${aspectRatios[size]} overflow-hidden`}>
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        
                        {/* Glow overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Content overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="absolute inset-0 p-4 @md:p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <Badge className="w-fit mb-2 bg-primary/90">{category}</Badge>
                            <h3 className="text-white text-lg font-semibold flex items-center gap-2">
                                {title}
                                <ArrowUpRight className="size-4" />
                            </h3>
                        </div>
                    </div>
                </Link>
            )
        })}
    </div>
)
