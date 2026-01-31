import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Download, Smartphone, Monitor, Apple, Chrome } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Download} text="Get the App" />
                        <Title text="Work From Anywhere, On Any Device" />
                        <Description text="Download our native apps for the best experience. Available on iOS, Android, Windows, Mac, and as a browser extension." />
                        <DownloadButtons items={[
                            { icon: Apple, label: 'App Store', subtitle: 'iOS 14+', href: '#ios' },
                            { icon: Smartphone, label: 'Google Play', subtitle: 'Android 10+', href: '#android' },
                            { icon: Monitor, label: 'Desktop App', subtitle: 'Win & Mac', href: '#desktop' },
                            { icon: Chrome, label: 'Browser Extension', subtitle: 'Chrome & Firefox', href: '#extension' },
                        ]} />
                        <InstallStats items={[
                            { value: '1M+', label: 'Downloads' },
                            { value: '4.8', label: 'App Rating' },
                        ]} />
                    </div>
                    <AppPreview 
                        image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=700&fit=crop"
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2">
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

const DownloadButtons = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; subtitle: string; href: string }[] }) => (
    <div className="grid grid-cols-2 gap-3 mb-8">
        {items.map(({ icon: Icon, label, subtitle, href }, i) => (
            <Link key={i} href={href}>
                <Card className="group hover:shadow-lg hover:border-primary/30 transition-all">
                    <CardContent className="py-4 flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                            <Icon className="size-5 text-primary" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{label}</p>
                            <p className="text-xs text-muted-foreground">{subtitle}</p>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)

const InstallStats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex gap-8">
        {items.map(({ value, label }, i) => (
            <div key={i}>
                <div className="text-2xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const AppPreview = ({ image }: { image: string }) => (
    <div className="flex justify-center">
        <div className="relative max-w-xs">
            {/* Phone frame */}
            <div className="relative bg-foreground rounded-[3rem] p-3 shadow-2xl">
                <div className="relative aspect-[9/19] rounded-[2.5rem] overflow-hidden bg-background">
                    <Image src={image} alt="App Preview" fill className="object-cover" />
                </div>
                {/* Notch */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-full" />
            </div>
        </div>
    </div>
)
