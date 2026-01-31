import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Paintbrush, Sparkles, Wand2, Palette } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gray-950 text-white">
            <AIPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-36">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Wand2} text="AI-Powered" />
                        <Title text="Design Your" highlight="Dream Product" />
                        <Description text="Use AI to create custom designs instantly. Describe what you want, and our AI will generate unique artwork for your products." />

                        <AIPromptDemo />

                        <AIFeatures items={[
                            { icon: Sparkles, label: 'Unlimited designs' },
                            { icon: Palette, label: 'Any style' },
                            { icon: Paintbrush, label: 'Full customization' },
                        ]} />

                        <CTA items={[
                            { label: 'Try AI Designer', href: '/ai-design', icon: ArrowRight },
                            { label: 'See Gallery', href: '/gallery', variant: 'outline' },
                        ]} />
                    </div>

                    {/* AI Visual */}
                    <div className="relative">
                        <AIDesignVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const AIPattern = () => (
    <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-950 to-pink-900/20" />
        <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
        }} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            {highlight}
        </span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const AIPromptDemo = () => (
    <div className="mb-6 @md:mb-8 p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-start gap-3 mb-3">
            <Wand2 className="size-5 text-purple-400 shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
                &ldquo;A cosmic wolf howling at a nebula moon, neon colors, digital art style&rdquo;
            </div>
        </div>
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-gray-800 overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
            </div>
            <span className="text-xs text-gray-500">Generating...</span>
        </div>
    </div>
)

const AIFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-purple-400" />
                <span className="text-gray-300">{label}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    : 'border-gray-700 text-white hover:bg-white/10'
                    }`}
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

const AIDesignVisual = () => (
    <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-3xl blur-3xl" />

        {/* Generated designs showcase */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Main generated design */}
            <div className="relative w-64 h-64 @md:w-72 @md:h-72 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500"
                    alt="AI generated design"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-white/20 text-white border-0 mb-2">
                        <Sparkles className="size-3 mr-1" /> AI Generated
                    </Badge>
                    <div className="text-sm font-medium">Cosmic Wolf T-Shirt</div>
                </div>
            </div>

            {/* Floating variations */}
            <div className="absolute -top-4 -right-4 size-20 rounded-xl overflow-hidden shadow-xl border border-white/10">
                <Image
                    src="https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=100"
                    alt="Variation 1"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="absolute -bottom-4 -left-4 size-16 rounded-xl overflow-hidden shadow-xl border border-white/10">
                <Image
                    src="https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=100"
                    alt="Variation 2"
                    fill
                    className="object-cover"
                />
            </div>

            {/* AI magic indicator */}
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center gap-2">
                <Wand2 className="size-4" />
                <span className="text-sm font-medium">AI Magic</span>
            </div>
        </div>
    </div>
)
