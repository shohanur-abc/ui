import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Award, Clock, Headphones, MessageCircle, Shield, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface SupportFeature {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    stat: string
    href: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Headphones} text="Customer Support" />
                    <Title text="World-Class Support at" highlight="Every Step" />
                    <Description text="Our dedicated team is here to ensure your success with responsive, knowledgeable support." />
                </div>

                <SupportGrid items={[
                    { icon: MessageCircle, title: 'Live Chat', description: 'Get instant answers from our support team.', stat: '<1 min response', href: '/support/chat' },
                    { icon: Clock, title: '24/7 Availability', description: 'Round-the-clock support across all time zones.', stat: 'Always on', href: '/support' },
                    { icon: Zap, title: 'Priority Queue', description: 'Pro and Enterprise customers jump to the front.', stat: '4hr SLA', href: '/support/priority' },
                    { icon: Shield, title: 'Dedicated CSM', description: 'Your personal success manager for Enterprise.', stat: '1:1 Support', href: '/enterprise' },
                    { icon: Award, title: 'Expert Onboarding', description: 'Guided setup and training for your team.', stat: 'Free included', href: '/onboarding' },
                    { icon: Headphones, title: 'Phone Support', description: 'Talk to a real person when you need to.', stat: 'Enterprise', href: '/enterprise' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const SupportGrid = ({ items }: { items: SupportFeature[] }) => (
    <div className="grid gap-4 @md:gap-5 @sm:grid-cols-2 @xl:grid-cols-3">
        {items.map((item) => (
            <Link key={item.title} href={item.href}>
                <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-md">
                    <CardContent className="p-5 @md:p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/15">
                                <item.icon className="size-5 text-primary" />
                            </div>
                            <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            <Badge variant="secondary" className="text-xs">{item.stat}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)
