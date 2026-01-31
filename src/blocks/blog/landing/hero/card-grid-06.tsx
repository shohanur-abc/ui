import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, Clock, PlayCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header
                    title="Popular Series"
                    description="Deep-dive article collections on focused topics"
                />
                <SeriesGrid
                    series={[
                        {
                            title: 'React Mastery',
                            description: 'From basics to advanced patterns',
                            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600',
                            parts: 12,
                            duration: '4h 30m',
                        },
                        {
                            title: 'TypeScript Deep Dive',
                            description: 'Everything you need to know about TS',
                            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600',
                            parts: 8,
                            duration: '2h 45m',
                        },
                        {
                            title: 'CSS Architecture',
                            description: 'Scalable styling strategies',
                            image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600',
                            parts: 6,
                            duration: '1h 50m',
                        },
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
    <div className="text-center mb-10">
        <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <BookOpen className="size-3.5 mr-1.5" />
            Learning Paths
        </Badge>
        <h1 className="text-3xl @md:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
    </div>
)

interface Series {
    title: string
    description: string
    image: string
    parts: number
    duration: string
}

interface SeriesGridProps {
    series: Series[]
}

const SeriesGrid = ({ series }: SeriesGridProps) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
        {series.map((s) => (
            <Card key={s.title} className="group overflow-hidden py-0">
                <div className="relative aspect-video">
                    <Image src={s.image} alt={s.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="size-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="size-7 text-primary" />
                        </div>
                    </div>
                    <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-3 text-xs text-white/80">
                            <span className="flex items-center gap-1">
                                <BookOpen className="size-3" />
                                {s.parts} parts
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock className="size-3" />
                                {s.duration}
                            </span>
                        </div>
                    </CardContent>
                </div>
                <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
                    <Button size="sm" variant="outline" className="w-full gap-2">
                        Start Series
                        <ArrowRight className="size-3.5" />
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
