import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Clock, Flame, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="emerald">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header
                    title="Trending This Week"
                    icon={TrendingUp}
                />
                <ArticleGrid
                    articles={[
                        { title: 'AI in Software Development', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600', readTime: '15 min', rank: 1, hot: true },
                        { title: 'React 20 First Look', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', readTime: '8 min', rank: 2, hot: true },
                        { title: 'CSS Container Queries', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600', readTime: '6 min', rank: 3, hot: false },
                        { title: 'Bun 2.0 Performance', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600', readTime: '10 min', rank: 4, hot: false },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
    icon: React.ComponentType<{ className?: string }>
}

const Header = ({ title, icon: Icon }: HeaderProps) => (
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="size-5 text-primary" />
            </div>
            <h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
        </div>
        <Button variant="outline" asChild className="gap-1">
            <Link href="/trending">
                See All
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

interface Article {
    title: string
    image: string
    readTime: string
    rank: number
    hot: boolean
}

interface ArticleGridProps {
    articles: Article[]
}

const ArticleGrid = ({ articles }: ArticleGridProps) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {articles.map((article) => (
            <Card key={article.title} className="group relative overflow-hidden py-0">
                <div className="relative aspect-[4/3]">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <Badge variant="secondary" className="bg-white/90 text-foreground font-bold">
                            #{article.rank}
                        </Badge>
                        {article.hot && (
                            <Badge className="bg-destructive text-destructive-foreground border-0">
                                <Flame className="size-3 mr-1" />
                                Hot
                            </Badge>
                        )}
                    </div>
                    <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="font-semibold text-white mb-2 line-clamp-2">
                            {article.title}
                        </h3>
                        <span className="text-sm text-white/70 flex items-center gap-1">
                            <Clock className="size-3" />
                            {article.readTime}
                        </span>
                    </CardContent>
                </div>
            </Card>
        ))}
    </div>
)
