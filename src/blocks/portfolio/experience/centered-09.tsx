import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mic, Calendar, MapPin, Video, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Mic} text="Speaking" />
                    <Title text="Conference Talks" />
                    <Description text="I love sharing knowledge at conferences and meetups." />
                </div>

                <div className="grid @md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <TalkCard
                        title="Scaling Design Systems"
                        event="React Summit 2024"
                        date="June 2024"
                        location="Amsterdam"
                        type="Keynote"
                        videoUrl="https://youtube.com"
                    />
                    <TalkCard
                        title="Frontend Performance"
                        event="Next.js Conf 2023"
                        date="Oct 2023"
                        location="San Francisco"
                        type="Talk"
                        videoUrl="https://youtube.com"
                    />
                    <TalkCard
                        title="Accessible Components"
                        event="JSWorld 2023"
                        date="Feb 2023"
                        location="Virtual"
                        type="Workshop"
                    />
                    <TalkCard
                        title="From Zero to System"
                        event="React Conf 2022"
                        date="May 2022"
                        location="Las Vegas"
                        type="Talk"
                        videoUrl="https://youtube.com"
                    />
                </div>

                <div className="text-center mt-10">
                    <Button variant="outline" asChild>
                        <Link href="/speaking">
                            View All Talks <ExternalLink className="size-4 ml-2" />
                        </Link>
                    </Button>
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
    date: string
    location: string
    type: string
    videoUrl?: string
}

const TalkCard = ({ title, event, date, location, type, videoUrl }: TalkCardProps) => (
    <Card className="group hover:shadow-lg transition-all">
        <CardContent className="p-6">
            <div className="flex items-start gap-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Mic className="size-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                    <Badge variant={type === 'Keynote' ? 'default' : 'secondary'} className="mb-2">{type}</Badge>
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{event}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="size-3" />{date}</span>
                        <span className="flex items-center gap-1"><MapPin className="size-3" />{location}</span>
                    </div>
                    {videoUrl && (
                        <Link href={videoUrl} target="_blank" className="inline-flex items-center gap-1 text-xs text-primary mt-3 hover:underline">
                            <Video className="size-3" />
                            Watch Recording
                        </Link>
                    )}
                </div>
            </div>
        </CardContent>
    </Card>
)
