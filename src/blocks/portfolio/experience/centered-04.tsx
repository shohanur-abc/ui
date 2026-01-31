import { Badge } from '@/components/ui/badge'
import { TrendingUp, Users, Layers, Clock, Code, Award } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={TrendingUp} text="Impact" />
                    <Title text="By The Numbers" />
                    <Description text="Measurable impact I've made throughout my career." />
                </div>

                <div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <StatBlock icon={Clock} value="8+" label="Years Experience" />
                    <StatBlock icon={Users} value="25+" label="Engineers Mentored" />
                    <StatBlock icon={Layers} value="500+" label="Components Built" />
                    <StatBlock icon={TrendingUp} value="40%" label="Performance Improved" />
                    <StatBlock icon={Code} value="50+" label="Projects Shipped" />
                    <StatBlock icon={Award} value="5" label="Patents Filed" />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface StatBlockProps {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

const StatBlock = ({ icon: Icon, value, label }: StatBlockProps) => (
    <div className="text-center group">
        <div className="size-12 rounded-xl bg-background border flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 group-hover:border-primary/20 transition-colors">
            <Icon className="size-6 text-primary" />
        </div>
        <p className="text-4xl @md:text-5xl font-bold mb-2">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
    </div>
)
