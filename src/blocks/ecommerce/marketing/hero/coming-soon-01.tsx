import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Clock, Bell, Heart, Users } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Product Visual */}
                    <div className="relative order-2 @2xl:order-1">
                        <ComingSoonProduct />
                    </div>

                    {/* Content */}
                    <div className="order-1 @2xl:order-2">
                        <Eyebrow icon={Clock} text="Coming Soon" />
                        <Title text="Something" highlight="Incredible" suffix="Is Coming" />
                        <Description text="Be the first to know when we launch. Sign up for exclusive early access, special launch pricing, and insider updates." />

                        <LaunchCountdown />

                        <NotifyForm />

                        <WaitlistStats items={[
                            { icon: Users, value: '12,847', label: 'On waitlist' },
                            { icon: Heart, value: '98%', label: 'Interest rate' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
        <br />
        <span className="text-muted-foreground">{suffix}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const LaunchCountdown = () => (
    <div className="flex gap-3 @md:gap-4 mb-8 @md:mb-10">
        {[
            { value: '14', label: 'Days' },
            { value: '08', label: 'Hours' },
            { value: '32', label: 'Minutes' },
            { value: '15', label: 'Seconds' },
        ].map(({ value, label }) => (
            <div key={label} className="text-center">
                <div className="w-14 h-14 @md:w-16 @md:h-16 rounded-xl bg-muted flex items-center justify-center mb-1">
                    <span className="text-xl @md:text-2xl font-bold">{value}</span>
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const NotifyForm = () => (
    <div className="mb-8 @md:mb-10">
        <div className="flex gap-2 mb-3">
            <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-xs"
            />
            <Button className="gap-2">
                <Bell className="size-4" /> Notify Me
            </Button>
        </div>
        <p className="text-xs text-muted-foreground">
            We&apos;ll only send you launch updates. No spam, promise.
        </p>
    </div>
)

const WaitlistStats = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="flex gap-8">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label}>
                <div className="flex items-center gap-2 mb-1">
                    <Icon className="size-4 text-primary" />
                    <span className="text-xl font-bold">{value}</span>
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const ComingSoonProduct = () => (
    <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl blur-3xl" />

        {/* Mystery product container */}
        <div className="relative aspect-square max-w-md mx-auto flex items-center justify-center">
            {/* Product silhouette */}
            <div className="relative w-64 h-64 @md:w-72 @md:h-72 rounded-3xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                {/* Blurred product preview */}
                <Image
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                    alt="Coming soon product"
                    fill
                    className="object-cover blur-xl opacity-30"
                />

                {/* Question mark overlay */}
                <div className="relative text-8xl font-bold text-muted-foreground/50">?</div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
            </div>

            {/* Floating hints */}
            <div className="absolute -top-4 -right-4 px-4 py-2 bg-card rounded-xl shadow-lg border">
                <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">In Development</span>
                </div>
            </div>

            <div className="absolute -bottom-4 -left-4 p-4 bg-card rounded-xl shadow-lg border">
                <div className="text-xs text-muted-foreground">Launch Price</div>
                <div className="text-xl font-bold">$99 → $79</div>
                <div className="text-xs text-green-600">Early bird discount</div>
            </div>
        </div>
    </div>
)
