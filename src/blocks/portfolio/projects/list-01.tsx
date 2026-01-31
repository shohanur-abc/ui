import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUpRight, Rows3 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @lg:flex-row @lg:items-end @lg:justify-between gap-6 mb-12 @md:mb-16">
                    <div className="max-w-2xl">
                        <Eyebrow icon={Rows3} text="Archive" />
                        <Title text="Project List" />
                        <Description text="Complete list of projects with quick access to details." />
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="#grid-view">Switch to Grid</Link>
                    </Button>
                </div>

                <ProjectList
                    items={[
                        { title: 'Enterprise CRM System', year: '2025', category: 'SaaS', tech: ['React', 'Node.js', 'PostgreSQL'], href: '#' },
                        { title: 'Mobile Payment App', year: '2025', category: 'Fintech', tech: ['React Native', 'Stripe'], href: '#' },
                        { title: 'Real Estate Platform', year: '2024', category: 'Marketplace', tech: ['Next.js', 'Maps API'], href: '#' },
                        { title: 'Video Conference Tool', year: '2024', category: 'Communication', tech: ['WebRTC', 'Node.js'], href: '#' },
                        { title: 'Inventory Management', year: '2024', category: 'Enterprise', tech: ['Vue.js', 'Laravel'], href: '#' },
                        { title: 'Social Media Dashboard', year: '2024', category: 'Analytics', tech: ['React', 'D3.js'], href: '#' },
                        { title: 'Healthcare Portal', year: '2023', category: 'Healthcare', tech: ['Next.js', 'PostgreSQL'], href: '#' },
                        { title: 'E-Learning Platform', year: '2023', category: 'Education', tech: ['React', 'AWS'], href: '#' },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex items-center gap-2 mb-3 text-primary">
        <Icon className="size-4" />
        <span className="text-sm font-medium uppercase tracking-wider">{text}</span>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-3">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface ListItem {
    title: string
    year: string
    category: string
    tech: string[]
    href: string
}

const ProjectList = ({ items }: { items: ListItem[] }) => (
    <Card className="overflow-hidden border divide-y divide-border p-0">
        {items.map(({ title, year, category, tech, href }, i) => (
            <Link 
                key={i} 
                href={href} 
                className="group flex flex-col @md:flex-row @md:items-center gap-3 @md:gap-6 p-4 @md:px-6 @md:py-5 hover:bg-muted/50 transition-colors"
            >
                {/* Title */}
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-primary transition-colors truncate">{title}</h3>
                </div>
                
                {/* Category */}
                <div className="hidden @lg:block w-32">
                    <Badge variant="secondary">{category}</Badge>
                </div>
                
                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 @md:w-64 @lg:w-72">
                    {tech.map((t, j) => (
                        <Badge key={j} variant="outline" className="text-xs">{t}</Badge>
                    ))}
                </div>
                
                {/* Year */}
                <div className="text-sm text-muted-foreground w-16 text-right hidden @sm:block">
                    {year}
                </div>
                
                {/* Arrow */}
                <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden @md:block" />
            </Link>
        ))}
    </Card>
)
