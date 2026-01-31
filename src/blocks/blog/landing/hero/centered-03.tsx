import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Feather, Rss, Star } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Feather} text="Fresh Perspectives" />
                    <Title text="Where Curious Minds" highlight="Converge" />
                    <Description text="Explore thought-provoking essays, tutorials, and deep dives into the technologies shaping tomorrow. Join a community of lifelong learners." />
                    <CTA
                        items={[
                            { label: 'Start Reading', href: '/articles', icon: ArrowRight },
                            { label: 'Subscribe to Feed', href: '/rss', icon: Rss, variant: 'outline' },
                        ]}
                    />
                    <SocialProof
                        rating={4.9}
                        reviews={2340}
                        text="Loved by developers worldwide"
                    />
                </div>
            </div>
            <GlowDecorative />
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4 @md:mb-6">
        <Badge variant="secondary" className="gap-2 px-4 py-1.5 bg-primary/10 text-primary border-primary/20">
            <Icon className="size-4" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        {highlight && (
            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {highlight}
            </span>
        )}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
        {text}
    </p>
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
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

interface SocialProofProps {
    rating: number
    reviews: number
    text: string
}

const SocialProof = ({ rating, reviews, text }: SocialProofProps) => (
    <div className="flex items-center justify-center gap-3">
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`size-4 ${i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted-foreground'}`}
                />
            ))}
        </div>
        <span className="text-sm text-muted-foreground">
            {rating} ({reviews.toLocaleString()} reviews) · {text}
        </span>
    </div>
)

const GlowDecorative = () => (
    <>
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 size-60 rounded-full bg-accent/15 blur-3xl" />
    </>
)
