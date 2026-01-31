import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, Smartphone, Apple, PlayCircle } from 'lucide-react'
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
                        <Eyebrow icon={Smartphone} text="Mobile App" />
                        <Title text="Shop Smarter with Our" highlight="App" />
                        <Description text="Get exclusive app-only deals, track orders in real-time, and enjoy a seamless shopping experience. Download now and get 15% off your first in-app purchase." />

                        <AppFeatures items={[
                            'Exclusive app-only deals',
                            'Real-time order tracking',
                            'Personalized recommendations',
                            'Easy returns & exchanges',
                        ]} />

                        <AppStoreButtons />

                        <DownloadStats downloads="2M+" rating="4.9" />
                    </div>

                    {/* Phone Mockup */}
                    <div className="relative">
                        <PhoneMockup />
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
        {text}{' '}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const AppFeatures = ({ items }: { items: string[] }) => (
    <div className="grid @sm:grid-cols-2 gap-3 mb-8 @md:mb-10">
        {items.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
                <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="size-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
                {item}
            </div>
        ))}
    </div>
)

const AppStoreButtons = () => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-6 @md:mb-8">
        <Button size="lg" className="gap-2 h-14 px-6" asChild>
            <Link href="#">
                <Apple className="size-6" />
                <div className="text-left">
                    <div className="text-xs opacity-80">Download on the</div>
                    <div className="font-semibold">App Store</div>
                </div>
            </Link>
        </Button>
        <Button size="lg" variant="outline" className="gap-2 h-14 px-6" asChild>
            <Link href="#">
                <PlayCircle className="size-6" />
                <div className="text-left">
                    <div className="text-xs opacity-80">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                </div>
            </Link>
        </Button>
    </div>
)

const DownloadStats = ({ downloads, rating }: { downloads: string; rating: string }) => (
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
            <Download className="size-4" />
            <span>{downloads} downloads</span>
        </div>
        <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span>{rating} rating</span>
        </div>
    </div>
)

const PhoneMockup = () => (
    <div className="relative flex justify-center">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />

        {/* Phone frame */}
        <div className="relative w-64 @md:w-72 @xl:w-80">
            <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                {/* Screen */}
                <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-white">
                    <Image
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400"
                        alt="App Screenshot"
                        fill
                        className="object-cover"
                    />

                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-xl" />
                </div>
            </div>

            {/* Promo badge */}
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-primary text-primary-foreground rounded-full shadow-lg">
                <span className="text-sm font-bold">15% OFF</span>
            </div>
        </div>
    </div>
)
