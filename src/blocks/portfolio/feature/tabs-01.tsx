'use client'

import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Paintbrush, Server, Smartphone } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Expertise" />
                    <Title text="Specialized Services" />
                    <Description text="Explore my core competencies and see how I can help bring your ideas to life." />
                </div>

                <ServiceTabs items={[
                    {
                        id: 'frontend',
                        icon: Code2,
                        label: 'Frontend',
                        title: 'Frontend Development',
                        description: 'Building responsive, accessible, and performant user interfaces with modern frameworks and best practices.',
                        features: ['React & Next.js', 'TypeScript', 'Tailwind CSS', 'Animations & Interactions'],
                        image: 'https://picsum.photos/seed/frontend/800/500',
                    },
                    {
                        id: 'backend',
                        icon: Server,
                        label: 'Backend',
                        title: 'Backend Development',
                        description: 'Creating scalable APIs and server-side solutions with robust architecture and security.',
                        features: ['Node.js & Python', 'RESTful APIs', 'Database Design', 'Authentication'],
                        image: 'https://picsum.photos/seed/backend/800/500',
                    },
                    {
                        id: 'mobile',
                        icon: Smartphone,
                        label: 'Mobile',
                        title: 'Mobile Development',
                        description: 'Developing cross-platform mobile applications that feel native on both iOS and Android.',
                        features: ['React Native', 'Expo', 'Native Modules', 'App Store Deployment'],
                        image: 'https://picsum.photos/seed/mobile/800/500',
                    },
                    {
                        id: 'design',
                        icon: Paintbrush,
                        label: 'Design',
                        title: 'UI/UX Design',
                        description: 'Crafting intuitive user experiences with attention to detail and brand consistency.',
                        features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
                        image: 'https://picsum.photos/seed/design/800/500',
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface ServiceItem {
    id: string
    icon: ComponentType<{ className?: string }>
    label: string
    title: string
    description: string
    features: string[]
    image: string
}

const ServiceTabs = ({ items }: { items: ServiceItem[] }) => (
    <Tabs defaultValue={items[0].id} className="w-full">
        <TabsList className="w-full @md:w-auto h-auto flex-wrap justify-center gap-1 @md:gap-2 p-1.5 mb-8 @md:mb-10">
            {items.map(({ id, icon: Icon, label }) => (
                <TabsTrigger key={id} value={id} className="gap-2 px-4 py-2.5 data-[state=active]:shadow-md">
                    <Icon className="size-4" />
                    <span className="hidden @xs:inline">{label}</span>
                </TabsTrigger>
            ))}
        </TabsList>

        {items.map(({ id, title, description, features, image }) => (
            <TabsContent key={id} value={id}>
                <Card className="overflow-hidden py-0">
                    <div className="grid @xl:grid-cols-2">
                        <CardContent className="p-6 @md:p-8 @xl:p-10 flex flex-col justify-center">
                            <h3 className="text-xl @md:text-2xl @xl:text-3xl font-bold mb-3 @md:mb-4">{title}</h3>
                            <p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-5 @md:mb-6">{description}</p>
                            <ul className="grid @sm:grid-cols-2 gap-2 @md:gap-3">
                                {features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm @md:text-base">
                                        <div className="size-1.5 rounded-full bg-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <div className="relative aspect-video @xl:aspect-auto">
                            <Image src={image} alt={title} fill className="object-cover" />
                        </div>
                    </div>
                </Card>
            </TabsContent>
        ))}
    </Tabs>
)
