import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Star } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <ProfileImage
                        src="https://picsum.photos/seed/about-centered9/400/400"
                        fallback="NK"
                    />
                    <Title text="Nina Kowalski" />
                    <Role text="Open Source Maintainer" />
                    <Description
                        text="I'm the creator and lead maintainer of several popular open source libraries. I believe in building tools that empower developers and make the web a more accessible place."
                    />
                    <OpenSourceStats
                        items={[
                            { value: '45K+', label: 'GitHub Stars' },
                            { value: '2M+', label: 'Weekly Downloads' },
                            { value: '500+', label: 'Contributors' },
                        ]}
                    />
                    <FeaturedProjects
                        items={[
                            { name: 'react-motion', stars: '25K', href: 'https://github.com' },
                            { name: 'typescript-utils', stars: '12K', href: 'https://github.com' },
                            { name: 'css-toolkit', stars: '8K', href: 'https://github.com' },
                        ]}
                    />
                    <CTA
                        items={[
                            { label: 'View GitHub', href: 'https://github.com', icon: Github },
                            { label: 'Sponsor My Work', href: '/sponsor', variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
    <Avatar className="size-28 @md:size-36 mx-auto mb-6 ring-4 ring-border">
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
    <p className="text-lg @md:text-xl text-primary font-medium mb-6">{text}</p>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
        {text}
    </p>
)

interface StatItem {
    value: string
    label: string
}

const OpenSourceStats = ({ items }: { items: StatItem[] }) => (
    <div className="flex justify-center gap-8 @md:gap-12 mb-8">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

interface ProjectItem {
    name: string
    stars: string
    href: string
}

const FeaturedProjects = ({ items }: { items: ProjectItem[] }) => (
    <div className="flex flex-wrap justify-center gap-2 mb-10">
        {items.map(({ name, stars, href }) => (
            <Badge key={name} variant="outline" className="px-3 py-1.5" asChild>
                <Link href={href} className="flex items-center gap-2">
                    <span className="font-mono">{name}</span>
                    <Star className="size-3 fill-current" />
                    <span>{stars}</span>
                    <ExternalLink className="size-3" />
                </Link>
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
    <div className="flex flex-wrap justify-center gap-3">
        {items.map(({ label, href, icon: Icon, variant }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {Icon && <Icon className="size-4" />}
                    {label}
                </Link>
            </Button>
        ))}
    </div>
)
