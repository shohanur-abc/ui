import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-12 @lg:gap-16 items-center">
                    <ProfileSection
                        src="https://picsum.photos/seed/split1/600/600"
                        fallback="JD"
                    />
                    <ContentSection
                        eyebrow={{ icon: Briefcase, text: 'Product Designer' }}
                        title="Jane Doe"
                        subtitle="Crafting Digital Experiences"
                        description="I'm a product designer with 10+ years of experience creating user-centered digital products. I believe great design is invisible—it just works."
                        location={{ icon: MapPin, text: 'New York, NY' }}
                        cta={[
                            { label: 'View My Work', href: '/work', icon: ArrowRight },
                            { label: 'About Me', href: '/about', variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const ProfileSection = ({ src, fallback }: { src: string; fallback: string }) => (
    <div className="flex justify-center @lg:justify-start">
        <Avatar className="size-64 @sm:size-72 @md:size-80 ring-4 ring-border shadow-2xl">
            <AvatarImage src={src} alt="Profile" />
            <AvatarFallback className="text-6xl @md:text-7xl bg-primary text-primary-foreground font-bold">
                {fallback}
            </AvatarFallback>
        </Avatar>
    </div>
)

interface EyebrowData {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface LocationData {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

interface ContentSectionProps {
    eyebrow: EyebrowData
    title: string
    subtitle: string
    description: string
    location: LocationData
    cta: CTAItem[]
}

const ContentSection = ({ eyebrow, title, subtitle, description, location, cta }: ContentSectionProps) => (
    <div className="text-center @lg:text-left">
        <Badge variant="secondary" className="mb-4">
            <eyebrow.icon className="size-3.5 mr-1" />
            {eyebrow.text}
        </Badge>
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-xl @md:text-2xl text-muted-foreground font-light mb-4">{subtitle}</p>
        <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg @lg:max-w-none">{description}</p>
        <div className="flex items-center justify-center @lg:justify-start gap-2 text-sm text-muted-foreground mb-8">
            <location.icon className="size-4" />
            <span>{location.text}</span>
        </div>
        <div className="flex flex-wrap justify-center @lg:justify-start gap-3">
            {cta.map(({ label, href, icon: Icon, variant }, i) => (
                <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                    <Link href={href}>
                        {label}
                        {Icon && <Icon className="size-4" />}
                    </Link>
                </Button>
            ))}
        </div>
    </div>
)
