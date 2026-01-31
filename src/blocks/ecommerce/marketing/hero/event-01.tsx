import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin, Clock, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const EventHero = ({ 
    badge,
    title, 
    date,
    location,
    time,
    description,
    image,
    cta
}: { 
    badge: string
    title: string
    date: string
    location: string
    time: string
    description: string
    image: { src: string; alt: string }
    cta: { primary: { label: string; href: string }; secondary: { label: string; href: string } }
}) => (
    <div className="relative rounded-3xl overflow-hidden min-h-[500px] @lg:min-h-[600px]">
        <Image src={image.src} alt={image.alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        <div className="relative h-full p-8 @lg:p-12 @xl:p-16 flex flex-col justify-center max-w-2xl">
            <Badge variant="secondary" className="w-fit mb-6">{badge}</Badge>
            <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight mb-6">{title}</h1>
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-primary" />
                    <span>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="size-4 text-primary" />
                    <span>{time}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-primary" />
                    <span>{location}</span>
                </div>
            </div>
            <p className="text-lg text-muted-foreground mb-8">{description}</p>
            <div className="flex flex-wrap gap-4">
                <Button size="lg" className="gap-2" asChild>
                    <Link href={cta.primary.href}>
                        <Ticket className="size-5" />
                        {cta.primary.label}
                    </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2" asChild>
                    <Link href={cta.secondary.href}>
                        {cta.secondary.label}
                        <ArrowRight className="size-5" />
                    </Link>
                </Button>
            </div>
        </div>
    </div>
)

const UpcomingEvents = ({ events }: { events: { image: string; title: string; date: string; href: string }[] }) => (
    <div className="grid @sm:grid-cols-3 gap-4 mt-8">
        {events.map((event, i) => (
            <Link key={i} href={event.href} className="group rounded-xl border bg-card overflow-hidden">
                <div className="relative aspect-video">
                    <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
            </Link>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <EventHero 
                    badge="Exclusive Event"
                    title="Fashion Week 2026"
                    date="March 15-20, 2026"
                    time="10:00 AM - 8:00 PM"
                    location="New York City"
                    description="Join us for an exclusive preview of our Spring/Summer 2026 collection. Meet the designers, enjoy exclusive discounts, and be the first to shop the new season."
                    image={{ src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&h=800&fit=crop", alt: "Fashion week" }}
                    cta={{
                        primary: { label: "Get Tickets", href: "/events/fashion-week" },
                        secondary: { label: "Learn More", href: "/events/fashion-week/details" }
                    }}
                />
                <UpcomingEvents events={[
                    { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop", title: "VIP Shopping Night", date: "Feb 28, 2026", href: "/events/vip-night" },
                    { image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop", title: "Style Masterclass", date: "Mar 5, 2026", href: "/events/masterclass" },
                    { image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop", title: "Pop-Up Store", date: "Mar 10, 2026", href: "/events/popup" }
                ]} />
            </div>
        </section>
    )
}
