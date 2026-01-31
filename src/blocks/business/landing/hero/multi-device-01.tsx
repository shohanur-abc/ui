import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Smartphone, Tablet, Monitor } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Monitor} text="Cross-Platform" />
                    <Title text="Work Seamlessly Across All Devices" />
                    <Description text="Start on your desktop, continue on your phone, finish on your tablet. Your work syncs instantly, everywhere." />
                    <CTA items={[
                        { label: 'Download Apps', href: '#apps', icon: ArrowRight },
                        { label: 'Web App', href: '#web', variant: 'outline' },
                    ]} />
                </div>
                <DeviceShowcase />
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
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
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

const DeviceShowcase = () => (
    <div className="relative max-w-5xl mx-auto">
        {/* Desktop */}
        <div className="relative mx-auto" style={{ maxWidth: '80%' }}>
            <div className="bg-foreground rounded-t-xl p-2">
                <div className="flex gap-1.5 mb-2">
                    <span className="size-2.5 rounded-full bg-red-500" />
                    <span className="size-2.5 rounded-full bg-yellow-500" />
                    <span className="size-2.5 rounded-full bg-green-500" />
                </div>
                <div className="relative aspect-[16/10] rounded bg-background overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=750&fit=crop" 
                        alt="Desktop App" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>
            <div className="h-4 bg-foreground rounded-b-lg" />
            <div className="h-2 bg-muted mx-auto" style={{ width: '40%' }} />
        </div>

        {/* Tablet - positioned to the left */}
        <div className="absolute -left-4 @md:left-0 bottom-0 @md:bottom-10 w-32 @md:w-48">
            <div className="bg-foreground rounded-2xl p-1.5">
                <div className="relative aspect-[3/4] rounded-xl bg-background overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=533&fit=crop" 
                        alt="Tablet App" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>
        </div>

        {/* Phone - positioned to the right */}
        <div className="absolute -right-2 @md:right-10 bottom-0 @md:bottom-5 w-20 @md:w-28">
            <div className="bg-foreground rounded-2xl p-1">
                <div className="relative aspect-[9/19] rounded-xl bg-background overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=200&h=422&fit=crop" 
                        alt="Mobile App" 
                        fill 
                        className="object-cover"
                    />
                </div>
                {/* Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-3 bg-foreground rounded-full" />
            </div>
        </div>

        {/* Platform badges */}
        <div className="flex justify-center gap-4 mt-8">
            <PlatformBadge icon={Monitor} label="Mac & Windows" />
            <PlatformBadge icon={Tablet} label="iPad & Android Tablet" />
            <PlatformBadge icon={Smartphone} label="iOS & Android" />
        </div>
    </div>
)

const PlatformBadge = ({ icon: Icon, label }: { icon: ComponentType<{ className?: string }>; label: string }) => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border/50 text-sm">
        <Icon className="size-4 text-primary" />
        <span className="hidden @sm:inline">{label}</span>
    </div>
)
