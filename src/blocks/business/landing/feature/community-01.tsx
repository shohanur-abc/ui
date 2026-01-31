import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Calendar, Globe2, Laptop, MessageSquare, Share2, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface CommunityFeature {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Users} text="Community" />
                    <Title text="Join Our Thriving" highlight="Community" />
                    <Description text="Connect with thousands of users, share knowledge, and grow together." />
                </div>

                <CommunityGrid items={[
                    { icon: MessageSquare, title: 'Discussion Forums', description: 'Ask questions, share tips, and learn from fellow users.' },
                    { icon: Share2, title: 'Template Library', description: 'Browse and share templates created by the community.' },
                    { icon: Calendar, title: 'Local Meetups', description: 'Meet other users in your city at regular gatherings.' },
                    { icon: Globe2, title: 'Online Events', description: 'Join webinars, AMAs, and virtual conferences.' },
                    { icon: Laptop, title: 'Open Source', description: 'Contribute to our open-source tools and plugins.' },
                    { icon: Users, title: 'Ambassador Program', description: 'Become an ambassador and help grow the community.' },
                ]} />

                <CTASection 
                    stats={[
                        { value: '50K+', label: 'Community Members' },
                        { value: '1.2M', label: 'Messages Shared' },
                        { value: '150+', label: 'Local Chapters' },
                    ]}
                    ctaLabel="Join Community"
                    ctaHref="/community"
                />
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

const CommunityGrid = ({ items }: { items: CommunityFeature[] }) => (
    <div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-3 mb-12">
        {items.map((item) => (
            <Card key={item.title} className="border-border/50 transition-all hover:border-primary/30">
                <CardContent className="p-5 @md:p-6 flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="size-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

const CTASection = ({ stats, ctaLabel, ctaHref }: { stats: { value: string; label: string }[]; ctaLabel: string; ctaHref: string }) => (
    <div className="text-center p-8 rounded-2xl bg-primary/5 border border-primary/20">
        <div className="flex flex-wrap justify-center gap-8 @md:gap-16 mb-6">
            {stats.map((stat) => (
                <div key={stat.label}>
                    <p className="text-2xl @md:text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
            ))}
        </div>
        <Button size="lg" className="gap-2" asChild>
            <Link href={ctaHref}>
                {ctaLabel}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)
