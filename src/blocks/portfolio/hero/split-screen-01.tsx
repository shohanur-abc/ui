import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType, FC } from 'react'



export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto px-4 @sm:px-6 @2xl:px-8">
                <ul className="grid @2xl:grid-cols-2 gap-10 @lg:gap-12 @3xl:gap-16 items-center max-w-7xl mx-auto  py-12 @md:py-16 @2xl:py-24 @4xl:py-32">
                    <li className="space-y-5 @md:space-y-6 order-2 @2xl:order-1">

                        <Eyebrow icon={Github} text="Available for hire" />
                        <Title greeting="Hi, I'm" name="John Developer" title="Full-Stack Developer & UI Designer" />
                        <Subtitle text="I craft beautiful digital experiences with modern technologies. Passionate about clean code and pixel-perfect designs." />

                        <CTA items={[
                            { label: 'View My Work', href: '#work', icon: ArrowRight },
                            { label: 'Contact Me', href: '#contact', variant: 'outline' },
                        ]} />

                        <SocialLinks items={[
                            { icon: Github, href: '#', label: 'GitHub' },
                            { icon: Twitter, href: '#', label: 'Twitter' },
                            { icon: Linkedin, href: '#', label: 'LinkedIn' },
                        ]} />

                    </li>

                    <li className="relative order-1 @2xl:order-2 flex justify-center">
                        <HeroImage alt="John Developer" src="https://i.pravatar.cc/400?img=68" />
                    </li>
                </ul>
            </div>
        </section>
    )
}
const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>, text: string }) => (
    <Badge variant="outline" className="gap-2 px-3 py-1.5 w-fit">
        <Icon className="size-4" />{text}
    </Badge>
)

interface TitleProps {
    greeting: string
    name: string
    title: string
}

const Title = ({ greeting, name, title }: TitleProps) => (
    <div>
        <p className="text-lg @md:text-xl text-muted-foreground mb-2">{greeting}</p>
        <h1 className="text-3xl @sm:text-4xl @xl:text-5xl @3xl:text-6xl font-bold tracking-tight leading-tight">
            {name}
        </h1>
        <p className="text-lg @md:text-xl text-primary font-medium mt-2">{title}</p>
    </div>
)

const Subtitle = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground max-w-lg leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: React.ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 pt-2 @md:pt-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" className="h-11 @md:h-12 px-6 @md:px-8 gap-2 group" variant={variant} asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4 transition-transform group-hover:translate-x-1" />}
                </Link>
            </Button>
        ))}
    </div>
)

const SocialLinks = ({ items }: { items: { icon: React.ComponentType<{ className?: string }>; href: string; label: string }[] }) => (
    <div className="flex items-center gap-3 @md:gap-4 pt-2 @md:pt-4">
        <span className="text-sm text-muted-foreground">Find me on</span>
        <div className="flex gap-2">
            {items.map(({ icon: Icon, href, label }) => (
                <Button key={label} variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                    <Link href={href} aria-label={label}>
                        <Icon className="size-5" />
                    </Link>
                </Button>
            ))}
        </div>
    </div>
)

interface HeroImageProps {
    src?: string
    alt?: string
    fallback?: string
}

const HeroImage: FC<HeroImageProps> = ({ src = 'https://i.pravatar.cc/400?img=68', alt = 'Profile', fallback = 'JD' }) => (
    <div className="relative">
        {/* Animated borders */}
        <div
            className="absolute inset-0 -m-3 @md:-m-4 border-2 border-dashed border-primary/20 rounded-full animate-spin"
            style={{ animationDuration: '20s' }}
        />
        <div
            className="absolute inset-0 -m-6 @md:-m-8 border-2 border-dashed border-primary/10 rounded-full animate-spin"
            style={{ animationDuration: '25s', animationDirection: 'reverse' }}
        />

        {/* Profile image */}
        <div className="relative w-56 h-56 @sm:w-64 @sm:h-64 @lg:w-80 @lg:h-80 @3xl:w-96 @3xl:h-96 rounded-full overflow-hidden border-4 border-background shadow-2xl">
            <Image
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                width={400}
                height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        </div>
    </div>
)


