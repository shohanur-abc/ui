import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, LayoutDashboard, Smartphone, Monitor, Tablet } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={LayoutDashboard} text="Cross-Platform" />
                    <Title text="One Platform. Every Device." />
                    <Description text="Seamless experience across desktop, tablet, and mobile. Work from anywhere, anytime." />
                    <CTA items={[
                        { label: 'Try All Platforms', href: '#try', icon: ArrowRight },
                        { label: 'Download Apps', href: '#apps', variant: 'outline' },
                    ]} />
                </div>
                <DeviceShowcase items={[
                    { icon: Monitor, device: 'Desktop', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop' },
                    { icon: Tablet, device: 'Tablet', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop' },
                    { icon: Smartphone, device: 'Mobile', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=500&fit=crop' },
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

const DeviceShowcase = ({ items }: { items: { icon: ComponentType<{ className?: string }>; device: string; image: string }[] }) => (
    <div className="flex flex-col @xl:flex-row items-end justify-center gap-4 @xl:gap-0">
        {/* Mobile */}
        <div className="@xl:-mr-8 z-10 order-3 @xl:order-1">
            <Card className="overflow-hidden w-48 @md:w-56">
                <div className="bg-muted px-3 py-2 flex items-center gap-2">
                    <Smartphone className="size-3.5" />
                    <span className="text-xs font-medium">{items[2].device}</span>
                </div>
                <div className="relative aspect-[9/16]">
                    <Image src={items[2].image} alt={items[2].device} fill className="object-cover" />
                </div>
            </Card>
        </div>

        {/* Desktop */}
        <div className="z-20 order-1 @xl:order-2">
            <Card className="overflow-hidden w-full @xl:w-[500px] @3xl:w-[600px]">
                <div className="bg-muted px-4 py-2.5 flex items-center gap-2">
                    <Monitor className="size-4" />
                    <span className="text-sm font-medium">{items[0].device}</span>
                    <div className="flex gap-1.5 ml-auto">
                        <span className="size-2.5 rounded-full bg-red-400" />
                        <span className="size-2.5 rounded-full bg-yellow-400" />
                        <span className="size-2.5 rounded-full bg-green-400" />
                    </div>
                </div>
                <div className="relative aspect-video">
                    <Image src={items[0].image} alt={items[0].device} fill className="object-cover" />
                </div>
            </Card>
        </div>

        {/* Tablet */}
        <div className="@xl:-ml-8 z-10 order-2 @xl:order-3">
            <Card className="overflow-hidden w-64 @md:w-72">
                <div className="bg-muted px-3 py-2 flex items-center gap-2">
                    <Tablet className="size-3.5" />
                    <span className="text-xs font-medium">{items[1].device}</span>
                </div>
                <div className="relative aspect-[4/3]">
                    <Image src={items[1].image} alt={items[1].device} fill className="object-cover" />
                </div>
            </Card>
        </div>
    </div>
)
