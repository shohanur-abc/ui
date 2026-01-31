import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Clock, Sparkles, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @xl:grid-cols-12 gap-6 @xl:gap-8 items-center">
                    <ContentBlock
                        eyebrow="Featured Post"
                        title="The Complete Guide to Modern JavaScript"
                        description="Everything you need to know about ES2026, modules, async patterns, and more."
                        cta={{ label: 'Read Article', href: '/article/js-guide' }}
                        className="@xl:col-span-5"
                    />
                    <FeaturedCardGroup
                        main={{
                            title: 'React Server Components Explained',
                            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
                            readTime: '12 min',
                        }}
                        secondary={{
                            title: 'CSS Container Queries',
                            image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=400',
                            readTime: '5 min',
                        }}
                        tertiary={{
                            title: 'TypeScript 5.0',
                            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
                            readTime: '8 min',
                        }}
                        className="@xl:col-span-7"
                    />
                </div>
            </div>
        </section>
    )
}

interface ContentBlockProps {
    eyebrow: string
    title: string
    description: string
    cta: { label: string; href: string }
    className?: string
}

const ContentBlock = ({ eyebrow, title, description, cta, className }: ContentBlockProps) => (
    <div className={className}>
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="size-3.5 mr-1.5" />
            {eyebrow}
        </Badge>
        <h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-md">
            {description}
        </p>
        <Button size="lg" asChild className="gap-2">
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

interface FeaturedCard {
    title: string
    image: string
    readTime: string
}

interface FeaturedCardGroupProps {
    main: FeaturedCard
    secondary: FeaturedCard
    tertiary: FeaturedCard
    className?: string
}

const FeaturedCardGroup = ({ main, secondary, tertiary, className }: FeaturedCardGroupProps) => (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
        <Card className="col-span-2 @lg:col-span-1 @lg:row-span-2 group overflow-hidden py-0">
            <div className="relative aspect-[4/3] @lg:aspect-auto @lg:h-full min-h-[300px]">
                <Image src={main.image} alt={main.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-5">
                    <Badge className="mb-2 bg-white/20 text-white backdrop-blur-sm border-0 text-xs">
                        <TrendingUp className="size-3 mr-1" />
                        Trending
                    </Badge>
                    <h3 className="text-xl font-bold text-white mb-2">{main.title}</h3>
                    <span className="text-sm text-white/70 flex items-center gap-1">
                        <Clock className="size-3" />
                        {main.readTime}
                    </span>
                </CardContent>
            </div>
        </Card>
        <Card className="group overflow-hidden py-0">
            <div className="relative aspect-video">
                <Image src={secondary.image} alt={secondary.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-white text-sm">{secondary.title}</h3>
                    <span className="text-xs text-white/70">{secondary.readTime}</span>
                </CardContent>
            </div>
        </Card>
        <Card className="group overflow-hidden py-0">
            <div className="relative aspect-video">
                <Image src={tertiary.image} alt={tertiary.title} fill className="object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-semibold text-white text-sm">{tertiary.title}</h3>
                    <span className="text-xs text-white/70">{tertiary.readTime}</span>
                </CardContent>
            </div>
        </Card>
    </div>
)
