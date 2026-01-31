import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, MessageSquare, Users2 } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="slate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <LiveIndicator text="1,247 readers online now" />
                    <Title text="Join the Conversation" />
                    <Description text="More than just articles. Connect with a global community of developers, share insights, and grow together. Every voice matters here." />
                    <CommunityStats
                        items={[
                            { icon: Users2, value: '125K+', label: 'Members' },
                            { icon: MessageSquare, value: '50K+', label: 'Discussions' },
                            { icon: Globe, value: '140+', label: 'Countries' },
                        ]}
                    />
                    <CTA
                        items={[
                            { label: 'Join Community', href: '/community', icon: ArrowRight },
                            { label: 'View Discussions', href: '/discussions', variant: 'ghost' },
                        ]}
                    />
                </div>
            </div>
            <ParticleDecorative />
        </section>
    )
}

const LiveIndicator = ({ text }: { text: string }) => (
    <div className="mb-6 @md:mb-8">
        <Badge variant="outline" className="gap-2 px-4 py-2">
            <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
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

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

const CommunityStats = ({ items }: { items: StatItem[] }) => (
    <div className="flex flex-wrap justify-center gap-8 @md:gap-16 mb-10 @md:mb-12">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="group cursor-default">
                <Icon className="size-8 text-primary mx-auto mb-2 transition-transform group-hover:scale-110" />
                <p className="text-3xl @md:text-4xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        ))}
    </div>
)

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
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

const ParticleDecorative = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
            <div
                key={i}
                className="absolute size-1 rounded-full bg-primary/30"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                }}
            />
        ))}
    </div>
)
