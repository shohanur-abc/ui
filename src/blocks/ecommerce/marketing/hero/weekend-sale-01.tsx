import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Percent, Clock, Gift, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 text-white">
            <SalePattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-4xl mx-auto">
                    <Eyebrow icon={Sparkles} text="Weekend Sale" />
                    <Title text="Weekend Only" highlight="50% OFF" />
                    <Description text="Our biggest weekend sale is here! Shop thousands of items at half price. This Saturday and Sunday only – don't miss out!" />

                    <Countdown />

                    <DealsPreview />

                    <CTA items={[
                        { label: 'Shop the Sale', href: '/sale', icon: ArrowRight },
                        { label: 'View All Deals', href: '/deals', variant: 'outline' },
                    ]} />

                    <ExtraPerks items={[
                        { icon: Gift, label: 'Free Gift with $100+' },
                        { icon: Percent, label: 'Extra 10% for Members' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const SalePattern = () => (
    <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, white 0px, white 1px, transparent 1px, transparent 20px)`,
        }} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-white/20 text-white border-0 animate-pulse">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-black leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="text-yellow-300">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 @md:mb-10">
        {text}
    </p>
)

const Countdown = () => (
    <div className="flex justify-center gap-4 @md:gap-6 mb-10 @md:mb-12">
        {[
            { value: '01', label: 'Days' },
            { value: '14', label: 'Hours' },
            { value: '32', label: 'Minutes' },
            { value: '45', label: 'Seconds' },
        ].map(({ value, label }) => (
            <div key={label} className="text-center">
                <div className="w-16 h-16 @md:w-20 @md:h-20 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-2">
                    <span className="text-2xl @md:text-3xl font-bold">{value}</span>
                </div>
                <div className="text-xs text-white/70">{label}</div>
            </div>
        ))}
    </div>
)

const DealsPreview = () => (
    <div className="flex justify-center gap-3 @md:gap-4 mb-10 @md:mb-12 overflow-x-auto pb-2">
        {[
            { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200', discount: '-50%' },
            { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200', discount: '-60%' },
            { image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200', discount: '-40%' },
            { image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200', discount: '-50%' },
        ].map(({ image, discount }, i) => (
            <div key={i} className="relative size-20 @md:size-24 rounded-xl overflow-hidden shrink-0">
                <Image src={image} alt={`Deal ${i + 1}`} fill className="object-cover" />
                <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-yellow-400 text-black text-xs font-bold rounded">
                    {discount}
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-8 @md:mb-10">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-yellow-400 text-black hover:bg-yellow-500' : 'border-white/30 text-white hover:bg-white/20'}`}
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

const ExtraPerks = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70">
        {items.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5">
                <Icon className="size-4" /> {label}
            </span>
        ))}
    </div>
)
