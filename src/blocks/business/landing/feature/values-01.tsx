import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Building, Globe, Heart, Leaf, Sparkles, Target, Users } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface ValueItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <div>
                        <Eyebrow icon={Heart} text="Our Values" />
                        <Title text="What We Stand" highlight="For" />
                        <Description text="Our values guide everything we do—from how we build products to how we treat our customers and each other." />
                        <CTAButton label="Join Our Team" href="/careers" />
                    </div>

                    <ValuesGrid items={[
                        { icon: Users, title: 'Customer First', description: 'Every decision starts with our customers\' needs.' },
                        { icon: Target, title: 'Excellence', description: 'We hold ourselves to the highest standards.' },
                        { icon: Globe, title: 'Transparency', description: 'Open communication builds trust.' },
                        { icon: Leaf, title: 'Sustainability', description: 'Building for the long term, responsibly.' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const CTAButton = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const ValuesGrid = ({ items }: { items: ValueItem[] }) => (
    <div className="grid gap-4 @sm:grid-cols-2">
        {items.map((value) => (
            <Card key={value.title} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
                <CardContent className="p-5">
                    <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <value.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="mb-1 font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
