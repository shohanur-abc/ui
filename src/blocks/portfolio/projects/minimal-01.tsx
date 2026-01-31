import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Minus, Plus, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Minus} text="Minimal" />
                    <Title text="Minimal Cards" />
                    <Description text="Ultra-clean design with essential information only." />
                </div>

                <MinimalGrid
                    items={[
                        { image: 'https://picsum.photos/seed/min1/800/600', title: 'Banking App', index: '01', href: '#' },
                        { image: 'https://picsum.photos/seed/min2/800/600', title: 'E-Commerce', index: '02', href: '#' },
                        { image: 'https://picsum.photos/seed/min3/800/600', title: 'Healthcare', index: '03', href: '#' },
                        { image: 'https://picsum.photos/seed/min4/800/600', title: 'Dashboard', index: '04', href: '#' },
                        { image: 'https://picsum.photos/seed/min5/800/600', title: 'Mobile App', index: '05', href: '#' },
                        { image: 'https://picsum.photos/seed/min6/800/600', title: 'AI Platform', index: '06', href: '#' },
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

interface MinimalItem {
    image: string
    title: string
    index: string
    href: string
}

const MinimalGrid = ({ items }: { items: MinimalItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-x-6 gap-y-10">
        {items.map(({ image, title, index, href }, i) => (
            <Link key={i} href={href} className="group block">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
                    <Image 
                        src={image} 
                        alt={title} 
                        fill 
                        className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75" 
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="size-14 rounded-full bg-white flex items-center justify-center">
                            <ArrowUpRight className="size-6 text-black" />
                        </div>
                    </div>
                </div>
                
                {/* Title row */}
                <div className="flex items-center justify-between">
                    <h3 className="font-medium text-lg group-hover:text-primary transition-colors">{title}</h3>
                    <span className="text-sm text-muted-foreground font-mono">{index}</span>
                </div>
                
                {/* Underline effect */}
                <div className="h-px bg-border mt-3 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-primary w-0 group-hover:w-full transition-all duration-500" />
                </div>
            </Link>
        ))}
    </div>
)
