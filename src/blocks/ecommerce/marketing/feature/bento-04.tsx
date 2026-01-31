import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Layers, Lock, RefreshCcw, Sparkles, Zap } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14 @xl:mb-16">
                    <Badge variant="outline" className="mb-3 @md:mb-4">Platform Features</Badge>
                    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">Built for Modern Shopping</h2>
                    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">Experience a shopping platform designed with the latest technology.</p>
                </div>

                <BentoGrid items={[
                    { icon: Zap, title: 'Lightning Fast', description: 'Pages load in under 1 second with our optimized infrastructure. No more waiting.', size: 'large', color: 'bg-yellow-500/10 text-yellow-600' },
                    { icon: Lock, title: 'Bank-Level Security', description: 'Your data is protected.', size: 'small', color: 'bg-green-500/10 text-green-600' },
                    { icon: RefreshCcw, title: 'Real-Time Sync', description: 'Inventory updates instantly.', size: 'small', color: 'bg-blue-500/10 text-blue-600' },
                    { icon: Layers, title: 'Multi-Device', description: 'Seamless experience across all your devices. Start on phone, finish on desktop.', size: 'large', color: 'bg-purple-500/10 text-purple-600' },
                    { icon: Sparkles, title: 'Smart Search', description: 'AI-powered recommendations.', size: 'small', color: 'bg-pink-500/10 text-pink-600' },
                ]} />
            </div>
        </section>
    )
}

interface BentoItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    size: 'small' | 'large'
    color: string
}

const BentoGrid = ({ items }: { items: BentoItem[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-5">
        {items.map(({ icon: Icon, title, description, size, color }, i) => (
            <Card
                key={i}
                className={`group hover:shadow-lg transition-all hover:-translate-y-0.5 py-0 ${size === 'large' ? '@xl:col-span-2' : ''}`}
            >
                <CardContent className="p-5 @md:p-6 @xl:p-8 h-full flex flex-col">
                    <div className={`size-11 @md:size-12 rounded-xl flex items-center justify-center mb-4 ${color} group-hover:scale-110 transition-transform`}>
                        <Icon className="size-5 @md:size-6" />
                    </div>
                    <h3 className="text-lg @md:text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm @md:text-base text-muted-foreground leading-relaxed flex-1">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
