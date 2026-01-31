import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Award, Briefcase, Code, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-3 gap-8">
                    <ProfileCard
                        src="https://picsum.photos/seed/gr2/600/800"
                        name="Sarah Chen"
                        role="Product Designer"
                        bio="Designing experiences that matter. I help companies create products their users love."
                        cta={{ label: 'Contact Me', href: '/contact', icon: ArrowRight }}
                    />
                    <div className="@lg:col-span-2 space-y-8">
                        <StatsGrid
                            stats={[
                                { icon: Briefcase, value: '10+', label: 'Years Experience' },
                                { icon: Code, value: '100+', label: 'Projects' },
                                { icon: Users, value: '50+', label: 'Clients' },
                                { icon: Award, value: '15', label: 'Awards' },
                            ]}
                        />
                        <StoryCard
                            title="My Story"
                            paragraphs={[
                                "I fell in love with design when I was 12, creating custom themes for my blog. That curiosity led me to study design at RISD.",
                                "Over the past decade, I've designed products for companies like Google, Airbnb, and Stripe. I believe design is about solving real problems for real people.",
                            ]}
                        />
                        <SkillsCard
                            title="Expertise"
                            skills={['Product Design', 'Design Systems', 'Prototyping', 'User Research', 'Figma', 'Framer']}
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

interface ProfileCardProps {
    src: string
    name: string
    role: string
    bio: string
    cta: CTAData
}

const ProfileCard = ({ src, name, role, bio, cta }: ProfileCardProps) => (
    <Card className="overflow-hidden py-0">
        <div className="relative aspect-[3/4]">
            <Image src={src} alt={name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Badge className="mb-2">{role}</Badge>
                <h1 className="text-2xl font-bold mb-2">{name}</h1>
                <p className="text-sm text-white/80 mb-4">{bio}</p>
                <Button size="sm" className="gap-1" asChild>
                    <Link href={cta.href}>
                        {cta.label}
                        <cta.icon className="size-3" />
                    </Link>
                </Button>
            </div>
        </div>
    </Card>
)

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

interface StatsGridProps {
    stats: StatItem[]
}

const StatsGrid = ({ stats }: StatsGridProps) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, value, label }) => (
            <Card key={label}>
                <CardContent className="p-4 text-center">
                    <Icon className="size-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                </CardContent>
            </Card>
        ))}
    </div>
)

interface StoryCardProps {
    title: string
    paragraphs: string[]
}

const StoryCard = ({ title, paragraphs }: StoryCardProps) => (
    <Card>
        <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="space-y-3 text-muted-foreground">
                {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface SkillsCardProps {
    title: string
    skills: string[]
}

const SkillsCard = ({ title, skills }: SkillsCardProps) => (
    <Card>
        <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)
