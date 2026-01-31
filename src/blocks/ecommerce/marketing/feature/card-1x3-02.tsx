import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Headphones, MessageCircle, Phone } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">
                        <Headphones className="size-3.5" />
                        Customer Support
                    </Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">We&apos;re Here to Help</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Multiple ways to reach our friendly support team, available 24/7.</p>
                </div>

                <SupportCards items={[
                    {
                        icon: MessageCircle,
                        title: 'Live Chat',
                        description: 'Get instant answers from our support team. Average response time under 2 minutes.',
                        stats: { value: '<2 min', label: 'Response' },
                        cta: { text: 'Start Chat', href: '/chat' },
                    },
                    {
                        icon: Phone,
                        title: 'Phone Support',
                        description: 'Speak directly with a customer service representative. Toll-free calling available.',
                        stats: { value: '24/7', label: 'Available' },
                        cta: { text: 'Call Now', href: 'tel:1-800-123-4567' },
                    },
                    {
                        icon: Headphones,
                        title: 'Email Support',
                        description: 'Send us a detailed message and we\'ll get back to you with a comprehensive solution.',
                        stats: { value: '<4 hrs', label: 'Response' },
                        cta: { text: 'Email Us', href: '/contact' },
                    },
                ]} />
            </div>
        </section>
    )
}

interface SupportItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    stats: { value: string; label: string }
    cta: { text: string; href: string }
}

const SupportCards = ({ items }: { items: SupportItem[] }) => (
    <ul className="grid @md:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, description, stats, cta }, i) => (
            <li key={i}>
                <Card className="py-0 h-full text-center group hover:shadow-lg hover:border-primary/50 transition-all">
                    <CardContent className="p-6 @md:p-8 flex flex-col h-full">
                        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="size-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">{description}</p>

                        <div className="flex items-center justify-center gap-3 mb-6 p-3 bg-secondary/50 rounded-lg">
                            <div className="text-2xl font-bold text-primary">{stats.value}</div>
                            <div className="text-sm text-muted-foreground">{stats.label}</div>
                        </div>

                        <Button className="w-full" asChild>
                            <Link href={cta.href}>
                                {cta.text} <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
