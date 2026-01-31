import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Palette, Droplet, Circle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Palette} text="Colors" />
                    <Title text="By Color Palette" />
                    <Description text="Projects organized by their dominant color schemes." />
                </div>

                <ColorCategories
                    categories={[
                        {
                            name: 'Blue & Cyan',
                            colors: ['#0ea5e9', '#06b6d4', '#3b82f6'],
                            projects: [
                                { image: 'https://picsum.photos/seed/blue1/400/300', title: 'Tech Dashboard', href: '#' },
                                { image: 'https://picsum.photos/seed/blue2/400/300', title: 'SaaS Platform', href: '#' },
                                { image: 'https://picsum.photos/seed/blue3/400/300', title: 'Banking App', href: '#' },
                            ],
                        },
                        {
                            name: 'Purple & Violet',
                            colors: ['#8b5cf6', '#a855f7', '#6366f1'],
                            projects: [
                                { image: 'https://picsum.photos/seed/purple1/400/300', title: 'Creative Agency', href: '#' },
                                { image: 'https://picsum.photos/seed/purple2/400/300', title: 'Music Platform', href: '#' },
                                { image: 'https://picsum.photos/seed/purple3/400/300', title: 'NFT Marketplace', href: '#' },
                            ],
                        },
                        {
                            name: 'Green & Teal',
                            colors: ['#10b981', '#14b8a6', '#22c55e'],
                            projects: [
                                { image: 'https://picsum.photos/seed/green1/400/300', title: 'Healthcare App', href: '#' },
                                { image: 'https://picsum.photos/seed/green2/400/300', title: 'Eco Platform', href: '#' },
                                { image: 'https://picsum.photos/seed/green3/400/300', title: 'Finance Tool', href: '#' },
                            ],
                        },
                        {
                            name: 'Orange & Amber',
                            colors: ['#f97316', '#f59e0b', '#eab308'],
                            projects: [
                                { image: 'https://picsum.photos/seed/orange1/400/300', title: 'Food Delivery', href: '#' },
                                { image: 'https://picsum.photos/seed/orange2/400/300', title: 'Travel Agency', href: '#' },
                                { image: 'https://picsum.photos/seed/orange3/400/300', title: 'E-Commerce', href: '#' },
                            ],
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

interface Project {
    image: string
    title: string
    href: string
}

interface ColorCategory {
    name: string
    colors: string[]
    projects: Project[]
}

const ColorCategories = ({ categories }: { categories: ColorCategory[] }) => (
    <div className="grid @md:grid-cols-2 gap-8">
        {categories.map(({ name, colors, projects }, i) => (
            <div key={i} className="group">
                {/* Color header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex -space-x-2">
                        {colors.map((color, j) => (
                            <div 
                                key={j}
                                className="size-8 rounded-full border-2 border-background shadow-md"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                    </div>
                    <h3 className="font-semibold text-lg">{name}</h3>
                </div>
                
                {/* Projects */}
                <div className="grid grid-cols-3 gap-3">
                    {projects.map(({ image, title, href }, j) => (
                        <Link key={j} href={href} className="group/item">
                            <Card className="overflow-hidden border transition-all group-hover/item:shadow-lg group-hover/item:shadow-primary/10 group-hover/item:border-primary/20 p-0">
                                <div className="relative aspect-square overflow-hidden">
                                    <Image 
                                        src={image} 
                                        alt={title} 
                                        fill 
                                        className="object-cover transition-transform duration-500 group-hover/item:scale-105" 
                                    />
                                    {/* Color overlay on hover */}
                                    <div 
                                        className="absolute inset-0 opacity-0 group-hover/item:opacity-30 transition-opacity"
                                        style={{ backgroundColor: colors[0] }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity bg-black/40">
                                        <ArrowUpRight className="size-6 text-white" />
                                    </div>
                                </div>
                                <CardContent className="p-2">
                                    <h4 className="font-medium text-xs truncate group-hover/item:text-primary transition-colors">{title}</h4>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                
                {/* View all link */}
                <Button variant="ghost" size="sm" className="mt-3 gap-1 text-muted-foreground" asChild>
                    <Link href={`#color-${name.toLowerCase().replace(/\s/g, '-')}`}>
                        View all {name} projects <ArrowUpRight className="size-3.5" />
                    </Link>
                </Button>
            </div>
        ))}
    </div>
)
