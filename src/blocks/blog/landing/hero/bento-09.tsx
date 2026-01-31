import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Clock, Flame, Newspaper, Sparkles, Tag, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="slate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @md:grid-cols-3 @xl:grid-cols-4 gap-4 auto-rows-[minmax(140px,auto)]">
                    <HeroCell
                        title="Today's Top Stories"
                        className="@md:col-span-2 row-span-2"
                    />
                    <FeaturedArticleCell
                        title="AI Revolution in 2026"
                        image="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400"
                        time="2h ago"
                        className="row-span-2"
                    />
                    <TagCell tag="Breaking" count={5} hot className="" />
                    <QuickLinkCell icon={Newspaper} label="All News" href="/news" className="" />
                    <LatestCell
                        items={[
                            'New JavaScript runtime released',
                            'React 20 announcement expected',
                            'Web3 adoption slowing down',
                        ]}
                        className="@xl:col-span-2"
                    />
                </div>
            </div>
        </section>
    )
}

interface HeroCellProps {
    title: string
    className?: string
}

const HeroCell = ({ title, className }: HeroCellProps) => (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-transparent flex flex-col justify-center ${className}`}>
        <CardContent className="p-6 @md:p-8">
            <Badge className="mb-4 bg-destructive/10 text-destructive border-0">
                <Flame className="size-3.5 mr-1.5" />
                Breaking News
            </Badge>
            <h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
                {title}
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                Stay informed with the latest tech news, breaking stories, and industry updates.
            </p>
            <Button size="lg" asChild className="gap-2">
                <Link href="/news">
                    Read More
                    <ArrowRight className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

interface FeaturedArticleCellProps {
    title: string
    image: string
    time: string
    className?: string
}

const FeaturedArticleCell = ({ title, image, time, className }: FeaturedArticleCellProps) => (
    <Card className={`group relative overflow-hidden cursor-pointer py-0 ${className}`}>
        <Image src={image} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <CardContent className="absolute bottom-0 left-0 right-0 p-5">
            <Badge className="mb-2 bg-white/20 text-white backdrop-blur-sm border-0 text-xs">
                <Clock className="size-3 mr-1" />
                {time}
            </Badge>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </CardContent>
    </Card>
)

interface TagCellProps {
    tag: string
    count: number
    hot?: boolean
    className?: string
}

const TagCell = ({ tag, count, hot, className }: TagCellProps) => (
    <Card className={`flex items-center justify-center text-center transition-all hover:border-destructive cursor-pointer ${className}`}>
        <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
                {hot && <Flame className="size-4 text-destructive" />}
                <Tag className="size-4 text-muted-foreground" />
            </div>
            <p className="font-bold text-lg">{tag}</p>
            <p className="text-xs text-muted-foreground">{count} new stories</p>
        </CardContent>
    </Card>
)

interface QuickLinkCellProps {
    icon: React.ComponentType<{ className?: string }>
    label: string
    href: string
    className?: string
}

const QuickLinkCell = ({ icon: Icon, label, href, className }: QuickLinkCellProps) => (
    <Link href={href}>
        <Card className={`h-full flex items-center justify-center text-center transition-all hover:border-primary hover:shadow-lg ${className}`}>
            <CardContent className="p-4">
                <Icon className="size-6 text-primary mx-auto mb-2" />
                <p className="font-medium text-sm">{label}</p>
            </CardContent>
        </Card>
    </Link>
)

interface LatestCellProps {
    items: string[]
    className?: string
}

const LatestCell = ({ items, className }: LatestCellProps) => (
    <Card className={`${className}`}>
        <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="size-5 text-primary" />
                <span className="font-semibold">Latest Updates</span>
            </div>
            <ul className="space-y-3">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs shrink-0">
                            {i + 1}
                        </span>
                        <span className="line-clamp-1">{item}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
    </Card>
)
