import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative min-h-screen flex items-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600"
                    alt="Store Interior"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @2xl:grid-cols-2 gap-10 @lg:gap-16 items-center">
                    {/* Content */}
                    <div className="text-white">
                        <Eyebrow text="Store Opening" />
                        <Title text="We're Coming to" highlight="Your City" />
                        <Description text="Experience our collection in person at our newest flagship store. Exclusive opening weekend deals and complimentary styling sessions await." />

                        <EventDetails items={[
                            { icon: MapPin, label: 'Location', value: '123 Fashion Ave, NYC' },
                            { icon: Calendar, label: 'Opening Date', value: 'March 15, 2026' },
                            { icon: Users, label: 'RSVP Status', value: '500+ Attending' },
                        ]} />

                        <CTA items={[
                            { label: 'RSVP Now', href: '/rsvp', icon: ArrowRight },
                            { label: 'Get Directions', href: '/directions', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Map/Visual */}
                    <div className="hidden @2xl:block">
                        <MapPreview />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge className="mb-4 @md:mb-6 bg-white/20 text-white border-0 px-4 py-2">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-white/80 leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const EventDetails = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; value: string }[] }) => (
    <div className="space-y-4 mb-8 @md:mb-10 p-5 @md:p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
        {items.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4">
                <div className="size-10 @md:size-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="size-5 @md:size-6" />
                </div>
                <div>
                    <div className="text-xs text-white/60">{label}</div>
                    <div className="font-semibold">{value}</div>
                </div>
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
                className={`gap-2 ${variant === 'outline' ? 'border-white/30 text-white hover:bg-white/20' : ''}`}
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

const MapPreview = () => (
    <div className="relative aspect-square rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
        <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600"
            alt="Store Location Map"
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-16 @md:size-20 rounded-full bg-primary flex items-center justify-center animate-pulse">
                <MapPin className="size-8 @md:size-10 text-white" />
            </div>
        </div>
    </div>
)
