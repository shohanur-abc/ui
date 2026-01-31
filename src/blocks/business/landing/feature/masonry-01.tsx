import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart2, Globe, Layers, Lock, Rocket, Shield, Sparkles, Users, Zap } from 'lucide-react'
import { ComponentType } from 'react'

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="mb-10 @md:mb-12 @xl:mb-16 text-center max-w-3xl mx-auto">
                    <Eyebrow icon={Sparkles} text="Feature Highlights" />
                    <Title text="Powerful Features in a" highlight="Beautiful Package" />
                    <Description text="A carefully curated set of features designed to help you achieve more with less effort." />
                </div>

                <MasonryGrid items={[
                    { icon: Zap, title: 'Lightning Performance', description: 'Optimized for speed with edge caching and lazy loading.' },
                    { icon: Shield, title: 'Enterprise Security', description: 'Bank-grade encryption with SOC 2 Type II certification and regular penetration testing.' },
                    { icon: Users, title: 'Team Collaboration', description: 'Real-time co-editing and comments.' },
                    { icon: Globe, title: 'Global Scale', description: 'Deploy to 200+ edge locations worldwide for consistent performance.' },
                    { icon: Rocket, title: 'Quick Setup', description: 'Get started in minutes with our guided onboarding.' },
                    { icon: Lock, title: 'Privacy First', description: 'GDPR and CCPA compliant with data residency options.' },
                    { icon: BarChart2, title: 'Analytics', description: 'Deep insights with custom dashboards and real-time metrics.' },
                    { icon: Layers, title: 'Modular Design', description: 'Pick only the features you need.' },
                ]} />
            </div>
        </section>
    )
}

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
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const MasonryGrid = ({ items }: { items: FeatureItem[] }) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 @md:gap-5 space-y-4 @md:space-y-5">
        {items.map((item, index) => (
            <Card 
                key={item.title} 
                className="break-inside-avoid border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/40"
            >
                <CardContent className={`p-5 @md:p-6 ${index % 3 === 1 ? 'py-8 @md:py-10' : ''}`}>
                    <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="size-5 text-primary" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
