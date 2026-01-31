import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Infinity, RefreshCw, Repeat } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container overflow-hidden" data-theme="neon">
            <div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 mb-10 @md:mb-14">
                    <div className="text-center max-w-3xl mx-auto">
                        <Eyebrow icon={Repeat} text="Marquee" />
                        <Title text="Infinite Scroll" />
                        <Description text="Continuously scrolling project showcase." />
                    </div>
                </div>

                <MarqueeRow
                    direction="left"
                    items={[
                        { image: 'https://picsum.photos/seed/mar1/400/300', title: 'Dashboard UI', category: 'Web', href: '#' },
                        { image: 'https://picsum.photos/seed/mar2/400/300', title: 'Mobile App', category: 'iOS', href: '#' },
                        { image: 'https://picsum.photos/seed/mar3/400/300', title: 'E-Commerce', category: 'Web', href: '#' },
                        { image: 'https://picsum.photos/seed/mar4/400/300', title: 'Analytics', category: 'SaaS', href: '#' },
                        { image: 'https://picsum.photos/seed/mar5/400/300', title: 'Design System', category: 'UI/UX', href: '#' },
                        { image: 'https://picsum.photos/seed/mar6/400/300', title: 'Landing Page', category: 'Web', href: '#' },
                    ]}
                />

                <div className="h-6" />

                <MarqueeRow
                    direction="right"
                    items={[
                        { image: 'https://picsum.photos/seed/mar7/400/300', title: 'Banking App', category: 'Fintech', href: '#' },
                        { image: 'https://picsum.photos/seed/mar8/400/300', title: 'Social Platform', category: 'Mobile', href: '#' },
                        { image: 'https://picsum.photos/seed/mar9/400/300', title: 'Healthcare', category: 'Web', href: '#' },
                        { image: 'https://picsum.photos/seed/mar10/400/300', title: 'Education', category: 'Platform', href: '#' },
                        { image: 'https://picsum.photos/seed/mar11/400/300', title: 'AI Tool', category: 'SaaS', href: '#' },
                        { image: 'https://picsum.photos/seed/mar12/400/300', title: 'Portfolio', category: 'Web', href: '#' },
                    ]}
                />

                <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 mt-10 @md:mt-14 text-center">
                    <Button variant="outline" className="gap-2" asChild>
                        <Link href="#all">
                            View All Projects <ArrowUpRight className="size-4" />
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

interface MarqueeItem {
    image: string
    title: string
    category: string
    href: string
}

const MarqueeRow = ({ items, direction }: { items: MarqueeItem[]; direction: 'left' | 'right' }) => {
    const duplicatedItems = [...items, ...items]
    
    return (
        <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div 
                className={`flex gap-6 ${direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'}`}
                style={{
                    animation: `marquee-${direction} 40s linear infinite`,
                }}
            >
                {duplicatedItems.map(({ image, title, category, href }, i) => (
                    <Link key={i} href={href} className="group shrink-0">
                        <Card className="w-[280px] @md:w-[320px] overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image 
                                    src={image} 
                                    alt={title} 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                                <Badge className="absolute top-3 left-3">{category}</Badge>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
                                    <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
            
            <style jsx>{`
                @keyframes marquee-left {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    from { transform: translateX(-50%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </div>
    )
}
