import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4">
                    <ImageCard
                        src="https://picsum.photos/seed/bento4/800/600"
                        alt="Ryan Cooper"
                        className="@md:col-span-2 @xl:col-span-1 @xl:row-span-2"
                    />
                    <IntroCard
                        eyebrow="About Me"
                        title="Ryan Cooper"
                        role="Backend Engineer"
                        description="I architect and build robust server-side systems. Specializing in distributed systems, APIs, and database optimization."
                        className="@xl:col-span-2"
                    />
                    <ContactCard
                        items={[
                            { icon: Mail, label: 'Email', value: 'ryan@example.com' },
                            { icon: Phone, label: 'Phone', value: '+1 (555) 123-4567' },
                            { icon: MapPin, label: 'Location', value: 'Austin, TX' },
                        ]}
                    />
                    <AvailabilityCard
                        status="Available"
                        items={[
                            { icon: Calendar, text: 'Open for full-time roles' },
                            { icon: Clock, text: 'Starting January 2025' },
                        ]}
                        cta={{ label: 'Schedule Call', href: '/book', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

interface ImageCardProps {
    src: string
    alt: string
    className?: string
}

const ImageCard = ({ src, alt, className }: ImageCardProps) => (
    <Card className={`overflow-hidden py-0 ${className}`}>
        <CardContent className="p-0 h-full relative min-h-64">
            <Image src={src} alt={alt} fill className="object-cover" />
        </CardContent>
    </Card>
)

interface IntroCardProps {
    eyebrow: string
    title: string
    role: string
    description: string
    className?: string
}

const IntroCard = ({ eyebrow, title, role, description, className }: IntroCardProps) => (
    <Card className={className}>
        <CardContent className="p-6 @lg:p-8">
            <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
            <h1 className="text-3xl @lg:text-4xl font-bold mb-1">{title}</h1>
            <p className="text-primary font-medium mb-4">{role}</p>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
    </Card>
)

interface ContactItem {
    icon: React.ComponentType<{ className?: string }>
    label: string
    value: string
}

const ContactCard = ({ items }: { items: ContactItem[] }) => (
    <Card className="bg-muted/50 border-none">
        <CardContent className="p-6">
            <p className="text-sm font-medium mb-4">Contact Info</p>
            <div className="space-y-3">
                {items.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                        <Icon className="size-4 text-muted-foreground" />
                        <div>
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className="text-sm font-medium">{value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface AvailabilityItem {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface AvailabilityCardProps {
    status: string
    items: AvailabilityItem[]
    cta: CTAData
}

const AvailabilityCard = ({ status, items, cta }: AvailabilityCardProps) => (
    <Card>
        <CardContent className="p-6 flex flex-col justify-between h-full">
            <div>
                <Badge className="mb-4 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                    <span className="size-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                    {status}
                </Badge>
                <div className="space-y-2">
                    {items.map(({ icon: Icon, text }, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Icon className="size-4" />
                            <span>{text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Button className="gap-2 mt-4" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)
