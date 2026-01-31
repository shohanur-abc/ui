import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Briefcase, CheckCircle, Mail } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-slate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 h-full">
                <div className="grid @3xl:grid-cols-2 min-h-screen gap-8 @xl:gap-16 items-center">
                    <div className="py-12 @md:py-16 @3xl:py-0">
                        <Eyebrow icon={Briefcase} text="For Enterprise Teams" />
                        <Title text="The Operating System for Modern Business" />
                        <Description text="Unify your tech stack, automate workflows, and empower every team member to do their best work." />
                        <FeatureList items={[
                            'Unlimited team members',
                            'Advanced permissions & SSO',
                            'Custom integrations & API access',
                            'Dedicated account manager',
                        ]} />
                    </div>
                    <div className="py-8 @3xl:py-16">
                        <SignupForm 
                            title="Get Started Today"
                            subtitle="Join 50,000+ businesses already using our platform"
                            buttonText="Start Free Trial"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed max-w-xl">
        {text}
    </p>
)

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="space-y-3">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm @md:text-base">
                <CheckCircle className="size-5 text-primary shrink-0" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
)

const SignupForm = ({ title, subtitle, buttonText }: { title: string; subtitle: string; buttonText: string }) => (
    <div className="bg-card border border-border rounded-2xl p-6 @md:p-8 shadow-lg">
        <h2 className="text-xl @md:text-2xl font-bold mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground mb-6">{subtitle}</p>
        <div className="space-y-4">
            <div className="grid @sm:grid-cols-2 gap-4">
                <Input placeholder="First name" className="h-11" />
                <Input placeholder="Last name" className="h-11" />
            </div>
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input type="email" placeholder="Work email" className="pl-10 h-11" />
            </div>
            <Input placeholder="Company name" className="h-11" />
            <Button size="lg" className="w-full gap-2">
                {buttonText}
                <ArrowRight className="size-4" />
            </Button>
            <p className="text-xs text-center text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
        </div>
    </div>
)
