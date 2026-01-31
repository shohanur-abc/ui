import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, Users } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-28">
                <div className="flex flex-col items-center text-center gap-6">
                    <Eyebrow label="Upcoming Event" />
                    <Title text="DevConf 2026" />
                    <Subtitle text="The Future of Web Development" />
                    <EventInfo
                        date="March 15-17, 2026"
                        location="San Francisco, CA"
                        attendees="5,000+ expected"
                    />
                    <Description text="Join industry leaders, innovators, and developers for three days of talks, workshops, and networking." />
                    <CTAGroup
                        primary={{ label: 'Get Tickets', href: '/tickets' }}
                        secondary={{ label: 'View Schedule', href: '/schedule' }}
                    />
                    <Countdown
                        items={[
                            { value: 45, label: 'Days' },
                            { value: 12, label: 'Hours' },
                            { value: 30, label: 'Minutes' },
                        ]}
                    />
                </div>
            </div>
            <BackgroundDecorative />
        </section>
    )
}

interface EyebrowProps {
    label: string
}

const Eyebrow = ({ label }: EyebrowProps) => (
    <Badge className="bg-primary text-primary-foreground px-4 py-1.5">
        {label}
    </Badge>
)

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
        {text}
    </h1>
)

interface SubtitleProps {
    text: string
}

const Subtitle = ({ text }: SubtitleProps) => (
    <p className="text-xl @md:text-2xl text-muted-foreground font-medium -mt-2">
        {text}
    </p>
)

interface EventInfoProps {
    date: string
    location: string
    attendees: string
}

const EventInfo = ({ date, location, attendees }: EventInfoProps) => (
    <div className="flex flex-wrap justify-center gap-4 @md:gap-6 text-sm">
        <span className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="size-4 text-primary" />
            {date}
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            {location}
        </span>
        <span className="flex items-center gap-2 text-muted-foreground">
            <Users className="size-4 text-primary" />
            {attendees}
        </span>
    </div>
)

interface DescriptionProps {
    text: string
}

const Description = ({ text }: DescriptionProps) => (
    <p className="text-lg text-muted-foreground max-w-xl">
        {text}
    </p>
)

interface CTAGroupProps {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
}

const CTAGroup = ({ primary, secondary }: CTAGroupProps) => (
    <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg" asChild>
            <Link href={primary.href}>{primary.label}</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
            <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
    </div>
)

interface CountdownItem {
    value: number
    label: string
}

interface CountdownProps {
    items: CountdownItem[]
}

const Countdown = ({ items }: CountdownProps) => (
    <div className="flex gap-6 mt-6">
        {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center">
                <div className="size-16 @md:size-20 rounded-xl bg-card border flex items-center justify-center">
                    <span className="text-2xl @md:text-3xl font-bold">{item.value}</span>
                </div>
                <span className="text-xs text-muted-foreground mt-2">{item.label}</span>
            </div>
        ))}
    </div>
)

const BackgroundDecorative = () => (
    <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    </>
)
