import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Target } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 h-full">
                <div className="grid @3xl:grid-cols-2 min-h-screen gap-8 @xl:gap-12 items-center">
                    <div className="py-12 @md:py-16 @3xl:py-0">
                        <Eyebrow icon={Target} text="Mission-Driven Results" />
                        <Title text="Build Products Users Actually Want" />
                        <Description text="From concept to launch, we help teams create digital products that delight users and drive measurable business outcomes." />
                        <Benefits items={[
                            'User-centered design methodology',
                            'Rapid prototyping and testing',
                            'Data-driven iteration cycles',
                        ]} />
                        <CTA items={[
                            { label: 'Start Building', href: '#build', icon: ArrowRight },
                            { label: 'Our Process', href: '#process', variant: 'outline' },
                        ]} />
                    </div>
                    <div className="py-8 @3xl:py-12">
                        <HeroImage 
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop" 
                            alt="Team collaboration"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
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
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed max-w-xl">
        {text}
    </p>
)

const Benefits = ({ items }: { items: string[] }) => (
    <ul className="space-y-3 mb-6 @md:mb-8">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm @md:text-base">
                <CheckCircle className="size-5 text-primary shrink-0" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
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

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
    </div>
)
