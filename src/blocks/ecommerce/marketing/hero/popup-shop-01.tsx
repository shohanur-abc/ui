import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, MapPin, ShoppingBag, Calendar, Clock } from 'lucide-react'
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
                        <Eyebrow icon={MapPin} text="Pop-Up Shop" />
                        <Title text="We're Coming" highlight="To You" />
                        <Description text="Experience our brand in person! Visit our traveling pop-up shop and discover exclusive products, meet our team, and enjoy special in-person deals." />

                        <UpcomingEvents items={[
                            { city: 'New York', location: 'SoHo', dates: 'Jan 15-20' },
                            { city: 'Los Angeles', location: 'The Grove', dates: 'Feb 1-7' },
                            { city: 'Miami', location: 'Wynwood', dates: 'Feb 15-21' },
                        ]} />

                        <EventPerks items={[
                            { icon: ShoppingBag, label: 'Exclusive products' },
                            { icon: Calendar, label: 'Free RSVP' },
                            { icon: Clock, label: 'Extended hours' },
                        ]} />

                        <CTA items={[
                            { label: 'RSVP Now', href: '/popup/rsvp', icon: ArrowRight },
                            { label: 'See All Locations', href: '/popup', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Pop-up Visual */}
                    <div className="relative">
                        <PopupShowcase />
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
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const UpcomingEvents = ({ items }: { items: { city: string; location: string; dates: string }[] }) => (
    <div className="space-y-3 mb-6 @md:mb-8">
        <div className="text-sm font-medium text-muted-foreground">Upcoming Locations</div>
        {items.map(({ city, location, dates }) => (
            <Link
                key={city}
                href={`/popup/${city.toLowerCase()}`}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border hover:border-primary/50 transition-colors group"
            >
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                        <div className="font-semibold">{city}</div>
                        <div className="text-sm text-muted-foreground">{location}</div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="font-medium">{dates}</div>
                    <div className="text-sm text-primary group-hover:underline">RSVP →</div>
                </div>
            </Link>
        ))}
    </div>
)

const EventPerks = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-primary" />
                <span>{label}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const PopupShowcase = () => (
    <div className="relative">
        {/* Main image */}
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800"
                alt="Pop-up shop experience"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Location tag */}
            <div className="absolute bottom-6 left-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                    <div className="size-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">Now Open</span>
                </div>
                <div className="text-2xl font-bold">New York, SoHo</div>
            </div>
        </div>

        {/* Floating event card */}
        <div className="absolute -bottom-6 -right-6 p-4 bg-card rounded-2xl shadow-xl border">
            <div className="flex items-center gap-3">
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="size-6 text-primary" />
                </div>
                <div>
                    <div className="font-semibold">Next Event</div>
                    <div className="text-sm text-muted-foreground">LA • Feb 1st</div>
                </div>
            </div>
        </div>
    </div>
)
