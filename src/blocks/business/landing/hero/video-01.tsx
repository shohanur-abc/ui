import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Layers, Palette, Gauge, Lock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Play} text="Product Demo" />
                    <Title text="See It In Action" />
                    <Description text="Watch how leading companies use our platform to transform their operations. Get a guided tour of the features that matter most." />
                    <CTA items={[
                        { label: 'Request Live Demo', href: '#demo', icon: ArrowRight },
                        { label: 'Self-Guided Tour', href: '#tour', variant: 'outline' },
                    ]} />
                </div>
                <VideoPlayer 
                    thumbnail="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=675&fit=crop"
                    alt="Product demo"
                    duration="3:45"
                />
                <FeatureHighlights items={[
                    { icon: Layers, title: 'Unified Dashboard', description: 'All your data in one place' },
                    { icon: Palette, title: 'Custom Branding', description: 'Match your brand identity' },
                    { icon: Gauge, title: 'Real-time Analytics', description: 'Live performance metrics' },
                    { icon: Lock, title: 'Enterprise Security', description: 'Bank-level protection' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const VideoPlayer = ({ thumbnail, alt, duration }: { thumbnail: string; alt: string; duration: string }) => (
    <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border/50 mb-10 @md:mb-14 cursor-pointer group">
        <Image src={thumbnail} alt={alt} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
            <div className="size-20 @md:size-24 rounded-full bg-white/95 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="size-8 @md:size-10 text-foreground ml-1.5" fill="currentColor" />
            </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-lg">
            {duration}
        </div>
    </div>
)

const FeatureHighlights = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="text-center">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="size-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        ))}
    </div>
)
