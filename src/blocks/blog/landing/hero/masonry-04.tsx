import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header
                    title="Learning Paths"
                    description="Curated article collections for focused learning"
                />
                <MasonryGrid
                    series={[
                        { title: 'React Fundamentals', articles: 12, duration: '4h 30m', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600', progress: 75, height: 'h-72' },
                        { title: 'TypeScript Deep Dive', articles: 8, duration: '2h 45m', image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600', progress: 30, height: 'h-56' },
                        { title: 'CSS Architecture', articles: 6, duration: '1h 50m', image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600', progress: 0, height: 'h-64' },
                        { title: 'API Design', articles: 10, duration: '3h 20m', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600', progress: 100, height: 'h-80' },
                        { title: 'Testing Best Practices', articles: 7, duration: '2h 10m', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600', progress: 50, height: 'h-52' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
    description: string
}

const Header = ({ title, description }: HeaderProps) => (
    <div className="mb-10">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="size-3.5 mr-1.5" />
            Series
        </Badge>
        <h1 className="text-3xl @md:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground max-w-lg">{description}</p>
    </div>
)

interface Series {
    title: string
    articles: number
    duration: string
    image: string
    progress: number
    height: string
}

interface MasonryGridProps {
    series: Series[]
}

const MasonryGrid = ({ series }: MasonryGridProps) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
        {series.map((s) => (
            <Link key={s.title} href="#" className="block break-inside-avoid">
                <Card className="group overflow-hidden py-0">
                    <div className={`relative ${s.height}`}>
                        <Image src={s.image} alt={s.title} fill className="object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        {s.progress > 0 && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-black/30">
                                <div className="h-full bg-primary transition-all" style={{ width: `${s.progress}%` }} />
                            </div>
                        )}
                        <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                            {s.progress === 100 && (
                                <Badge className="mb-2 bg-primary text-primary-foreground border-0 text-xs">
                                    Completed
                                </Badge>
                            )}
                            <h3 className="font-semibold text-lg text-white mb-2">
                                {s.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-white/70">
                                <span className="flex items-center gap-1">
                                    <BookOpen className="size-3" />
                                    {s.articles} parts
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="size-3" />
                                    {s.duration}
                                </span>
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </Link>
        ))}
    </div>
)
