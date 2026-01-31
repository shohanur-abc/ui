import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, RefreshCw, Server, Shield, Sparkles, Upload, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface MigrationStep {
    step: number
    title: string
    description: string
    duration: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Upload} text="Migration" />
                    <Title text="Easy Migration from" highlight="Any Platform" />
                    <Description text="Switch to our platform in minutes, not months. We'll handle the heavy lifting with our automated migration tools." />
                </div>

                <MigrationSteps steps={[
                    { step: 1, title: 'Connect', description: 'Authenticate with your current platform using OAuth or API key.', duration: '2 min' },
                    { step: 2, title: 'Map Data', description: 'Our AI automatically maps your data structure and identifies fields.', duration: '5 min' },
                    { step: 3, title: 'Migrate', description: 'Start the migration and watch your data transfer in real-time.', duration: '10-30 min' },
                    { step: 4, title: 'Verify', description: 'Review the migration report and confirm everything transferred correctly.', duration: '5 min' },
                ]} />

                <SupportedPlatforms />
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

const MigrationSteps = ({ steps }: { steps: MigrationStep[] }) => (
    <div className="grid gap-4 @lg:grid-cols-4 max-w-5xl mx-auto mb-12">
        {steps.map((step, index) => (
            <Card key={step.step} className="relative border-border/50 bg-card/50 backdrop-blur-sm">
                {index < steps.length - 1 && (
                    <div className="hidden @lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border z-10" />
                )}
                <CardContent className="p-5 text-center">
                    <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                        {step.step}
                    </div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <Badge variant="outline" className="text-xs">{step.duration}</Badge>
                </CardContent>
            </Card>
        ))}
    </div>
)

const SupportedPlatforms = () => (
    <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">Supported platforms</p>
        <div className="flex flex-wrap justify-center gap-3">
            {['Asana', 'Monday.com', 'Jira', 'Notion', 'Trello', 'Basecamp', 'Airtable'].map((platform) => (
                <Badge key={platform} variant="secondary" className="text-sm px-4 py-1">
                    {platform}
                </Badge>
            ))}
            <Badge variant="outline" className="text-sm px-4 py-1">+50 more</Badge>
        </div>
    </div>
)
