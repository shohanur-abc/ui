import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Scissors, Shirt, Sparkles, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-amber-50 dark:bg-amber-950/20">
            <PatternOverlay />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Scissors} text="Made to Order" />
                        <Title text="Handcrafted" highlight="Just for You" />
                        <Description text="Every piece is made to order by skilled artisans. From fabric selection to final stitch, your order is crafted with care and delivered to your door." />

                        <CraftProcess items={[
                            { step: '1', label: 'Choose Materials', description: 'Select from premium fabrics' },
                            { step: '2', label: 'Customize Design', description: 'Add your personal touches' },
                            { step: '3', label: 'Handcrafted', description: 'Made by skilled artisans' },
                            { step: '4', label: 'Quality Check', description: 'Inspected before shipping' },
                        ]} />

                        <CraftFeatures items={[
                            'No mass production',
                            'Sustainable practices',
                            'Unique pieces',
                        ]} />

                        <CTA items={[
                            { label: 'Start Designing', href: '/create', icon: ArrowRight },
                            { label: 'Meet the Artisans', href: '/artisans', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Craft Visual */}
                    <div className="relative">
                        <CraftVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const PatternOverlay = () => (
    <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23000'/%3E%3C/svg%3E")`,
    }} />
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-amber-600/50 text-amber-700 dark:text-amber-400">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-serif font-normal leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="italic text-amber-700 dark:text-amber-400">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const CraftProcess = ({ items }: { items: { step: string; label: string; description: string }[] }) => (
    <div className="grid grid-cols-2 gap-4 mb-6 @md:mb-8">
        {items.map(({ step, label, description }) => (
            <div key={step} className="p-4 rounded-xl bg-white/50 dark:bg-card/50 border border-amber-200 dark:border-amber-800/50">
                <div className="size-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-sm mb-2">
                    {step}
                </div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground">{description}</div>
            </div>
        ))}
    </div>
)

const CraftFeatures = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-amber-600" />
                <span>{item}</span>
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
                className={`gap-2 ${i === 0 ? 'bg-amber-700 hover:bg-amber-800' : ''}`}
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

const CraftVisual = () => (
    <div className="relative">
        {/* Warm glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/10 rounded-3xl blur-3xl" />

        {/* Artisan at work */}
        <div className="relative aspect-[4/5] max-w-sm mx-auto">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
                    alt="Artisan crafting"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Crafting time badge */}
            <div className="absolute -bottom-4 -right-4 p-4 bg-white dark:bg-card rounded-2xl shadow-xl border">
                <div className="flex items-center gap-3">
                    <div className="size-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                        <Scissors className="size-6 text-amber-700" />
                    </div>
                    <div>
                        <div className="font-semibold">2-3 weeks</div>
                        <div className="text-xs text-muted-foreground">Crafting time</div>
                    </div>
                </div>
            </div>

            {/* Quality badge */}
            <div className="absolute -top-4 -left-4 p-3 bg-amber-700 text-white rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                    <Sparkles className="size-5" />
                    <span className="font-medium text-sm">Handmade</span>
                </div>
            </div>
        </div>
    </div>
)
