import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, Clock, Flame, PlayCircle, Sparkles, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @md:grid-cols-3 @xl:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
                    <HeroCell
                        title="Learn Without Limits"
                        cta={{ label: 'Start Free', href: '/start' }}
                        className="@md:col-span-2 row-span-2"
                    />
                    <FeaturedVideoCell
                        title="Intro to TypeScript"
                        duration="12:45"
                        thumbnail="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400"
                        className="row-span-2"
                    />
                    <QuickStatCell icon={BookOpen} value="2,500+" label="Free Articles" className="" />
                    <TrendingListCell
                        items={[
                            { title: 'React 19 Features', change: '+42%' },
                            { title: 'CSS Container Queries', change: '+28%' },
                            { title: 'Bun 2.0 Guide', change: '+35%' },
                        ]}
                        className="@xl:col-span-2"
                    />
                    <QuickStatCell icon={PlayCircle} value="500+" label="Video Tutorials" className="" />
                </div>
            </div>
        </section>
    )
}

interface HeroCellProps {
    title: string
    cta: { label: string; href: string }
    className?: string
}

const HeroCell = ({ title, cta, className }: HeroCellProps) => (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-primary/20 via-card to-accent/10 border-primary/20 flex flex-col justify-end ${className}`}>
        <CardContent className="p-6 @md:p-8">
            <Badge className="mb-4 bg-primary text-primary-foreground">
                <Sparkles className="size-3.5 mr-1.5" />
                Free Access
            </Badge>
            <h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
                {title}
            </h1>
            <p className="text-muted-foreground mb-6 max-w-sm">
                Access thousands of tutorials, articles, and resources. No credit card required.
            </p>
            <Button size="lg" asChild className="gap-2">
                <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4" />
                </Link>
            </Button>
        </CardContent>
        <BentoDecorative />
    </Card>
)

const BentoDecorative = () => (
    <>
        <div className="absolute top-0 right-0 size-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 size-40 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
    </>
)

interface FeaturedVideoCellProps {
    title: string
    duration: string
    thumbnail: string
    className?: string
}

const FeaturedVideoCell = ({ title, duration, thumbnail, className }: FeaturedVideoCellProps) => (
    <Card className={`group relative overflow-hidden cursor-pointer py-0 ${className}`}>
        <Image src={thumbnail} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-16 rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110">
                <PlayCircle className="size-8 text-primary ml-0.5" />
            </div>
        </div>
        <CardContent className="absolute bottom-0 left-0 right-0 p-4 @md:p-5">
            <Badge className="mb-2 bg-white/20 text-white backdrop-blur-sm border-0 text-xs">
                <Clock className="size-3 mr-1" />
                {duration}
            </Badge>
            <h3 className="font-semibold text-white">{title}</h3>
        </CardContent>
    </Card>
)

interface QuickStatCellProps {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
    className?: string
}

const QuickStatCell = ({ icon: Icon, value, label, className }: QuickStatCellProps) => (
    <Card className={`flex flex-col items-center justify-center text-center transition-all hover:border-primary ${className}`}>
        <CardContent className="p-5">
            <Icon className="size-8 text-primary mb-3" />
            <p className="text-2xl @md:text-3xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </CardContent>
    </Card>
)

interface TrendingItem {
    title: string
    change: string
}

interface TrendingListCellProps {
    items: TrendingItem[]
    className?: string
}

const TrendingListCell = ({ items, className }: TrendingListCellProps) => (
    <Card className={`${className}`}>
        <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
                <Flame className="size-5 text-destructive" />
                <span className="font-semibold">Trending Now</span>
            </div>
            <div className="space-y-3">
                {items.map((item, i) => (
                    <Link
                        key={item.title}
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-muted-foreground">{i + 1}</span>
                            <span className="font-medium text-sm">{item.title}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs text-green-600">
                            <TrendingUp className="size-3 mr-1" />
                            {item.change}
                        </Badge>
                    </Link>
                ))}
            </div>
        </CardContent>
    </Card>
)
