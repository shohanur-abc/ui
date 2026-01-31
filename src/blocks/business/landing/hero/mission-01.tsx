import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Lightbulb, Target, Compass, Rocket } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-12 @md:mb-16">
                    <Eyebrow icon={Lightbulb} text="Our Mission" />
                    <Title text="Empowering Businesses to Achieve More" />
                    <Description text="We believe technology should simplify, not complicate. Our mission is to give every business access to the tools they need to thrive." />
                </div>
                <ValuesGrid items={[
                    { 
                        icon: Target, 
                        title: 'Customer First', 
                        description: 'Every decision we make starts with one question: how does this help our customers succeed?',
                    },
                    { 
                        icon: Compass, 
                        title: 'Innovation', 
                        description: 'We push boundaries and challenge the status quo to deliver breakthrough solutions.',
                    },
                    { 
                        icon: Rocket, 
                        title: 'Speed', 
                        description: 'In a fast-moving world, we help businesses move faster while maintaining quality.',
                    },
                    { 
                        icon: Lightbulb, 
                        title: 'Simplicity', 
                        description: 'We transform complex problems into elegant, easy-to-use solutions.',
                    },
                ]} />
                <div className="text-center mt-12 @md:mt-16">
                    <CTA items={[
                        { label: 'Learn About Us', href: '#about', icon: ArrowRight },
                        { label: 'Join Our Team', href: '#careers', variant: 'outline' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const ValuesGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {items.map(({ icon: Icon, title, description }, i) => (
            <Card key={i} className="group hover:shadow-lg hover:border-primary/30 transition-all text-center">
                <CardHeader>
                    <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="size-7 text-primary" />
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)
