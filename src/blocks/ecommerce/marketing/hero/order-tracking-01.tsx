import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Package, Truck, CheckCircle, MapPin } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Package} text="Order Tracking" />
                        <Title text="Track Your" highlight="Package" />
                        <Description text="Real-time updates on your order status. Know exactly where your package is and when it will arrive at your doorstep." />

                        <TrackingInput />

                        <TrackingFeatures items={[
                            { icon: MapPin, label: 'Live GPS Tracking' },
                            { icon: Truck, label: 'Delivery Updates' },
                            { icon: CheckCircle, label: 'Delivery Confirmation' },
                        ]} />

                        <CTA items={[
                            { label: 'Track Order', href: '/track', icon: ArrowRight },
                            { label: 'Order History', href: '/orders', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Tracking Visual */}
                    <div className="relative">
                        <TrackingVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-orange-400/50 text-orange-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const TrackingInput = () => (
    <div className="mb-6 @md:mb-8">
        <div className="flex gap-2">
            <input
                type="text"
                placeholder="Enter tracking number"
                className="flex-1 px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
            <Button className="bg-orange-600 hover:bg-orange-700">
                Track
            </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
            Example: TRK123456789
        </p>
    </div>
)

const TrackingFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-orange-600" />
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
                className={`gap-2 ${i === 0 ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
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

const TrackingVisual = () => (
    <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/10 rounded-3xl blur-3xl" />

        {/* Tracking timeline */}
        <div className="relative p-6 @md:p-8 bg-card rounded-3xl shadow-xl border max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="text-sm text-muted-foreground">Order #12345</div>
                    <div className="font-bold">In Transit</div>
                </div>
                <div className="size-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Truck className="size-6 text-orange-600" />
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full bg-muted mb-6 overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full" />
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {[
                    { status: 'Order Placed', time: 'Jan 10, 2:30 PM', done: true },
                    { status: 'Processing', time: 'Jan 10, 4:00 PM', done: true },
                    { status: 'Shipped', time: 'Jan 11, 9:00 AM', done: true },
                    { status: 'Out for Delivery', time: 'Today, 8:00 AM', done: true, current: true },
                    { status: 'Delivered', time: 'Expected by 5 PM', done: false },
                ].map(({ status, time, done, current }) => (
                    <div key={status} className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className={`size-4 rounded-full ${done ? (current ? 'bg-orange-500' : 'bg-green-500') : 'bg-muted border-2 border-border'
                                } ${current ? 'ring-4 ring-orange-500/30' : ''}`} />
                            <div className="w-px h-full bg-border" />
                        </div>
                        <div className={`pb-4 ${current ? 'text-orange-600 font-medium' : done ? '' : 'text-muted-foreground'}`}>
                            <div className="text-sm">{status}</div>
                            <div className="text-xs text-muted-foreground">{time}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)
