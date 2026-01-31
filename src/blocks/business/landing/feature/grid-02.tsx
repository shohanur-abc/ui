import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart, Briefcase, Calendar, FileText, MessageSquare, Users, Wallet, Workflow } from 'lucide-react'
import { ComponentType } from 'react'

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    badge?: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Briefcase} text="Business Suite" />
                    <Title text="All Your Business Tools in" highlight="One Platform" />
                    <Description text="Streamline operations with integrated solutions for every department and workflow." />
                </div>

                <FeatureGrid items={[
                    { icon: Calendar, title: 'Smart Scheduling', description: 'AI-powered calendar management with conflict detection and optimal meeting times.', badge: 'Popular' },
                    { icon: Wallet, title: 'Financial Management', description: 'Track expenses, manage invoices, and automate financial reporting.' },
                    { icon: Users, title: 'Team Collaboration', description: 'Shared workspaces, real-time editing, and seamless communication.' },
                    { icon: BarChart, title: 'Analytics Dashboard', description: 'Custom reports and visualizations for data-driven decisions.' },
                    { icon: Workflow, title: 'Workflow Automation', description: 'Build custom automations without code using our visual builder.', badge: 'New' },
                    { icon: FileText, title: 'Document Management', description: 'Secure storage, version control, and collaborative editing.' },
                    { icon: MessageSquare, title: 'Customer Support', description: 'Unified inbox for email, chat, and social media inquiries.' },
                    { icon: Briefcase, title: 'Project Management', description: 'Kanban boards, timelines, and resource allocation tools.' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4 @md:mb-5">
        <Badge variant="outline" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 @md:mb-5 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid gap-4 @md:gap-5 @sm:grid-cols-2 @xl:grid-cols-4">
        {items.map((item) => (
            <Card key={item.title} className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-md">
                <CardContent className="p-5 @md:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/15">
                            <item.icon className="size-5 text-primary" />
                        </div>
                        {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                                {item.badge}
                            </Badge>
                        )}
                    </div>
                    <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
