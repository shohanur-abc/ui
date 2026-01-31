import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { ArrowUpRight, SlidersHorizontal, ArrowLeftRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={ArrowLeftRight} text="Compare" />
                    <Title text="Before & After" />
                    <Description text="Visual transformation showcasing project impact." />
                </div>

                <BeforeAfterGrid
                    items={[
                        {
                            before: 'https://picsum.photos/seed/bef1/600/400',
                            after: 'https://picsum.photos/seed/aft1/600/400',
                            title: 'Dashboard Redesign',
                            improvement: 'Improved task completion by 40%',
                            tags: ['UI/UX', 'React'],
                            href: '#',
                        },
                        {
                            before: 'https://picsum.photos/seed/bef2/600/400',
                            after: 'https://picsum.photos/seed/aft2/600/400',
                            title: 'Mobile App Refresh',
                            improvement: 'Increased engagement by 65%',
                            tags: ['Mobile', 'Swift'],
                            href: '#',
                        },
                        {
                            before: 'https://picsum.photos/seed/bef3/600/400',
                            after: 'https://picsum.photos/seed/aft3/600/400',
                            title: 'E-Commerce UX',
                            improvement: 'Conversion rate up 28%',
                            tags: ['E-Commerce', 'Next.js'],
                            href: '#',
                        },
                        {
                            before: 'https://picsum.photos/seed/bef4/600/400',
                            after: 'https://picsum.photos/seed/aft4/600/400',
                            title: 'Brand Identity Update',
                            improvement: 'Modern, cohesive visual language',
                            tags: ['Branding', 'Design'],
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

interface BeforeAfterItem {
    before: string
    after: string
    title: string
    improvement: string
    tags: string[]
    href: string
}

const BeforeAfterGrid = ({ items }: { items: BeforeAfterItem[] }) => (
    <div className="grid @md:grid-cols-2 gap-6">
        {items.map(({ before, after, title, improvement, tags, href }, i) => (
            <Card key={i} className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {/* Split view container */}
                    <div className="absolute inset-0 grid grid-cols-2">
                        {/* Before side */}
                        <div className="relative overflow-hidden border-r border-white/20">
                            <Image src={before} alt="Before" fill className="object-cover grayscale" />
                            <div className="absolute bottom-2 left-2">
                                <Badge className="bg-black/80 backdrop-blur-sm text-xs">Before</Badge>
                            </div>
                        </div>
                        
                        {/* After side */}
                        <div className="relative overflow-hidden">
                            <Image src={after} alt="After" fill className="object-cover" />
                            <div className="absolute bottom-2 right-2">
                                <Badge className="bg-primary/90 backdrop-blur-sm text-xs">After</Badge>
                            </div>
                        </div>
                    </div>
                    
                    {/* Center divider */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/50 z-10 flex items-center justify-center">
                        <div className="size-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <ArrowLeftRight className="size-4 text-black" />
                        </div>
                    </div>
                </div>
                
                <CardContent className="p-5">
                    <Link href={href} className="block">
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h3>
                            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </div>
                        
                        <p className="text-sm text-green-500 mb-4">{improvement}</p>
                        
                        <div className="flex flex-wrap gap-1.5">
                            {tags.map((tag, j) => (
                                <Badge key={j} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                    </Link>
                </CardContent>
            </Card>
        ))}
    </div>
)
