import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Briefcase, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Briefcase} text="Career" />
                    <Title text="Recent Positions" />
                    <Description text="My most recent professional experiences." />
                </div>

                <div className="grid @lg:grid-cols-2 gap-6">
                    <PositionCard
                        period="2022 - Present"
                        role="Staff Software Engineer"
                        company="Google"
                        team="Design Systems"
                        description="Leading the design system platform team, building tools and components used by 500+ engineers across the organization."
                        href="/experience/google"
                        current
                    />
                    <PositionCard
                        period="2020 - 2022"
                        role="Senior Software Engineer"
                        company="Meta"
                        team="Instagram"
                        description="Built and shipped Stories and Reels features, working on performance optimization and new feature development."
                        href="/experience/meta"
                    />
                    <PositionCard
                        period="2018 - 2020"
                        role="Software Engineer"
                        company="Stripe"
                        team="Dashboard"
                        description="Developed merchant-facing dashboard and payment processing flows for enterprise customers."
                        href="/experience/stripe"
                    />
                    <PositionCard
                        period="2016 - 2018"
                        role="Frontend Developer"
                        company="Startup Inc"
                        team="Product"
                        description="Full-stack development for a SaaS platform, from initial MVP to production launch."
                        href="/experience/startup"
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface PositionCardProps {
    period: string
    role: string
    company: string
    team: string
    description: string
    href: string
    current?: boolean
}

const PositionCard = ({ period, role, company, team, description, href, current }: PositionCardProps) => (
    <Link href={href} className="group">
        <Card className={`h-full hover:shadow-lg transition-all ${current ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs font-mono">{period}</Badge>
                        {current && <Badge className="text-xs">Current</Badge>}
                    </div>
                    <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{role}</h3>
                <p className="text-sm text-primary mb-1">{company}</p>
                <p className="text-xs text-muted-foreground mb-4">{team} Team</p>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    </Link>
)
