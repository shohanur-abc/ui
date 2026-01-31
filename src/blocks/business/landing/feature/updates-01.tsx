import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Bell, Calendar, Clock, Gift, Megaphone, Sparkles, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface UpdateItem {
    icon: ComponentType<{ className?: string }>
    type: string
    title: string
    description: string
    date: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 flex flex-col @xl:flex-row @xl:items-end @xl:justify-between gap-6">
                    <div className="max-w-2xl">
                        <Eyebrow icon={Megaphone} text="Updates" />
                        <Title text="Stay in the Loop with" highlight="Latest News" />
                        <Description text="Keep up with product updates, new features, and important announcements." />
                    </div>
                    <Button variant="outline" className="gap-2 shrink-0 w-fit" asChild>
                        <Link href="/changelog">
                            View Changelog
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <UpdatesList items={[
                    { icon: Gift, type: 'New Feature', title: 'AI-Powered Suggestions', description: 'Our new AI assistant can now suggest optimizations based on your usage patterns.', date: 'Today' },
                    { icon: Zap, type: 'Improvement', title: 'Performance Boost', description: 'We\'ve improved dashboard load times by 40% across all devices.', date: '2 days ago' },
                    { icon: Bell, type: 'Announcement', title: 'New Pricing Plans', description: 'Introducing flexible pricing options to better fit your needs.', date: 'Last week' },
                    { icon: Calendar, type: 'Event', title: 'User Conference 2026', description: 'Join us for our annual user conference this September.', date: 'Mar 15' },
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

const UpdatesList = ({ items }: { items: UpdateItem[] }) => (
    <div className="space-y-4">
        {items.map((update) => (
            <Card key={update.title} className="border-border/50 transition-all hover:border-primary/30">
                <CardContent className="p-4 @md:p-6 flex flex-col @md:flex-row @md:items-center gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <update.icon className="size-6 text-primary" />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <Badge variant="secondary" className="text-xs">{update.type}</Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Clock className="size-3" />
                                {update.date}
                            </span>
                        </div>
                        <h3 className="font-semibold mb-0.5">{update.title}</h3>
                        <p className="text-sm text-muted-foreground">{update.description}</p>
                    </div>
                    <ArrowRight className="size-5 text-muted-foreground shrink-0 hidden @md:block" />
                </CardContent>
            </Card>
        ))}
    </div>
)
