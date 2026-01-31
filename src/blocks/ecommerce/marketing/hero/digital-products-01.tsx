import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, GraduationCap, Award, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={BookOpen} text="Digital Products" />
                        <Title text="Learn." highlight="Create. Grow." />
                        <Description text="Unlock your potential with our premium digital courses, ebooks, and templates. Learn from industry experts and transform your skills." />

                        <ProductTypes items={[
                            { icon: GraduationCap, label: 'Online Courses', count: '500+' },
                            { icon: BookOpen, label: 'Ebooks', count: '200+' },
                            { icon: Award, label: 'Templates', count: '1000+' },
                        ]} />

                        <SocialProof />

                        <CTA items={[
                            { label: 'Browse Products', href: '/digital', icon: ArrowRight },
                            { label: 'Free Resources', href: '/free', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Digital Products Visual */}
                    <div className="relative">
                        <DigitalShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-indigo-400/50 text-indigo-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const ProductTypes = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; count: string }[] }) => (
    <div className="grid grid-cols-3 gap-3 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, label, count }) => (
            <Link
                key={label}
                href={`/digital/${label.toLowerCase().replace(' ', '-')}`}
                className="p-4 rounded-xl bg-white dark:bg-card border hover:border-indigo-400 transition-colors text-center group"
            >
                <Icon className="size-8 mx-auto mb-2 text-indigo-600 group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground">{count}</div>
            </Link>
        ))}
    </div>
)

const SocialProof = () => (
    <div className="flex items-center gap-4 mb-8 @md:mb-10 p-4 rounded-xl bg-white dark:bg-card border">
        <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="size-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 border-2 border-white dark:border-card" />
            ))}
        </div>
        <div>
            <div className="flex items-center gap-1">
                <Users className="size-4 text-indigo-600" />
                <span className="font-bold">50,000+</span>
            </div>
            <div className="text-sm text-muted-foreground">happy learners</div>
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700' : ''}`}
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

const DigitalShowcase = () => (
    <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-3xl blur-3xl" />

        {/* Stacked digital products */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Course mockup */}
            <div className="absolute -rotate-6 w-56 h-72 @md:w-64 @md:h-80 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 shadow-2xl p-6 flex flex-col">
                <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <GraduationCap className="size-6 text-white" />
                </div>
                <div className="text-white font-bold text-lg mb-2">Master Course</div>
                <div className="text-white/70 text-sm flex-1">Complete guide to success</div>
                <div className="flex items-center gap-2">
                    <div className="text-white font-bold">$99</div>
                    <div className="text-white/50 line-through text-sm">$199</div>
                </div>
            </div>

            {/* Ebook mockup */}
            <div className="absolute rotate-6 translate-x-12 w-48 h-64 @md:w-56 @md:h-72 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl p-5 flex flex-col">
                <div className="size-10 rounded-lg bg-white/20 flex items-center justify-center mb-3">
                    <BookOpen className="size-5 text-white" />
                </div>
                <div className="text-white font-bold mb-1">eBook Bundle</div>
                <div className="text-white/70 text-xs flex-1">10 essential guides</div>
                <div className="text-white font-bold">$49</div>
            </div>

            {/* Badge */}
            <div className="absolute -top-4 right-4 px-4 py-2 bg-yellow-400 text-black font-bold rounded-full shadow-lg">
                50% OFF
            </div>
        </div>
    </div>
)
