import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Award, Briefcase, Code, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto space-y-16">
                    <HeroSection
                        src="https://picsum.photos/seed/stack2/1200/600"
                        name="Sarah Chen"
                        role="Product Designer"
                        tagline="Designing experiences that matter"
                    />
                    <StatsSection
                        stats={[
                            { icon: Briefcase, value: '10+', label: 'Years Experience' },
                            { icon: Code, value: '100+', label: 'Projects Completed' },
                            { icon: Users, value: '50+', label: 'Happy Clients' },
                            { icon: Award, value: '15', label: 'Awards Won' },
                        ]}
                    />
                    <Separator />
                    <StorySection
                        title="My Story"
                        content={[
                            "I fell in love with design when I was 12, creating custom themes for my blog. That curiosity led me to study design at RISD, where I discovered my passion for user experience.",
                            "Over the past decade, I've had the privilege of designing products for companies like Google, Airbnb, and Stripe. I've learned that great design isn't about making things pretty—it's about solving problems for real people.",
                            "Today, I run my own design studio, helping startups and enterprises create products their users love. I believe in design that's inclusive, accessible, and delightful.",
                        ]}
                    />
                    <Separator />
                    <ValuesSection
                        title="What I Believe"
                        values={[
                            { title: 'User First', description: 'Every decision starts with understanding user needs.' },
                            { title: 'Simplicity Wins', description: 'The best solutions are often the simplest ones.' },
                            { title: 'Details Matter', description: 'Polish and craft make the difference between good and great.' },
                            { title: 'Always Learning', description: 'The industry evolves fast, and so should we.' },
                        ]}
                    />
                    <CTASection
                        title="Ready to Start?"
                        description="Let's create something amazing together."
                        cta={{ label: 'Start a Project', href: '/contact', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

interface HeroSectionProps {
    src: string
    name: string
    role: string
    tagline: string
}

const HeroSection = ({ src, name, role, tagline }: HeroSectionProps) => (
    <div>
        <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
            <Image src={src} alt={name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
                <Badge className="mb-2">{role}</Badge>
                <h1 className="text-3xl @lg:text-4xl font-bold text-white mb-2">{name}</h1>
                <p className="text-lg text-white/80">{tagline}</p>
            </div>
        </div>
    </div>
)

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

interface StatsSectionProps {
    stats: StatItem[]
}

const StatsSection = ({ stats }: StatsSectionProps) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
                <Icon className="size-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

interface StorySectionProps {
    title: string
    content: string[]
}

const StorySection = ({ title, content }: StorySectionProps) => (
    <div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            {content.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    </div>
)

interface ValueItem {
    title: string
    description: string
}

interface ValuesSectionProps {
    title: string
    values: ValueItem[]
}

const ValuesSection = ({ title, values }: ValuesSectionProps) => (
    <div>
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
        <div className="grid @md:grid-cols-2 gap-4">
            {values.map((value) => (
                <Card key={value.title}>
                    <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CTASectionProps {
    title: string
    description: string
    cta: CTAData
}

const CTASection = ({ title, description, cta }: CTASectionProps) => (
    <div className="text-center p-12 rounded-xl bg-primary text-primary-foreground">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="mb-6 opacity-90">{description}</p>
        <Button variant="secondary" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)
