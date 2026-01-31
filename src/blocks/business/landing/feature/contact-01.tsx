import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock, Building } from 'lucide-react'
import { ComponentType } from 'react'

interface LocationItem {
    city: string
    address: string
    phone: string
    email: string
    hours: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Building} text="Contact Us" />
                    <Title text="Our Offices" highlight="Worldwide" />
                    <Description text="We have offices around the globe. Find the one nearest you or reach out online." />
                </div>

                <LocationCards locations={[
                    { city: 'San Francisco', address: '100 Market Street, Suite 300', phone: '+1 (415) 555-0123', email: 'sf@company.com', hours: 'Mon-Fri 9AM-6PM PST' },
                    { city: 'New York', address: '350 Fifth Avenue, Floor 21', phone: '+1 (212) 555-0456', email: 'ny@company.com', hours: 'Mon-Fri 9AM-6PM EST' },
                    { city: 'London', address: '1 Canada Square, Canary Wharf', phone: '+44 20 7946 0958', email: 'london@company.com', hours: 'Mon-Fri 9AM-6PM GMT' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const LocationCards = ({ locations }: { locations: LocationItem[] }) => (
    <div className="grid gap-6 @lg:grid-cols-3">
        {locations.map((location) => (
            <Card key={location.city} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4 text-primary">{location.city}</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <MapPin className="size-5 text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-sm">{location.address}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="size-5 text-muted-foreground shrink-0" />
                            <a href={`tel:${location.phone}`} className="text-sm hover:text-primary transition-colors">{location.phone}</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="size-5 text-muted-foreground shrink-0" />
                            <a href={`mailto:${location.email}`} className="text-sm hover:text-primary transition-colors">{location.email}</a>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="size-5 text-muted-foreground shrink-0" />
                            <p className="text-sm text-muted-foreground">{location.hours}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
