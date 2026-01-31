import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, Images, ZoomIn } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Images} text="Gallery" />
                    <Title text="Visual Showcase" />
                    <Description text="A curated gallery of project screenshots and designs." />
                </div>

                <ImageGallery
                    items={[
                        { image: 'https://picsum.photos/seed/gal1a/800/600', title: 'Dashboard Overview', project: 'Analytics Platform', span: 'large' },
                        { image: 'https://picsum.photos/seed/gal1b/600/600', title: 'Mobile Home', project: 'Banking App', span: 'square' },
                        { image: 'https://picsum.photos/seed/gal1c/600/600', title: 'User Profile', project: 'Social Platform', span: 'square' },
                        { image: 'https://picsum.photos/seed/gal1d/800/500', title: 'Checkout Flow', project: 'E-Commerce', span: 'wide' },
                        { image: 'https://picsum.photos/seed/gal1e/500/800', title: 'Onboarding', project: 'Fitness App', span: 'tall' },
                        { image: 'https://picsum.photos/seed/gal1f/600/400', title: 'Settings Page', project: 'SaaS Dashboard', span: 'normal' },
                        { image: 'https://picsum.photos/seed/gal1g/600/400', title: 'Chat Interface', project: 'Messaging App', span: 'normal' },
                        { image: 'https://picsum.photos/seed/gal1h/500/800', title: 'Product Detail', project: 'E-Commerce', span: 'tall' },
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

interface GalleryItem {
    image: string
    title: string
    project: string
    span: 'large' | 'wide' | 'tall' | 'square' | 'normal'
}

const ImageGallery = ({ items }: { items: GalleryItem[] }) => {
    const getSpanClasses = (span: string) => {
        switch (span) {
            case 'large': return '@md:col-span-2 @md:row-span-2'
            case 'wide': return '@md:col-span-2'
            case 'tall': return '@md:row-span-2'
            case 'square': return ''
            default: return ''
        }
    }

    const getAspectClass = (span: string) => {
        switch (span) {
            case 'large': return 'aspect-square @md:aspect-auto @md:h-full'
            case 'wide': return 'aspect-video'
            case 'tall': return 'aspect-[3/4] @md:h-full'
            case 'square': return 'aspect-square'
            default: return 'aspect-video'
        }
    }

    return (
        <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-3 @md:gap-4 auto-rows-[200px]">
            {items.map(({ image, title, project, span }, i) => (
                <div 
                    key={i} 
                    className={`group relative rounded-xl overflow-hidden bg-card border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 ${getSpanClasses(span)}`}
                >
                    <div className={`relative ${getAspectClass(span)} overflow-hidden h-full`}>
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Content */}
                        <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="flex justify-end">
                                <Button variant="secondary" size="icon-sm">
                                    <ZoomIn className="size-4" />
                                </Button>
                            </div>
                            <div>
                                <Badge className="mb-2 bg-primary/90">{project}</Badge>
                                <h3 className="text-white font-semibold">{title}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
