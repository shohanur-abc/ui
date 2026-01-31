import { Button } from '@/components/ui/button'
import { ArrowRight, Minus, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="slate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <Eyebrow text="Simple. Powerful. Affordable." />
                    <Title text="Less complexity, more results" />
                    <Description text="We stripped away the bloat so you can focus on what matters. One tool. One price. Unlimited possibilities." />
                    <CTA items={[
                        { label: 'Start for Free', href: '#start', icon: ArrowRight },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <p className="text-sm @md:text-base text-muted-foreground mb-4 @md:mb-6 tracking-widest uppercase font-medium">
        {text}
    </p>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-5xl @sm:text-6xl @md:text-7xl @xl:text-8xl font-bold tracking-tight mb-6 @md:mb-8">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl @xl:text-2xl text-muted-foreground mb-10 @md:mb-12 max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2 px-8" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)
