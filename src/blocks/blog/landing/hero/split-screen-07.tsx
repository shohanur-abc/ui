import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Play, Timer, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
                    <ChallengeCard
                        title="Weekly Coding Challenge"
                        difficulty="Intermediate"
                        timeLimit="45 min"
                        participants={1247}
                        topic="Dynamic Programming"
                        prize="$500 Prize Pool"
                    />
                    <ContentSection
                        eyebrow={{ icon: Trophy, text: 'Challenge Yourself' }}
                        title="Learn by Doing"
                        highlight="Not Just Reading"
                        description="Weekly coding challenges, timed exercises, and competitive puzzles. Put your skills to the test and climb the leaderboard."
                        cta={[
                            { label: 'Join This Challenge', href: '/challenge', icon: Play },
                            { label: 'View All Challenges', href: '/challenges', variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface ChallengeCardProps {
    title: string
    difficulty: string
    timeLimit: string
    participants: number
    topic: string
    prize: string
}

const ChallengeCard = ({ title, difficulty, timeLimit, participants, topic, prize }: ChallengeCardProps) => (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-card to-accent/10 border-primary/20 py-0">
        <CardContent className="p-6 @md:p-8">
            <div className="flex items-center justify-between mb-6">
                <Badge className="bg-amber-500/90 text-white border-0">{difficulty}</Badge>
                <Badge variant="outline" className="gap-1.5">
                    <Trophy className="size-3.5" />
                    {prize}
                </Badge>
            </div>
            <h3 className="text-2xl @md:text-3xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-6">{topic}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
                <ChallengeStatCard icon={Timer} value={timeLimit} label="Time Limit" />
                <ChallengeStatCard icon={Zap} value={participants.toLocaleString()} label="Participants" />
            </div>
            <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="size-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                        >
                            <span className="text-xs font-medium">{i}</span>
                        </div>
                    ))}
                </div>
                <span className="text-sm text-muted-foreground">+{participants - 5} more</span>
            </div>
        </CardContent>
        <ChallengeDecorative />
    </Card>
)

interface ChallengeStatCardProps {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

const ChallengeStatCard = ({ icon: Icon, value, label }: ChallengeStatCardProps) => (
    <div className="p-4 rounded-xl bg-background/50 backdrop-blur-sm border">
        <Icon className="size-5 text-primary mb-2" />
        <p className="text-xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
    </div>
)

const ChallengeDecorative = () => (
    <div className="absolute top-0 right-0 size-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
)

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
    <Badge variant="secondary" className="gap-2 px-4 py-1.5">
        <Icon className="size-4 text-primary" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}
        <span className="block text-primary">{highlight}</span>
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
                    {Icon && <Icon className="size-4" />}
                    {label}
                    {!Icon && <ArrowRight className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)
