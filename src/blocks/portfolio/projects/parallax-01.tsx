import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Layers2, Layers3 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Layers3} text="Depth" />
                    <Title text="Parallax Cards" />
                    <Description text="Multi-layer depth effect with parallax motion." />
                </div>

                <ParallaxGrid
                    items={[
                        {
                            backgroundImage: 'https://picsum.photos/seed/para1bg/800/600',
                            foregroundImage: 'https://picsum.photos/seed/para1fg/400/300',
                            title: 'Banking Platform',
                            description: 'Modern financial services reimagined.',
                            category: 'Fintech',
                            href: '#',
                        },
                        {
                            backgroundImage: 'https://picsum.photos/seed/para2bg/800/600',
                            foregroundImage: 'https://picsum.photos/seed/para2fg/400/300',
                            title: 'E-Commerce Suite',
                            description: 'Complete shopping ecosystem.',
                            category: 'Retail',
                            href: '#',
                        },
                        {
                            backgroundImage: 'https://picsum.photos/seed/para3bg/800/600',
                            foregroundImage: 'https://picsum.photos/seed/para3fg/400/300',
                            title: 'Healthcare App',
                            description: 'Patient care digitized.',
                            category: 'Health',
                            href: '#',
                        },
                        {
                            backgroundImage: 'https://picsum.photos/seed/para4bg/800/600',
                            foregroundImage: 'https://picsum.photos/seed/para4fg/400/300',
                            title: 'AI Assistant',
                            description: 'Intelligent automation platform.',
                            category: 'AI/ML',
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

interface ParallaxItem {
    backgroundImage: string
    foregroundImage: string
    title: string
    description: string
    category: string
    href: string
}

const ParallaxGrid = ({ items }: { items: ParallaxItem[] }) => (
    <div className="grid @sm:grid-cols-2 gap-6 @lg:gap-8">
        {items.map(({ backgroundImage, foregroundImage, title, description, category, href }, i) => (
            <Link key={i} href={href} className="group block perspective-1000">
                <Card className="relative overflow-hidden border transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 h-80 @md:h-96 p-0 transform-gpu group-hover:rotate-x-3 group-hover:rotate-y-[-3deg] transition-transform duration-500">
                    {/* Background layer */}
                    <div className="absolute inset-0 overflow-hidden">
                        <Image 
                            src={backgroundImage} 
                            alt={`${title} Background`} 
                            fill 
                            className="object-cover scale-110 transition-transform duration-700 group-hover:scale-100" 
                        />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                    
                    {/* Foreground floating element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 aspect-video rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-[calc(50%+20px)]">
                        <Image 
                            src={foregroundImage} 
                            alt={title} 
                            fill 
                            className="object-cover" 
                        />
                    </div>
                    
                    {/* Content layer */}
                    <div className="absolute inset-0 flex flex-col justify-between p-5">
                        <div className="flex items-start justify-between">
                            <Badge className="shadow-lg">{category}</Badge>
                            <div className="size-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowUpRight className="size-5 text-white" />
                            </div>
                        </div>
                        
                        <div className="bg-card/90 backdrop-blur-sm rounded-xl p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
                            <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                    </div>
                </Card>
            </Link>
        ))}
    </div>
)
