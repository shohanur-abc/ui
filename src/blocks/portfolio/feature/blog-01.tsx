import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10 @md:mb-14">
                    <div>
                        <Badge variant="outline" className="mb-3 @md:mb-4">Blog</Badge>
                        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">Latest Articles</h2>
                    </div>
                    <Link
                        href="#blog"
                        className="flex items-center gap-2 text-sm @md:text-base font-medium text-primary hover:underline"
                    >
                        View all posts
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                <BlogGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/blog1/800/500',
                            title: 'Building a Design System from Scratch',
                            excerpt: 'A comprehensive guide to creating consistent, scalable component libraries.',
                            date: 'Jan 15, 2024',
                            readTime: '8 min read',
                            category: 'Design Systems',
                        },
                        {
                            image: 'https://picsum.photos/seed/blog2/800/500',
                            title: 'Server Components: A Deep Dive',
                            excerpt: 'Understanding the architecture behind React Server Components.',
                            date: 'Jan 8, 2024',
                            readTime: '12 min read',
                            category: 'React',
                        },
                        {
                            image: 'https://picsum.photos/seed/blog3/800/500',
                            title: 'TypeScript Tips for Better Code',
                            excerpt: 'Advanced patterns to improve your TypeScript skills.',
                            date: 'Dec 28, 2023',
                            readTime: '6 min read',
                            category: 'TypeScript',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface BlogItem {
    image: string
    title: string
    excerpt: string
    date: string
    readTime: string
    category: string
}

const BlogGrid = ({ items }: { items: BlogItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ image, title, excerpt, date, readTime, category }, i) => (
            <Card key={i} className="py-0 overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
                <div className="relative aspect-[16/10]">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                        <Badge variant="secondary">{category}</Badge>
                    </div>
                </div>
                <CardContent className="p-4 @md:p-5">
                    <h3 className="font-bold text-base @md:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="size-3.5" />
                            {date}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            {readTime}
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
