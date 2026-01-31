import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Flame, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'



export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white">
            <FlashPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-8 @md:mb-12">
                    <Badge className="bg-white/20 text-white border-0 mb-4 animate-pulse">
                        <Flame className="size-3 mr-1" /> Limited Time
                    </Badge>
                    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-black tracking-tight mb-4">
                        FLASH DEALS
                    </h1>
                    <p className="text-lg @md:text-xl text-white/80 max-w-2xl mx-auto mb-6">
                        Insane discounts that won&apos;t last. Grab them before they&apos;re gone!
                    </p>

                    {/* Countdown */}
                    <FlashCountdown />
                </div>

                {/* Deals Grid */}
                <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6 mb-8 @md:mb-12">
                    {[
                        { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', name: 'Running Shoes', original: '$150', price: '$59', discount: '60%', remaining: 12 },
                        { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', name: 'Smart Watch', original: '$299', price: '$149', discount: '50%', remaining: 8 },
                        { image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400', name: 'Wireless Earbuds', original: '$199', price: '$79', discount: '60%', remaining: 5 },
                        { image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400', name: 'Designer Sunglasses', original: '$180', price: '$89', discount: '50%', remaining: 15 },
                    ].map(({ image, name, original, price, discount, remaining }) => (
                        <Link key={name} href="#" className="group">
                            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                                {/* Discount badge */}
                                <div className="absolute top-3 left-3 px-2 py-1 bg-red-600 text-white font-bold text-sm rounded z-10">
                                    -{discount}
                                </div>

                                {/* Image */}
                                <div className="relative aspect-square">
                                    <Image
                                        src={image}
                                        alt={name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Info */}
                                <div className="p-4 text-gray-900">
                                    <h3 className="font-bold mb-1">{name}</h3>
                                    <div className="flex items-baseline gap-2 mb-2">
                                        <span className="text-xl font-bold text-red-600">{price}</span>
                                        <span className="text-sm text-gray-500 line-through">{original}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-orange-600">
                                        <Zap className="size-3" />
                                        Only {remaining} left!
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button size="lg" className="gap-2 bg-white text-red-600 hover:bg-white/90" asChild>
                        <Link href="/flash-deals">
                            View All Deals <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const FlashPattern = () => {
    const positions = [
        { top: '5%', left: '10%', width: 20, rotate: 25 },
        { top: '15%', left: '75%', width: 32, rotate: 110 },
        { top: '25%', left: '20%', width: 26, rotate: 200 },
        { top: '35%', left: '65%', width: 36, rotate: 75 },
        { top: '45%', left: '8%', width: 28, rotate: 295 },
        { top: '55%', left: '88%', width: 22, rotate: 145 },
        { top: '65%', left: '30%', width: 38, rotate: 235 },
        { top: '75%', left: '55%', width: 24, rotate: 45 },
        { top: '85%', left: '15%', width: 34, rotate: 180 },
        { top: '10%', left: '50%', width: 18, rotate: 90 },
        { top: '40%', left: '40%', width: 30, rotate: 270 },
        { top: '70%', left: '82%', width: 26, rotate: 330 },
        { top: '90%', left: '45%', width: 36, rotate: 60 },
        { top: '30%', left: '92%', width: 22, rotate: 210 },
        { top: '60%', left: '52%', width: 32, rotate: 135 },
        { top: '18%', left: '38%', width: 24, rotate: 250 },
        { top: '50%', left: '95%', width: 28, rotate: 35 },
        { top: '80%', left: '70%', width: 20, rotate: 160 },
        { top: '95%', left: '25%', width: 30, rotate: 280 },
        { top: '38%', left: '78%', width: 22, rotate: 310 },
    ]
    return (
        <div className="absolute inset-0 opacity-10">
            {positions.map((pos, i) => (
                <Zap
                    key={i}
                    className="absolute text-white"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        width: `${pos.width}px`,
                        transform: `rotate(${pos.rotate}deg)`,
                    }}
                />
            ))}
        </div>
    )
}

const FlashCountdown = () => (
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/30 backdrop-blur-sm">
        <Clock className="size-5" />
        <span className="font-medium">Ends in:</span>
        <div className="flex items-center gap-1 font-mono font-bold text-xl">
            <span className="px-2 py-1 rounded bg-white/20">02</span>
            <span>:</span>
            <span className="px-2 py-1 rounded bg-white/20">14</span>
            <span>:</span>
            <span className="px-2 py-1 rounded bg-white/20">32</span>
        </div>
    </div>
)
