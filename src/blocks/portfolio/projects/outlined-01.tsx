import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, ScanLine, Grid3x3 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={ScanLine} text="Border" />
                    <Title text="Outlined Cards" />
                    <Description text="Minimal outlined cards with hover fill effect." />
                </div>

                <OutlinedGrid
                    items={[
                        { image: 'https://picsum.photos/seed/out1/600/400', title: 'Banking Platform', category: 'Fintech', year: '2025', href: '#' },
                        { image: 'https://picsum.photos/seed/out2/600/400', title: 'E-Commerce Store', category: 'Retail', year: '2024', href: '#' },
                        { image: 'https://picsum.photos/seed/out3/600/400', title: 'Healthcare App', category: 'Health', year: '2024', href: '#' },
                        { image: 'https://picsum.photos/seed/out4/600/400', title: 'AI Dashboard', category: 'AI/ML', year: '2025', href: '#' },
                        { image: 'https://picsum.photos/seed/out5/600/400', title: 'Mobile App', category: 'iOS', year: '2024', href: '#' },
                        { image: 'https://picsum.photos/seed/out6/600/400', title: 'Design System', category: 'UI/UX', year: '2024', href: '#' },
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

interface OutlinedItem {
    image: string
    title: string
    category: string
    year: string
    href: string
}

const OutlinedGrid = ({ items }: { items: OutlinedItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
        {items.map(({ image, title, category, year, href }, i) => (
            <Link key={i} href={href} className="group block">
                <div className="relative p-6 border-2 border-border rounded-2xl transition-all duration-500 hover:border-primary hover:bg-primary/5">
                    {/* Image with clip-path */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{category}</Badge>
                                <span className="text-xs text-muted-foreground">{year}</span>
                            </div>
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h3>
                        </div>
                        
                        <div className="size-10 rounded-full border-2 border-current flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary">
                            <ArrowUpRight className="size-5 transition-colors group-hover:text-primary-foreground" />
                        </div>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden">
                        <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary transform rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </Link>
        ))}
    </div>
)
