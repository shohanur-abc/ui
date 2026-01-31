import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle, ArrowRight, CheckCircle2, Clock, MinusCircle, RefreshCw, Server, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface ServiceStatus {
    name: string
    status: 'operational' | 'degraded' | 'outage'
    uptime: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Server} text="System Status" />
                    <Title text="All Systems" highlight="Operational" />
                    <Description text="Real-time status of our platform and services. We're committed to transparency." />
                </div>

                <StatusDashboard services={[
                    { name: 'API', status: 'operational', uptime: '99.99%' },
                    { name: 'Web App', status: 'operational', uptime: '99.98%' },
                    { name: 'Dashboard', status: 'operational', uptime: '99.97%' },
                    { name: 'Authentication', status: 'operational', uptime: '100%' },
                    { name: 'Webhooks', status: 'operational', uptime: '99.95%' },
                    { name: 'Analytics', status: 'operational', uptime: '99.92%' },
                ]} />

                <CTASection />
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
        {text} <span className="text-emerald-500">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const StatusDashboard = ({ services }: { services: ServiceStatus[] }) => {
    const statusConfig = {
        operational: { icon: CheckCircle2, label: 'Operational', color: 'text-emerald-500 bg-emerald-500/10' },
        degraded: { icon: MinusCircle, label: 'Degraded', color: 'text-yellow-500 bg-yellow-500/10' },
        outage: { icon: AlertCircle, label: 'Outage', color: 'text-red-500 bg-red-500/10' },
    }

    return (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden max-w-3xl mx-auto">
            <CardContent className="p-0">
                <div className="p-4 border-b border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-semibold">All Systems Operational</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <RefreshCw className="size-3" />
                        Updated 2 min ago
                    </div>
                </div>
                <div className="divide-y divide-border/50">
                    {services.map((service) => {
                        const config = statusConfig[service.status]
                        const Icon = config.icon
                        return (
                            <div key={service.name} className="p-4 flex items-center justify-between">
                                <span className="font-medium">{service.name}</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-muted-foreground">{service.uptime} uptime</span>
                                    <Badge variant="outline" className={`gap-1.5 ${config.color}`}>
                                        <Icon className="size-3" />
                                        {config.label}
                                    </Badge>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}

const CTASection = () => (
    <div className="mt-10 text-center">
        <Link 
            href="/status"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
            View full status page <ArrowRight className="size-3" />
        </Link>
    </div>
)
