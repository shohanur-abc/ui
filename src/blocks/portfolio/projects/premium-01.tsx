import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowUpRight, Gem, Crown, Star, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Crown} text="Premium" />
                    <Title text="Selected Works" />
                    <Description text="Handpicked projects representing our best work." />
                </div>

                <div className="grid @lg:grid-cols-12 gap-6">
                    {/* Main Featured */}
                    <div className="@lg:col-span-8">
                        <FeaturedMain
                            image="https://picsum.photos/seed/prem1/1200/800"
                            title="Enterprise Dashboard Suite"
                            description="Comprehensive analytics platform for Fortune 500 company. Full-stack development with real-time data visualization and AI-powered insights."
                            tags={['React', 'Node.js', 'PostgreSQL', 'TensorFlow']}
                            award="Awwwards Site of the Day"
                            href="#"
                        />
                    </div>

                    {/* Side Features */}
                    <div className="@lg:col-span-4 flex flex-col gap-6">
                        <FeaturedSide
                            image="https://picsum.photos/seed/prem2/600/400"
                            title="Banking Mobile App"
                            description="Award-winning fintech application."
                            award="App Store Featured"
                            href="#"
                        />
                        <FeaturedSide
                            image="https://picsum.photos/seed/prem3/600/400"
                            title="Design System"
                            description="Enterprise component library."
                            award="CSS Design Award"
                            href="#"
                        />
                    </div>
                </div>

                {/* Bottom row */}
                <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-6 mt-6">
                    <FeaturedSmall image="https://picsum.photos/seed/prem4/400/300" title="E-Commerce Platform" category="Web" href="#" />
                    <FeaturedSmall image="https://picsum.photos/seed/prem5/400/300" title="Healthcare Portal" category="SaaS" href="#" />
                    <FeaturedSmall image="https://picsum.photos/seed/prem6/400/300" title="AI Content Tool" category="AI/ML" href="#" />
                    <FeaturedSmall image="https://picsum.photos/seed/prem7/400/300" title="3D Configurator" category="WebGL" href="#" />
                </div>
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

interface FeaturedMainProps {
    image: string
    title: string
    description: string
    tags: string[]
    award: string
    href: string
}

const FeaturedMain = ({ image, title, description, tags, award, href }: FeaturedMainProps) => (
    <Card className="group h-full overflow-hidden border-2 border-primary/20 transition-all hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/40 p-0 bg-gradient-to-br from-card to-primary/5">
        <Link href={href} className="block h-full">
            <div className="relative aspect-video @lg:aspect-[4/3] overflow-hidden">
                <Image 
                    src={image} 
                    alt={title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                
                {/* Award badge */}
                <Badge className="absolute top-4 left-4 gap-1.5 bg-gradient-to-r from-yellow-600 to-amber-500 text-white">
                    <Crown className="size-3" />
                    {award}
                </Badge>
                
                {/* Premium indicator */}
                <div className="absolute top-4 right-4 size-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                    <Gem className="size-5 text-primary" />
                </div>
            </div>
            
            <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-muted-foreground mb-5">{description}</p>
                
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <Badge key={i} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                    <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
            </CardContent>
        </Link>
    </Card>
)

interface FeaturedSideProps {
    image: string
    title: string
    description: string
    award: string
    href: string
}

const FeaturedSide = ({ image, title, description, award, href }: FeaturedSideProps) => (
    <Card className="group flex-1 overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
        <Link href={href} className="block h-full">
            <div className="relative aspect-video overflow-hidden">
                <Image 
                    src={image} 
                    alt={title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                <Badge className="absolute top-3 left-3 gap-1 bg-yellow-600/90">
                    <Star className="size-3 fill-current" />
                    {award}
                </Badge>
            </div>
            
            <CardContent className="p-4">
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Link>
    </Card>
)

interface FeaturedSmallProps {
    image: string
    title: string
    category: string
    href: string
}

const FeaturedSmall = ({ image, title, category, href }: FeaturedSmallProps) => (
    <Link href={href} className="group">
        <Card className="overflow-hidden border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20 p-0">
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image 
                    src={image} 
                    alt={title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <Badge className="absolute top-2 left-2 text-xs">{category}</Badge>
            </div>
            <CardContent className="p-3">
                <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors truncate">{title}</h4>
                    <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
            </CardContent>
        </Card>
    </Link>
)
