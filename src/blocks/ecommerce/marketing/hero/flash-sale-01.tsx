import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Zap, Flame } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-500">
            <FlashPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <div className="text-center text-white">
                    <Eyebrow icon={Zap} text="Flash Deal" />
                    <Title text="Lightning Sale" />
                    <Description text="Incredible savings for a limited time. Grab these deals before they're gone!" />

                    <CountdownTimer />

                    {/* Deal Cards */}
                    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5 mb-8 @md:mb-10">
                        <DealCard
                            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300"
                            name="Running Shoes"
                            originalPrice="$180"
                            salePrice="$89"
                            discount="51%"
                        />
                        <DealCard
                            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300"
                            name="Smart Watch"
                            originalPrice="$350"
                            salePrice="$199"
                            discount="43%"
                        />
                        <DealCard
                            image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300"
                            name="Designer Bag"
                            originalPrice="$250"
                            salePrice="$149"
                            discount="40%"
                        />
                        <DealCard
                            image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300"
                            name="Sunglasses"
                            originalPrice="$120"
                            salePrice="$59"
                            discount="51%"
                        />
                    </div>

                    <Button size="lg" variant="secondary" className="gap-2" asChild>
                        <Link href="/flash-sale">
                            View All Deals <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const FlashPattern = () => (
    <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-pulse">
            <Zap className="size-24" />
        </div>
        <div className="absolute bottom-10 right-10 animate-pulse [animation-delay:1s]">
            <Flame className="size-32" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse [animation-delay:0.5s]">
            <Zap className="size-16" />
        </div>
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-white/20 text-white border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold mb-4">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-white/90 max-w-lg mx-auto mb-8">
        {text}
    </p>
)

const CountdownTimer = () => (
    <div className="flex justify-center gap-3 @md:gap-4 mb-10 @md:mb-12">
        {[
            { value: '00', label: 'Hours' },
            { value: '23', label: 'Minutes' },
            { value: '59', label: 'Seconds' },
        ].map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-3 @md:gap-4">
                <div className="text-center">
                    <div className="text-3xl @sm:text-4xl @md:text-5xl font-bold bg-white/20 backdrop-blur-sm rounded-xl px-4 @md:px-6 py-3 @md:py-4 mb-1">
                        {value}
                    </div>
                    <div className="text-xs text-white/80">{label}</div>
                </div>
                {i < 2 && <span className="text-3xl @md:text-4xl font-bold">:</span>}
            </div>
        ))}
    </div>
)

interface DealCardProps {
    image: string
    name: string
    originalPrice: string
    salePrice: string
    discount: string
}

const DealCard = ({ image, name, originalPrice, salePrice, discount }: DealCardProps) => (
    <Link href="#" className="group relative bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            -{discount}
        </div>

        {/* Image */}
        <div className="relative aspect-square">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
        </div>

        {/* Content */}
        <div className="p-4 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
            <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-500">{salePrice}</span>
                <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
            </div>
        </div>
    </Link>
)
