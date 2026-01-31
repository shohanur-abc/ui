import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Briefcase, Code, Lightbulb, Rocket, Trophy } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <Header
                    title="My Story"
                    description="The key moments that defined my career in tech"
                />
                <ChapterTimeline
                    chapters={[
                        {
                            icon: Lightbulb,
                            title: 'The Beginning',
                            year: '2012',
                            image: 'https://picsum.photos/seed/ch1/600/400',
                            content: 'It all started with a curiosity about how websites work. Taught myself HTML and CSS, building small projects in my bedroom. Little did I know this hobby would become my career.',
                        },
                        {
                            icon: BookOpen,
                            title: 'Learning Phase',
                            year: '2014',
                            image: 'https://picsum.photos/seed/ch2/600/400',
                            content: 'Enrolled in computer science, immersing myself in algorithms, data structures, and software design. Every challenge was an opportunity to grow.',
                        },
                        {
                            icon: Code,
                            title: 'First Job',
                            year: '2016',
                            image: 'https://picsum.photos/seed/ch3/600/400',
                            content: 'Landed my first developer role at a startup. The fast-paced environment taught me more in one year than I could have imagined. Shipped my first production code.',
                        },
                        {
                            icon: Briefcase,
                            title: 'Growing Up',
                            year: '2019',
                            image: 'https://picsum.photos/seed/ch4/600/400',
                            content: 'Joined a larger company, learning to navigate complex systems and collaborate with cross-functional teams. Started mentoring junior developers.',
                        },
                        {
                            icon: Trophy,
                            title: 'Recognition',
                            year: '2021',
                            image: 'https://picsum.photos/seed/ch5/600/400',
                            content: 'Received industry recognition for open source contributions. Spoke at my first conference. Realized the power of community.',
                        },
                        {
                            icon: Rocket,
                            title: 'Today',
                            year: '2024',
                            image: 'https://picsum.photos/seed/ch6/600/400',
                            content: 'Leading engineering at a growing startup. Every day brings new challenges and opportunities to make an impact. The journey continues.',
                        },
                    ]}
                />
                <CTA label="Read Full Story" href="/about/story" icon={ArrowRight} />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
    description: string
}

const Header = ({ title, description }: HeaderProps) => (
    <div className="text-center mb-16">
        <h1 className="text-3xl @lg:text-4xl @xl:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">{description}</p>
    </div>
)

interface Chapter {
    icon: React.ComponentType<{ className?: string }>
    title: string
    year: string
    image: string
    content: string
}

interface ChapterTimelineProps {
    chapters: Chapter[]
}

const ChapterTimeline = ({ chapters }: ChapterTimelineProps) => (
    <div className="space-y-16">
        {chapters.map((chapter, i) => (
            <div key={i} className={`flex flex-col @lg:flex-row gap-8 @xl:gap-12 ${i % 2 === 1 ? '@lg:flex-row-reverse' : ''}`}>
                <div className="@lg:w-1/2">
                    <div className="relative aspect-video rounded-xl overflow-hidden">
                        <Image src={chapter.image} alt={chapter.title} fill className="object-cover" />
                    </div>
                </div>
                <div className="@lg:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <chapter.icon className="size-5 text-primary" />
                        </div>
                        <Badge variant="secondary">{chapter.year}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{chapter.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{chapter.content}</p>
                </div>
            </div>
        ))}
    </div>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center mt-16">
        <Button size="lg" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)
