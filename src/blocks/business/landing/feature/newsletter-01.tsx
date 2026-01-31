import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bell, Mail, Sparkles } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <GlowBackground />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative">
                <div className="max-w-2xl mx-auto text-center">
                    <Eyebrow icon={Bell} text="Stay Updated" />
                    <Title text="Get the Latest" highlight="News & Updates" />
                    <Description text="Subscribe to our newsletter and be the first to know about new features, tips, and special offers." />
                    <NewsletterForm />
                    <PrivacyNote text="We respect your privacy. Unsubscribe at any time." />
                </div>
            </div>
        </section>
    )
}

const GlowBackground = () => (
    <>
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-30" />
    </>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="mb-8 text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const NewsletterForm = () => (
    <form className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto mb-4">
        <div className="relative flex-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <input 
                type="email"
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                required
            />
        </div>
        <Button type="submit" size="lg" className="gap-2 shrink-0">
            Subscribe
            <ArrowRight className="size-4" />
        </Button>
    </form>
)

const PrivacyNote = ({ text }: { text: string }) => (
    <p className="text-xs text-muted-foreground">{text}</p>
)
