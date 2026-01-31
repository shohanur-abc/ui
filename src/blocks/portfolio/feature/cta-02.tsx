import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <CenteredCTA
                    eyebrow="Available for Work"
                    title="Ready to Transform Your Ideas Into Reality?"
                    description="I'm currently available for freelance projects and long-term collaborations. Let's create something exceptional together."
                    benefits={[
                        'Free initial consultation',
                        'Transparent pricing',
                        'Fast turnaround',
                        'Ongoing support',
                    ]}
                    ctas={[
                        { label: 'Get in Touch', href: '#contact', variant: 'default' },
                        { label: 'Download Resume', href: '#resume', variant: 'ghost' },
                    ]}
                />
            </div>
        </section>
    )
}

interface CTAItem {
    label: string
    href: string
    variant: 'default' | 'ghost' | 'outline'
}

interface CenteredCTAProps {
    eyebrow: string
    title: string
    description: string
    benefits: string[]
    ctas: CTAItem[]
}

const CenteredCTA = ({ eyebrow, title, description, benefits, ctas }: CenteredCTAProps) => (
    <div className="text-center max-w-3xl mx-auto">
        <Badge variant="default" className="mb-4 @md:mb-6">
            {eyebrow}
        </Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
            {title}
        </h2>
        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
            {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 @md:gap-6 mb-8 @md:mb-10">
            {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                    <CheckCircle className="size-4 @md:size-5 text-primary" />
                    <span className="text-sm @md:text-base">{benefit}</span>
                </div>
            ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 @md:gap-4">
            {ctas.map(({ label, href, variant }, i) => (
                <Button key={i} variant={variant} size="lg" asChild>
                    <Link href={href}>
                        {label}
                        {variant === 'default' && <ArrowRight className="size-4" />}
                    </Link>
                </Button>
            ))}
        </div>
    </div>
)
