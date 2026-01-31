import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Building, GraduationCap, MapPin, Trophy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20">
                    <ContentSection
                        eyebrow="My Journey"
                        title="Robert Garcia"
                        description="From a small town in Texas to leading engineering at a unicorn startup—my path has been anything but conventional. I believe the best careers are built on curiosity and courage."
                        timeline={[
                            { icon: GraduationCap, year: '2010', text: 'CS Degree, UT Austin' },
                            { icon: Building, year: '2014', text: 'Joined Google as SWE' },
                            { icon: Trophy, year: '2018', text: 'Founded TechStartup (Acquired)' },
                            { icon: MapPin, year: '2022', text: 'VP Engineering, Unicorn Inc' },
                        ]}
                        cta={{ label: 'Read Full Story', href: '/journey', icon: ArrowRight }}
                    />
                    <ImageSection
                        src="https://picsum.photos/seed/split8/800/1000"
                        alt="Robert Garcia"
                    />
                </div>
            </div>
        </section>
    )
}

interface TimelineItem {
    icon: React.ComponentType<{ className?: string }>
    year: string
    text: string
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface ContentSectionProps {
    eyebrow: string
    title: string
    description: string
    timeline: TimelineItem[]
    cta: CTAData
}

const ContentSection = ({ eyebrow, title, description, timeline, cta }: ContentSectionProps) => (
    <div className="flex flex-col justify-center">
        <Badge variant="outline" className="w-fit mb-4">
            {eyebrow}
        </Badge>
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-6">{title}</h1>
        <p className="text-muted-foreground leading-relaxed mb-10">{description}</p>
        <div className="space-y-6 mb-10">
            {timeline.map(({ icon: Icon, year, text }, i) => (
                <div key={i} className="flex items-start gap-4">
                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                        <span className="text-sm text-muted-foreground">{year}</span>
                        <p className="font-medium">{text}</p>
                    </div>
                </div>
            ))}
        </div>
        <Button size="lg" className="gap-2 w-fit" asChild>
            <Link href={cta.href}>
                {cta.label}
                <cta.icon className="size-4" />
            </Link>
        </Button>
    </div>
)

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)
