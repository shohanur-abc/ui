import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Briefcase, Code, MapPin, Trophy } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @lg:gap-6">
                    <ProfileCard
                        src="https://picsum.photos/seed/bento1/400/400"
                        fallback="JD"
                        name="James Davis"
                        role="Software Engineer"
                        className="@md:col-span-2 @xl:col-span-2 @xl:row-span-2"
                    />
                    <StatCard icon={Code} value="150+" label="Projects Completed" />
                    <StatCard icon={Briefcase} value="10+" label="Years Experience" />
                    <LocationCard icon={MapPin} location="San Francisco, CA" timezone="PST (UTC-8)" />
                    <AchievementCard icon={Trophy} title="Award Winner" subtitle="Best Developer 2024" />
                    <BioCard
                        text="I build scalable systems that power millions of users. Passionate about clean code and developer experience."
                        cta={{ label: 'Learn More', href: '/about', icon: ArrowRight }}
                        className="@md:col-span-2"
                    />
                </div>
            </div>
        </section>
    )
}

interface ProfileCardProps {
    src: string
    fallback: string
    name: string
    role: string
    className?: string
}

const ProfileCard = ({ src, fallback, name, role, className }: ProfileCardProps) => (
    <Card className={`overflow-hidden py-0 ${className}`}>
        <CardContent className="p-0 h-full flex flex-col">
            <div className="relative flex-1 min-h-48">
                <Avatar className="size-full rounded-none">
                    <AvatarImage src={src} alt={name} className="object-cover" />
                    <AvatarFallback className="rounded-none text-6xl bg-primary text-primary-foreground">
                        {fallback}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="p-4 @lg:p-6">
                <h1 className="text-2xl @lg:text-3xl font-bold mb-1">{name}</h1>
                <p className="text-muted-foreground">{role}</p>
            </div>
        </CardContent>
    </Card>
)

interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
    <Card className="bg-muted/50 border-none">
        <CardContent className="p-4 @lg:p-6 flex flex-col items-center justify-center h-full text-center">
            <Icon className="size-6 text-primary mb-2" />
            <div className="text-2xl @lg:text-3xl font-bold">{value}</div>
            <div className="text-sm text-muted-foreground">{label}</div>
        </CardContent>
    </Card>
)

interface LocationCardProps {
    icon: React.ComponentType<{ className?: string }>
    location: string
    timezone: string
}

const LocationCard = ({ icon: Icon, location, timezone }: LocationCardProps) => (
    <Card>
        <CardContent className="p-4 @lg:p-6 flex flex-col justify-center h-full">
            <Icon className="size-5 text-primary mb-2" />
            <p className="font-medium">{location}</p>
            <p className="text-sm text-muted-foreground">{timezone}</p>
        </CardContent>
    </Card>
)

interface AchievementCardProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    subtitle: string
}

const AchievementCard = ({ icon: Icon, title, subtitle }: AchievementCardProps) => (
    <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-4 @lg:p-6 flex flex-col justify-center h-full">
            <Icon className="size-5 mb-2" />
            <p className="font-medium">{title}</p>
            <p className="text-sm opacity-80">{subtitle}</p>
        </CardContent>
    </Card>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface BioCardProps {
    text: string
    cta: CTAData
    className?: string
}

const BioCard = ({ text, cta, className }: BioCardProps) => (
    <Card className={className}>
        <CardContent className="p-4 @lg:p-6 flex flex-col justify-between h-full">
            <p className="text-muted-foreground leading-relaxed mb-4">{text}</p>
            <Button variant="outline" className="gap-2 w-fit" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)
