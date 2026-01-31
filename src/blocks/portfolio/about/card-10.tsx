import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, BookOpen, Mic, Video, Youtube } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-md mx-auto">
                    <CreatorCard
                        src="https://picsum.photos/seed/card10/400/400"
                        fallback="CT"
                        name="Chris Taylor"
                        role="Content Creator"
                        bio="I help developers level up their skills through tutorials, courses, and live streams. Teaching is my passion."
                        channels={[
                            { icon: Youtube, name: 'YouTube', followers: '500K', href: 'https://youtube.com' },
                            { icon: Mic, name: 'Podcast', followers: '100K', href: '/podcast' },
                            { icon: BookOpen, name: 'Blog', followers: '50K', href: '/blog' },
                            { icon: Video, name: 'Courses', followers: '10K', href: '/courses' },
                        ]}
                        topics={['React', 'TypeScript', 'Node.js', 'System Design', 'Career']}
                        cta={{ label: 'Subscribe', href: '/newsletter', icon: ArrowRight }}
                    />
                </div>
            </div>
        </section>
    )
}

interface ChannelItem {
    icon: React.ComponentType<{ className?: string }>
    name: string
    followers: string
    href: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface CreatorCardProps {
    src: string
    fallback: string
    name: string
    role: string
    bio: string
    channels: ChannelItem[]
    topics: string[]
    cta: CTAData
}

const CreatorCard = ({ src, fallback, name, role, bio, channels, topics, cta }: CreatorCardProps) => (
    <Card>
        <CardContent className="p-6">
            <div className="text-center mb-6">
                <Avatar className="size-24 mx-auto mb-4 ring-4 ring-primary/20">
                    <AvatarImage src={src} alt={name} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-primary">{role}</p>
            </div>
            <p className="text-muted-foreground text-sm text-center mb-6">{bio}</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
                {channels.map(({ icon: Icon, name, followers, href }) => (
                    <Link
                        key={name}
                        href={href}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                        <Icon className="size-5 text-primary" />
                        <div>
                            <p className="text-sm font-medium">{name}</p>
                            <p className="text-xs text-muted-foreground">{followers} followers</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Separator className="my-4" />
            <div className="mb-6">
                <p className="text-sm font-medium mb-2 text-center">Topics</p>
                <div className="flex flex-wrap justify-center gap-2">
                    {topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                </div>
            </div>
            <Button className="gap-2 w-full" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </CardContent>
    </Card>
)
