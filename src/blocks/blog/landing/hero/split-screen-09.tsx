import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BarChart3, Cpu, Database, Network, Server, Shield } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
                    <TopicsShowcase
                        featured={{
                            icon: Cpu,
                            title: 'System Design',
                            count: '156 articles',
                            latest: 'Designing for 1M+ Users',
                        }}
                        related={[
                            { icon: Database, title: 'Databases', count: '89' },
                            { icon: Server, title: 'Backend', count: '234' },
                            { icon: Network, title: 'Networking', count: '67' },
                            { icon: Shield, title: 'Security', count: '112' },
                            { icon: BarChart3, title: 'Performance', count: '78' },
                        ]}
                    />
                    <ContentSection
                        eyebrow="Deep Dives"
                        title="Master Complex Topics"
                        highlight="One Article at a Time"
                        description="From system design to distributed systems, our in-depth articles break down complex topics into digestible, actionable knowledge."
                        cta={[
                            { label: 'Browse Topics', href: '/topics', icon: ArrowRight },
                            { label: 'Start Learning Path', href: '/paths', variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface FeaturedTopic {
    icon: React.ComponentType<{ className?: string }>
    title: string
    count: string
    latest: string
}

interface RelatedTopic {
    icon: React.ComponentType<{ className?: string }>
    title: string
    count: string
}

interface TopicsShowcaseProps {
    featured: FeaturedTopic
    related: RelatedTopic[]
}

const TopicsShowcase = ({ featured, related }: TopicsShowcaseProps) => (
    <div className="space-y-4">
        <FeaturedTopicCard topic={featured} />
        <div className="grid grid-cols-2 @sm:grid-cols-3 gap-3">
            {related.map((topic) => (
                <RelatedTopicCard key={topic.title} topic={topic} />
            ))}
        </div>
    </div>
)

const FeaturedTopicCard = ({ topic }: { topic: FeaturedTopic }) => (
    <Card className="bg-gradient-to-br from-primary/10 via-card to-transparent border-primary/20">
        <CardHeader className="flex-row items-center gap-4 space-y-0 pb-2">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                <topic.icon className="size-7 text-primary" />
            </div>
            <div>
                <CardTitle className="text-xl @md:text-2xl">{topic.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{topic.count}</p>
            </div>
        </CardHeader>
        <CardContent>
            <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">Latest</Badge>
                <span className="text-sm">{topic.latest}</span>
            </div>
        </CardContent>
    </Card>
)

const RelatedTopicCard = ({ topic }: { topic: RelatedTopic }) => (
    <Link
        href={`/topics/${topic.title.toLowerCase()}`}
        className="group flex items-center gap-3 p-4 rounded-xl bg-card border transition-all hover:border-primary hover:shadow-md"
    >
        <topic.icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
        <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{topic.title}</p>
            <p className="text-xs text-muted-foreground">{topic.count}</p>
        </div>
    </Link>
)

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

interface ContentSectionProps {
    eyebrow: string
    title: string
    highlight: string
    description: string
    cta: CTAItem[]
}

const ContentSection = ({ eyebrow, title, highlight, description, cta }: ContentSectionProps) => (
    <div className="space-y-6 @3xl:pl-8">
        <Eyebrow text={eyebrow} />
        <Title text={title} highlight={highlight} />
        <Description text={description} />
        <CTA items={cta} />
    </div>
)

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="px-4 py-1.5">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
        {text}
        <span className="block text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ label, href, icon: Icon, variant = 'default' }) => (
            <Button key={label} size="lg" variant={variant} asChild className="gap-2">
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)
