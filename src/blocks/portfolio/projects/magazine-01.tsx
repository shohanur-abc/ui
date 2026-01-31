import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Newspaper, FileText, File } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Newspaper} text="Editorial" />
                    <Title text="Magazine Layout" />
                    <Description text="Editorial-style layout inspired by print magazines." />
                </div>

                <MagazineLayout
                    featured={{
                        image: 'https://picsum.photos/seed/mag1/1200/800',
                        title: 'The Future of Digital Banking',
                        description: 'How we redesigned the banking experience for the next generation.',
                        category: 'Case Study',
                        readTime: '8 min read',
                        href: '#',
                    }}
                    articles={[
                        {
                            image: 'https://picsum.photos/seed/mag2/600/400',
                            title: 'Building Scalable E-Commerce',
                            description: 'Architecture decisions that shaped our approach.',
                            category: 'Technical',
                            readTime: '5 min',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/mag3/600/400',
                            title: 'Healthcare UX Research',
                            description: 'Understanding patient needs through empathy.',
                            category: 'Design',
                            readTime: '6 min',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/mag4/600/400',
                            title: 'AI in Content Creation',
                            description: 'Leveraging machine learning for better content.',
                            category: 'Innovation',
                            readTime: '4 min',
                            href: '#',
                        },
                    ]}
                    sidebar={[
                        { title: 'Mobile App Design Trends', category: 'Trends', href: '#' },
                        { title: 'React Server Components', category: 'Technical', href: '#' },
                        { title: 'Design System Benefits', category: 'Process', href: '#' },
                        { title: 'Client Communication', category: 'Business', href: '#' },
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

interface FeaturedArticle {
    image: string
    title: string
    description: string
    category: string
    readTime: string
    href: string
}

interface Article {
    image: string
    title: string
    description: string
    category: string
    readTime: string
    href: string
}

interface SidebarItem {
    title: string
    category: string
    href: string
}

interface MagazineLayoutProps {
    featured: FeaturedArticle
    articles: Article[]
    sidebar: SidebarItem[]
}

const MagazineLayout = ({ featured, articles, sidebar }: MagazineLayoutProps) => (
    <div className="grid @xl:grid-cols-12 gap-6 @lg:gap-8">
        {/* Featured article - spans 8 columns */}
        <div className="@xl:col-span-8">
            <Link href={featured.href} className="group block">
                <Card className="overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                    <div className="relative aspect-[16/9] overflow-hidden">
                        <Image 
                            src={featured.image} 
                            alt={featured.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        
                        <div className="absolute inset-x-0 bottom-0 p-6 @md:p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <Badge>{featured.category}</Badge>
                                <span className="text-sm text-white/70">{featured.readTime}</span>
                            </div>
                            <h3 className="text-white font-bold text-2xl @md:text-3xl @lg:text-4xl mb-2 group-hover:text-primary transition-colors">{featured.title}</h3>
                            <p className="text-white/80 text-lg max-w-2xl">{featured.description}</p>
                        </div>
                    </div>
                </Card>
            </Link>
            
            {/* Article grid below featured */}
            <div className="grid @md:grid-cols-3 gap-4 mt-6">
                {articles.map(({ image, title, description, category, readTime, href }, i) => (
                    <Link key={i} href={href} className="group block">
                        <Card className="overflow-hidden border transition-all hover:shadow-lg hover:border-primary/20 h-full p-0">
                            <div className="relative aspect-video overflow-hidden">
                                <Image 
                                    src={image} 
                                    alt={title} 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="secondary" className="text-xs">{category}</Badge>
                                    <span className="text-xs text-muted-foreground">{readTime}</span>
                                </div>
                                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors leading-tight">{title}</h4>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
        
        {/* Sidebar - spans 4 columns */}
        <div className="@xl:col-span-4">
            <Card className="p-5 sticky top-4">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <FileText className="size-5 text-primary" />
                    More Articles
                </h4>
                <div className="space-y-4">
                    {sidebar.map(({ title, category, href }, i) => (
                        <Link key={i} href={href} className="group flex items-start gap-3 py-3 border-b border-border last:border-0">
                            <span className="text-2xl font-bold text-muted-foreground/50 leading-none">{String(i + 1).padStart(2, '0')}</span>
                            <div>
                                <Badge variant="outline" className="text-xs mb-1">{category}</Badge>
                                <h5 className="font-medium text-sm group-hover:text-primary transition-colors">{title}</h5>
                            </div>
                        </Link>
                    ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4 gap-2" asChild>
                    <Link href="#all-articles">
                        View All Articles <ArrowUpRight className="size-4" />
                    </Link>
                </Button>
            </Card>
        </div>
    </div>
)
