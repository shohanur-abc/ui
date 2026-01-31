import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Box, Circle, Layers } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface ProcessStep {
    number: string
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Layers} text="Simple Process" />
                    <Title text="Get Started in" highlight="Three Easy Steps" />
                    <Description text="Our streamlined process gets you from signup to success faster than you'd expect." />
                </div>

                <ProcessSteps items={[
                    { number: '01', title: 'Create Your Account', description: 'Sign up in seconds with just your email. No credit card required for the free trial.' },
                    { number: '02', title: 'Connect Your Tools', description: 'Link your existing software and data sources with one-click integrations.' },
                    { number: '03', title: 'Start Growing', description: 'Launch your first automation and watch your productivity soar.' },
                ]} />

                <CTASection 
                    label="Get Started Now"
                    href="/signup"
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
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
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const ProcessSteps = ({ items }: { items: ProcessStep[] }) => (
    <div className="relative">
        {/* Connecting line */}
        <div className="hidden @lg:block absolute top-16 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
        
        <div className="grid gap-8 @lg:grid-cols-3">
            {items.map((step, index) => (
                <div key={step.number} className="relative text-center">
                    <div className="mb-6 mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg shadow-primary/20">
                        {step.number}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
                </div>
            ))}
        </div>
    </div>
)

const CTASection = ({ label, href }: { label: string; href: string }) => (
    <div className="mt-12 @md:mt-16 text-center">
        <Button size="lg" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)
