import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Camera, Rotate3D, Download, Share } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-indigo-50 to-background dark:from-indigo-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Rotate3D} text="360° View" />
                        <Title text="See Every" highlight="Angle" />
                        <Description text="Explore products in full 360-degree detail. Rotate, zoom, and examine every angle before you buy – just like holding it in your hands." />

                        <ViewerFeatures items={[
                            { icon: Rotate3D, label: 'Full rotation' },
                            { icon: Camera, label: 'Zoom details' },
                            { icon: Download, label: 'AR preview' },
                        ]} />

                        <CTA items={[
                            { label: 'Explore Products', href: '/products', icon: ArrowRight },
                            { label: 'Try AR View', href: '/ar', variant: 'outline' },
                        ]} />

                        <CompatibilityNote />
                    </div>

                    {/* 360 Visual */}
                    <div className="relative">
                        <ThreeSixtyVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-indigo-400/50 text-indigo-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const ViewerFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-indigo-600" />
                <span>{label}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-6 @md:mb-8">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-indigo-600 hover:bg-indigo-700' : ''}`}
                asChild
            >
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const CompatibilityNote = () => (
    <p className="text-sm text-muted-foreground">
        Works on all devices. AR preview available on iOS and Android.
    </p>
)

const ThreeSixtyVisual = () => (
    <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-violet-400/10 rounded-full blur-3xl" />

        {/* 360 viewer container */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Circular track */}
            <div className="absolute inset-8 rounded-full border-2 border-dashed border-indigo-300/50" />

            {/* Product */}
            <div className="relative w-48 h-48 @md:w-56 @md:h-56 rounded-full overflow-hidden shadow-2xl bg-white">
                <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                    alt="360 product view"
                    fill
                    className="object-contain p-4"
                />
            </div>

            {/* Rotation indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-card rounded-full shadow-lg border flex items-center gap-2">
                <Rotate3D className="size-4 text-indigo-600" />
                <span className="text-sm font-medium">Drag to rotate</span>
            </div>

            {/* Angle markers */}
            {[0, 90, 180, 270].map((angle) => (
                <div
                    key={angle}
                    className="absolute size-6 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg"
                    style={{
                        top: angle === 0 ? '0' : angle === 180 ? 'auto' : '50%',
                        bottom: angle === 180 ? '0' : 'auto',
                        left: angle === 270 ? '0' : angle === 90 ? 'auto' : '50%',
                        right: angle === 90 ? '0' : 'auto',
                        transform: `translate(${angle === 270 ? '0' : angle === 90 ? '0' : '-50%'}, ${angle === 0 ? '0' : angle === 180 ? '0' : '-50%'})`,
                    }}
                >
                    {angle}°
                </div>
            ))}

            {/* Share button */}
            <button className="absolute top-4 right-4 size-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50">
                <Share className="size-5 text-gray-600" />
            </button>
        </div>
    </div>
)
