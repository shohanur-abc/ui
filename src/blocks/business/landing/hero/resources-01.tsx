import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Download, FileText, BarChart, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={BookOpen} text="Free Resources" />
                    <Title text="Learn From Industry Experts" />
                    <Description text="Download our free guides, templates, and reports. Actionable insights to accelerate your business growth." />
                    <CTA items={[
                        { label: 'Browse All Resources', href: '#resources', icon: ArrowRight },
                    ]} />
                </div>
                <ResourceGrid items={[
                    { 
                        type: 'Whitepaper',
                        icon: FileText,
                        title: 'The 2024 State of Enterprise Software',
                        description: '50+ pages of insights from 1,000+ business leaders',
                        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=500&fit=crop',
                        downloads: '12.5K',
                    },
                    { 
                        type: 'Report',
                        icon: BarChart,
                        title: 'ROI Benchmark Report',
                        description: 'How top companies measure success',
                        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=500&fit=crop',
                        downloads: '8.2K',
                    },
                    { 
                        type: 'Guide',
                        icon: BookOpen,
                        title: 'Digital Transformation Playbook',
                        description: 'Step-by-step implementation guide',
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=500&fit=crop',
                        downloads: '15.1K',
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const ResourceGrid = ({ items }: { items: { type: string; icon: ComponentType<{ className?: string }>; title: string; description: string; image: string; downloads: string }[] }) => (
    <div className="grid @md:grid-cols-3 gap-6">
        {items.map(({ type, icon: Icon, title, description, image, downloads }, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl hover:border-primary/30 transition-all">
                <div className="relative aspect-[4/5]">
                    <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge variant="secondary" className="mb-3 gap-1">
                        <Icon className="size-3" />
                        {type}
                    </Badge>
                    <h3 className="font-bold text-lg mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Download className="size-3" />
                            {downloads} downloads
                        </span>
                        <Button size="sm" className="gap-1">
                            <Download className="size-3" />
                            Download
                        </Button>
                    </div>
                </div>
            </div>
        ))}
    </div>
)
