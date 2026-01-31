import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-5 gap-8 @xl:gap-12 items-center">
                    <div className="@3xl:col-span-2">
                        <AboutImage
                            src="https://picsum.photos/seed/about2/600/600"
                            alt="Developer"
                        />
                    </div>

                    <div className="@3xl:col-span-3">
                        <AboutContent
                            eyebrow="Hello, I'm"
                            name="Alex Thompson"
                            title="Full-Stack Developer & Designer"
                            bio="I'm a passionate developer with a keen eye for design. I believe great software is built at the intersection of technology and creativity. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or mentoring aspiring developers."
                            socials={[
                                { icon: Github, href: 'https://github.com', label: 'GitHub' },
                                { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                                { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                            ]}
                            cta={{ label: 'Download Resume', href: '#resume' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface AboutImageProps {
    src: string
    alt: string
}

const AboutImage = ({ src, alt }: AboutImageProps) => (
    <div className="relative aspect-square rounded-2xl @md:rounded-3xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 ring-1 ring-inset ring-primary/10 rounded-2xl @md:rounded-3xl" />
    </div>
)

interface SocialItem {
    icon: ComponentType<{ className?: string }>
    href: string
    label: string
}

interface AboutContentProps {
    eyebrow: string
    name: string
    title: string
    bio: string
    socials: SocialItem[]
    cta: { label: string; href: string }
}

const AboutContent = ({ eyebrow, name, title, bio, socials, cta }: AboutContentProps) => (
    <div>
        <Badge variant="outline" className="mb-3 @md:mb-4">
            {eyebrow}
        </Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-2">
            {name}
        </h2>
        <p className="text-lg @md:text-xl text-primary font-medium mb-4 @md:mb-6">
            {title}
        </p>
        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
            {bio}
        </p>

        <div className="flex flex-wrap items-center gap-4 @md:gap-6 mb-6 @md:mb-8">
            {socials.map(({ icon: Icon, href, label }, i) => (
                <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                >
                    <Icon className="size-5" />
                    {label}
                </a>
            ))}
        </div>

        <Button size="lg" asChild>
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)
