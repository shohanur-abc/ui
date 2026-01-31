import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header title="Latest Articles" />
                <MasonryGrid
                    articles={[
                        {
                            title: 'Building Production-Ready React Apps',
                            excerpt: 'Learn the patterns and practices used by top engineering teams.',
                            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
                            author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/100?img=40' },
                            readTime: '12 min',
                            comments: 24,
                            size: 'large',
                        },
                        {
                            title: 'TypeScript Generics Explained',
                            excerpt: 'A practical guide to generic types.',
                            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600',
                            author: { name: 'Alex Kim', avatar: 'https://i.pravatar.cc/100?img=50' },
                            readTime: '8 min',
                            comments: 18,
                            size: 'small',
                        },
                        {
                            title: 'CSS Container Queries',
                            excerpt: 'The future of responsive design.',
                            image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
                            author: { name: 'Maria J.', avatar: 'https://i.pravatar.cc/100?img=60' },
                            readTime: '6 min',
                            comments: 12,
                            size: 'small',
                        },
                        {
                            title: 'Node.js Performance Optimization',
                            excerpt: 'Tips and tricks for faster applications.',
                            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
                            author: { name: 'John S.', avatar: 'https://i.pravatar.cc/100?img=33' },
                            readTime: '15 min',
                            comments: 32,
                            size: 'medium',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
}

const Header = ({ title }: HeaderProps) => (
    <h1 className="text-3xl @md:text-4xl font-bold mb-8">{title}</h1>
)

interface Author {
    name: string
    avatar: string
}

interface Article {
    title: string
    excerpt: string
    image: string
    author: Author
    readTime: string
    comments: number
    size: 'small' | 'medium' | 'large'
}

interface MasonryGridProps {
    articles: Article[]
}

const MasonryGrid = ({ articles }: MasonryGridProps) => (
    <div className="columns-1 @md:columns-2 @xl:columns-3 gap-6 space-y-6">
        {articles.map((article) => (
            <Link key={article.title} href="#" className="block break-inside-avoid">
                <Card className="group overflow-hidden py-0">
                    <div className={`relative ${article.size === 'large' ? 'aspect-[4/5]' : article.size === 'medium' ? 'aspect-[4/3]' : 'aspect-video'}`}>
                        <Image src={article.image} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>
                    <CardContent className="p-5">
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Avatar className="size-6">
                                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                                    <AvatarFallback className="text-[10px]">{article.author.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-xs">{article.author.name}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Clock className="size-3" />
                                    {article.readTime}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="size-3" />
                                    {article.comments}
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)
