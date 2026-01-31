import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Clock, Headphones, Play, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @xl:grid-cols-12 gap-6 @xl:gap-10">
                    <FeaturedEpisode
                        episode={{
                            number: 127,
                            title: 'The Future of Web Development',
                            guest: {
                                name: 'Dan Abramov',
                                avatar: 'https://i.pravatar.cc/100?img=65',
                                role: 'React Core Team',
                            },
                            duration: '1h 12m',
                            image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800',
                        }}
                        className="@xl:col-span-8"
                    />
                    <EpisodesList
                        episodes={[
                            { number: 126, title: 'TypeScript Best Practices', duration: '45m' },
                            { number: 125, title: 'CSS in 2026', duration: '52m' },
                            { number: 124, title: 'AI for Developers', duration: '1h 5m' },
                        ]}
                        className="@xl:col-span-4"
                    />
                </div>
            </div>
        </section>
    )
}

interface Guest {
    name: string
    avatar: string
    role: string
}

interface Episode {
    number: number
    title: string
    guest: Guest
    duration: string
    image: string
}

interface FeaturedEpisodeProps {
    episode: Episode
    className?: string
}

const FeaturedEpisode = ({ episode, className }: FeaturedEpisodeProps) => (
    <Card className={`overflow-hidden py-0 ${className}`}>
        <div className="relative aspect-[16/9]">
            <Image src={episode.image} alt={episode.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="gap-2 rounded-full size-16">
                    <Play className="size-6 ml-1" />
                </Button>
            </div>
            <CardContent className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
                <Badge className="mb-4 bg-primary text-primary-foreground">
                    <Headphones className="size-3.5 mr-1.5" />
                    Latest Episode
                </Badge>
                <div className="flex items-center gap-2 text-white/70 text-sm mb-2">
                    <span>EP {episode.number}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {episode.duration}
                    </span>
                </div>
                <h1 className="text-2xl @md:text-3xl font-bold text-white mb-4">
                    {episode.title}
                </h1>
                <div className="flex items-center gap-3">
                    <Avatar className="size-10 ring-2 ring-white/20">
                        <AvatarImage src={episode.guest.avatar} alt={episode.guest.name} />
                        <AvatarFallback>{episode.guest.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-white font-medium">{episode.guest.name}</p>
                        <p className="text-sm text-white/70">{episode.guest.role}</p>
                    </div>
                </div>
            </CardContent>
        </div>
    </Card>
)

interface EpisodeItem {
    number: number
    title: string
    duration: string
}

interface EpisodesListProps {
    episodes: EpisodeItem[]
    className?: string
}

const EpisodesList = ({ episodes, className }: EpisodesListProps) => (
    <div className={`flex flex-col gap-4 ${className}`}>
        <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Episodes</h2>
            <Button variant="ghost" size="sm" asChild className="gap-1">
                <Link href="/podcast">
                    All
                    <ArrowRight className="size-3.5" />
                </Link>
            </Button>
        </div>
        <div className="space-y-3">
            {episodes.map((ep) => (
                <Card key={ep.number} className="group cursor-pointer transition-all hover:border-primary">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="size-12 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                            <Play className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground mb-1">EP {ep.number}</p>
                            <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                                {ep.title}
                            </p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{ep.duration}</span>
                    </CardContent>
                </Card>
            ))}
        </div>
        <Button variant="outline" asChild className="w-full mt-2 gap-2">
            <Link href="/podcast">
                View All Episodes
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)
