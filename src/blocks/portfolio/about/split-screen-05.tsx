import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <ContentSection
                        greeting="Hey there! 👋"
                        name="Emily Chen"
                        role="Frontend Developer"
                        description="I'm a frontend developer who loves building beautiful, accessible, and performant web applications. I'm passionate about the intersection of design and engineering."
                        socials={[
                            { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                            { icon: Github, href: 'https://github.com', label: 'GitHub' },
                            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                        ]}
                        interests={['React', 'Accessibility', 'Animation', 'Design Systems']}
                        cta={{ label: 'View Projects', href: '/projects', icon: ArrowRight }}
                    />
                    <ImageSection
                        src="https://picsum.photos/seed/split5/800/800"
                        alt="Emily Chen"
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

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ContentSectionProps {
    greeting: string
    name: string
    role: string
    description: string
    socials: SocialItem[]
    interests: string[]
    cta: CTAData
}

const ContentSection = ({ greeting, name, role, description, socials, interests, cta }: ContentSectionProps) => (
    <div>
        <p className="text-lg text-muted-foreground mb-2">{greeting}</p>
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-2">{name}</h1>
        <p className="text-xl text-primary font-medium mb-6">{role}</p>
        <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
        <div className="flex gap-2 mb-6">
            {socials.map(({ icon: Icon, href, label }) => (
                <Button key={label} variant="outline" size="icon" asChild>
                    <Link href={href} aria-label={label}>
                        <Icon className="size-4" />
                    </Link>
                </Button>
            ))}
        </div>
        <Separator className="my-8" />
        <div className="mb-8">
            <p className="text-sm font-medium mb-3">What I Love</p>
            <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                        {interest}
                    </Badge>
                ))}
            </div>
        </div>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl ring-1 ring-border">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)
