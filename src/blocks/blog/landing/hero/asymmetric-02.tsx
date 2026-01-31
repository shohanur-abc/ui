import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @xl:grid-cols-5 gap-6 @xl:gap-10">
                    <LeftColumn
                        title="Learn From the Best"
                        description="In-depth tutorials from industry experts"
                        authors={[
                            { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/100?img=40', role: 'React Expert', articles: 127 },
                            { name: 'Alex Kim', avatar: 'https://i.pravatar.cc/100?img=50', role: 'Full Stack', articles: 89 },
                        ]}
                        className="@xl:col-span-2"
                    />
                    <RightColumn
                        featured={{
                            title: 'Building Production-Ready React Apps',
                            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
                            author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/100?img=40' },
                            rating: 4.9,
                        }}
                        className="@xl:col-span-3"
                    />
                </div>
            </div>
        </section>
    )
}

interface Author {
    name: string
    avatar: string
    role: string
    articles: number
}

interface LeftColumnProps {
    title: string
    description: string
    authors: Author[]
    className?: string
}

const LeftColumn = ({ title, description, authors, className }: LeftColumnProps) => (
    <div className={`flex flex-col justify-center ${className}`}>
        <Badge variant="secondary" className="w-fit mb-4">
            <Sparkles className="size-3.5 mr-1.5" />
            Top Authors
        </Badge>
        <h1 className="text-3xl @md:text-4xl font-bold tracking-tight mb-3">
            {title}
        </h1>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="space-y-4">
            {authors.map((author) => (
                <Card key={author.name} className="group cursor-pointer transition-all hover:border-primary">
                    <CardContent className="p-4 flex items-center gap-4">
                        <Avatar className="size-12 ring-2 ring-primary/10">
                            <AvatarImage src={author.avatar} alt={author.name} />
                            <AvatarFallback>{author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{author.name}</p>
                            <p className="text-sm text-muted-foreground">{author.role}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium">{author.articles}</p>
                            <p className="text-xs text-muted-foreground">articles</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
        <Button asChild className="gap-2 mt-6 w-fit">
            <Link href="/authors">
                View All Authors
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

interface Featured {
    title: string
    image: string
    author: { name: string; avatar: string }
    rating: number
}

interface RightColumnProps {
    featured: Featured
    className?: string
}

const RightColumn = ({ featured, className }: RightColumnProps) => (
    <div className={className}>
        <Card className="group overflow-hidden py-0">
            <div className="relative aspect-[16/10]">
                <Image src={featured.image} alt={featured.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
                    <Badge className="mb-4 bg-white/20 text-white backdrop-blur-sm border-0">
                        <BookOpen className="size-3.5 mr-1.5" />
                        Featured Course
                    </Badge>
                    <h2 className="text-2xl @md:text-3xl font-bold text-white mb-4">
                        {featured.title}
                    </h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-10 ring-2 ring-white/30">
                                <AvatarImage src={featured.author.avatar} alt={featured.author.name} />
                                <AvatarFallback className="text-xs">{featured.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-white font-medium">{featured.author.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-4 ${i < Math.floor(featured.rating) ? 'fill-amber-500 text-amber-500' : 'text-white/30'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-white font-medium">{featured.rating}</span>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    </div>
)
