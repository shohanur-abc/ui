import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, Bookmark, BookmarkCheck, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <div className="max-w-2xl">
                        <Eyebrow icon={Bookmark} text="Saved" />
                        <Title text="Bookmarked Projects" />
                        <Description text="Your saved projects and favorites." />
                    </div>
                    <Button variant="outline" className="gap-2 w-fit" asChild>
                        <Link href="#all">
                            View All <ArrowUpRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <BookmarkGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/book1/600/400',
                            title: 'E-Commerce Platform',
                            description: 'Full-featured online store with inventory management.',
                            savedDate: '2 days ago',
                            likes: 234,
                            category: 'Web',
                            isBookmarked: true,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/book2/600/400',
                            title: 'Mobile Banking App',
                            description: 'Secure banking application with biometric auth.',
                            savedDate: '1 week ago',
                            likes: 156,
                            category: 'Mobile',
                            isBookmarked: true,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/book3/600/400',
                            title: 'Analytics Dashboard',
                            description: 'Real-time data visualization platform.',
                            savedDate: '2 weeks ago',
                            likes: 312,
                            category: 'SaaS',
                            isBookmarked: true,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/book4/600/400',
                            title: 'Design System',
                            description: 'Comprehensive component library.',
                            savedDate: '3 weeks ago',
                            likes: 478,
                            category: 'UI/UX',
                            isBookmarked: true,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/book5/600/400',
                            title: 'AI Content Tool',
                            description: 'GPT-powered content generation.',
                            savedDate: '1 month ago',
                            likes: 521,
                            category: 'AI/ML',
                            isBookmarked: true,
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/book6/600/400',
                            title: 'Healthcare Portal',
                            description: 'Patient management system.',
                            savedDate: '1 month ago',
                            likes: 198,
                            category: 'Healthcare',
                            isBookmarked: true,
                            href: '#',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex items-center gap-2 mb-3 text-primary">
        <Icon className="size-4" />
        <span className="text-sm font-medium uppercase tracking-wider">{text}</span>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface BookmarkItem {
    image: string
    title: string
    description: string
    savedDate: string
    likes: number
    category: string
    isBookmarked: boolean
    href: string
}

const BookmarkGrid = ({ items }: { items: BookmarkItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ image, title, description, savedDate, likes, category, isBookmarked, href }, i) => (
            <Card key={i} className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                <div className="relative aspect-video overflow-hidden">
                    <Image 
                        src={image} 
                        alt={title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    
                    {/* Category */}
                    <Badge className="absolute top-3 left-3">{category}</Badge>
                    
                    {/* Bookmark button */}
                    <Button 
                        variant="secondary" 
                        size="icon-sm" 
                        className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm"
                    >
                        {isBookmarked ? (
                            <BookmarkCheck className="size-4 text-primary fill-primary" />
                        ) : (
                            <Bookmark className="size-4" />
                        )}
                    </Button>
                </div>
                
                <CardContent className="p-4">
                    <Link href={href} className="block">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
                        
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Saved {savedDate}</span>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Heart className="size-4" />
                                <span>{likes}</span>
                            </div>
                        </div>
                    </Link>
                </CardContent>
            </Card>
        ))}
    </div>
)
