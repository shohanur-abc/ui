import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Mic, Calendar, MapPin, Users, Video, ExternalLink, Award } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-xl mb-12 @md:mb-16">
                    <Eyebrow icon={Mic} text="Speaking" />
                    <Title text="Conference Talks" />
                    <Description text="Sharing knowledge at events worldwide." />
                </div>

                <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
                    <FeaturedTalk
                        title="Scaling Design Systems to 200+ Engineers"
                        event="React Summit 2024"
                        type="Keynote"
                        date="June 2024"
                        location="Amsterdam"
                        attendees={5000}
                        videoUrl="https://youtube.com"
                        className="@md:col-span-2 @md:row-span-2"
                    />
                    <TalkCard
                        title="Frontend Performance"
                        event="Next.js Conf"
                        date="Oct 2023"
                        videoUrl="https://youtube.com"
                    />
                    <StatCard icon={Users} value="10K+" label="Total Attendees" />
                    <TalkCard
                        title="Accessible Components"
                        event="JSWorld"
                        date="Feb 2023"
                    />
                    <TalkCard
                        title="Zero to System"
                        event="React Conf"
                        date="May 2022"
                        videoUrl="https://youtube.com"
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface FeaturedTalkProps {
    title: string
    event: string
    type: string
    date: string
    location: string
    attendees: number
    videoUrl: string
    className?: string
}

const FeaturedTalk = ({ title, event, type, date, location, attendees, videoUrl, className = '' }: FeaturedTalkProps) => (
    <Card className={`group overflow-hidden ${className}`}>
        <CardContent className="p-8 h-full flex flex-col justify-between bg-gradient-to-br from-primary/5 to-primary/10">
            <div>
                <Badge className="mb-4">{type}</Badge>
                <h3 className="text-2xl @md:text-3xl font-bold mb-2">{title}</h3>
                <p className="text-lg text-primary">{event}</p>
            </div>
            <div>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><Calendar className="size-4" />{date}</span>
                    <span className="flex items-center gap-1"><MapPin className="size-4" />{location}</span>
                    <span className="flex items-center gap-1"><Users className="size-4" />{attendees.toLocaleString()}</span>
                </div>
                <Link href={videoUrl} target="_blank" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Video className="size-4" />
                    Watch Recording
                    <ExternalLink className="size-3" />
                </Link>
            </div>
        </CardContent>
    </Card>
)

interface TalkCardProps {
    title: string
    event: string
    date: string
    videoUrl?: string
}

const TalkCard = ({ title, event, date, videoUrl }: TalkCardProps) => (
    <Card className="group hover:shadow-md transition-all">
        <CardContent className="p-5 h-full flex flex-col">
            <Mic className="size-6 text-primary mb-3" />
            <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{title}</h4>
            <p className="text-xs text-muted-foreground mb-3">{event} · {date}</p>
            {videoUrl && (
                <Link href={videoUrl} target="_blank" className="mt-auto inline-flex items-center gap-1 text-xs text-primary hover:underline">
                    <Video className="size-3" />
                    Watch
                </Link>
            )}
        </CardContent>
    </Card>
)

interface StatCardProps {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
    <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-5 h-full flex flex-col items-center justify-center text-center">
            <Icon className="size-8 mb-2 opacity-80" />
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-xs opacity-80">{label}</p>
        </CardContent>
    </Card>
)
