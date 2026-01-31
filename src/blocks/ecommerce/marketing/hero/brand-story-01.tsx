import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Heart, BookOpen, Mountain } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            {/* Full-width background image */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
                    alt="Brand Story"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-36">
                <div className="max-w-2xl text-white">
                    <Eyebrow icon={BookOpen} text="Our Story" />
                    <Title text="Crafted with" highlight="Passion" />
                    <Description text="From a small workshop to a beloved brand. We started with a simple mission: create products that inspire joy and stand the test of time. Today, we're proud to serve customers worldwide while staying true to our roots." />

                    <Timeline items={[
                        { year: '2010', event: 'Founded in a small studio' },
                        { year: '2015', event: 'Expanded to 10 countries' },
                        { year: '2020', event: 'Reached 1 million customers' },
                        { year: '2024', event: 'Global community of makers' },
                    ]} />

                    <CTA items={[
                        { label: 'Explore Our Story', href: '/about', icon: ArrowRight },
                        { label: 'Shop Collection', href: '/shop', variant: 'outline' },
                    ]} />

                    <Values items={[
                        { icon: Mountain, label: 'Handcrafted' },
                        { icon: Heart, label: 'Sustainable' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-white/20 text-white border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="text-amber-400">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-white/80 leading-relaxed max-w-xl mb-8 @md:mb-10">
        {text}
    </p>
)

const Timeline = ({ items }: { items: { year: string; event: string }[] }) => (
    <div className="flex flex-wrap gap-6 @md:gap-8 mb-8 @md:mb-10">
        {items.map(({ year, event }) => (
            <div key={year} className="flex flex-col">
                <span className="text-2xl @md:text-3xl font-bold text-amber-400">{year}</span>
                <span className="text-sm text-white/70">{event}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-8">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-amber-500 hover:bg-amber-600 text-black' : 'border-white/30 text-white hover:bg-white/20'}`}
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

const Values = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex gap-6">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/80">
                <Icon className="size-5" />
                <span>{label}</span>
            </div>
        ))}
    </div>
)
