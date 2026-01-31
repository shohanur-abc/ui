import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Clock, Headphones, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header title="Podcast Episodes" />
                <MasonryGrid
                    episodes={[
                        { number: 127, title: 'The Future of Web Development', guest: 'Dan Abramov', duration: '58 min', image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600', featured: true, height: 'h-80' },
                        { number: 126, title: 'Building at Scale', guest: 'Guillermo Rauch', duration: '1h 12m', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600', featured: false, height: 'h-56' },
                        { number: 125, title: 'TypeScript Tips', guest: 'Matt Pocock', duration: '45 min', image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=600', featured: false, height: 'h-48' },
                        { number: 124, title: 'CSS in 2026', guest: 'Adam Argyle', duration: '52 min', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600', featured: true, height: 'h-64' },
                        { number: 123, title: 'AI & Development', guest: 'Swyx', duration: '1h 5m', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600', featured: false, height: 'h-72' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
}

const Header = ({ title }: HeaderProps) => (
    <div className="flex items-center gap-3 mb-8">
        <Headphones className="size-7 text-primary" />
        <h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
    </div>
)

interface Episode {
    number: number
    title: string
    guest: string
    duration: string
    image: string
    featured: boolean
    height: string
}

interface MasonryGridProps {
    episodes: Episode[]
}

const MasonryGrid = ({ episodes }: MasonryGridProps) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
        {episodes.map((ep) => (
            <Link key={ep.number} href="#" className="block break-inside-avoid">
                <Card className="group overflow-hidden py-0">
                    <div className={`relative ${ep.height}`}>
                        <Image src={ep.image} alt={ep.title} fill className="object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="size-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Play className="size-6 text-primary ml-1" />
                            </div>
                        </div>
                        <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                            <Badge className={`mb-2 ${ep.featured ? 'bg-primary text-primary-foreground' : 'bg-white/20 text-white backdrop-blur-sm'} border-0 text-xs`}>
                                EP {ep.number}
                            </Badge>
                            <h3 className="font-semibold text-white mb-1">
                                {ep.title}
                            </h3>
                            <p className="text-sm text-white/70 mb-2">with {ep.guest}</p>
                            <span className="text-xs text-white/60 flex items-center gap-1">
                                <Clock className="size-3" />
                                {ep.duration}
                            </span>
                        </CardContent>
                    </div>
                </Card>
            </Link>
        ))}
    </div>
)
