import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar, Eye, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-4xl mx-auto text-center mb-10 @md:mb-12">
                    <Eyebrow text="Editorial Picks" />
                    <Title text="Handpicked Stories" highlight="Worth Your Time" />
                    <Description text="Our editors select the most impactful articles each week. Quality over quantity, insight over noise." />
                </div>
                <FeaturedGrid
                    items={[
                        {
                            title: 'The Architecture of Modern Web Apps',
                            category: 'Architecture',
                            image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600',
                            views: '12.5K',
                            likes: 847,
                            date: 'Jan 28, 2026',
                        },
                        {
                            title: 'Mastering TypeScript Generics',
                            category: 'TypeScript',
                            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600',
                            views: '8.2K',
                            likes: 523,
                            date: 'Jan 25, 2026',
                        },
                        {
                            title: 'Design Systems at Scale',
                            category: 'Design',
                            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600',
                            views: '6.8K',
                            likes: 412,
                            date: 'Jan 22, 2026',
                        },
                    ]}
                />
                <CTAWrapper>
                    <CTA label="View All Editor's Picks" href="/editors-picks" icon={ArrowRight} />
                </CTAWrapper>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge className="mb-4 @md:mb-6 bg-primary/10 text-primary border-0">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">
        {text}
    </p>
)

interface FeaturedItem {
    title: string
    category: string
    image: string
    views: string
    likes: number
    date: string
}

const FeaturedGrid = ({ items }: { items: FeaturedItem[] }) => (
    <div className="grid grid-cols-1 @md:grid-cols-3 gap-4 @md:gap-6 mb-8 @md:mb-10">
        {items.map((item) => (
            <Card key={item.title} className="group overflow-hidden border-0 shadow-lg py-0">
                <div className="relative aspect-video overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm">
                        {item.category}
                    </Badge>
                </div>
                <CardContent className="p-4 @md:p-5">
                    <h3 className="font-semibold text-lg mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <Eye className="size-4" />
                                {item.views}
                            </span>
                            <span className="flex items-center gap-1">
                                <Heart className="size-4" />
                                {item.likes}
                            </span>
                        </div>
                        <span className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            {item.date}
                        </span>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

const CTAWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="text-center">{children}</div>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <Button size="lg" variant="outline" asChild className="gap-2">
        <Link href={href}>
            {label}
            <Icon className="size-4" />
        </Link>
    </Button>
)
