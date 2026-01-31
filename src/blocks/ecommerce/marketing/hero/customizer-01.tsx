import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Ruler, Palette, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Customizer Preview */}
                    <div className="relative order-2 @2xl:order-1">
                        <CustomizerPreview />
                    </div>

                    {/* Content */}
                    <div className="order-1 @2xl:order-2">
                        <Eyebrow text="Custom Made for You" />
                        <Title text="Design Your" highlight="Perfect Piece" />
                        <Description text="Create a one-of-a-kind product tailored to your taste. Choose colors, materials, and details to make it uniquely yours." />

                        <CustomizationOptions items={[
                            { icon: Palette, label: 'Choose Colors', description: '24 color options' },
                            { icon: Ruler, label: 'Select Size', description: 'Custom sizing available' },
                            { icon: RotateCcw, label: '3D Preview', description: 'See it from every angle' },
                        ]} />

                        <CTA items={[
                            { label: 'Start Customizing', href: '/customize', icon: ArrowRight },
                            { label: 'View Examples', href: '/gallery', variant: 'outline' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 px-4 py-2">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const CustomizationOptions = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; description: string }[] }) => (
    <div className="space-y-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label, description }) => (
            <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border hover:bg-muted transition-colors">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="size-6 text-primary" />
                </div>
                <div>
                    <div className="font-semibold">{label}</div>
                    <div className="text-sm text-muted-foreground">{description}</div>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const CustomizerPreview = () => (
    <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />

        <div className="relative aspect-square max-w-lg mx-auto p-6 @md:p-8">
            {/* Product Preview */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-card border shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
                    alt="Customizable Product"
                    fill
                    className="object-cover"
                />

                {/* Color Options */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-xs text-muted-foreground mb-2">Select Color</div>
                    <div className="flex gap-2">
                        {['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'].map((color, i) => (
                            <button
                                key={color}
                                className={`size-8 rounded-full ${color} ${i === 0 ? 'ring-2 ring-offset-2 ring-primary' : ''} hover:scale-110 transition-transform`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Rotation indicator */}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-card rounded-full shadow-lg border flex items-center gap-2">
                <RotateCcw className="size-4 text-muted-foreground" />
                <span className="text-xs font-medium">360° View</span>
            </div>
        </div>
    </div>
)
