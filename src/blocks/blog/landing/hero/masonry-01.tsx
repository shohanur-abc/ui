import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header
                    title="Explore Our Stories"
                    description="Discover articles that inspire and inform"
                />
                <MasonryGrid
                    articles={[
                        { title: 'The Art of React Composition', category: 'React', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', readTime: '8 min', size: 'tall' },
                        { title: 'TypeScript Tips', category: 'TypeScript', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600', readTime: '5 min', size: 'normal' },
                        { title: 'CSS Grid Mastery', category: 'CSS', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600', readTime: '12 min', size: 'normal' },
                        { title: 'Building Scalable APIs', category: 'Backend', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600', readTime: '15 min', size: 'tall' },
                        { title: 'Mobile First Design', category: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600', readTime: '7 min', size: 'normal' },
                        { title: 'DevOps Essentials', category: 'DevOps', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600', readTime: '10 min', size: 'normal' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
    description: string
}

const Header = ({ title, description }: HeaderProps) => (
    <div className="text-center mb-10">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="size-3.5 mr-1.5" />
            Featured
        </Badge>
        <h1 className="text-3xl @md:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
    </div>
)

interface Article {
    title: string
    category: string
    image: string
    readTime: string
    size: 'normal' | 'tall'
}

interface MasonryGridProps {
    articles: Article[]
}

const MasonryGrid = ({ articles }: MasonryGridProps) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
        {articles.map((article) => (
            <Link key={article.title} href="#" className="block break-inside-avoid">
                <Card className="group overflow-hidden py-0">
                    <div className={`relative ${article.size === 'tall' ? 'aspect-[3/4]' : 'aspect-video'}`}>
                        <Image src={article.image} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <Badge className="absolute top-3 left-3 bg-black/50 text-white backdrop-blur-sm border-0 text-xs">
                            {article.category}
                        </Badge>
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
            </Link>
        ))}
    </div>
)
