import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Award, Mic, Users } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <Eyebrow text="Speaker & Educator" />
                    <Title text="Lisa Wang" />
                    <Subtitle text="Helping teams build better products through design thinking" />
                    <ProfileImage
                        src="https://picsum.photos/seed/about-centered11/400/400"
                        fallback="LW"
                    />
                    <Achievements
                        items={[
                            { icon: Mic, value: '100+', label: 'Talks Given' },
                            { icon: Users, value: '50K+', label: 'People Trained' },
                            { icon: Award, value: '15', label: 'Countries' },
                        ]}
                    />
                    <Separator className="my-8 max-w-md mx-auto" />
                    <Description
                        text="I'm a design educator and speaker who has trained teams at companies like Meta, Airbnb, and Spotify. I believe that great design is a superpower that anyone can learn."
                    />
                    <Topics
                        items={['Design Systems', 'User Research', 'Product Strategy', 'Team Leadership', 'Workshop Facilitation']}
                    />
                    <CTA
                        items={[
                            { label: 'Book Me to Speak', href: '/speaking', icon: ArrowRight },
                            { label: 'View Workshops', href: '/workshops', variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-3">{text}</h1>
)

const Subtitle = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">{text}</p>
)

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
    <Avatar className="size-32 @md:size-40 mx-auto mb-8 ring-4 ring-border shadow-xl">
        <AvatarImage src={src} alt="Profile" />
        <AvatarFallback className="text-3xl @md:text-4xl bg-primary text-primary-foreground font-bold">
            {fallback}
        </AvatarFallback>
    </Avatar>
)

interface AchievementItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

const Achievements = ({ items }: { items: AchievementItem[] }) => (
    <div className="flex justify-center gap-8 @md:gap-12">
        {items.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center">
                <Icon className="size-5 @md:size-6 text-primary mx-auto mb-2" />
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
        {text}
    </p>
)

const Topics = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
        {items.map((topic) => (
            <Badge key={topic} variant="secondary">
                {topic}
            </Badge>
        ))}
    </div>
)

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
        {items.map(({ label, href, icon: Icon, variant }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)
