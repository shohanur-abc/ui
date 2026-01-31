import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, ShieldCheck, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Image Gallery */}
                    <div className="grid grid-cols-2 gap-3 @md:gap-4">
                        <div className="space-y-3 @md:space-y-4">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400"
                                    alt="Model 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-square rounded-2xl overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"
                                    alt="Model 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="space-y-3 @md:space-y-4 pt-8">
                            <div className="relative aspect-square rounded-2xl overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400"
                                    alt="Model 3"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400"
                                    alt="Model 4"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <Eyebrow text="Curated Fashion" />
                        <Title text="Discover Your" highlight="Signature Style" />
                        <Description text="From everyday essentials to statement pieces, find clothing that speaks to who you are. Sustainable, ethical, and uniquely you." />

                        <Stats items={[
                            { icon: Users, value: '500K+', label: 'Happy Customers' },
                            { icon: ShieldCheck, value: '100%', label: 'Authentic' },
                            { icon: Award, value: '50+', label: 'Awards' },
                        ]} />

                        <CTA items={[
                            { label: 'Explore Collections', href: '/collections', icon: ArrowRight },
                            { label: 'Our Story', href: '/about', variant: 'outline' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 px-4 py-2">
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-8 @md:mb-10">
        {text}
    </p>
)

const Stats = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="grid grid-cols-3 gap-4 @md:gap-6 mb-8 @md:mb-10 py-6 border-y">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
                <Icon className="size-5 @md:size-6 text-primary mx-auto mb-2" />
                <div className="text-xl @md:text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)
