import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Code, FileText, Video, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <ContentSection
                        eyebrow={{ icon: Zap, text: 'Multi-Format Learning' }}
                        title="Learn Your Way"
                        highlight="Any Format, Any Time"
                        description="Articles, videos, interactive tutorials, and code playgrounds. Choose how you want to learn and dive deep into topics that matter."
                        cta={[
                            { label: 'Start Learning', href: '/learn', icon: ArrowRight },
                            { label: 'View Library', href: '/library', variant: 'outline' },
                        ]}
                    />
                    <FormatCards
                        items={[
                            { icon: FileText, title: 'Articles', count: '1,200+', color: 'text-blue-500' },
                            { icon: Video, title: 'Videos', count: '450+', color: 'text-red-500' },
                            { icon: Code, title: 'Tutorials', count: '320+', color: 'text-green-500' },
                            { icon: Zap, title: 'Quick Tips', count: '890+', color: 'text-amber-500' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

interface ContentSectionProps {
    eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string }
    title: string
    highlight: string
    description: string
    cta: CTAItem[]
}

const ContentSection = ({ eyebrow, title, highlight, description, cta }: ContentSectionProps) => (
    <div className="space-y-6">
        <Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
        <Title text={title} highlight={highlight} />
        <Description text={description} />
        <CTA items={cta} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="gap-2 px-4 py-1.5 bg-primary/10 text-primary border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}
        <span className="block text-primary mt-2">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg">
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

interface FormatItem {
    icon: React.ComponentType<{ className?: string }>
    title: string
    count: string
    color: string
}

const FormatCards = ({ items }: { items: FormatItem[] }) => (
    <div className="grid grid-cols-2 gap-4">
        {items.map(({ icon: Icon, title, count, color }) => (
            <Card key={title} className="group cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 py-0">
                <CardContent className="p-6 @md:p-8 text-center">
                    <div className={`size-14 @md:size-16 rounded-2xl bg-card border flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110 ${color}`}>
                        <Icon className="size-7 @md:size-8" />
                    </div>
                    <p className="text-2xl @md:text-3xl font-bold mb-1">{count}</p>
                    <p className="text-muted-foreground">{title}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
