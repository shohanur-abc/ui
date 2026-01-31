import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen relative overflow-hidden" data-theme="business-neon">
            <FullscreenBackground 
                image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop"
                overlay
            />
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                    <div className="max-w-3xl">
                        <Eyebrow icon={Sparkles} text="The Future is Here" />
                        <Title text="Transform the Way You Work" />
                        <Description text="Experience the next generation of business tools. Intelligent, intuitive, and incredibly powerful." />
                        <CTA items={[
                            { label: 'Get Started Free', href: '#start', icon: ArrowRight },
                            { label: 'Watch Video', href: '#video', variant: 'outline' },
                        ]} />
                        <TrustBar items={['No credit card required', 'Free forever plan', 'Setup in minutes']} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const FullscreenBackground = ({ image, overlay }: { image: string; overlay?: boolean }) => (
    <>
        <Image 
            src={image} 
            alt="Background" 
            fill 
            className="object-cover"
            priority
        />
        {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        )}
    </>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-6 @md:mb-8 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-6 @md:mb-8 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl @xl:text-2xl text-muted-foreground mb-8 @md:mb-10 leading-relaxed max-w-xl">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
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

const TrustBar = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-4 @md:gap-6 text-sm text-muted-foreground">
        {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                {item}
            </span>
        ))}
    </div>
)
