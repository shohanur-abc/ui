import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative min-h-screen flex items-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 bg-muted">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
                >
                    <source src="/hero-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-2xl text-white">
                    <Eyebrow text="Spring / Summer 2026" />
                    <Title text="The Art of" highlight="Modern Fashion" />
                    <Description text="Where timeless elegance meets contemporary design. Explore our new collection crafted for the style-conscious individual." />

                    <CTA items={[
                        { label: 'Shop Collection', href: '/collection', icon: ArrowRight },
                        { label: 'Watch Campaign', href: '#video', icon: Play, variant: 'outline' },
                    ]} />
                </div>

                {/* Video Controls */}
                <VideoControls />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge className="mb-4 @md:mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="text-white/80">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-white/80 leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${variant === 'outline' ? 'border-white/30 text-white hover:bg-white/20' : ''}`}
                asChild
            >
                <Link href={href}>
                    {Icon && i === 1 && <Icon className="size-4" />}
                    {label}
                    {Icon && i === 0 && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const VideoControls = () => (
    <div className="absolute bottom-8 right-8 flex items-center gap-2">
        <button className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Pause className="size-4" />
        </button>
        <button className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <VolumeX className="size-4" />
        </button>
    </div>
)
