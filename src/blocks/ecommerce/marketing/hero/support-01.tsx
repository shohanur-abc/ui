import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Headphones, MessageCircle, Phone, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-cyan-50 to-background dark:from-cyan-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Headphones} text="Support" />
                        <Title text="We're Here" highlight="24/7" />
                        <Description text="Questions? We've got answers. Our customer support team is available around the clock to help you with anything you need." />

                        <SupportOptions items={[
                            { icon: MessageCircle, title: 'Live Chat', description: 'Get instant answers', action: 'Start Chat' },
                            { icon: Phone, title: 'Phone Support', description: '+1 (800) 123-4567', action: 'Call Now' },
                        ]} />

                        <SupportStats items={[
                            { value: '<2 min', label: 'Average Response' },
                            { value: '99%', label: 'Satisfaction Rate' },
                            { value: '24/7', label: 'Availability' },
                        ]} />

                        <CTA items={[
                            { label: 'Get Help Now', href: '/support', icon: ArrowRight },
                            { label: 'Help Center', href: '/help', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Support Visual */}
                    <div className="relative">
                        <SupportVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-cyan-400/50 text-cyan-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-cyan-600 to-blue-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const SupportOptions = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string; action: string }[] }) => (
    <div className="grid @sm:grid-cols-2 gap-4 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, title, description, action }) => (
            <Link
                key={title}
                href="#"
                className="p-4 rounded-xl bg-card border hover:border-cyan-400/50 transition-colors group"
            >
                <Icon className="size-8 text-cyan-600 mb-3" />
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{description}</p>
                <span className="text-sm text-cyan-600 font-medium group-hover:underline">
                    {action} →
                </span>
            </Link>
        ))}
    </div>
)

const SupportStats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex gap-6 mb-8 @md:mb-10">
        {items.map(({ value, label }) => (
            <div key={label}>
                <div className="text-xl font-bold text-cyan-600">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-cyan-600 hover:bg-cyan-700' : ''}`}
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

const SupportVisual = () => (
    <div className="relative">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 rounded-3xl blur-3xl" />

        {/* Chat window mockup */}
        <div className="relative p-4 @md:p-6 bg-card rounded-3xl shadow-xl border max-w-sm mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b mb-4">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-cyan-500 flex items-center justify-center">
                        <Headphones className="size-5 text-white" />
                    </div>
                    <div>
                        <div className="font-semibold">Support Team</div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                            <span className="size-2 rounded-full bg-green-500" />
                            Online now
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="space-y-3 mb-4">
                <div className="flex gap-2">
                    <div className="size-8 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                        <Headphones className="size-4 text-white" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-none bg-muted max-w-[80%]">
                        <p className="text-sm">Hi! 👋 How can I help you today?</p>
                    </div>
                </div>
                <div className="flex gap-2 justify-end">
                    <div className="p-3 rounded-2xl rounded-tr-none bg-cyan-600 text-white max-w-[80%]">
                        <p className="text-sm">I have a question about my order</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="size-8 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                        <Headphones className="size-4 text-white" />
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-none bg-muted max-w-[80%]">
                        <p className="text-sm">Of course! I&apos;d be happy to help. Could you share your order number?</p>
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-full border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
                <Button size="icon" className="rounded-full bg-cyan-600 hover:bg-cyan-700">
                    <ArrowRight className="size-4" />
                </Button>
            </div>
        </div>

        {/* Response time badge */}
        <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-green-500 text-white font-medium rounded-full shadow-lg flex items-center gap-2">
            <Clock className="size-4" />
            <span className="text-sm">~1 min reply</span>
        </div>
    </div>
)
