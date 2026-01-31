import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, Clock, Flame, Sparkles, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @lg:grid-cols-12 gap-6 @xl:gap-8">
                    <FeaturedLarge
                        article={{
                            title: 'The Future of AI in Software Development',
                            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
                            category: 'AI',
                            readTime: '15 min',
                        }}
                        className="@lg:col-span-8"
                    />
                    <Sidebar
                        trending={[
                            { title: 'React 20 Features', views: '12.5K' },
                            { title: 'TypeScript Tips', views: '8.2K' },
                            { title: 'Next.js Performance', views: '6.7K' },
                            { title: 'CSS in 2026', views: '5.4K' },
                        ]}
                        className="@lg:col-span-4"
                    />
                </div>
            </div>
        </section>
    )
}

interface Article {
    title: string
    image: string
    category: string
    readTime: string
}

interface FeaturedLargeProps {
    article: Article
    className?: string
}

const FeaturedLarge = ({ article, className }: FeaturedLargeProps) => (
    <Card className={`group overflow-hidden py-0 ${className}`}>
        <div className="relative aspect-[16/9] @lg:aspect-[16/10]">
            <Image src={article.image} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <CardContent className="absolute bottom-0 left-0 right-0 p-6 @md:p-8 @xl:p-10">
                <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-destructive text-destructive-foreground border-0">
                        <Flame className="size-3 mr-1" />
                        Hot
                    </Badge>
                    <Badge className="bg-white/20 text-white backdrop-blur-sm border-0">
                        {article.category}
                    </Badge>
                </div>
                <h1 className="text-2xl @md:text-3xl @xl:text-4xl font-bold text-white mb-4 max-w-2xl">
                    {article.title}
                </h1>
                <div className="flex items-center gap-6">
                    <span className="text-sm text-white/70 flex items-center gap-1">
                        <Clock className="size-4" />
                        {article.readTime} read
                    </span>
                    <Button variant="secondary" asChild className="gap-2">
                        <Link href="/article">
                            Read Now
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </div>
    </Card>
)

interface TrendingItem {
    title: string
    views: string
}

interface SidebarProps {
    trending: TrendingItem[]
    className?: string
}

const Sidebar = ({ trending, className }: SidebarProps) => (
    <div className={`flex flex-col gap-4 ${className}`}>
        <Card className="flex-1">
            <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="size-5 text-primary" />
                    <span className="font-semibold">Trending Now</span>
                </div>
                <div className="space-y-4">
                    {trending.map((item, i) => (
                        <Link
                            key={item.title}
                            href="#"
                            className="flex items-center gap-3 group"
                        >
                            <span className="text-2xl font-bold text-muted-foreground w-8">{i + 1}</span>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate group-hover:text-primary transition-colors">
                                    {item.title}
                                </p>
                                <p className="text-xs text-muted-foreground">{item.views} views</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-primary/10 to-card">
            <CardContent className="p-5">
                <BookOpen className="size-8 text-primary mb-3" />
                <p className="font-semibold mb-1">Free Reading</p>
                <p className="text-sm text-muted-foreground mb-4">Access 1000+ articles free</p>
                <Button size="sm" className="w-full">Get Started</Button>
            </CardContent>
        </Card>
    </div>
)
