import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Building2} text="Career" />
                    <Title text="Where I've Worked" />
                    <Description text="My professional journey through leading technology companies." />
                </div>

                <div className="flex flex-wrap justify-center gap-4 @md:gap-6 max-w-4xl mx-auto">
                    <CompanyBadge
                        logo="https://github.com/google.png"
                        initials="G"
                        name="Google"
                        role="Staff Engineer"
                        href="/experience/google"
                        current
                    />
                    <CompanyBadge
                        logo="https://github.com/facebook.png"
                        initials="M"
                        name="Meta"
                        role="Senior Engineer"
                        href="/experience/meta"
                    />
                    <CompanyBadge
                        logo="https://github.com/stripe.png"
                        initials="S"
                        name="Stripe"
                        role="Engineer"
                        href="/experience/stripe"
                    />
                    <CompanyBadge
                        logo="https://github.com/github.png"
                        initials="GH"
                        name="GitHub"
                        role="Developer"
                        href="/experience/github"
                    />
                </div>

                <div className="text-center mt-12">
                    <Link href="/experience" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                        View detailed experience <ArrowRight className="size-4" />
                    </Link>
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

interface CompanyBadgeProps {
    logo: string
    initials: string
    name: string
    role: string
    href: string
    current?: boolean
}

const CompanyBadge = ({ logo, initials, name, role, href, current }: CompanyBadgeProps) => (
    <Link href={href} className="group">
        <Card className={`hover:shadow-lg transition-all ${current ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="p-6 text-center">
                <Avatar className="size-16 mx-auto mb-4 group-hover:scale-105 transition-transform">
                    <AvatarImage src={logo} alt={name} />
                    <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                </Avatar>
                {current && <Badge className="mb-2">Current</Badge>}
                <h3 className="font-bold group-hover:text-primary transition-colors">{name}</h3>
                <p className="text-sm text-muted-foreground">{role}</p>
            </CardContent>
        </Card>
    </Link>
)
