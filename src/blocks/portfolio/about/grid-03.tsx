import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowRight, CheckCircle2, Github, Linkedin, MapPin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6">
                    <ProfileCard
                        src="https://picsum.photos/seed/gr3/600/600"
                        name="Mike Kim"
                        role="Full-Stack Developer"
                        location="San Francisco, CA"
                        status="Available for hire"
                        socials={[
                            { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                            { icon: Github, href: 'https://github.com', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                        ]}
                    />
                    <SkillsCard
                        title="Technical Skills"
                        skills={[
                            { name: 'React / Next.js', level: 95 },
                            { name: 'TypeScript', level: 90 },
                            { name: 'Node.js', level: 88 },
                            { name: 'PostgreSQL', level: 85 },
                        ]}
                    />
                    <BioCard
                        title="About Me"
                        content="I build web applications that are fast, accessible, and delightful to use. With 8 years of experience, I've shipped products used by millions of users worldwide."
                    />
                    <ServicesCard
                        title="What I Offer"
                        services={[
                            'Custom web development',
                            'API design',
                            'Performance optimization',
                            'Code review',
                        ]}
                    />
                    <CTACard
                        title="Let's Build Something"
                        description="Ready to start your project? Let's discuss your needs."
                        cta={{ label: 'Get in Touch', href: '/contact', icon: ArrowRight }}
                    />
                    <QuoteCard
                        quote="Mike delivered our project ahead of schedule with exceptional quality. Highly recommended!"
                        author="Jane Smith"
                        role="CEO, TechStartup"
                    />
                </div>
            </div>
        </section>
    )
}

interface SocialItem {
    icon: React.ComponentType<{ className?: string }>
    href: string
    label: string
}

interface ProfileCardProps {
    src: string
    name: string
    role: string
    location: string
    status: string
    socials: SocialItem[]
}

const ProfileCard = ({ src, name, role, location, status, socials }: ProfileCardProps) => (
    <Card className="overflow-hidden py-0">
        <div className="relative aspect-square">
            <Image src={src} alt={name} fill className="object-cover" />
        </div>
        <CardContent className="p-6">
            <Badge className="mb-2">{role}</Badge>
            <h1 className="text-xl font-bold mb-1">{name}</h1>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                <MapPin className="size-3" />
                <span>{location}</span>
            </div>
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-4">
                <span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                {status}
            </Badge>
            <div className="flex gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                    <Button key={label} variant="outline" size="icon" className="size-8" asChild>
                        <Link href={href} aria-label={label}>
                            <Icon className="size-4" />
                        </Link>
                    </Button>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface SkillItem {
    name: string
    level: number
}

interface SkillsCardProps {
    title: string
    skills: SkillItem[]
}

const SkillsCard = ({ title, skills }: SkillsCardProps) => (
    <Card>
        <CardHeader>
            <h2 className="text-lg font-bold">{title}</h2>
        </CardHeader>
        <CardContent className="space-y-4">
            {skills.map((skill) => (
                <div key={skill.name}>
                    <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                </div>
            ))}
        </CardContent>
    </Card>
)

interface BioCardProps {
    title: string
    content: string
}

const BioCard = ({ title, content }: BioCardProps) => (
    <Card>
        <CardHeader>
            <h2 className="text-lg font-bold">{title}</h2>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">{content}</p>
        </CardContent>
    </Card>
)

interface ServicesCardProps {
    title: string
    services: string[]
}

const ServicesCard = ({ title, services }: ServicesCardProps) => (
    <Card>
        <CardHeader>
            <h2 className="text-lg font-bold">{title}</h2>
        </CardHeader>
        <CardContent className="space-y-2">
            {services.map((service) => (
                <div key={service} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <span>{service}</span>
                </div>
            ))}
        </CardContent>
    </Card>
)

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CTACardProps {
    title: string
    description: string
    cta: CTAData
}

const CTACard = ({ title, description, cta }: CTACardProps) => (
    <Card className="bg-primary text-primary-foreground">
        <CardHeader>
            <h2 className="text-lg font-bold">{title}</h2>
        </CardHeader>
        <CardContent>
            <p className="text-sm opacity-90 mb-4">{description}</p>
            <Button variant="secondary" size="sm" className="gap-1" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-3" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)

interface QuoteCardProps {
    quote: string
    author: string
    role: string
}

const QuoteCard = ({ quote, author, role }: QuoteCardProps) => (
    <Card>
        <CardContent className="p-6">
            <blockquote className="text-sm italic mb-4">&ldquo;{quote}&rdquo;</blockquote>
            <div>
                <p className="font-medium text-sm">{author}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
            </div>
        </CardContent>
    </Card>
)
