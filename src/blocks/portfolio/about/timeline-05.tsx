import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Building, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row items-start gap-8 @xl:gap-16">
                    <div className="@lg:w-1/3">
                        <ProfileSidebar
                            src="https://picsum.photos/seed/timeline5/400/400"
                            fallback="DK"
                            name="David Kim"
                            role="Software Architect"
                            summary="15+ years shipping products at scale. From IC to architect."
                            cta={{ label: 'View Resume', href: '/resume', icon: ArrowRight }}
                        />
                    </div>
                    <div className="@lg:w-2/3">
                        <CareerTimeline
                            items={[
                                {
                                    company: 'Google',
                                    logo: 'https://picsum.photos/seed/g1/100/100',
                                    role: 'Principal Software Architect',
                                    period: '2021 - Present',
                                    description: 'Designing systems that serve billions of requests per day.',
                                    achievements: ['Led migration to microservices', 'Reduced latency by 40%', 'Mentored 20+ engineers'],
                                },
                                {
                                    company: 'Amazon',
                                    logo: 'https://picsum.photos/seed/a1/100/100',
                                    role: 'Senior Principal Engineer',
                                    period: '2017 - 2021',
                                    description: 'Built AWS infrastructure serving enterprise customers.',
                                    achievements: ['Launched 3 new services', 'Scaled to 1M+ customers'],
                                },
                                {
                                    company: 'Microsoft',
                                    logo: 'https://picsum.photos/seed/m1/100/100',
                                    role: 'Principal Engineer',
                                    period: '2012 - 2017',
                                    description: 'Core contributor to Azure cloud platform.',
                                    achievements: ['Patent holder', 'Speaker at conferences'],
                                },
                                {
                                    company: 'Startup',
                                    logo: 'https://picsum.photos/seed/s1/100/100',
                                    role: 'Founding Engineer',
                                    period: '2009 - 2012',
                                    description: 'First engineer. Built product from 0 to acquisition.',
                                    achievements: ['Acquired for $50M', 'Team grew to 30'],
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ProfileSidebarProps {
    src: string
    fallback: string
    name: string
    role: string
    summary: string
    cta: CTAData
}

const ProfileSidebar = ({ src, fallback, name, role, summary, cta }: ProfileSidebarProps) => (
    <div className="sticky top-8">
        <Avatar className="size-24 mb-6 ring-4 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-1">{name}</h1>
        <p className="text-primary font-medium mb-4">{role}</p>
        <p className="text-muted-foreground text-sm mb-6">{summary}</p>
        <Button className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

interface CareerItem {
    company: string
    logo: string
    role: string
    period: string
    description: string
    achievements: string[]
}

interface CareerTimelineProps {
    items: CareerItem[]
}

const CareerTimeline = ({ items }: CareerTimelineProps) => (
    <div className="space-y-6">
        {items.map((item, i) => (
            <Card key={i} className="overflow-hidden">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="relative size-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                            {item.logo ? (
                                <Image src={item.logo} alt={item.company} fill className="object-cover" />
                            ) : (
                                <Building className="size-6 text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-semibold">{item.role}</h3>
                                    <p className="text-sm text-primary">{item.company}</p>
                                </div>
                                <Badge variant="secondary">{item.period}</Badge>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <div className="space-y-1">
                        {item.achievements.map((achievement, j) => (
                            <div key={j} className="flex items-center gap-2 text-sm">
                                <ChevronRight className="size-4 text-primary" />
                                <span>{achievement}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
