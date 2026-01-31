import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Mail, Shield } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="slate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Shield} text="Enterprise Security" />
                    <Title text="Protect What Matters Most" />
                    <Description text="Industry-leading security solutions that safeguard your data, comply with regulations, and give you peace of mind." />
                    <EmailSignup 
                        placeholder="Enter your work email" 
                        buttonText="Get Early Access"
                        icon={ArrowRight}
                    />
                    <TrustIndicators items={[
                        'No credit card required',
                        '14-day free trial',
                        'Cancel anytime',
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-6 @md:mb-8 gap-2 px-4 py-1.5">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-6 @md:mb-8">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const EmailSignup = ({ placeholder, buttonText, icon: Icon }: { placeholder: string; buttonText: string; icon: ComponentType<{ className?: string }> }) => (
    <div className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto mb-6">
        <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input type="email" placeholder={placeholder} className="pl-10 h-12" />
        </div>
        <Button size="lg" className="gap-2 h-12">
            {buttonText}
            <Icon className="size-4" />
        </Button>
    </div>
)

const TrustIndicators = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-4 @md:gap-6 text-sm text-muted-foreground">
        {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-primary" />
                {item}
            </span>
        ))}
    </div>
)
