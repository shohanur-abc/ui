import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, MapPin, Users, Video } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Calendar} text="Upcoming Events" />
                    <Title text="Learn, Connect, and Grow" />
                    <Description text="Join industry leaders at our exclusive events. Webinars, workshops, and conferences designed to accelerate your success." />
                    <CTA items={[
                        { label: 'View All Events', href: '#events', icon: ArrowRight },
                        { label: 'Host an Event', href: '#host', variant: 'outline' },
                    ]} />
                </div>
                <EventGrid items={[
                    {
                        type: 'Webinar',
                        icon: Video,
                        title: 'AI in Business: Trends for 2024',
                        date: 'Feb 15, 2024',
                        time: '11:00 AM PST',
                        attendees: 1250,
                        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
                        featured: true,
                    },
                    {
                        type: 'Workshop',
                        icon: Users,
                        title: 'Hands-on Product Training',
                        date: 'Feb 20, 2024',
                        time: '2:00 PM PST',
                        attendees: 45,
                        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
                        featured: false,
                    },
                    {
                        type: 'Conference',
                        icon: MapPin,
                        title: 'Annual User Summit',
                        date: 'Mar 10-12, 2024',
                        time: 'San Francisco',
                        attendees: 2500,
                        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=300&fit=crop',
                        featured: false,
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
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

const EventGrid = ({ items }: { items: { type: string; icon: ComponentType<{ className?: string }>; title: string; date: string; time: string; attendees: number; image: string; featured: boolean }[] }) => (
    <div className="grid @xl:grid-cols-2 gap-6">
        {items.map(({ type, icon: Icon, title, date, time, attendees, image, featured }, i) => (
            <div 
                key={i} 
                className={`group relative rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl hover:border-primary/30 transition-all ${featured ? '@xl:col-span-2' : ''}`}
            >
                <div className={`grid ${featured ? '@xl:grid-cols-2' : ''}`}>
                    <div className={`relative ${featured ? 'aspect-[16/9] @xl:aspect-auto' : 'aspect-video'}`}>
                        <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="p-6 @md:p-8 flex flex-col justify-center">
                        <Badge variant="outline" className="w-fit mb-3 gap-1">
                            <Icon className="size-3" />
                            {type}
                        </Badge>
                        <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors ${featured ? 'text-2xl @md:text-3xl' : 'text-xl'}`}>{title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                            <span className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                {date}
                            </span>
                            <span className="flex items-center gap-1">
                                {type === 'Conference' ? <MapPin className="size-4" /> : <Video className="size-4" />}
                                {time}
                            </span>
                            <span className="flex items-center gap-1">
                                <Users className="size-4" />
                                {attendees.toLocaleString()} registered
                            </span>
                        </div>
                        <Button className="w-fit gap-2">
                            Register Now
                            <ArrowRight className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        ))}
    </div>
)
