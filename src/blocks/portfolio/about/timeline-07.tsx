import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <ProfileHeader
                    src="https://picsum.photos/seed/timeline7/400/400"
                    fallback="LN"
                    name="Lisa Nakamura"
                    role="Digital Nomad & Developer"
                    bio="Building products while exploring the world. Visited 40+ countries, worked from 20+."
                />
                <LocationTimeline
                    items={[
                        { year: '2024', location: 'Tokyo, Japan', flag: '🇯🇵', description: 'Current base. Building fintech products for APAC market.' },
                        { year: '2023', location: 'Lisbon, Portugal', flag: '🇵🇹', description: 'Joined the vibrant tech community. Launched a SaaS product.' },
                        { year: '2022', location: 'Bali, Indonesia', flag: '🇮🇩', description: 'Found work-life balance. Focused on wellness tech.' },
                        { year: '2021', location: 'Berlin, Germany', flag: '🇩🇪', description: 'Startup scene. Worked with multiple early-stage companies.' },
                        { year: '2020', location: 'Remote First', flag: '🌍', description: 'Pandemic shifted everything. Embraced full remote work.' },
                        { year: '2019', location: 'San Francisco, USA', flag: '🇺🇸', description: 'Started career at a FAANG company. Learned the ropes.' },
                    ]}
                />
                <CTA label="Follow My Journey" href="/blog" icon={ArrowRight} />
            </div>
        </section>
    )
}

interface ProfileHeaderProps {
    src: string
    fallback: string
    name: string
    role: string
    bio: string
}

const ProfileHeader = ({ src, fallback, name, role, bio }: ProfileHeaderProps) => (
    <div className="text-center mb-12">
        <Avatar className="size-28 mx-auto mb-6 ring-4 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl @lg:text-4xl font-bold mb-2">{name}</h1>
        <p className="text-primary font-medium mb-3">{role}</p>
        <p className="text-muted-foreground max-w-lg mx-auto">{bio}</p>
    </div>
)

interface LocationItem {
    year: string
    location: string
    flag: string
    description: string
}

interface LocationTimelineProps {
    items: LocationItem[]
}

const LocationTimeline = ({ items }: LocationTimelineProps) => (
    <div className="max-w-2xl mx-auto">
        <Separator className="mb-8" />
        <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
                {items.map((item, i) => (
                    <div key={i} className="relative pl-16">
                        <div className="absolute left-0 size-12 rounded-full bg-muted flex items-center justify-center text-2xl ring-4 ring-background z-10">
                            {item.flag}
                        </div>
                        <div className="flex flex-col @sm:flex-row @sm:items-center gap-2 mb-2">
                            <Badge variant="secondary">{item.year}</Badge>
                            <div className="flex items-center gap-1 text-sm font-medium">
                                <MapPin className="size-4 text-primary" />
                                {item.location}
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
        <Separator className="mt-8" />
    </div>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center mt-12">
        <Button className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)
