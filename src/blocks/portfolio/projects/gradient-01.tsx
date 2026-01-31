import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Paintbrush, Palette, Blend } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Paintbrush} text="Gradient" />
                    <Title text="Gradient Backgrounds" />
                    <Description text="Projects with beautiful gradient overlays and effects." />
                </div>

                <GradientGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/grad1/600/400',
                            title: 'Financial Analytics',
                            category: 'Fintech',
                            gradient: 'from-purple-600 via-pink-500 to-red-500',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/grad2/600/400',
                            title: 'E-Commerce Suite',
                            category: 'Retail',
                            gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/grad3/600/400',
                            title: 'Healthcare Platform',
                            category: 'Health',
                            gradient: 'from-green-400 via-emerald-500 to-teal-600',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/grad4/600/400',
                            title: 'AI Content Tool',
                            category: 'AI/ML',
                            gradient: 'from-orange-500 via-amber-500 to-yellow-500',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/grad5/600/400',
                            title: 'Social Network',
                            category: 'Social',
                            gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/grad6/600/400',
                            title: 'Learning Platform',
                            category: 'EdTech',
                            gradient: 'from-violet-600 via-purple-500 to-blue-500',
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

interface GradientItem {
    image: string
    title: string
    category: string
    gradient: string
    href: string
}

const GradientGrid = ({ items }: { items: GradientItem[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
        {items.map(({ image, title, category, gradient, href }, i) => (
            <Link key={i} href={href} className="group block">
                <Card className="relative overflow-hidden border-0 transition-all hover:shadow-2xl p-0">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
                    
                    <div className="relative">
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image 
                                src={image} 
                                alt={title} 
                                fill 
                                className="object-cover mix-blend-overlay transition-transform duration-700 group-hover:scale-110" 
                            />
                            
                            {/* Pattern overlay */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_20%,_rgba(0,0,0,0.3)_100%)]" />
                        </div>
                        
                        <CardContent className="p-5">
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm mb-3">
                                {category}
                            </Badge>
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-bold text-lg">{title}</h3>
                                <div className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="size-5 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </Link>
        ))}
    </div>
)
