import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Watch, Gem, Crown, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gray-950 text-white">
            <LuxuryGradient />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-36">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Gem} text="Fine Jewelry" />
                        <Title text="Timeless" highlight="Elegance" />
                        <Description text="Discover our collection of exquisite fine jewelry. Each piece is handcrafted by master artisans using the finest materials and ethically sourced gemstones." />

                        <MaterialsBadges items={[
                            '18K Gold',
                            'Platinum',
                            'Diamonds',
                            'Sapphires',
                        ]} />

                        <CertificationBadges items={[
                            { icon: ShieldCheck, label: 'GIA Certified' },
                            { icon: Crown, label: 'Lifetime Warranty' },
                        ]} />

                        <CTA items={[
                            { label: 'Explore Collection', href: '/jewelry', icon: ArrowRight },
                            { label: 'Book Consultation', href: '/consult', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Jewelry Visual */}
                    <div className="relative">
                        <JewelryShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const LuxuryGradient = () => (
    <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-gray-950 to-gray-950" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/10 to-transparent" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-amber-500/20 text-amber-400 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-serif font-normal leading-tight tracking-tight mb-4 @md:mb-6 italic">
        {text}
        <br />
        <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent not-italic">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const MaterialsBadges = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2 mb-6 @md:mb-8">
        {items.map((item) => (
            <Badge key={item} variant="outline" className="border-amber-500/30 text-amber-400">
                {item}
            </Badge>
        ))}
    </div>
)

const CertificationBadges = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-gray-400">
                <Icon className="size-5 text-amber-500" />
                <span>{label}</span>
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
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600' : 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10'}`}
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

const JewelryShowcase = () => (
    <div className="relative">
        {/* Golden glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-full blur-3xl" />

        {/* Main jewelry display */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            <div className="relative w-64 h-64 @md:w-80 @md:h-80">
                <Image
                    src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500"
                    alt="Fine jewelry"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>

            {/* Floating detail cards */}
            <div className="absolute top-8 right-0 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-amber-500/20">
                <div className="text-xs text-amber-400">Carat Weight</div>
                <div className="font-bold">2.5ct</div>
            </div>

            <div className="absolute bottom-8 left-0 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-amber-500/20">
                <div className="text-xs text-amber-400">Clarity</div>
                <div className="font-bold">VVS1</div>
            </div>

            {/* Price starting */}
            <div className="absolute bottom-0 right-1/4 px-5 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-black rounded-full shadow-lg font-semibold">
                From $2,500
            </div>
        </div>
    </div>
)
