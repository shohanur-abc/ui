import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Map, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="slate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Map} text="Global Presence" />
                        <Title text="Offices Around the World" />
                        <Description text="With teams in 15+ countries, we&apos;re always close to our customers. Visit us or schedule a call with your local team." />
                        <LocationList items={[
                            { city: 'San Francisco', address: '123 Market St, CA 94105', phone: '+1 (555) 123-4567' },
                            { city: 'London', address: '45 Canary Wharf, E14 5AB', phone: '+44 20 7946 0958' },
                            { city: 'Singapore', address: '1 Marina Blvd, 018989', phone: '+65 6123 4567' },
                        ]} />
                        <CTA items={[
                            { label: 'Contact Us', href: '#contact', icon: ArrowRight },
                            { label: 'View All Offices', href: '#offices', variant: 'outline' },
                        ]} />
                    </div>
                    <MapPreview />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
)

const LocationList = ({ items }: { items: { city: string; address: string; phone: string }[] }) => (
    <div className="space-y-4 mb-8">
        {items.map(({ city, address, phone }, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                <MapPin className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-semibold mb-1">{city}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{address}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="size-3" /> {phone}
                    </p>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const MapPreview = () => (
    <div className="relative aspect-square @xl:aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
                <Map className="size-16 text-primary/30 mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map placeholder</p>
            </div>
        </div>
        {/* Location markers */}
        <div className="absolute top-1/4 left-1/4">
            <div className="size-4 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="absolute top-1/3 right-1/3">
            <div className="size-4 rounded-full bg-primary animate-pulse" />
        </div>
        <div className="absolute bottom-1/3 right-1/4">
            <div className="size-4 rounded-full bg-primary animate-pulse" />
        </div>
    </div>
)
