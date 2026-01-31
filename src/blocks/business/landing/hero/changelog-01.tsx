import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, History, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={History} text="Changelog" />
                    <Title text="Always Improving, Always Transparent" />
                    <Description text="See everything we&apos;ve shipped. We release updates weekly to make your experience better." />
                    <CTA items={[
                        { label: 'View Full Changelog', href: '#changelog', icon: ArrowRight },
                        { label: 'Subscribe to Updates', href: '#subscribe', variant: 'outline' },
                    ]} />
                </div>
                <ChangelogTimeline items={[
                    {
                        version: 'v3.2.0',
                        date: 'Feb 15, 2024',
                        type: 'Feature',
                        title: 'AI Assistant Beta',
                        description: 'Introducing our new AI-powered assistant to help you work smarter.',
                        changes: ['Natural language queries', 'Automated task creation', 'Smart suggestions'],
                    },
                    {
                        version: 'v3.1.5',
                        date: 'Feb 10, 2024',
                        type: 'Improvement',
                        title: 'Performance Boost',
                        description: 'Major performance improvements across the entire platform.',
                        changes: ['50% faster load times', 'Reduced memory usage', 'Optimized API calls'],
                    },
                    {
                        version: 'v3.1.4',
                        date: 'Feb 5, 2024',
                        type: 'Fix',
                        title: 'Bug Fixes',
                        description: 'Resolved several issues reported by our community.',
                        changes: ['Fixed export formatting', 'Resolved sync issues', 'UI improvements'],
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const ChangelogTimeline = ({ items }: { items: { version: string; date: string; type: string; title: string; description: string; changes: string[] }[] }) => (
    <div className="max-w-3xl mx-auto">
        {items.map(({ version, date, type, title, description, changes }, i) => (
            <div key={i} className="relative pl-8 pb-10 last:pb-0">
                {/* Timeline line */}
                {i < items.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-border" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 size-6 rounded-full bg-card border-2 border-primary flex items-center justify-center">
                    <div className="size-2 rounded-full bg-primary" />
                </div>
                {/* Content */}
                <Card className="hover:shadow-lg hover:border-primary/30 transition-all">
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge>{version}</Badge>
                            <Badge variant={
                                type === 'Feature' ? 'default' : 
                                type === 'Improvement' ? 'secondary' : 
                                'outline'
                            }>{type}</Badge>
                            <span className="text-sm text-muted-foreground flex items-center gap-1 ml-auto">
                                <Clock className="size-3" />
                                {date}
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-muted-foreground mb-4">{description}</p>
                        <ul className="space-y-1">
                            {changes.map((change, j) => (
                                <li key={j} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="size-4 text-primary shrink-0" />
                                    {change}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        ))}
    </div>
)
