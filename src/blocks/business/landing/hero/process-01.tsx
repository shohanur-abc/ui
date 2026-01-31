import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Workflow, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-12 @md:mb-16">
                    <Eyebrow icon={Workflow} text="How It Works" />
                    <Title text="Get Started in 3 Simple Steps" />
                    <Description text="Go from signup to results in minutes, not months. Our streamlined process gets you up and running fast." />
                </div>
                <ProcessSteps items={[
                    { 
                        step: 1, 
                        title: 'Create Your Account', 
                        description: 'Sign up in seconds with your email or SSO. No credit card required to start.',
                        completed: true,
                    },
                    { 
                        step: 2, 
                        title: 'Configure Your Workspace', 
                        description: 'Import your data, invite your team, and customize settings to match your workflow.',
                        completed: false,
                    },
                    { 
                        step: 3, 
                        title: 'Launch & Measure', 
                        description: 'Go live and track results in real-time. Get insights that drive better decisions.',
                        completed: false,
                    },
                ]} />
                <div className="text-center mt-12 @md:mt-16">
                    <CTA items={[
                        { label: 'Get Started Now', href: '#start', icon: ArrowRight },
                        { label: 'Watch Demo', href: '#demo', variant: 'outline' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const ProcessSteps = ({ items }: { items: { step: number; title: string; description: string; completed: boolean }[] }) => (
    <div className="max-w-3xl mx-auto">
        {items.map(({ step, title, description, completed }, i) => (
            <div key={i} className="relative">
                <div className="flex gap-6 items-start">
                    <div className="flex flex-col items-center">
                        <div className={`size-12 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${
                            completed 
                                ? 'bg-primary border-primary text-primary-foreground' 
                                : 'bg-card border-border text-muted-foreground'
                        }`}>
                            {completed ? (
                                <CheckCircle className="size-6" />
                            ) : (
                                <span className="text-lg font-bold">{step}</span>
                            )}
                        </div>
                        {i < items.length - 1 && (
                            <div className={`w-0.5 h-24 ${completed ? 'bg-primary' : 'bg-border'}`} />
                        )}
                    </div>
                    <div className="pb-16 last:pb-0">
                        <h3 className="text-xl @md:text-2xl font-bold mb-2">{title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
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
