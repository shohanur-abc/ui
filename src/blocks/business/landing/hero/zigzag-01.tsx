import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Lightbulb } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 h-full">
                <div className="grid @3xl:grid-cols-2 min-h-screen">
                    <div className="flex flex-col justify-center py-12 @md:py-16 @3xl:py-0 @3xl:pr-12">
                        <Eyebrow icon={Lightbulb} text="Innovation First" />
                        <Title text="Where Bold Ideas Meet" highlight="Brilliant Execution" />
                        <Description text="We turn ambitious visions into market-leading products. From startups to enterprises, we&apos;ve helped 500+ companies innovate." />
                        <CTA items={[
                            { label: 'Start Innovating', href: '#innovate', icon: ArrowRight },
                            { label: 'Our Approach', href: '#approach', variant: 'outline' },
                        ]} />
                    </div>
                    <div className="relative flex items-center py-8 @3xl:py-0">
                        <ZigzagImage 
                            images={[
                                { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop', alt: 'Team planning' },
                                { src: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=400&h=300&fit=crop', alt: 'Collaboration' },
                                { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop', alt: 'Execution' },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 w-fit">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
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

const ZigzagImage = ({ images }: { images: { src: string; alt: string }[] }) => (
    <div className="relative w-full space-y-4">
        {images.map(({ src, alt }, i) => (
            <div 
                key={i} 
                className={`relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg ${
                    i % 2 === 0 ? 'ml-0 mr-auto w-4/5' : 'ml-auto mr-0 w-4/5'
                }`}
            >
                <Image src={src} alt={alt} fill className="object-cover" />
            </div>
        ))}
    </div>
)
