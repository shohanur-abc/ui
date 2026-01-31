import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Star, MessageSquare, Heart, Github, Twitter, Linkedin } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <BackgroundDecorative />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-32">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                    {/* Profile Section */}
                    <ProfileSection
                        src="https://i.pravatar.cc/400?img=8"
                        fallback="RN"
                        name="Rachel Nguyen"
                        role="Creative Developer"
                        location="Tokyo, Japan"
                    />

                    {/* Title & Description */}
                    <Title text="I create" highlight="delightful" suffix="web experiences" />
                    <Description text="Blending creativity with code to build interactive websites and digital products. Specialized in animation, 3D web, and creative development." />

                    {/* CTA */}
                    <CTA items={[
                        { label: 'View Projects', href: '#projects', icon: ArrowRight },
                        { label: 'Contact Me', href: '#contact', variant: 'outline' },
                    ]} />

                    {/* Social Proof */}
                    <SocialProof />

                    {/* Quick Links */}
                    <SocialLinks items={[
                        { icon: Github, href: '#', label: 'GitHub' },
                        { icon: Twitter, href: '#', label: 'Twitter' },
                        { icon: Linkedin, href: '#', label: 'LinkedIn' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const BackgroundDecorative = () => (
    <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl" />
    </div>
)

interface ProfileSectionProps {
    src?: string
    fallback: string
    name: string
    role: string
    location: string
}

const ProfileSection = ({ src, fallback, name, role, location }: ProfileSectionProps) => (
    <div className="mb-8 @md:mb-10">
        <Avatar className="size-24 @sm:size-28 @md:size-32 mx-auto mb-5 ring-4 ring-background shadow-2xl">
            <AvatarImage src={src} />
            <AvatarFallback className="text-2xl @md:text-3xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl @md:text-2xl font-bold mb-1">{name}</h2>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>{role}</span>
            <span>•</span>
            <span>{location}</span>
        </div>
    </div>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl @3xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                {highlight}
            </span>
            <span className="absolute bottom-2 left-0 right-0 h-3 @md:h-4 bg-primary/20 -z-0 rounded" />
        </span>{' '}
        {suffix}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8 @md:mb-10">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-10 @md:mb-12">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const SocialProof = () => (
    <div className="flex flex-wrap justify-center items-center gap-6 @md:gap-8 mb-8 @md:mb-10 py-6 px-8 rounded-2xl bg-muted/30 backdrop-blur-sm border">
        <div className="flex items-center gap-2">
            <Star className="size-5 text-yellow-500 fill-yellow-500" />
            <span className="font-semibold">50+</span>
            <span className="text-sm text-muted-foreground">Projects</span>
        </div>
        <div className="h-6 w-px bg-border" />
        <div className="flex items-center gap-2">
            <Heart className="size-5 text-red-500 fill-red-500" />
            <span className="font-semibold">100+</span>
            <span className="text-sm text-muted-foreground">Happy Clients</span>
        </div>
        <div className="h-6 w-px bg-border hidden @sm:block" />
        <div className="flex items-center gap-2">
            <MessageSquare className="size-5 text-primary" />
            <span className="font-semibold">5★</span>
            <span className="text-sm text-muted-foreground">Reviews</span>
        </div>
    </div>
)

const SocialLinks = ({ items }: { items: { icon: ComponentType<{ className?: string }>; href: string; label: string }[] }) => (
    <div className="flex items-center gap-2">
        {items.map(({ icon: Icon, href, label }) => (
            <Button key={label} variant="ghost" size="icon" className="rounded-full" asChild>
                <Link href={href} aria-label={label}>
                    <Icon className="size-5" />
                </Link>
            </Button>
        ))}
    </div>
)
