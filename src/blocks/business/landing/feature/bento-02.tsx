import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Brain, Clock, Cpu, Globe2, Lock, Rocket, Settings } from 'lucide-react'
import { ComponentType } from 'react'

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    size: 'sm' | 'md' | 'lg'
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 max-w-2xl">
                    <Eyebrow icon={Cpu} text="Core Capabilities" />
                    <Title text="Built for Modern" highlight="Enterprise Demands" />
                    <Description text="A complete platform engineered to handle the most complex business requirements at any scale." />
                </div>

                <BentoGrid items={[
                    { icon: Brain, title: 'AI-Powered Analytics', description: 'Machine learning models that adapt to your business patterns and provide actionable insights.', size: 'lg' },
                    { icon: Globe2, title: 'Global CDN', description: 'Content delivery across 200+ edge locations.', size: 'sm' },
                    { icon: Lock, title: 'Zero-Trust Security', description: 'End-to-end encryption with advanced threat protection.', size: 'sm' },
                    { icon: Clock, title: '99.99% Uptime', description: 'Enterprise SLA with redundant infrastructure.', size: 'md' },
                    { icon: Settings, title: 'Custom Workflows', description: 'Visual builder for complex automation.', size: 'md' },
                    { icon: Rocket, title: 'Rapid Deployment', description: 'Go live in minutes with one-click provisioning.', size: 'sm' },
                    { icon: BarChart3, title: 'Real-time Dashboards', description: 'Live metrics and KPI tracking.', size: 'sm' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3" />
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
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const BentoGrid = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid gap-4 @md:gap-5 @md:grid-cols-2 @xl:grid-cols-4 @xl:grid-rows-2">
        {items.map((item, index) => {
            const sizeClasses = {
                sm: '',
                md: '@xl:col-span-2',
                lg: '@xl:col-span-2 @xl:row-span-2',
            }
            return (
                <Card 
                    key={item.title} 
                    className={`group border-border/50 transition-all hover:border-primary/30 hover:shadow-md ${sizeClasses[item.size]}`}
                >
                    <CardContent className={`p-5 @md:p-6 h-full flex flex-col ${item.size === 'lg' ? '@xl:p-8' : ''}`}>
                        <div className={`mb-4 inline-flex items-center justify-center rounded-lg bg-primary/10 ${item.size === 'lg' ? 'size-14' : 'size-11'}`}>
                            <item.icon className={`text-primary ${item.size === 'lg' ? 'size-7' : 'size-5'}`} />
                        </div>
                        <h3 className={`mb-2 font-semibold ${item.size === 'lg' ? 'text-xl @xl:text-2xl' : 'text-base @md:text-lg'}`}>
                            {item.title}
                        </h3>
                        <p className={`text-muted-foreground ${item.size === 'lg' ? 'text-base' : 'text-sm'}`}>
                            {item.description}
                        </p>
                    </CardContent>
                </Card>
            )
        })}
    </div>
)
