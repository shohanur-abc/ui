import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Star, Award, Trophy, Medal, Crown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Trophy} text="Awards" />
                    <Title text="Award Winners" />
                    <Description text="Recognized projects with industry awards." />
                </div>

                <AwardsGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/award1/800/600',
                            title: 'Banking Revolution',
                            category: 'Fintech',
                            awards: [
                                { name: 'Webby Award', year: '2025', icon: Trophy },
                                { name: 'CSS Design Awards', year: '2024', icon: Medal },
                            ],
                            featured: true,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/award2/600/400',
                            title: 'Healthcare Portal',
                            category: 'Health',
                            awards: [
                                { name: 'Awwwards', year: '2024', icon: Star },
                            ],
                            featured: false,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/award3/600/400',
                            title: 'E-Commerce Suite',
                            category: 'Retail',
                            awards: [
                                { name: 'FWA', year: '2024', icon: Award },
                            ],
                            featured: false,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/award4/600/400',
                            title: 'AI Platform',
                            category: 'AI/ML',
                            awards: [
                                { name: 'Red Dot', year: '2025', icon: Crown },
                                { name: 'iF Design', year: '2024', icon: Trophy },
                            ],
                            featured: false,
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

interface AwardInfo {
    name: string
    year: string
    icon: ComponentType<{ className?: string }>
}

interface AwardsItem {
    image: string
    title: string
    category: string
    awards: AwardInfo[]
    featured: boolean
    href: string
}

const AwardsGrid = ({ items }: { items: AwardsItem[] }) => {
    const featured = items.find((item) => item.featured)
    const others = items.filter((item) => !item.featured)

    return (
        <div className="grid @lg:grid-cols-2 gap-6">
            {/* Featured project */}
            {featured && (
                <Link href={featured.href} className="group block @lg:row-span-2">
                    <Card className="h-full overflow-hidden border transition-all hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                        <div className="relative aspect-[4/3] @lg:aspect-auto @lg:h-full min-h-[400px] overflow-hidden">
                            <Image 
                                src={featured.image} 
                                alt={featured.title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                            
                            {/* Crown icon for featured */}
                            <div className="absolute top-4 left-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black">
                                    <Crown className="size-4" />
                                    <span className="font-semibold text-sm">Featured</span>
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="absolute inset-x-0 bottom-0 p-6">
                                <Badge className="mb-3">{featured.category}</Badge>
                                <h3 className="text-white font-bold text-2xl @md:text-3xl mb-4 group-hover:text-primary transition-colors">{featured.title}</h3>
                                
                                {/* Awards list */}
                                <div className="flex flex-wrap gap-2">
                                    {featured.awards.map(({ name, year, icon: Icon }, j) => (
                                        <div key={j} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
                                            <Icon className="size-4 text-yellow-400" />
                                            <span>{name}</span>
                                            <span className="text-white/60">({year})</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Link>
            )}

            {/* Other projects */}
            {others.map(({ image, title, category, awards, href }, i) => (
                <Link key={i} href={href} className="group block">
                    <Card className="overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                        <div className="flex flex-col @sm:flex-row">
                            <div className="relative @sm:w-40 aspect-video @sm:aspect-square shrink-0 overflow-hidden">
                                <Image 
                                    src={image} 
                                    alt={title} 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                                />
                            </div>
                            
                            <CardContent className="flex-1 p-4 flex flex-col justify-center">
                                <Badge variant="secondary" className="w-fit mb-2">{category}</Badge>
                                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
                                
                                <div className="flex flex-wrap gap-1.5">
                                    {awards.map(({ name, year, icon: Icon }, j) => (
                                        <Badge key={j} variant="outline" className="gap-1 text-xs">
                                            <Icon className="size-3 text-yellow-500" />
                                            {name} &apos;{year.slice(-2)}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            
                            <div className="hidden @sm:flex items-center px-4">
                                <ArrowUpRight className="size-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    )
}
