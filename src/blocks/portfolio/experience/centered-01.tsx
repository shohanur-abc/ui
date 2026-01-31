import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Briefcase, ArrowRight, Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Briefcase} text="Current Role" />
                    <Title text="Principal Software Engineer" />
                    <Subtitle text="TechCorp" />
                    <Description text="Leading technical direction for platform engineering, managing architecture decisions across 5 product teams, and building the design system used by 200+ engineers." />

                    <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="size-4" />Jan 2023 - Present</span>
                        <span className="flex items-center gap-1"><MapPin className="size-4" />San Francisco, CA</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        <Badge>Leadership</Badge>
                        <Badge>Architecture</Badge>
                        <Badge>Design Systems</Badge>
                        <Badge>TypeScript</Badge>
                        <Badge>React</Badge>
                    </div>

                    <Button asChild className="mt-10">
                        <Link href="/experience">
                            View Full Experience <ArrowRight className="size-4 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">{text}</h2>
)

const Subtitle = ({ text }: { text: string }) => (
    <p className="text-xl @md:text-2xl text-primary mt-2 mb-6">{text}</p>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">{text}</p>
)
