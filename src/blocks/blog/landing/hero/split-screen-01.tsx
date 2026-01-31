import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Calendar, Clock, TrendingUp } from 'lucide-react'
import Image from 'next/image'



export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-background py-12 @md:py-16 @xl:py-20 @3xl:py-24">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5" />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8">
                <div className="mb-8 @md:mb-10 @xl:mb-12 flex flex-col items-start justify-between gap-4 @md:gap-6 @xl:flex-row @xl:items-center">
                    <div>
                        <Eyebrow icon={TrendingUp} text="Featured Story" />
                        <Title text="Discover Ideas That Inspire" />
                    </div>
                    <TopicList items={['React 19', 'AI Tools', 'TypeScript', 'Edge Computing', 'Web3']} />
                </div>
                <Featured post={{
                    title: 'The Future of Web Development: What to Expect in 2025',
                    excerpt: 'Exploring the cutting-edge technologies and trends that will shape how we build for the web, from AI-assisted coding to edge computing.',
                    category: 'Technology',
                    readTime: '8 min read',
                    date: 'Mar 15, 2024',
                    author: {
                        name: 'Sarah Chen',
                        avatar: 'https://thumbs.dreamstime.com/b/white-chicken-headshot-tilted-head-dark-background-feathered-detailed-posture-343331892.jpg?w=100',
                        role: 'Senior Editor',
                    },
                    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
                }} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-3 @md:mb-4">
        <Icon className="mr-1.5 size-3" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight">
        {text.split(' ').slice(0, -1).join(' ')}
        <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {' '}
            {text.split(' ').pop()}
        </span>
    </h1>
)

interface TopicListProps {
    items: string[]
}

const TopicList = ({ items }: TopicListProps) => (
    <div className="flex flex-wrap gap-2">
        {items.map((topic) => (
            <Badge key={topic} variant="outline" className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground">
                {topic}
            </Badge>
        ))}
    </div>
)

interface Author {
    name: string
    avatar: string
    role: string
}

interface Post {
    title: string
    excerpt: string
    category: string
    readTime: string
    date: string
    author: Author
    image: string
}

interface FeaturedProps {
    post: Post
}

const Featured = ({ post }: FeaturedProps) => (
    <article className="group relative overflow-hidden rounded-2xl border bg-card">
        <div className="grid gap-0 @3xl:grid-cols-2">
            <PostImage post={post} />
            <PostContent post={post} />
        </div>
    </article>
)

interface PostImageProps {
    post: Post
}

const PostImage = ({ post }: PostImageProps) => (
    <div className="relative aspect-video @3xl:aspect-auto overflow-hidden">
        <Image
            src={post.image}
            alt={post.title}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent @3xl:bg-linear-to-r @3xl:from-transparent @3xl:via-transparent @3xl:to-black/20" />
        <Badge className="absolute left-4 top-4 bg-primary/90 backdrop-blur-sm">{post.category}</Badge>
    </div>
)

const PostContent = ({ post }: PostImageProps) => (
    <div className="flex flex-col justify-center p-5 @sm:p-6 @md:p-8 @xl:p-10">
        <PostMeta date={post.date} readTime={post.readTime} />
        <h2 className="mb-3 @md:mb-4 text-xl @sm:text-2xl @md:text-3xl @xl:text-4xl font-bold leading-tight tracking-tight">
            {post.title}
        </h2>
        <p className="mb-5 @md:mb-6 text-base @md:text-lg text-muted-foreground">{post.excerpt}</p>
        <div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
            <AuthorCard author={post.author} />
            <Button className="group/btn">
                <BookOpen className="mr-2 size-4" />
                Read Article
                <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
            </Button>
        </div>
    </div>
)

interface PostMetaProps {
    date: string
    readTime: string
}

const PostMeta = ({ date, readTime }: PostMetaProps) => (
    <div className="mb-3 @md:mb-4 flex flex-wrap items-center gap-3 @md:gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            {date}
        </span>
        <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {readTime}
        </span>
    </div>
)

interface AuthorCardProps {
    author: Author
}

const AuthorCard = ({ author }: AuthorCardProps) => (
    <div className="flex items-center gap-3">
        <Avatar className="size-9 @md:size-10 border-2 border-primary/20">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
            <p className="font-medium">{author.name}</p>
            <p className="text-sm text-muted-foreground">{author.role}</p>
        </div>
    </div>
)
