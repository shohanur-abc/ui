import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <VerticalTabs
                    header={{
                        eyebrow: 'Portfolio',
                        title: 'Featured Work',
                        description: 'A selection of projects across different domains.',
                    }}
                    tabs={[
                        {
                            id: 'web',
                            label: 'Web Apps',
                            image: 'https://picsum.photos/seed/web1/800/600',
                            title: 'E-Commerce Platform',
                            description: 'Built a full-featured e-commerce platform handling 10K+ daily transactions. Includes real-time inventory, payment processing, and analytics dashboard.',
                            tags: ['Next.js', 'Stripe', 'PostgreSQL'],
                            featured: true,
                        },
                        {
                            id: 'mobile',
                            label: 'Mobile',
                            image: 'https://picsum.photos/seed/mob1/800/600',
                            title: 'Fitness Tracking App',
                            description: 'Cross-platform mobile app for fitness enthusiasts. Features workout tracking, social challenges, and AI-powered recommendations.',
                            tags: ['React Native', 'Firebase', 'ML Kit'],
                        },
                        {
                            id: 'design',
                            label: 'Design',
                            image: 'https://picsum.photos/seed/des1/800/600',
                            title: 'Design System',
                            description: 'Created a comprehensive design system used across 10+ products. Includes 100+ components, documentation, and Figma library.',
                            tags: ['Figma', 'Storybook', 'Documentation'],
                        },
                        {
                            id: 'ai',
                            label: 'AI/ML',
                            image: 'https://picsum.photos/seed/ai1/800/600',
                            title: 'Content Generation Tool',
                            description: 'AI-powered tool for generating marketing content. Processes natural language to create blog posts, social media, and ads.',
                            tags: ['Python', 'GPT-4', 'FastAPI'],
                        },
                    ]}
                    cta={{ label: 'View All Projects', href: '/projects', icon: ArrowRight }}
                />
            </div>
        </section>
    )
}

interface HeaderData {
    eyebrow: string
    title: string
    description: string
}

interface TabItem {
    id: string
    label: string
    image: string
    title: string
    description: string
    tags: string[]
    featured?: boolean
}

interface CTAData {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

interface VerticalTabsProps {
    header: HeaderData
    tabs: TabItem[]
    cta: CTAData
}

const VerticalTabs = ({ header, tabs, cta }: VerticalTabsProps) => (
    <div>
        <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">{header.eyebrow}</Badge>
            <h1 className="text-3xl @lg:text-4xl font-bold mb-4">{header.title}</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">{header.description}</p>
        </div>
        <Tabs defaultValue={tabs[0].id} orientation="vertical" className="flex flex-col @lg:flex-row gap-8">
            <TabsList className="flex @lg:flex-col h-auto @lg:w-48 bg-transparent @lg:border-r pr-0 @lg:pr-4">
                {tabs.map((tab) => (
                    <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="justify-start w-full data-[state=active]:bg-muted gap-2"
                    >
                        {tab.featured && <Star className="size-3 fill-yellow-500 text-yellow-500" />}
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <div className="flex-1">
                {tabs.map((tab) => (
                    <TabsContent key={tab.id} value={tab.id} className="mt-0">
                        <div className="grid @md:grid-cols-2 gap-6 items-center">
                            <div className="relative aspect-video rounded-xl overflow-hidden">
                                <Image src={tab.image} alt={tab.title} fill className="object-cover" />
                                {tab.featured && (
                                    <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">Featured</Badge>
                                )}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-3">{tab.title}</h2>
                                <p className="text-muted-foreground mb-4">{tab.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {tab.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">{tag}</Badge>
                                    ))}
                                </div>
                                <Button variant="outline" className="gap-2" asChild>
                                    <Link href={`/projects/${tab.id}`}>
                                        View Project
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </div>
        </Tabs>
        <div className="text-center mt-12">
            <Button className="gap-2" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <cta.icon className="size-4" />
                </Link>
            </Button>
        </div>
    </div>
)
