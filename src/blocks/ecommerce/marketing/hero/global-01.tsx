import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Truck, CreditCard, Headphones } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative min-h-screen flex items-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=%2760%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.1%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%27')]" />
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="text-center text-white max-w-4xl mx-auto">
                    <Eyebrow icon={Globe} text="Now Shipping Worldwide" />
                    <Title text="Shop Global," highlight="Ship Anywhere" />
                    <Description text="We deliver to over 150 countries with fast, reliable shipping. Experience world-class shopping with local currency support and customs-included pricing." />

                    <GlobalFeatures items={[
                        { icon: Truck, label: 'Fast Delivery', value: '3-7 days' },
                        { icon: CreditCard, label: 'Local Currency', value: '40+ currencies' },
                        { icon: Headphones, label: '24/7 Support', value: 'Global team' },
                    ]} />

                    <CTA items={[
                        { label: 'Start Shopping', href: '/shop', icon: ArrowRight },
                        { label: 'Check Delivery', href: '/shipping', variant: 'outline' },
                    ]} />

                    <CountryLogos />
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
        <span className="text-yellow-300">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10 @md:mb-12">
        {text}
    </p>
)

const GlobalFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; value: string }[] }) => (
    <div className="grid @sm:grid-cols-3 gap-4 @md:gap-6 mb-10 @md:mb-12">
        {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-5 @md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm">
                <Icon className="size-8 mb-3 mx-auto" />
                <div className="font-bold text-lg">{label}</div>
                <div className="text-white/70 text-sm">{value}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-10 @md:mb-12">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-white text-indigo-600 hover:bg-white/90' : 'border-white/30 text-white hover:bg-white/20'}`}
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

const CountryLogos = () => (
    <div>
        <p className="text-white/60 text-sm mb-4">Trusted by shoppers in</p>
        <div className="flex flex-wrap justify-center gap-4 @md:gap-6">
            {['🇺🇸', '🇬🇧', '🇫🇷', '🇩🇪', '🇯🇵', '🇦🇺', '🇨🇦', '🇧🇷'].map((flag) => (
                <span key={flag} className="text-3xl @md:text-4xl">{flag}</span>
            ))}
        </div>
    </div>
)
