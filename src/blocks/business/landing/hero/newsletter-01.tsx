import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {Mail, Send, Gift, Bell } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center relative overflow-hidden" data-theme="slate">
            <NewsletterDecorative />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <Eyebrow icon={Mail} text="Newsletter" />
                    <Title text="Stay in the Loop" />
                    <Description text="Get the latest industry insights, product updates, and exclusive offers delivered straight to your inbox. No spam, ever." />
                    <SubscribeForm />
                    <Benefits items={[
                        { icon: Gift, label: 'Exclusive discounts' },
                        { icon: Bell, label: 'Early access to features' },
                        { icon: Mail, label: 'Weekly insights' },
                    ]} />
                    <SubscriberCount count={52000} />
                </div>
            </div>
        </section>
    )
}

const NewsletterDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold tracking-tight mb-4 @md:mb-6">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const SubscribeForm = () => (
    <form className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto mb-6">
        <Input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 h-12"
        />
        <Button size="lg" className="gap-2 h-12">
            <Send className="size-4" />
            Subscribe
        </Button>
    </form>
)

const Benefits = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 @md:gap-6 text-sm text-muted-foreground mb-8">
        {items.map(({ icon: Icon, label }, i) => (
            <span key={i} className="flex items-center gap-2">
                <Icon className="size-4 text-primary" />
                {label}
            </span>
        ))}
    </div>
)

const SubscriberCount = ({ count }: { count: number }) => (
    <p className="text-sm text-muted-foreground">
        Join <span className="font-semibold text-foreground">{count.toLocaleString()}+</span> subscribers
    </p>
)
