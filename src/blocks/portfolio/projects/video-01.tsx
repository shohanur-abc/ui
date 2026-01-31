import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUpRight, Sparkles, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Play} text="Video" />
                    <Title text="Project Demos" />
                    <Description text="Watch project walkthroughs and live demonstrations." />
                </div>

                <VideoGrid
                    items={[
                        {
                            thumbnail: 'https://picsum.photos/seed/vid1/800/450',
                            title: 'Dashboard Walkthrough',
                            duration: '5:24',
                            project: 'Analytics Platform',
                            href: '#',
                        },
                        {
                            thumbnail: 'https://picsum.photos/seed/vid2/800/450',
                            title: 'Mobile App Demo',
                            duration: '3:45',
                            project: 'Banking App',
                            href: '#',
                        },
                        {
                            thumbnail: 'https://picsum.photos/seed/vid3/800/450',
                            title: 'Design System Overview',
                            duration: '8:12',
                            project: 'Component Library',
                            href: '#',
                        },
                        {
                            thumbnail: 'https://picsum.photos/seed/vid4/800/450',
                            title: 'E-Commerce Flow',
                            duration: '4:30',
                            project: 'Shopping Platform',
                            href: '#',
                        },
                        {
                            thumbnail: 'https://picsum.photos/seed/vid5/800/450',
                            title: 'API Integration',
                            duration: '6:18',
                            project: 'Backend System',
                            href: '#',
                        },
                        {
                            thumbnail: 'https://picsum.photos/seed/vid6/800/450',
                            title: 'Real-time Features',
                            duration: '4:55',
                            project: 'Collaboration Tool',
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

interface VideoItem {
    thumbnail: string
    title: string
    duration: string
    project: string
    href: string
}

const VideoGrid = ({ items }: { items: VideoItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ thumbnail, title, duration, project, href }, i) => (
            <Card key={i} className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                <Link href={href} className="block">
                    <div className="relative aspect-video overflow-hidden">
                        <Image 
                            src={thumbnail} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        
                        {/* Play button overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
                            <div className="size-14 @md:size-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110">
                                <Play className="size-6 @md:size-7 text-primary-foreground fill-current ml-1" />
                            </div>
                        </div>
                        
                        {/* Duration badge */}
                        <Badge className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm">{duration}</Badge>
                    </div>
                    
                    <div className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">{project}</Badge>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{title}</h3>
                    </div>
                </Link>
            </Card>
        ))}
    </div>
)
