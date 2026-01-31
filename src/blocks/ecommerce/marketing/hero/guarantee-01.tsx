import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield, Award, ThumbsUp, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Shield} text="Quality Guarantee" />
                        <Title text="Love It or" highlight="Money Back" />
                        <Description text="We stand behind every product we sell. If you're not 100% satisfied, return it within 30 days for a full refund – no questions asked." />

                        <GuaranteeFeatures items={[
                            { icon: RotateCcw, title: '30-Day Returns', description: 'Return any item within 30 days for a full refund' },
                            { icon: Shield, title: 'Lifetime Warranty', description: 'Lifetime coverage against defects' },
                            { icon: Award, title: 'Quality Certified', description: 'Every product tested to meet our standards' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop with Confidence', href: '/products', icon: ArrowRight },
                            { label: 'Learn More', href: '/guarantee', variant: 'outline' },
                        ]} />

                        <TrustBadge />
                    </div>

                    {/* Guarantee Visual */}
                    <div className="relative">
                        <GuaranteeVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-blue-400/50 text-blue-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const GuaranteeFeatures = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string }[] }) => (
    <div className="space-y-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
                <div className="size-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Icon className="size-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-6 @md:mb-8">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                asChild
            >
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const TrustBadge = () => (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
            <ThumbsUp className="size-4 text-green-500" />
            <span>99.5% Satisfaction Rate</span>
        </div>
        <span className="text-border">|</span>
        <span>Over 50,000 happy customers</span>
    </div>
)

const GuaranteeVisual = () => (
    <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-3xl blur-3xl" />

        {/* Shield illustration */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Large shield */}
            <div className="relative w-56 h-64 @md:w-64 @md:h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-t-full rounded-b-3xl shadow-2xl flex flex-col items-center justify-center text-white p-8">
                    <Shield className="size-16 mb-4" />
                    <div className="text-2xl font-bold text-center">100%</div>
                    <div className="text-sm text-center">Satisfaction Guaranteed</div>
                </div>
            </div>

            {/* Floating badges */}
            <div className="absolute top-4 left-0 p-3 bg-white dark:bg-card rounded-xl shadow-lg border">
                <div className="flex items-center gap-2">
                    <RotateCcw className="size-5 text-blue-600" />
                    <span className="font-semibold text-sm">30 Days</span>
                </div>
            </div>

            <div className="absolute bottom-4 right-0 p-3 bg-white dark:bg-card rounded-xl shadow-lg border">
                <div className="flex items-center gap-2">
                    <Award className="size-5 text-yellow-500" />
                    <span className="font-semibold text-sm">Certified</span>
                </div>
            </div>

            {/* Sample product */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-24 rounded-xl overflow-hidden shadow-xl border-2 border-white">
                <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200"
                    alt="Product"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    </div>
)
