import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowUpRight, Circle } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container min-h-screen flex items-center">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-4xl">
                    <StatusIndicator />
                    <Title firstName="Sophie" lastName="Anderson" />
                    <Subtitle text="Product Designer crafting intuitive digital experiences" />
                    <Description text="Currently designing at Stripe. Previously at Figma and Google. I believe great design is invisible—it just works." />

                    <CTA items={[
                        { label: 'View Selected Work', href: '#work', icon: ArrowRight },
                        { label: 'About Me', href: '#about' },
                    ]} />

                    <QuickLinks items={[
                        { label: 'LinkedIn', href: '#' },
                        { label: 'Twitter', href: '#' },
                        { label: 'Dribbble', href: '#' },
                        { label: 'Read.cv', href: '#' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const StatusIndicator = () => (
    <div className="flex items-center gap-3 mb-8 @md:mb-10">
        <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span className="text-sm text-muted-foreground">Available for new opportunities</span>
    </div>
)

const Title = ({ firstName, lastName }: { firstName: string; lastName: string }) => (
    <h1 className="mb-4 @md:mb-6">
        <span className="block text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl @3xl:text-8xl font-bold tracking-tight">
            {firstName}
        </span>
        <span className="block text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl @3xl:text-8xl font-bold tracking-tight text-muted-foreground/40">
            {lastName}
        </span>
    </h1>
)

const Subtitle = ({ text }: { text: string }) => (
    <p className="text-xl @md:text-2xl @xl:text-3xl font-medium mb-4 @md:mb-6">
        {text}
    </p>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8 @md:mb-10 @xl:mb-12">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-12 @md:mb-16">
        {items.map(({ label, href, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={i === 0 ? 'default' : 'outline'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const QuickLinks = ({ items }: { items: { label: string; href: string }[] }) => (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 @md:pt-10 border-t">
        {items.map(({ label, href }) => (
            <Link
                key={label}
                href={href}
                className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
                {label}
                <ArrowUpRight className="size-3.5 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
            </Link>
        ))}
    </div>
)
