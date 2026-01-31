import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Brain, Cpu, MessageSquare, Sparkles, Wand2 } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface AIFeature {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    tag: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <GlowDecorative />
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 relative">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Sparkles} text="AI-Powered" />
                    <Title text="Supercharge Your Workflow with" highlight="Artificial Intelligence" />
                    <Description text="Harness the power of AI to automate tasks, generate insights, and accelerate your business growth." />
                </div>

                <AIFeatureGrid items={[
                    { icon: Brain, title: 'Smart Predictions', description: 'ML models that predict trends and anomalies before they happen.', tag: 'Machine Learning' },
                    { icon: MessageSquare, title: 'Natural Language', description: 'Query your data using plain English questions.', tag: 'NLP' },
                    { icon: Wand2, title: 'Auto-Generation', description: 'Generate reports, summaries, and content automatically.', tag: 'Generative AI' },
                    { icon: Cpu, title: 'Process Automation', description: 'AI identifies and automates repetitive workflows.', tag: 'RPA' },
                ]} />

                <CTASection 
                    label="Explore AI Features"
                    href="/ai"
                />
            </div>
        </section>
    )
}

const GlowDecorative = () => (
    <>
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/30 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl opacity-20" />
    </>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="secondary" className="gap-2 px-3 py-1.5 bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const AIFeatureGrid = ({ items }: { items: AIFeature[] }) => (
    <div className="grid gap-5 @md:gap-6 @sm:grid-cols-2">
        {items.map((item) => (
            <Card key={item.title} className="group border-border/40 bg-card/40 backdrop-blur-xl transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-6 @md:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-primary/20">
                            <item.icon className="size-7 text-primary" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <Badge variant="outline" className="text-xs border-primary/30 text-primary">{item.tag}</Badge>
                            </div>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

const CTASection = ({ label, href }: { label: string; href: string }) => (
    <div className="mt-10 @md:mt-12 text-center">
        <Button size="lg" className="gap-2 shadow-lg shadow-primary/20" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)
