import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BellRing, Filter, Mail, MessageCircle, Smartphone, Slack, Sparkles, Webhook, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface NotificationChannel {
    icon: ComponentType<{ className?: string }>
    name: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={BellRing} text="Notifications" />
                    <Title text="Stay Informed," highlight="Not Overwhelmed" />
                    <Description text="Customizable notifications delivered where you want, when you want. Filter out the noise and focus on what matters." />
                </div>

                <NotificationChannels items={[
                    { icon: Slack, name: 'Slack', description: 'Get updates in your team channels' },
                    { icon: Mail, name: 'Email', description: 'Digest or real-time email alerts' },
                    { icon: Smartphone, name: 'Mobile Push', description: 'Instant notifications on the go' },
                    { icon: MessageCircle, name: 'In-App', description: 'Non-intrusive in-app alerts' },
                    { icon: Webhook, name: 'Webhooks', description: 'Custom integrations via HTTP' },
                    { icon: Filter, name: 'Smart Filters', description: 'AI-powered priority filtering' },
                ]} />

                <NotificationDemo />
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
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const NotificationChannels = ({ items }: { items: NotificationChannel[] }) => (
    <div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3 max-w-4xl mx-auto mb-12">
        {items.map((channel) => (
            <Card key={channel.name} className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <channel.icon className="size-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">{channel.name}</h3>
                        <p className="text-xs text-muted-foreground">{channel.description}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

const NotificationDemo = () => (
    <Card className="max-w-md mx-auto border-border/50 bg-card/50 backdrop-blur-sm shadow-xl">
        <CardContent className="p-4">
            <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <BellRing className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">New comment on Project Alpha</span>
                        <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Sarah mentioned you: "Can you review the latest designs?"</p>
                </div>
            </div>
        </CardContent>
    </Card>
)
