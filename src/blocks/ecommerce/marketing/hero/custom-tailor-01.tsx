import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Scissors, Shirt, Ruler, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Scissors} text="Made to Measure" />
                        <Title text="Tailored to" highlight="Perfection" />
                        <Description text="Experience the luxury of custom-fitted clothing. Every piece is crafted to your exact measurements for a flawless fit that's uniquely you." />

                        <TailoringProcess items={[
                            { step: '1', title: 'Choose Style', description: 'Select your design' },
                            { step: '2', title: 'Enter Measurements', description: 'Guided measuring' },
                            { step: '3', title: 'Customize Details', description: 'Buttons, pockets, etc.' },
                            { step: '4', title: 'Receive Perfection', description: 'Delivered in 2 weeks' },
                        ]} />

                        <CTA items={[
                            { label: 'Start Customizing', href: '/tailor', icon: ArrowRight },
                            { label: 'How It Works', href: '/how-it-works', variant: 'outline' },
                        ]} />

                        <TailoringStats />
                    </div>

                    {/* Tailoring Visual */}
                    <div className="relative">
                        <TailoringShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const TailoringProcess = ({ items }: { items: { step: string; title: string; description: string }[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mb-8 @md:mb-10">
        {items.map(({ step, title, description }) => (
            <div key={step} className="relative">
                <div className="size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm mb-2">
                    {step}
                </div>
                <div className="font-semibold text-sm">{title}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-6 @md:mb-8">
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

const TailoringStats = () => (
    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
            <Ruler className="size-4" /> 15 measurements
        </span>
        <span className="flex items-center gap-1.5">
            <Clock className="size-4" /> 2 week delivery
        </span>
        <span className="flex items-center gap-1.5">
            <Shirt className="size-4" /> 100+ fabrics
        </span>
    </div>
)

const TailoringShowcase = () => (
    <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/5 rounded-3xl" />

        {/* Main showcase */}
        <div className="relative aspect-[4/5] max-w-sm mx-auto p-6">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
                    alt="Custom tailored suit"
                    fill
                    className="object-cover"
                />

                {/* Measurement overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-full border-l-2 border-r-2 border-dashed border-white/30" />
                </div>

                {/* Floating measurement cards */}
                <div className="absolute top-1/4 right-4 px-3 py-2 bg-white/90 dark:bg-card/90 rounded-lg shadow-lg">
                    <div className="text-xs text-muted-foreground">Chest</div>
                    <div className="font-bold">40&quot;</div>
                </div>
                <div className="absolute top-1/2 left-4 px-3 py-2 bg-white/90 dark:bg-card/90 rounded-lg shadow-lg">
                    <div className="text-xs text-muted-foreground">Waist</div>
                    <div className="font-bold">32&quot;</div>
                </div>
                <div className="absolute bottom-1/4 right-4 px-3 py-2 bg-white/90 dark:bg-card/90 rounded-lg shadow-lg">
                    <div className="text-xs text-muted-foreground">Length</div>
                    <div className="font-bold">30&quot;</div>
                </div>
            </div>

            {/* Fabric swatches */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {['bg-gray-800', 'bg-blue-900', 'bg-gray-500', 'bg-amber-700'].map((color, i) => (
                    <div
                        key={color}
                        className={`size-8 rounded-lg ${color} ${i === 0 ? 'ring-2 ring-primary ring-offset-2' : ''} shadow-lg`}
                    />
                ))}
            </div>
        </div>
    </div>
)
