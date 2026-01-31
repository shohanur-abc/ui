import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Package, Download, Copy, Box } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Package} text="Templates" />
                    <Title text="Downloadable Projects" />
                    <Description text="Complete project templates and starter kits available for download." />
                </div>

                <TemplateGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/temp1/600/400',
                            title: 'SaaS Dashboard Starter',
                            description: 'Complete admin dashboard with charts, tables, and auth.',
                            downloads: 2340,
                            price: 'Free',
                            tech: ['React', 'Tailwind', 'shadcn/ui'],
                            demoUrl: '#demo',
                            downloadUrl: '#download',
                        },
                        {
                            image: 'https://picsum.photos/seed/temp2/600/400',
                            title: 'E-Commerce Kit',
                            description: 'Full shopping experience with cart and checkout.',
                            downloads: 1890,
                            price: '$49',
                            tech: ['Next.js', 'Stripe', 'Prisma'],
                            demoUrl: '#demo',
                            downloadUrl: '#download',
                        },
                        {
                            image: 'https://picsum.photos/seed/temp3/600/400',
                            title: 'Portfolio Template',
                            description: 'Modern portfolio with blog and project showcase.',
                            downloads: 3200,
                            price: 'Free',
                            tech: ['Next.js', 'MDX', 'Tailwind'],
                            demoUrl: '#demo',
                            downloadUrl: '#download',
                        },
                        {
                            image: 'https://picsum.photos/seed/temp4/600/400',
                            title: 'Landing Page Kit',
                            description: '10+ landing page variations with components.',
                            downloads: 1560,
                            price: '$29',
                            tech: ['React', 'Framer Motion', 'Tailwind'],
                            demoUrl: '#demo',
                            downloadUrl: '#download',
                        },
                        {
                            image: 'https://picsum.photos/seed/temp5/600/400',
                            title: 'Mobile App Template',
                            description: 'Cross-platform mobile starter with navigation.',
                            downloads: 890,
                            price: '$79',
                            tech: ['React Native', 'Expo', 'NativeWind'],
                            demoUrl: '#demo',
                            downloadUrl: '#download',
                        },
                        {
                            image: 'https://picsum.photos/seed/temp6/600/400',
                            title: 'Blog Starter',
                            description: 'Minimal blog with MDX support and SEO.',
                            downloads: 2100,
                            price: 'Free',
                            tech: ['Next.js', 'MDX', 'Contentlayer'],
                            demoUrl: '#demo',
                            downloadUrl: '#download',
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

interface TemplateItem {
    image: string
    title: string
    description: string
    downloads: number
    price: string
    tech: string[]
    demoUrl: string
    downloadUrl: string
}

const TemplateGrid = ({ items }: { items: TemplateItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ image, title, description, downloads, price, tech, demoUrl, downloadUrl }, i) => (
            <Card key={i} className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                <div className="relative aspect-video overflow-hidden">
                    <Image 
                        src={image} 
                        alt={title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    {/* Price badge */}
                    <Badge 
                        className={`absolute top-3 right-3 ${
                            price === 'Free' 
                                ? 'bg-green-500' 
                                : 'bg-gradient-to-r from-primary to-accent'
                        }`}
                    >
                        {price}
                    </Badge>
                    
                    {/* Downloads */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm">
                        <Download className="size-4" />
                        {downloads.toLocaleString()}
                    </div>
                </div>
                
                <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{description}</p>
                    
                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tech.map((t, j) => (
                            <Badge key={j} variant="secondary" className="text-xs">{t}</Badge>
                        ))}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-1.5" asChild>
                            <Link href={demoUrl}>
                                <ArrowUpRight className="size-3.5" />
                                Preview
                            </Link>
                        </Button>
                        <Button size="sm" className="flex-1 gap-1.5" asChild>
                            <Link href={downloadUrl}>
                                <Download className="size-3.5" />
                                {price === 'Free' ? 'Download' : 'Buy'}
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
