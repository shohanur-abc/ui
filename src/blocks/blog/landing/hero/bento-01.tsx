import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, Clock, Flame, Sparkles, TrendingUp, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
                    <HeroCell
                        title="Discover Stories That Matter"
                        subtitle="Curated content from industry experts"
                        cta={{ label: 'Start Reading', href: '/articles', icon: ArrowRight }}
                        className="@md:col-span-2 @xl:row-span-2"
                    />
                    <StatCell icon={BookOpen} value="5,000+" label="Articles" className="" />
                    <StatCell icon={Users} value="125K+" label="Readers" className="" />
                    <FeaturedPostCell
                        title="React Server Components Deep Dive"
                        category="React"
                        readTime="12 min"
                        image="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400"
                        className=""
                    />
                    <TrendingCell
                        items={['TypeScript 5.0', 'Next.js 15', 'Bun Runtime', 'AI Tools']}
                        className=""
                    />
                </div>
            </div>
        </section>
    )
}

interface HeroCellProps {
    title: string
    subtitle: string
    cta: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }
    className?: string
}

const HeroCell = ({ title, subtitle, cta, className }: HeroCellProps) => (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-primary/20 via-card to-accent/10 border-primary/20 flex flex-col justify-end ${className}`}>
        <CardContent className="p-6 @md:p-8">
            <Badge className="mb-4 bg-primary text-primary-foreground">
                <Sparkles className="size-3.5 mr-1.5" />
                Welcome
            </Badge>
            <h1 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-3">
                {title}
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md">{subtitle}</p>
            <Button size="lg" asChild className="gap-2">
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
        <BentoDecorative />
    </Card>
)

const BentoDecorative = () => (
    <>
        <div className="absolute top-0 right-0 size-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 size-32 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
    </>
)

interface StatCellProps {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
    className?: string
}

const StatCell = ({ icon: Icon, value, label, className }: StatCellProps) => (
    <Card className={`flex flex-col items-center justify-center text-center transition-all hover:border-primary hover:shadow-lg ${className}`}>
        <CardContent className="p-6">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="size-7 text-primary" />
            </div>
            <p className="text-3xl @md:text-4xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </CardContent>
    </Card>
)

interface FeaturedPostCellProps {
    title: string
    category: string
    readTime: string
    image: string
    className?: string
}

const FeaturedPostCell = ({ title, category, readTime, image, className }: FeaturedPostCellProps) => (
    <Card className={`group relative overflow-hidden py-0 ${className}`}>
        <Image src={image} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <CardContent className="absolute bottom-0 left-0 right-0 p-4 @md:p-5">
            <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs bg-white/20 text-white backdrop-blur-sm border-0">
                    {category}
                </Badge>
                <span className="text-xs text-white/80 flex items-center gap-1">
                    <Clock className="size-3" />
                    {readTime}
                </span>
            </div>
            <h3 className="font-semibold text-white line-clamp-2">{title}</h3>
        </CardContent>
    </Card>
)

interface TrendingCellProps {
    items: string[]
    className?: string
}

const TrendingCell = ({ items, className }: TrendingCellProps) => (
    <Card className={`${className}`}>
        <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
                <Flame className="size-5 text-destructive" />
                <span className="font-semibold">Trending</span>
            </div>
            <div className="space-y-2">
                {items.map((item, i) => (
                    <Link
                        key={item}
                        href={`/topics/${item.toLowerCase().replace(/\s/g, '-')}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                    >
                        <span className="text-xs font-medium text-muted-foreground w-4">{i + 1}</span>
                        <span className="text-sm font-medium truncate">{item}</span>
                        <TrendingUp className="size-3.5 text-primary ml-auto" />
                    </Link>
                ))}
            </div>
        </CardContent>
    </Card>
)
