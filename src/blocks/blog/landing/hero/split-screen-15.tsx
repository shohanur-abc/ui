import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Headphones, Mic, Play, Radio } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
                    <PodcastPlayer
                        episode={{
                            title: 'The Future of Frontend Development',
                            number: 142,
                            duration: '58 min',
                            cover: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600',
                            guests: ['Sarah Miller', 'John Kim'],
                        }}
                    />
                    <ContentSection
                        eyebrow={{ icon: Headphones, text: 'The DevTalk Podcast' }}
                        title="Listen & Learn"
                        highlight="On the Go"
                        description="Weekly conversations with industry leaders, deep technical discussions, and career advice from those who've been there."
                        stats={[
                            { value: '142', label: 'Episodes' },
                            { value: '500K+', label: 'Downloads' },
                            { value: '4.9', label: 'Rating' },
                        ]}
                        cta={[
                            { label: 'Listen Now', href: '/podcast', icon: Play },
                            { label: 'All Episodes', href: '/podcast/archive', variant: 'outline' },
                        ]}
                        platforms={['Spotify', 'Apple Podcasts', 'YouTube', 'RSS']}
                    />
                </div>
            </div>
        </section>
    )
}

interface Episode {
    title: string
    number: number
    duration: string
    cover: string
    guests: string[]
}

const PodcastPlayer = ({ episode }: { episode: Episode }) => (
    <div className="relative">
        <div className="relative aspect-square max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <Image src={episode.cover} alt={episode.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8">
                <Badge className="mb-3 bg-primary/90 backdrop-blur-sm">
                    <Mic className="size-3.5 mr-1.5" />
                    Episode {episode.number}
                </Badge>
                <h3 className="text-xl @md:text-2xl font-bold text-white mb-2">{episode.title}</h3>
                <p className="text-sm text-white/80 mb-4">
                    with {episode.guests.join(' & ')} · {episode.duration}
                </p>
                <div className="flex items-center gap-4">
                    <PlayButton />
                    <WaveformVisualizer />
                </div>
            </div>
        </div>
        <PodcastDecorative />
    </div>
)

const PlayButton = () => (
    <button className="size-14 rounded-full bg-primary flex items-center justify-center transition-transform hover:scale-105 shadow-lg">
        <Play className="size-6 text-primary-foreground ml-1" />
    </button>
)

const WaveformVisualizer = () => (
    <div className="flex items-end gap-1 h-10 flex-1">
        {Array.from({ length: 24 }).map((_, i) => (
            <div
                key={i}
                className="flex-1 bg-white/60 rounded-full animate-pulse"
                style={{
                    height: `${20 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.05}s`,
                }}
            />
        ))}
    </div>
)

const PodcastDecorative = () => (
    <>
        <div className="absolute -bottom-4 -right-4 size-full rounded-3xl bg-primary/10 -z-10" />
        <div className="absolute -bottom-8 -right-8 size-full rounded-3xl bg-primary/5 -z-20" />
    </>
)

interface StatItem {
    value: string
    label: string
}

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

interface ContentSectionProps {
    eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string }
    title: string
    highlight: string
    description: string
    stats: StatItem[]
    cta: CTAItem[]
    platforms: string[]
}

const ContentSection = ({ eyebrow, title, highlight, description, stats, cta, platforms }: ContentSectionProps) => (
    <div className="space-y-6 @3xl:pl-8">
        <Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
        <Title text={title} highlight={highlight} />
        <Description text={description} />
        <Stats items={stats} />
        <CTA items={cta} />
        <Platforms items={platforms} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="gap-2 px-4 py-1.5">
        <Icon className="size-4 text-primary" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
        {text}
        <span className="block text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const Stats = ({ items }: { items: StatItem[] }) => (
    <div className="flex flex-wrap gap-8">
        {items.map(({ value, label }) => (
            <div key={label} className="text-center">
                <p className="text-2xl @md:text-3xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ label, href, icon: Icon, variant = 'default' }) => (
            <Button key={label} size="lg" variant={variant} asChild className="gap-2">
                <Link href={href}>
                    {Icon && <Icon className="size-4" />}
                    {label}
                </Link>
            </Button>
        ))}
    </div>
)

const Platforms = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Available on:</span>
        {items.map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
                {platform}
            </Badge>
        ))}
    </div>
)
