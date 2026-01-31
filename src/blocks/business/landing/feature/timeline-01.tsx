import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Clock, FileCheck, Rocket, Send, Settings2 } from 'lucide-react'
import { ComponentType } from 'react'

interface TimelineItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    duration: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-12 @md:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Clock} text="Onboarding Timeline" />
                    <Title text="Get Started in" highlight="Under 24 Hours" />
                    <Description text="Our streamlined onboarding process ensures you're up and running faster than any competitor." />
                </div>

                <Timeline items={[
                    { icon: Send, title: 'Sign Up', description: 'Create your account and verify your email. Takes less than 2 minutes.', duration: '2 min' },
                    { icon: Settings2, title: 'Configure', description: 'Connect your data sources and customize your dashboard preferences.', duration: '30 min' },
                    { icon: FileCheck, title: 'Import Data', description: 'Migrate existing data with our automated import tools and validation.', duration: '2-4 hrs' },
                    { icon: Rocket, title: 'Go Live', description: 'Launch your configured environment and start seeing results immediately.', duration: 'Instant' },
                ]} />
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

const Timeline = ({ items }: { items: TimelineItem[] }) => (
    <div className="relative max-w-3xl mx-auto">
        {/* Timeline line */}
        <div className="absolute left-6 @md:left-8 top-0 bottom-0 w-px bg-border" />
        
        <div className="space-y-8 @md:space-y-10">
            {items.map((item, index) => (
                <div key={item.title} className="relative pl-16 @md:pl-20">
                    {/* Timeline dot */}
                    <div className="absolute left-0 flex size-12 @md:size-16 items-center justify-center rounded-full border-4 border-background bg-primary/10">
                        <item.icon className="size-5 @md:size-6 text-primary" />
                    </div>
                    
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/30">
                        <CardContent className="p-4 @md:p-6">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                <h3 className="text-lg @md:text-xl font-semibold">{item.title}</h3>
                                <Badge variant="outline" className="shrink-0">
                                    <Clock className="size-3 mr-1" />
                                    {item.duration}
                                </Badge>
                            </div>
                            <p className="text-sm @md:text-base text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                </div>
            ))}
            
            {/* Completion indicator */}
            <div className="relative pl-16 @md:pl-20">
                <div className="absolute left-0 flex size-12 @md:size-16 items-center justify-center rounded-full border-4 border-background bg-primary">
                    <CheckCircle2 className="size-5 @md:size-6 text-primary-foreground" />
                </div>
                <div className="py-4">
                    <p className="text-lg font-semibold text-primary">All Set!</p>
                    <p className="text-sm text-muted-foreground">Your account is fully configured and ready to use.</p>
                </div>
            </div>
        </div>
    </div>
)
