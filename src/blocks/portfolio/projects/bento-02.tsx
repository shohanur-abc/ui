import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="flex flex-col @md:flex-row @md:items-end @md:justify-between gap-4 mb-12 @md:mb-16">
                    <div>
                        <Eyebrow icon={Code2} text="Case Studies" />
                        <Title text="Featured Projects" />
                    </div>
                    <Button variant="outline" className="gap-2 w-fit" asChild>
                        <Link href="#all">
                            View All <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                <BentoLayout
                    items={[
                        {
                            image: 'https://picsum.photos/seed/bento2a/1200/600',
                            title: 'E-Commerce Redesign',
                            description: 'Complete overhaul of a major retail platform increasing conversions by 40%.',
                            tags: ['UX Design', 'React', 'Shopify'],
                            href: '#',
                            size: 'wide',
                        },
                        {
                            image: 'https://picsum.photos/seed/bento2b/600/600',
                            title: 'Healthcare Portal',
                            description: 'Patient management system.',
                            tags: ['Next.js', 'PostgreSQL'],
                            href: '#',
                            size: 'square',
                        },
                        {
                            image: 'https://picsum.photos/seed/bento2c/600/600',
                            title: 'Logistics Tracker',
                            description: 'Real-time fleet management.',
                            tags: ['Vue.js', 'Maps API'],
                            href: '#',
                            size: 'square',
                        },
                        {
                            image: 'https://picsum.photos/seed/bento2d/600/800',
                            title: 'Banking App',
                            description: 'Mobile-first banking experience with biometric auth.',
                            tags: ['React Native', 'Node.js'],
                            href: '#',
                            size: 'tall',
                        },
                        {
                            image: 'https://picsum.photos/seed/bento2e/800/600',
                            title: 'AI Writing Assistant',
                            description: 'GPT-powered content creation tool for marketers.',
                            tags: ['Python', 'OpenAI', 'FastAPI'],
                            href: '#',
                            size: 'normal',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex items-center gap-2 mb-2 text-primary">
        <Icon className="size-4" />
        <span className="text-sm font-medium uppercase tracking-wider">{text}</span>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">{text}</h2>
)

interface BentoItem {
    image: string
    title: string
    description: string
    tags: string[]
    href: string
    size: 'wide' | 'tall' | 'square' | 'normal'
}

const BentoLayout = ({ items }: { items: BentoItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6 auto-rows-[200px] @md:auto-rows-[220px]">
        {items.map(({ image, title, description, tags, href, size }, i) => {
            const sizeClasses = {
                wide: '@xl:col-span-2',
                tall: '@md:row-span-2',
                square: '',
                normal: '@xl:col-span-2',
            }

            return (
                <Link 
                    key={i} 
                    href={href} 
                    className={`group relative rounded-2xl overflow-hidden bg-card border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 ${sizeClasses[size]}`}
                >
                    <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 p-5 @md:p-6 flex flex-col justify-end">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {tags.map((tag, j) => (
                                <Badge key={j} variant="outline" className="text-xs bg-white/10 backdrop-blur-sm text-white border-white/20">{tag}</Badge>
                            ))}
                        </div>
                        <h3 className="text-white text-lg @md:text-xl font-bold mb-1">{title}</h3>
                        <p className="text-white/70 text-sm line-clamp-2">{description}</p>
                    </div>
                </Link>
            )
        })}
    </div>
)
