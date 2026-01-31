import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Clock, RefreshCw, Sparkles, Undo2, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface VersionItem {
    timestamp: string
    author: string
    changes: string
    isCurrent?: boolean
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid gap-10 @xl:gap-16 @xl:grid-cols-2 items-center">
                    <div>
                        <Eyebrow icon={Clock} text="Version History" />
                        <Title text="Never Lose Your" highlight="Work Again" />
                        <Description text="Automatic version history captures every change. Compare versions, restore previous states, and collaborate with confidence." />
                        <Features items={[
                            'Unlimited version history',
                            'Point-in-time restore',
                            'Side-by-side comparisons',
                            'Named snapshots',
                        ]} />
                        <CTAButton label="Learn About Versioning" href="/features/versioning" />
                    </div>

                    <VersionHistoryPreview items={[
                        { timestamp: 'Just now', author: 'You', changes: 'Updated hero section copy', isCurrent: true },
                        { timestamp: '2 hours ago', author: 'Sarah', changes: 'Added new testimonials' },
                        { timestamp: 'Yesterday', author: 'You', changes: 'Restructured navigation' },
                        { timestamp: '3 days ago', author: 'Marcus', changes: 'Initial design upload' },
                    ]} />
                </div>
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
    <h2 className="mb-4 text-3xl @sm:text-4xl font-bold tracking-tight leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-6 text-base @md:text-lg text-muted-foreground leading-relaxed">
        {text}
    </p>
)

const Features = ({ items }: { items: string[] }) => (
    <ul className="mb-6 space-y-2">
        {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
                <div className="size-1.5 rounded-full bg-primary" />
                {item}
            </li>
        ))}
    </ul>
)

const CTAButton = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

const VersionHistoryPreview = ({ items }: { items: VersionItem[] }) => (
    <Card className="border-border/50 shadow-lg overflow-hidden">
        <CardContent className="p-0">
            <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/30">
                <h3 className="font-semibold">Version History</h3>
                <Badge variant="secondary">{items.length} versions</Badge>
            </div>
            <div className="divide-y divide-border/50">
                {items.map((item, index) => (
                    <div key={index} className={`p-4 flex items-center gap-4 ${item.isCurrent ? 'bg-primary/5' : ''}`}>
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                            {item.isCurrent ? (
                                <RefreshCw className="size-4 text-primary" />
                            ) : (
                                <Clock className="size-4 text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{item.author}</span>
                                <span className="text-xs text-muted-foreground">• {item.timestamp}</span>
                                {item.isCurrent && <Badge variant="outline" className="text-xs">Current</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{item.changes}</p>
                        </div>
                        {!item.isCurrent && (
                            <Button variant="ghost" size="sm" className="shrink-0 gap-1">
                                <Undo2 className="size-3" />
                                Restore
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)
