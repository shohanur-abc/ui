import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Smartphone, QrCode, Wifi, Store } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gray-950 text-white">
            <TechPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-36">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Smartphone} text="Mobile App" />
                        <Title text="Shop on" highlight="the Go" />
                        <Description text="Download our app for the best mobile shopping experience. Get exclusive app-only deals, faster checkout, and real-time order tracking." />

                        <AppFeatures items={[
                            { icon: QrCode, title: 'Scan & Shop', description: 'Use AR to preview products' },
                            { icon: Wifi, title: 'Offline Mode', description: 'Browse without internet' },
                            { icon: Store, title: 'Store Pickup', description: 'Reserve items in-store' },
                        ]} />

                        <AppDownload />

                        <QRDownload />
                    </div>

                    {/* App Visual */}
                    <div className="relative">
                        <AppVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const TechPattern = () => (
    <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
        }} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-white/10 text-white border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const AppFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="space-y-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex items-center gap-4">
                <div className="size-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="size-6 text-cyan-400" />
                </div>
                <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-gray-400">{description}</div>
                </div>
            </div>
        ))}
    </div>
)

const AppDownload = () => (
    <div className="flex gap-3 mb-6 @md:mb-8">
        <Link href="#" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-black hover:bg-gray-100 transition-colors">
            <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </svg>
            <div className="text-left">
                <div className="text-[10px] leading-none">Download on the</div>
                <div className="font-semibold">App Store</div>
            </div>
        </Link>
        <Link href="#" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-black hover:bg-gray-100 transition-colors">
            <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.53 12.9 20.18 13.18L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
            </svg>
            <div className="text-left">
                <div className="text-[10px] leading-none">Get it on</div>
                <div className="font-semibold">Google Play</div>
            </div>
        </Link>
    </div>
)

const QRDownload = () => (
    <div className="flex items-center gap-4">
        <div className="size-16 rounded-xl bg-white p-2">
            <QrCode className="size-full text-black" />
        </div>
        <div className="text-sm text-gray-400">
            Scan to download<br />the app instantly
        </div>
    </div>
)

const AppVisual = () => (
    <div className="relative">
        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/20 rounded-full blur-3xl" />

        {/* Phone mockup */}
        <div className="relative mx-auto w-56 @md:w-64">
            {/* Phone frame */}
            <div className="relative aspect-[9/19] rounded-[3rem] bg-gray-800 p-2 shadow-2xl">
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-full" />
                <div className="h-full w-full rounded-[2.5rem] overflow-hidden bg-gray-900">
                    {/* App screen */}
                    <div className="h-full p-4 flex flex-col">
                        {/* App header */}
                        <div className="flex items-center justify-between mb-4 pt-6">
                            <div className="text-sm font-bold">ShopApp</div>
                            <div className="size-8 rounded-full bg-white/10" />
                        </div>

                        {/* Featured product */}
                        <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                            <Image
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
                                alt="Featured product"
                                fill
                                className="object-cover"
                            />
                            <Badge className="absolute top-2 left-2 bg-cyan-500 border-0">
                                App Exclusive
                            </Badge>
                        </div>

                        {/* Product info */}
                        <div className="mb-auto">
                            <div className="font-semibold mb-1">Limited Edition Sneakers</div>
                            <div className="text-cyan-400 font-bold">$129 <span className="text-gray-500 line-through text-sm">$179</span></div>
                        </div>

                        {/* Bottom nav */}
                        <div className="flex justify-around py-3 border-t border-white/10">
                            {['🏠', '🔍', '❤️', '👤'].map((icon, i) => (
                                <button key={i} className={`text-lg ${i === 0 ? 'opacity-100' : 'opacity-50'}`}>
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification */}
            <div className="absolute -top-4 -right-8 p-3 bg-white rounded-xl shadow-xl text-gray-900 max-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                    <div className="size-5 rounded bg-cyan-500" />
                    <span className="text-xs font-semibold">ShopApp</span>
                </div>
                <div className="text-xs">Your order is out for delivery! 📦</div>
            </div>
        </div>
    </div>
)
