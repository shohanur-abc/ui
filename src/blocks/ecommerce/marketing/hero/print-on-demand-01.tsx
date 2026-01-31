import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Printer, Palette, Image as ImageIcon, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-violet-50 to-background dark:from-violet-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Printer} text="Print on Demand" />
                        <Title text="Your Design" highlight="Your Product" />
                        <Description text="Create custom products with your artwork or designs. Upload your creation, choose products, and we'll handle the rest – from printing to shipping." />

                        <ProductOptions items={[
                            { label: 'T-Shirts', count: '50+ styles' },
                            { label: 'Posters', count: '20+ sizes' },
                            { label: 'Mugs', count: '15+ types' },
                            { label: 'Phone Cases', count: '100+ models' },
                        ]} />

                        <HowItWorks items={[
                            { icon: ImageIcon, label: 'Upload Design' },
                            { icon: Palette, label: 'Choose Product' },
                            { icon: Sparkles, label: 'We Print & Ship' },
                        ]} />

                        <CTA items={[
                            { label: 'Start Creating', href: '/create', icon: ArrowRight },
                            { label: 'View Products', href: '/products', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Print Visual */}
                    <div className="relative">
                        <PrintShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-violet-400/50 text-violet-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text},{' '}
        <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const ProductOptions = ({ items }: { items: { label: string; count: string }[] }) => (
    <div className="flex flex-wrap gap-3 mb-6 @md:mb-8">
        {items.map(({ label, count }) => (
            <Link
                key={label}
                href={`/products/${label.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 rounded-xl bg-white dark:bg-card border hover:border-violet-400 transition-colors"
            >
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground">{count}</div>
            </Link>
        ))}
    </div>
)

const HowItWorks = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex items-center gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }, i) => (
            <div key={label} className="flex items-center gap-2">
                {i > 0 && <ArrowRight className="size-4 text-muted-foreground" />}
                <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                        <Icon className="size-4 text-violet-600" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                </div>
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
                className={`gap-2 ${i === 0 ? 'bg-violet-600 hover:bg-violet-700' : ''}`}
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

const PrintShowcase = () => (
    <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400/20 to-purple-400/10 rounded-3xl blur-3xl" />

        {/* Product mockups */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* T-shirt mockup */}
            <div className="absolute -rotate-12 w-40 h-48 @md:w-48 @md:h-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 flex items-center justify-center">
                <div className="w-24 h-24 @md:w-28 @md:h-28 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-4xl">
                    🎨
                </div>
            </div>

            {/* Mug mockup */}
            <div className="absolute rotate-6 translate-x-20 w-32 h-40 @md:w-40 @md:h-48 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-3 flex items-center justify-center">
                <div className="w-16 h-20 @md:w-20 @md:h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-2xl">
                    ☕
                </div>
            </div>

            {/* Phone case mockup */}
            <div className="absolute -translate-y-20 w-24 h-44 @md:w-28 @md:h-52 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-2 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl">
                    📱
                </div>
            </div>

            {/* Upload indicator */}
            <div className="absolute -top-4 right-8 px-4 py-2 bg-violet-600 text-white font-semibold rounded-full shadow-lg flex items-center gap-2">
                <ImageIcon className="size-4" />
                Upload & Create
            </div>
        </div>
    </div>
)
