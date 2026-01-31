import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Clock, Flame, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="emerald">
            <div className="relative mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="flex flex-col items-center text-center gap-6">
                    <Eyebrow label="Trending Now" icon={Flame} />
                    <Title text="Hot Topics in Tech" />
                    <Description text="Catch up on the most-read articles this week" />
                    <CTA label="View All Trending" href="/trending" />
                    <TrendingCards
                        articles={[
                            {
                                title: 'React 20: Everything You Need to Know',
                                image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
                                readTime: '8 min',
                                hot: true,
                            },
                            {
                                title: 'CSS Container Queries Are Here',
                                image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400',
                                readTime: '5 min',
                                hot: false,
                            },
                            {
                                title: 'The Future of AI in Development',
                                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
                                readTime: '12 min',
                                hot: true,
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface EyebrowProps {
    label: string
    icon: React.ComponentType<{ className?: string }>
}

const Eyebrow = ({ label, icon: Icon }: EyebrowProps) => (
    <Badge className="bg-destructive/10 text-destructive border-destructive/20 px-4 py-1.5">
        <Icon className="size-3.5 mr-2" />
        {label}
    </Badge>
)

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
        {text}
    </h1>
)

interface DescriptionProps {
    text: string
}

const Description = ({ text }: DescriptionProps) => (
    <p className="text-lg text-muted-foreground">
        {text}
    </p>
)

interface CTAProps {
    label: string
    href: string
}

const CTA = ({ label, href }: CTAProps) => (
    <Button size="lg" asChild className="gap-2">
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

interface Article {
    title: string
    image: string
    readTime: string
    hot: boolean
}

interface TrendingCardsProps {
    articles: Article[]
}

const TrendingCards = ({ articles }: TrendingCardsProps) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-4 mt-6 w-full">
        {articles.map((article, i) => (
            <Card key={article.title} className="group overflow-hidden py-0">
                <div className="relative aspect-video">
                    <Image src={article.image} alt={article.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 left-3 flex gap-2">
                        <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm border-0 text-[10px]">
                            #{i + 1}
                        </Badge>
                        {article.hot && (
                            <Badge className="bg-destructive text-destructive-foreground border-0 text-[10px]">
                                <Flame className="size-2.5 mr-1" />
                                Hot
                            </Badge>
                        )}
                    </div>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
                        {article.title}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {article.readTime} read
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
