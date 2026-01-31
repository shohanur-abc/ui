import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BarChart3, Clock, Shield, Users } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @3xl:grid-cols-3 gap-8 @lg:gap-12 items-center">
                    <div className="@3xl:col-span-1">
                        <Eyebrow icon={Users} text="Why Work With Me" />
                        <Title text="Results That Matter" />
                        <Description text="I don't just build websites—I create digital products that drive real business outcomes." />
                        <CTA href="#contact" text="Get in Touch" />
                    </div>

                    <div className="@3xl:col-span-2">
                        <FeatureCards items={[
                            { icon: Clock, title: 'Fast Turnaround', description: 'Delivering quality work on time, every time.', stat: '< 2 weeks', statLabel: 'Avg. project time' },
                            { icon: Users, title: 'User-Centric', description: 'Designs backed by research and testing.', stat: '40%', statLabel: 'Conversion increase' },
                            { icon: BarChart3, title: 'Performance', description: 'Sites that load fast and rank high.', stat: '95+', statLabel: 'Lighthouse score' },
                            { icon: Shield, title: 'Reliable', description: 'Clean code that stands the test of time.', stat: '99.9%', statLabel: 'Uptime guarantee' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mx-auto mb-3 @md:mb-4">
        <Icon className="size-4 mr-2" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-[1.1]">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface FeatureCardItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    stat: string
    statLabel: string
}

const CTA = ({ href, text }: { href: string; text: string }) => (
    <Link href={href} className="inline-flex items-center gap-2 text-primary font-medium hover:underline group mt-6">
        {text}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
)

const FeatureCards = ({ items }: { items: FeatureCardItem[] }) => (
    <ul className="grid @sm:grid-cols-2 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, description, stat, statLabel }, i) => (
            <li key={i}>
                <Card className="h-full p-1">
                    <CardContent className="p-5 @md:p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="size-10 @md:size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="size-5 @md:size-6 text-primary" />
                            </div>
                            <div className="text-right">
                                <div className="text-xl @md:text-2xl font-bold text-primary">{stat}</div>
                                <div className="text-xs text-muted-foreground">{statLabel}</div>
                            </div>
                        </div>
                        <h3 className="text-base @md:text-lg font-semibold mb-1.5">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
