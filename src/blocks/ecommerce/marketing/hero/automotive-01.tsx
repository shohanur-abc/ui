import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Car, Wrench, Shield, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gray-950 text-white">
            {/* Background with car image */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600"
                    alt="Automotive"
                    fill
                    className="object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-2xl">
                    <Eyebrow icon={Car} text="Auto Parts & Accessories" />
                    <Title text="Performance" highlight="Unleashed" />
                    <Description text="Premium auto parts, accessories, and tools for every vehicle. From maintenance essentials to performance upgrades, we've got your ride covered." />

                    <VehicleSearch />

                    <FeatureBadges items={[
                        { icon: Shield, label: 'OEM Quality' },
                        { icon: Wrench, label: 'Expert Support' },
                        { icon: Star, label: '5-Star Reviews' },
                    ]} />

                    <CTA items={[
                        { label: 'Shop Parts', href: '/auto', icon: ArrowRight },
                        { label: 'Find Installer', href: '/installers', variant: 'outline' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-red-600/20 text-red-400 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-black leading-tight tracking-tight mb-4 @md:mb-6 uppercase">
        {text}
        <br />
        <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const VehicleSearch = () => (
    <div className="mb-8 @md:mb-10">
        <div className="text-sm text-gray-400 mb-3">Find parts for your vehicle</div>
        <div className="grid @sm:grid-cols-4 gap-3">
            <select className="h-12 rounded-lg bg-white/10 border border-white/20 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Select Make</option>
                <option>BMW</option>
                <option>Mercedes</option>
                <option>Audi</option>
            </select>
            <select className="h-12 rounded-lg bg-white/10 border border-white/20 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Select Model</option>
            </select>
            <select className="h-12 rounded-lg bg-white/10 border border-white/20 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500">
                <option>Select Year</option>
            </select>
            <Button className="h-12 bg-red-600 hover:bg-red-700">
                Search
            </Button>
        </div>
    </div>
)

const FeatureBadges = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-gray-400">
                <Icon className="size-5 text-red-500" />
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
                className={`gap-2 ${i === 0 ? 'bg-red-600 hover:bg-red-700' : 'border-gray-700 text-white hover:bg-white/10'}`}
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
