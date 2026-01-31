import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Volume2 } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Volume2} text="Now Playing" />
                    <Title text="Listen While You Learn" />
                    <Description text="Transform your commute with our audio articles. Expert narration of the best content, available on-demand. Perfect for busy professionals." />
                    <AudioPreview
                        title="The State of JavaScript 2025"
                        duration="12 min"
                        narrator="James Wilson"
                    />
                    <CTA
                        items={[
                            { label: 'Browse Audio Library', href: '/audio', icon: ArrowRight },
                            { label: 'Try Free Sample', href: '/sample', icon: Play, variant: 'outline' },
                        ]}
                    />
                    <PlatformBadges platforms={['Spotify', 'Apple Podcasts', 'Google Podcasts', 'RSS']} />
                </div>
            </div>
            <WaveDecorative />
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4 @md:mb-6">
        <Badge variant="secondary" className="gap-2 px-4 py-1.5 animate-pulse">
            <Icon className="size-4 text-primary" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
        {text}
    </p>
)

interface AudioPreviewProps {
    title: string
    duration: string
    narrator: string
}

const AudioPreview = ({ title, duration, narrator }: AudioPreviewProps) => (
    <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-card border mb-8 @md:mb-10">
        <button className="size-14 rounded-full bg-primary flex items-center justify-center transition-transform hover:scale-105">
            <Play className="size-6 text-primary-foreground ml-1" />
        </button>
        <div className="text-left">
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-muted-foreground">{duration} · Narrated by {narrator}</p>
        </div>
        <div className="hidden @sm:flex items-end gap-0.5 h-8">
            {[3, 5, 7, 4, 6, 8, 5, 3, 6, 4].map((h, i) => (
                <div
                    key={i}
                    className="w-1 bg-primary rounded-full animate-pulse"
                    style={{ height: `${h * 4}px`, animationDelay: `${i * 0.1}s` }}
                />
            ))}
        </div>
    </div>
)

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-8 @md:mb-10">
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

const PlatformBadges = ({ platforms }: { platforms: string[] }) => (
    <div className="flex flex-wrap justify-center gap-2">
        <span className="text-sm text-muted-foreground">Available on:</span>
        {platforms.map((platform) => (
            <Badge key={platform} variant="outline" className="text-xs">
                {platform}
            </Badge>
        ))}
    </div>
)

const WaveDecorative = () => (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-primary/5 to-transparent" />
)
