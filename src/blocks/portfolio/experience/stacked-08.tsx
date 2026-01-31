import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Mic, Calendar, MapPin, Users, Video, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Mic} text="Speaking" />
                    <Title text="Conference Talks" />
                    <Description text="Selected talks from conferences and events." />
                </div>

                <div className="max-w-3xl mx-auto space-y-6">
                    <TalkCard
                        title="Scaling Design Systems to 200+ Engineers"
                        event="React Summit 2024"
                        type="Keynote"
                        date="June 2024"
                        location="Amsterdam, Netherlands"
                        attendees={5000}
                        videoUrl="https://youtube.com/watch"
                        slidesUrl="https://speakerdeck.com"
                    />
                    <TalkCard
                        title="The Future of Frontend Performance"
                        event="Next.js Conf 2023"
                        type="Talk"
                        date="October 2023"
                        location="San Francisco, CA"
                        attendees={3000}
                        videoUrl="https://youtube.com/watch"
                    />
                    <TalkCard
                        title="Building Accessible Component Libraries"
                        event="JSWorld Conference 2023"
                        type="Workshop"
                        date="February 2023"
                        location="Virtual"
                        attendees={500}
                        slidesUrl="https://speakerdeck.com"
                    />
                    <TalkCard
                        title="From Zero to Design System"
                        event="React Conf 2022"
                        type="Talk"
                        date="May 2022"
                        location="Las Vegas, NV"
                        attendees={2500}
                        videoUrl="https://youtube.com/watch"
                        slidesUrl="https://speakerdeck.com"
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

interface TalkCardProps {
    title: string
    event: string
    type: string
    date: string
    location: string
    attendees: number
    videoUrl?: string
    slidesUrl?: string
}

const TalkCard = ({ title, event, type, date, location, attendees, videoUrl, slidesUrl }: TalkCardProps) => (
    <Card className="group hover:shadow-lg transition-all">
        <CardContent className="p-6 @md:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant={type === 'Keynote' ? 'default' : 'secondary'}>{type}</Badge>
                        <span className="text-sm text-muted-foreground">{event}</span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{title}</h3>
                </div>
                <Mic className="size-5 text-muted-foreground shrink-0" />
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1"><Calendar className="size-4" />{date}</span>
                <span className="flex items-center gap-1"><MapPin className="size-4" />{location}</span>
                <span className="flex items-center gap-1"><Users className="size-4" />{attendees.toLocaleString()} attendees</span>
            </div>

            <Separator className="mb-4" />

            <div className="flex gap-3">
                {videoUrl && (
                    <Link href={videoUrl} target="_blank">
                        <Badge variant="outline" className="gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Video className="size-3" />
                            Watch Video
                            <ExternalLink className="size-3" />
                        </Badge>
                    </Link>
                )}
                {slidesUrl && (
                    <Link href={slidesUrl} target="_blank">
                        <Badge variant="outline" className="gap-1.5 hover:bg-primary hover:text-primary-foreground transition-colors">
                            View Slides
                            <ExternalLink className="size-3" />
                        </Badge>
                    </Link>
                )}
            </div>
        </CardContent>
    </Card>
)
