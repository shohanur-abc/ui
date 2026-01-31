import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header
                    title="Upcoming Events"
                    cta={{ label: 'View Calendar', href: '/events' }}
                />
                <EventGrid
                    events={[
                        {
                            title: 'React Summit 2026',
                            date: 'Mar 15-17, 2026',
                            location: 'San Francisco',
                            attendees: '5,000+',
                            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
                            featured: true,
                        },
                        {
                            title: 'TypeScript Conf',
                            date: 'Apr 22-23, 2026',
                            location: 'Online',
                            attendees: '10,000+',
                            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600',
                            featured: false,
                        },
                        {
                            title: 'CSS Day',
                            date: 'May 10, 2026',
                            location: 'Amsterdam',
                            attendees: '1,500',
                            image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600',
                            featured: false,
                        },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
    cta: { label: string; href: string }
}

const Header = ({ title, cta }: HeaderProps) => (
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <Calendar className="size-6 text-primary" />
            <h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
        </div>
        <Button variant="outline" asChild className="gap-1">
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

interface Event {
    title: string
    date: string
    location: string
    attendees: string
    image: string
    featured: boolean
}

interface EventGridProps {
    events: Event[]
}

const EventGrid = ({ events }: EventGridProps) => (
    <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
        {events.map((event) => (
            <Card key={event.title} className="group overflow-hidden py-0">
                <div className="relative aspect-video">
                    <Image src={event.image} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    {event.featured && (
                        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0">
                            Featured
                        </Badge>
                    )}
                </div>
                <CardContent className="p-5">
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors">
                        {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-primary" />
                            {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="size-4 text-primary" />
                            {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="size-4 text-primary" />
                            {event.attendees} attendees
                        </div>
                    </div>
                    <Button size="sm" className="w-full gap-2">
                        Register Now
                        <ArrowRight className="size-3.5" />
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
