import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Github, Linkedin, MapPin, Twitter } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-2xl mx-auto space-y-12">
                    <ProfileSection
                        src="https://picsum.photos/seed/stack1/400/400"
                        fallback="JD"
                        name="John Doe"
                        role="Software Engineer"
                        location="San Francisco, CA"
                        socials={[
                            { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                            { icon: Github, href: 'https://github.com', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                        ]}
                    />
                    <Separator />
                    <BioSection
                        title="About Me"
                        paragraphs={[
                            "I'm a software engineer with 8+ years of experience building web applications. I specialize in React, TypeScript, and Node.js, with a passion for creating intuitive user experiences.",
                            "Currently, I work at Google where I lead frontend development for Google Cloud Console. Previously, I was at Meta and Stripe, contributing to products used by millions.",
                            "When I'm not coding, you'll find me hiking in the Bay Area, reading sci-fi novels, or experimenting with new cooking recipes.",
                        ]}
                    />
                    <Separator />
                    <SkillsSection
                        title="Expertise"
                        skills={['React', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes']}
                    />
                    <CTASection
                        title="Let's Work Together"
                        description="I'm always open to discussing new projects and opportunities."
                        cta={{ label: 'Get in Touch', href: '/contact', icon: ArrowRight }}
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

interface ProfileSectionProps {
    src: string
    fallback: string
    name: string
    role: string
    location: string
    socials: SocialItem[]
}

const ProfileSection = ({ src, fallback, name, role, location, socials }: ProfileSectionProps) => (
    <div className="text-center">
        <Avatar className="size-32 mx-auto mb-6 ring-4 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-4xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl @lg:text-4xl font-bold mb-2">{name}</h1>
        <p className="text-xl text-primary font-medium mb-3">{role}</p>
        <div className="flex items-center justify-center gap-1 text-muted-foreground mb-6">
            <MapPin className="size-4" />
            <span>{location}</span>
        </div>
        <div className="flex justify-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
                <Button key={label} variant="outline" size="icon" asChild>
                    <Link href={href} aria-label={label}>
                        <Icon className="size-4" />
                    </Link>
                </Button>
            ))}
        </div>
    </div>
)

interface BioSectionProps {
    title: string
    paragraphs: string[]
}

const BioSection = ({ title, paragraphs }: BioSectionProps) => (
    <div>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="space-y-4 text-muted-foreground">
            {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    </div>
)

interface SkillsSectionProps {
    title: string
    skills: string[]
}

const SkillsSection = ({ title, skills }: SkillsSectionProps) => (
    <div>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
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
    <div className="text-center p-8 rounded-xl bg-muted/50">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)
