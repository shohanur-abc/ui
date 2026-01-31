import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ArrowUpRight, MousePointerClick } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={MousePointerClick} text="Interactive" />
                    <Title text="Hover Gallery" />
                    <Description text="Interactive cards with rich hover effects and transitions." />
                </div>

                <HoverGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/hov1/800/600',
                            title: 'Crypto Wallet',
                            description: 'Secure multi-chain wallet with DeFi integration.',
                            tags: ['Web3', 'React'],
                            color: 'from-blue-500/20',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/hov2/800/600',
                            title: 'Food Delivery',
                            description: 'Real-time order tracking and restaurant management.',
                            tags: ['React Native', 'Node.js'],
                            color: 'from-green-500/20',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/hov3/800/600',
                            title: 'Music Streaming',
                            description: 'High-fidelity audio streaming with social features.',
                            tags: ['Next.js', 'Web Audio'],
                            color: 'from-purple-500/20',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/hov4/800/600',
                            title: 'Fitness Platform',
                            description: 'Workout tracking with AI-powered coaching.',
                            tags: ['React', 'TensorFlow'],
                            color: 'from-orange-500/20',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/hov5/800/600',
                            title: 'Travel Booking',
                            description: 'Flight and hotel booking with price alerts.',
                            tags: ['Vue.js', 'GraphQL'],
                            color: 'from-cyan-500/20',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/hov6/800/600',
                            title: 'Project Management',
                            description: 'Kanban boards with time tracking and reporting.',
                            tags: ['React', 'PostgreSQL'],
                            color: 'from-pink-500/20',
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

interface HoverItem {
    image: string
    title: string
    description: string
    tags: string[]
    color: string
    href: string
}

const HoverGrid = ({ items }: { items: HoverItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ image, title, description, tags, color, href }, i) => (
            <Card key={i} className="group relative overflow-hidden border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/30 hover:-translate-y-1 p-0">
                <Link href={href} className="block">
                    {/* Background glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative aspect-video overflow-hidden">
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        
                        {/* Floating button */}
                        <Button 
                            size="icon" 
                            variant="secondary"
                            className="absolute top-4 right-4 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                        >
                            <ArrowUpRight className="size-4" />
                        </Button>
                    </div>
                    
                    <CardContent className="relative pt-4 pb-2">
                        <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
                    </CardContent>
                    
                    <CardFooter className="relative pt-0 pb-4 flex-wrap gap-1.5">
                        {tags.map((tag, j) => (
                            <Badge key={j} variant="outline" className="text-xs transition-colors group-hover:border-primary/50">{tag}</Badge>
                        ))}
                    </CardFooter>
                </Link>
            </Card>
        ))}
    </div>
)
