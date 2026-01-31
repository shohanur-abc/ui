import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Blocks, Cloud, FileJson, GitBranch, Globe, Link2, Plug2, Webhook, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface IntegrationItem {
    icon: ComponentType<{ className?: string }>
    name: string
    category: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Plug2} text="Integrations" />
                    <Title text="Connect with Your" highlight="Favorite Tools" />
                    <Description text="Seamlessly integrate with the tools your team already uses and loves." />
                </div>

                <IntegrationGrid items={[
                    { icon: GitBranch, name: 'GitHub', category: 'Development' },
                    { icon: Cloud, name: 'AWS', category: 'Cloud' },
                    { icon: Blocks, name: 'Slack', category: 'Communication' },
                    { icon: Globe, name: 'Vercel', category: 'Deployment' },
                    { icon: FileJson, name: 'Supabase', category: 'Database' },
                    { icon: Webhook, name: 'Zapier', category: 'Automation' },
                    { icon: Link2, name: 'Notion', category: 'Documentation' },
                    { icon: Zap, name: 'Stripe', category: 'Payments' },
                ]} />

                <BottomCTA count={500} href="/integrations" />
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

const IntegrationGrid = ({ items }: { items: IntegrationItem[] }) => (
    <div className="grid grid-cols-2 @sm:grid-cols-4 @xl:grid-cols-4 gap-4 @md:gap-6 max-w-4xl mx-auto">
        {items.map((item) => (
            <Card 
                key={item.name}
                className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-md cursor-pointer"
            >
                <CardContent className="p-4 @md:p-6 text-center">
                    <div className="mb-3 mx-auto flex size-12 @md:size-14 items-center justify-center rounded-xl bg-primary/10 transition-all group-hover:bg-primary/15 group-hover:scale-105">
                        <item.icon className="size-6 @md:size-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm @md:text-base">{item.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)

const BottomCTA = ({ count, href }: { count: number; href: string }) => (
    <div className="mt-10 @md:mt-12 text-center">
        <p className="text-muted-foreground mb-4">
            And <span className="font-semibold text-foreground">{count}+</span> more integrations available
        </p>
        <a 
            href={href}
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
            View all integrations →
        </a>
    </div>
)
