import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, Github, Linkedin, Twitter, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'



export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center justify-center ">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 w-full py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Zap} text="Available for Freelance" />
                    <Title text="Crafting Digital" highlight="Experiences" />
                    <Subtitle text="Product designer and creative developer focused on building beautiful, functional interfaces that users love." />

                    <CTA items={[
                        { label: 'View Projects', href: '#projects', icon: ArrowRight },
                        { label: 'Download CV', href: '#cv', icon: Download },
                    ]} />

                    <SocialLinks items={[
                        { icon: Github, href: 'https://github.com', label: 'GitHub' },
                        { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                    ]} />
                </div>
            </div>
        </section>
    )
}


const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>, text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-1.5 mb-4 @md:mb-5 @xl:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold mb-4 @md:mb-5 @xl:mb-6 leading-[1.1] tracking-tight">
        {text}
        <span className="block bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {highlight}
        </span>
    </h1>
)

const Subtitle = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-7 @xl:mb-8 max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: React.ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-8 @md:mb-10 @xl:mb-12">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" className="gap-2" variant={variant || 'default'} asChild>
                <Link href={href}>
                    {Icon && <Icon className="size-4" />}
                    {label}
                </Link>
            </Button>
        ))}
    </div>
)

interface SocialLink {
    icon: ComponentType<{ className?: string }>
    href: string
    label: string
}

const SocialLinks = ({ items }: { items: SocialLink[] }) => (
    <ul className="flex justify-center gap-3 @md:gap-4">
        {items.map(({ icon: Icon, href, label }, i) => (
            <li key={i}>
                <Button size="icon" variant="ghost" className="rounded-full" asChild>
                    <Link href={href} aria-label={label}>
                        <Icon className="size-5" />
                    </Link>
                </Button>
            </li>
        ))}
    </ul>
)
