import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Dumbbell, Apple, Pill, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gray-950 text-white">
            <FitnessGlow />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Dumbbell} text="Sports Nutrition" />
                        <Title text="Fuel Your" highlight="Performance" />
                        <Description text="Premium supplements and nutrition to power your workouts. Science-backed formulas for athletes and fitness enthusiasts." />

                        <ProductCategories items={[
                            { icon: Pill, label: 'Protein', count: '50+' },
                            { icon: Zap, label: 'Pre-Workout', count: '30+' },
                            { icon: Apple, label: 'Vitamins', count: '80+' },
                        ]} />

                        <GoalSelector />

                        <CTA items={[
                            { label: 'Shop Supplements', href: '/supplements', icon: ArrowRight },
                            { label: 'Take Quiz', href: '/quiz', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Supplements Visual */}
                    <div className="relative">
                        <SupplementShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const FitnessGlow = () => (
    <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-lime-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-green-500/10 to-transparent" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-lime-500/20 text-lime-400 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-black leading-tight tracking-tight mb-4 @md:mb-6 uppercase">
        {text}
        <br />
        <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-gray-400 leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const ProductCategories = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; count: string }[] }) => (
    <div className="flex gap-3 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, label, count }) => (
            <Link
                key={label}
                href={`/supplements/${label.toLowerCase()}`}
                className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-center"
            >
                <Icon className="size-8 mx-auto mb-2 text-lime-400 group-hover:scale-110 transition-transform" />
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-gray-500">{count}</div>
            </Link>
        ))}
    </div>
)

const GoalSelector = () => (
    <div className="mb-8 @md:mb-10">
        <div className="text-sm text-gray-400 mb-3">Shop by goal</div>
        <div className="flex flex-wrap gap-2">
            {['Build Muscle', 'Lose Weight', 'Energy', 'Recovery'].map((goal) => (
                <Link
                    key={goal}
                    href={`/supplements/goal/${goal.toLowerCase().replace(' ', '-')}`}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-lime-500/20 hover:text-lime-400 transition-colors text-sm"
                >
                    {goal}
                </Link>
            ))}
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
                className={`gap-2 ${i === 0 ? 'bg-lime-500 hover:bg-lime-600 text-black' : 'border-gray-700 text-white hover:bg-white/10'}`}
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

const SupplementShowcase = () => (
    <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-lime-500/30 to-green-500/10 rounded-3xl blur-3xl" />

        {/* Product display */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Main product */}
            <div className="relative w-48 h-64 @md:w-56 @md:h-72">
                <Image
                    src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400"
                    alt="Protein supplement"
                    fill
                    className="object-contain drop-shadow-2xl"
                />
            </div>

            {/* Floating stats */}
            <div className="absolute top-4 right-0 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold text-lime-400">25g</div>
                <div className="text-xs text-gray-400">Protein</div>
            </div>

            <div className="absolute bottom-4 left-0 p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                <div className="text-2xl font-bold text-lime-400">5g</div>
                <div className="text-xs text-gray-400">BCAAs</div>
            </div>

            {/* Price */}
            <div className="absolute bottom-0 right-1/4 px-5 py-2 bg-lime-500 text-black font-bold rounded-full shadow-lg">
                From $29
            </div>
        </div>
    </div>
)
