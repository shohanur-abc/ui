import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Globe, Languages, Plane } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <ProfileImage
                        src="https://picsum.photos/seed/about-centered10/400/400"
                        fallback="MB"
                    />
                    <Title text="Marco Bianchi" />
                    <Role text="Digital Nomad & Full-Stack Dev" />
                    <CurrentLocation icon={Plane} text="Currently in: Lisbon, Portugal" />
                    <Description
                        text="I've been traveling the world while building software for the past 5 years. I've worked from 40+ countries and helped startups across 4 continents launch their products."
                    />
                    <InfoCards
                        items={[
                            { icon: Globe, title: '40+', subtitle: 'Countries Visited' },
                            { icon: Languages, title: '4', subtitle: 'Languages Spoken' },
                        ]}
                    />
                    <CTA label="Work With Me" href="/contact" icon={ArrowRight} />
                </div>
            </div>
        </section>
    )
}

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
    <Avatar className="size-28 @md:size-36 mx-auto mb-6 ring-4 ring-primary/20">
        <AvatarImage src={src} alt="Profile" />
        <AvatarFallback className="text-3xl bg-primary text-primary-foreground font-bold">
            {fallback}
        </AvatarFallback>
    </Avatar>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">{text}</h1>
)

const Role = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground mb-4">{text}</p>
)

interface CurrentLocationProps {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

const CurrentLocation = ({ icon: Icon, text }: CurrentLocationProps) => (
    <Badge variant="secondary" className="mb-6">
        <Icon className="size-3.5 mr-1.5" />
        {text}
    </Badge>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
        {text}
    </p>
)

interface InfoCardItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    subtitle: string
}

const InfoCards = ({ items }: { items: InfoCardItem[] }) => (
    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-10">
        {items.map(({ icon: Icon, title, subtitle }, i) => (
            <Card key={i}>
                <CardContent className="p-4 text-center">
                    <Icon className="size-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{title}</div>
                    <div className="text-xs text-muted-foreground">{subtitle}</div>
                </CardContent>
            </Card>
        ))}
    </div>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <Icon className="size-4" />
        </Link>
    </Button>
)
