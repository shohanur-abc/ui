import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Crown, Globe, MessageSquare, Sparkles, Trophy, Users } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
                    <HeroCell
                        title="A Global Community of Learners"
                        className="@md:col-span-2 row-span-2"
                    />
                    <LeaderboardCell
                        leaders={[
                            { name: 'Emma J.', avatar: 'https://i.pravatar.cc/100?img=60', points: 12450 },
                            { name: 'Alex K.', avatar: 'https://i.pravatar.cc/100?img=61', points: 11230 },
                            { name: 'Sarah L.', avatar: 'https://i.pravatar.cc/100?img=62', points: 10890 },
                        ]}
                        className="row-span-2"
                    />
                    <StatCell icon={Users} value="125K+" label="Members" className="" />
                    <StatCell icon={Globe} value="140+" label="Countries" className="" />
                    <DiscussionCell
                        topic="Best practices for React 19?"
                        replies={47}
                        className="@xl:col-span-2"
                    />
                </div>
            </div>
        </section>
    )
}

interface HeroCellProps {
    title: string
    className?: string
}

const HeroCell = ({ title, className }: HeroCellProps) => (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-primary/15 via-card to-accent/10 border-primary/20 flex flex-col justify-center ${className}`}>
        <CardContent className="p-6 @md:p-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-0">
                <Sparkles className="size-3.5 mr-1.5" />
                Join the Community
            </Badge>
            <h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
                {title}
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                Connect with fellow developers, share knowledge, and grow together. Your journey starts here.
            </p>
            <div className="flex flex-wrap gap-3">
                <Button size="lg" asChild className="gap-2">
                    <Link href="/community">
                        Join Free
                        <ArrowRight className="size-4" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                    <Link href="/about">Learn More</Link>
                </Button>
            </div>
        </CardContent>
        <CommunityDecorative />
    </Card>
)

const CommunityDecorative = () => (
    <>
        <div className="absolute top-0 right-0 size-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
    </>
)

interface Leader {
    name: string
    avatar: string
    points: number
}

interface LeaderboardCellProps {
    leaders: Leader[]
    className?: string
}

const LeaderboardCell = ({ leaders, className }: LeaderboardCellProps) => (
    <Card className={`bg-gradient-to-b from-amber-500/10 via-card to-card ${className}`}>
        <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
                <Trophy className="size-5 text-amber-500" />
                <span className="font-semibold">Top Contributors</span>
            </div>
            <div className="space-y-3">
                {leaders.map((leader, i) => (
                    <div
                        key={leader.name}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                        <div className="relative">
                            <Avatar className="size-10">
                                <AvatarImage src={leader.avatar} alt={leader.name} />
                                <AvatarFallback>{leader.name[0]}</AvatarFallback>
                            </Avatar>
                            {i === 0 && (
                                <Crown className="absolute -top-2 -right-1 size-4 text-amber-500" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{leader.name}</p>
                            <p className="text-xs text-muted-foreground">{leader.points.toLocaleString()} pts</p>
                        </div>
                        <Badge variant="outline" className="text-xs">#{i + 1}</Badge>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface StatCellProps {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
    className?: string
}

const StatCell = ({ icon: Icon, value, label, className }: StatCellProps) => (
    <Card className={`flex flex-col items-center justify-center text-center transition-all hover:border-primary ${className}`}>
        <CardContent className="p-5">
            <Icon className="size-8 text-primary mb-3" />
            <p className="text-2xl @md:text-3xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
        </CardContent>
    </Card>
)

interface DiscussionCellProps {
    topic: string
    replies: number
    className?: string
}

const DiscussionCell = ({ topic, replies, className }: DiscussionCellProps) => (
    <Card className={`group cursor-pointer transition-all hover:border-primary ${className}`}>
        <CardContent className="p-5 flex flex-col justify-center h-full">
            <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-[10px]">
                    <MessageSquare className="size-3 mr-1" />
                    Hot Discussion
                </Badge>
            </div>
            <p className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{topic}</p>
            <p className="text-sm text-muted-foreground">{replies} replies · Join the conversation</p>
        </CardContent>
    </Card>
)
