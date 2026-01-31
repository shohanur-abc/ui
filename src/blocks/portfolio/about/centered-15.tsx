import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Building2, Rocket, Users } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <ProfileImage
                        src="https://picsum.photos/seed/about-centered15/400/400"
                        fallback="TN"
                    />
                    <Title text="Thomas Nguyen" />
                    <Role text="Startup Founder & Technical Advisor" />
                    <Description
                        text="I've founded 3 startups (1 exit, 1 still scaling) and now advise early-stage founders on technical strategy. I believe in building products that solve real problems for real people."
                    />
                    <Milestones
                        items={[
                            { icon: Rocket, value: '3', label: 'Startups Founded' },
                            { icon: Building2, value: '1', label: 'Successful Exit' },
                            { icon: Users, value: '20+', label: 'Startups Advised' },
                        ]}
                    />
                    <Separator className="my-8 max-w-md mx-auto" />
                    <FeaturedIn
                        items={['TechCrunch', 'Forbes', 'Wired', 'Product Hunt']}
                    />
                    <CTA
                        items={[
                            { label: 'Work With Me', href: '/advisory', icon: ArrowRight },
                            { label: 'Read My Story', href: '/story', variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
    <Avatar className="size-28 @md:size-36 mx-auto mb-6 ring-4 ring-border shadow-xl">
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
    <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
        {text}
    </p>
)

interface MilestoneItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

const Milestones = ({ items }: { items: MilestoneItem[] }) => (
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

const FeaturedIn = ({ items }: { items: string[] }) => (
    <div className="mb-10">
        <p className="text-sm text-muted-foreground mb-4">Featured in:</p>
        <div className="flex flex-wrap justify-center gap-2">
            {items.map((pub) => (
                <Badge key={pub} variant="outline" className="px-3 py-1">
                    {pub}
                </Badge>
            ))}
        </div>
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
