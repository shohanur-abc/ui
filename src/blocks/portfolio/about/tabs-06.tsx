import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Code, Dumbbell, Music, Plane } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <Header
                    eyebrow="Beyond Work"
                    title="Life Outside of Code"
                    description="I'm more than just a developer. Here's what makes me tick."
                />
                <LifeTabs
                    tabs={[
                        {
                            id: 'coding',
                            icon: Code,
                            label: 'Side Projects',
                            title: 'Building in My Free Time',
                            description: 'I spend evenings and weekends working on open source projects and experimenting with new technologies. It\'s how I learn best and give back to the community.',
                            images: [
                                'https://picsum.photos/seed/sp1/400/300',
                                'https://picsum.photos/seed/sp2/400/300',
                                'https://picsum.photos/seed/sp3/400/300',
                            ],
                            highlights: ['15+ open source projects', '1K+ GitHub stars', 'Regular contributor'],
                        },
                        {
                            id: 'fitness',
                            icon: Dumbbell,
                            label: 'Fitness',
                            title: 'Staying Active',
                            description: 'A healthy body supports a healthy mind. I train 5 days a week and have completed multiple marathons. Fitness is my way of staying focused and energized.',
                            images: [
                                'https://picsum.photos/seed/fit1/400/300',
                                'https://picsum.photos/seed/fit2/400/300',
                                'https://picsum.photos/seed/fit3/400/300',
                            ],
                            highlights: ['5 marathons completed', 'CrossFit Level 1', 'Morning workout routine'],
                        },
                        {
                            id: 'travel',
                            icon: Plane,
                            label: 'Travel',
                            title: 'Exploring the World',
                            description: 'Travel expands perspective. I\'ve visited 30+ countries and worked remotely from many. Each place teaches something new about people and culture.',
                            images: [
                                'https://picsum.photos/seed/tr1/400/300',
                                'https://picsum.photos/seed/tr2/400/300',
                                'https://picsum.photos/seed/tr3/400/300',
                            ],
                            highlights: ['30+ countries visited', 'Digital nomad 2021-2022', 'Photography enthusiast'],
                        },
                        {
                            id: 'music',
                            icon: Music,
                            label: 'Music',
                            title: 'Playing Guitar',
                            description: 'Music is my creative outlet beyond code. I\'ve been playing guitar for 15 years and occasionally jam with friends or perform at local venues.',
                            images: [
                                'https://picsum.photos/seed/mu1/400/300',
                                'https://picsum.photos/seed/mu2/400/300',
                                'https://picsum.photos/seed/mu3/400/300',
                            ],
                            highlights: ['15 years playing', 'Blues & Jazz', 'Vinyl collector'],
                        },
                    ]}
                />
                <CTA label="Let\'s Connect" href="/contact" icon={ArrowRight} />
            </div>
        </section>
    )
}

interface HeaderProps {
    eyebrow: string
    title: string
    description: string
}

const Header = ({ eyebrow, title, description }: HeaderProps) => (
    <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
        <h1 className="text-3xl @lg:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">{description}</p>
    </div>
)

interface TabItem {
    id: string
    icon: React.ComponentType<{ className?: string }>
    label: string
    title: string
    description: string
    images: string[]
    highlights: string[]
}

interface LifeTabsProps {
    tabs: TabItem[]
}

const LifeTabs = ({ tabs }: LifeTabsProps) => (
    <Tabs defaultValue={tabs[0].id} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-4 mb-8">
            {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                    <tab.icon className="size-4" />
                    <span className="hidden @sm:inline">{tab.label}</span>
                </TabsTrigger>
            ))}
        </TabsList>
        {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
                <div className="grid grid-cols-3 gap-2 mb-6 rounded-xl overflow-hidden">
                    {tab.images.map((img, i) => (
                        <div key={i} className="relative aspect-video">
                            <Image src={img} alt={`${tab.label} ${i + 1}`} fill className="object-cover" />
                        </div>
                    ))}
                </div>
                <h2 className="text-2xl font-bold mb-3">{tab.title}</h2>
                <p className="text-muted-foreground mb-6">{tab.description}</p>
                <Separator className="my-6" />
                <div className="flex flex-wrap gap-3">
                    {tab.highlights.map((highlight) => (
                        <Badge key={highlight} variant="outline">{highlight}</Badge>
                    ))}
                </div>
            </TabsContent>
        ))}
    </Tabs>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center mt-12">
        <Button className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)
