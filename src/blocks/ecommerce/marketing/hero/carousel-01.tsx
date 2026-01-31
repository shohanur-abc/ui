import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Carousel Container */}
                <div className="relative">
                    {/* Slide */}
                    <div className="relative rounded-2xl @md:rounded-3xl overflow-hidden">
                        <div className="relative aspect-[16/9] @md:aspect-[21/9]">
                            <Image
                                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600"
                                alt="Summer Collection"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="px-8 @md:px-12 @xl:px-16 max-w-2xl text-white">
                                    <Badge className="mb-4 bg-white/20 text-white border-0">01 / 04</Badge>
                                    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold mb-4 leading-tight">
                                        Summer Essentials
                                    </h1>
                                    <p className="text-white/80 mb-6 @md:mb-8 text-base @md:text-lg max-w-md">
                                        Light, breathable, and effortlessly stylish. Your perfect summer wardrobe awaits.
                                    </p>
                                    <Button size="lg" className="gap-2" asChild>
                                        <Link href="/summer">
                                            Shop Summer <ArrowRight className="size-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <NavigationArrows />

                    {/* Dots */}
                    <NavigationDots current={0} total={4} />
                </div>
            </div>
        </section>
    )
}

const NavigationArrows = () => (
    <>
        <button className="absolute left-4 @md:left-6 top-1/2 -translate-y-1/2 size-10 @md:size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <ChevronLeft className="size-5 @md:size-6" />
        </button>
        <button className="absolute right-4 @md:right-6 top-1/2 -translate-y-1/2 size-10 @md:size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <ChevronRight className="size-5 @md:size-6" />
        </button>
    </>
)

const NavigationDots = ({ current, total }: { current: number; total: number }) => (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
            <button
                key={i}
                className={`h-2 rounded-full transition-all ${i === current ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
                    }`}
            />
        ))}
    </div>
)
