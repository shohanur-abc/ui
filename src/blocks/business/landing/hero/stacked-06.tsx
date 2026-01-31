import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Layers } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <StackedCards images={[
                            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
                            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
                        ]}
                    />
                    <div>
                        <Eyebrow icon={Layers} text="Multiple Views" />
                        <Title text="One Platform, Endless Possibilities" />
                        <Description text="Whether you prefer lists, boards, or timelines—work the way that suits you best. Switch views instantly without losing context." />
                        <ViewOptions items={[
                            { name: 'Board View', description: 'Kanban-style workflow management' },
                            { name: 'List View', description: 'Traditional spreadsheet layout' },
                            { name: 'Timeline', description: 'Gantt charts for project planning' },
                            { name: 'Calendar', description: 'Schedule and deadline overview' },
                        ]} />
                        <CTA items={[
                            { label: 'Try All Views', href: '#views', icon: ArrowRight },
                            { label: 'Watch Demo', href: '#demo', variant: 'outline' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const StackedCards = ({ images }: { images: string[] }) => (
    <div className="relative aspect-[4/3] flex items-center justify-center">
        {images.map((image, i) => (
            <div 
                key={i} 
                className="absolute bg-card border border-border rounded-xl shadow-xl overflow-hidden transition-all hover:z-10"
                style={{
                    width: `${85 - i * 5}%`,
                    transform: `translateY(${i * 20}px) rotate(${(i - 1) * 3}deg)`,
                    zIndex: images.length - i,
                }}
            >
                <div className="relative aspect-[16/10]">
                    <Image src={image} alt={`View ${i + 1}`} fill className="object-cover" />
                </div>
            </div>
        ))}
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
)

const ViewOptions = ({ items }: { items: { name: string; description: string }[] }) => (
    <div className="grid grid-cols-2 gap-3 mb-8">
        {items.map(({ name, description }, i) => (
            <div key={i} className="p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="font-medium text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
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
