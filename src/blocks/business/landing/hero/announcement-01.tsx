import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Megaphone, Gift, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <AnnouncementBanner 
                    icon={Gift}
                    text="🎉 Limited Time Offer: Get 50% off your first 3 months!"
                    linkText="Claim Now"
                    href="#offer"
                />
                <div className="max-w-4xl mx-auto text-center mt-8">
                    <Eyebrow icon={Megaphone} text="Big News" />
                    <Title text="We Just Launched Something Amazing" highlight="Amazing" />
                    <Description text="After months of development and thousands of user feedback sessions, we&apos;re thrilled to announce our most ambitious release yet." />
                    <CTA items={[
                        { label: 'Explore Now', href: '#explore', icon: ArrowRight },
                        { label: 'Read Announcement', href: '#blog', variant: 'outline' },
                    ]} />
                    <Features items={[
                        '10x faster performance',
                        'New AI-powered features',
                        'Completely redesigned UI',
                        'Enhanced security',
                    ]} />
                </div>
            </div>
        </section>
    )
}

const AnnouncementBanner = ({ icon: Icon, text, linkText, href }: { icon: ComponentType<{ className?: string }>; text: string; linkText: string; href: string }) => (
    <div className="bg-primary/10 border border-primary/30 rounded-full py-2 px-4 @sm:px-6 flex flex-col @sm:flex-row items-center justify-center gap-2 @sm:gap-4 text-sm max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
            <Icon className="size-4 text-primary" />
            <span>{text}</span>
        </div>
        <Link href={href} className="text-primary font-medium hover:underline flex items-center gap-1">
            {linkText}
            <ArrowRight className="size-3" />
        </Link>
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-6 @md:mb-8 gap-2 px-4 py-1.5">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-6 @md:mb-8">
        {text.split(highlight)[0]}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl @xl:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-10 @md:mb-14">
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

const Features = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-4 @md:gap-6">
        {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm @md:text-base">
                <Sparkles className="size-4 text-primary" />
                <span>{item}</span>
            </div>
        ))}
    </div>
)
