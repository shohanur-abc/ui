import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <ProfileSection
                        src="https://picsum.photos/seed/split7/600/600"
                        fallback="AW"
                        status="Available for Hire"
                    />
                    <ContentSection
                        title="Anna Williams"
                        role="UX Researcher"
                        description="I uncover insights that drive product decisions. With a background in cognitive psychology and 7 years in tech, I help teams build products that truly understand their users."
                        expertise={[
                            'User Interviews',
                            'Usability Testing',
                            'Survey Design',
                            'Data Analysis',
                            'Journey Mapping',
                            'Personas',
                        ]}
                        workWith={[
                            'Product Teams',
                            'Design Teams',
                            'Startups',
                            'Enterprise',
                        ]}
                        cta={[
                            { label: 'See Case Studies', href: '/cases', icon: ArrowUpRight },
                            { label: 'Get In Touch', href: '/contact', variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface ProfileSectionProps {
    src: string
    fallback: string
    status: string
}

const ProfileSection = ({ src, fallback, status }: ProfileSectionProps) => (
    <div className="flex flex-col items-center @lg:items-start">
        <Badge className="mb-6 bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
            <span className="size-2 rounded-full bg-green-500 mr-2 animate-pulse" />
            {status}
        </Badge>
        <Avatar className="size-64 @sm:size-72 @md:size-80 ring-4 ring-border shadow-2xl">
            <AvatarImage src={src} alt="Profile" />
            <AvatarFallback className="text-6xl @md:text-7xl bg-primary text-primary-foreground font-bold">
                {fallback}
            </AvatarFallback>
        </Avatar>
    </div>
)

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

interface ContentSectionProps {
    title: string
    role: string
    description: string
    expertise: string[]
    workWith: string[]
    cta: CTAItem[]
}

const ContentSection = ({ title, role, description, expertise, workWith, cta }: ContentSectionProps) => (
    <div>
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-2">{title}</h1>
        <p className="text-xl text-primary font-medium mb-6">{role}</p>
        <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>
        <div className="mb-6">
            <p className="text-sm font-medium mb-3">Areas of Expertise</p>
            <div className="grid grid-cols-2 gap-2">
                {expertise.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="size-4 text-primary shrink-0" />
                        {item}
                    </div>
                ))}
            </div>
        </div>
        <Separator className="my-6" />
        <div className="mb-8">
            <p className="text-sm font-medium mb-3">I Work With</p>
            <div className="flex flex-wrap gap-2">
                {workWith.map((item) => (
                    <Badge key={item} variant="secondary">
                        {item}
                    </Badge>
                ))}
            </div>
        </div>
        <div className="flex flex-wrap gap-3">
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
