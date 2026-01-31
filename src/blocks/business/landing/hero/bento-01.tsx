import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, LayoutGrid, Boxes, Workflow, Puzzle } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12">
                    <div className="flex flex-col justify-center">
                        <Eyebrow icon={LayoutGrid} text="Modular Platform" />
                        <Title text="Build Your Perfect Tech Stack" />
                        <Description text="Mix and match modules to create a solution that fits your exact needs. Start small, scale infinitely." />
                        <CTA items={[
                            { label: 'Explore Modules', href: '#modules', icon: ArrowRight },
                            { label: 'View Integrations', href: '#integrations', variant: 'outline' },
                        ]} />
                    </div>
                    <div>
                        <BentoGrid items={[
                            { icon: Boxes, title: 'Core Platform', description: 'Essential features included', size: 'large' },
                            { icon: Workflow, title: 'Automation', description: 'Workflow builder', size: 'small' },
                            { icon: Puzzle, title: 'Integrations', description: '200+ connectors', size: 'small' },
                            { icon: LayoutGrid, title: 'Analytics', description: 'Real-time insights', size: 'medium' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2 w-fit">
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

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
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

const BentoGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string; size: 'small' | 'medium' | 'large' }[] }) => (
    <div className="grid grid-cols-2 gap-4">
        {items.map(({ icon: Icon, title, description, size }, i) => (
            <Card 
                key={i} 
                className={`group hover:shadow-lg hover:border-primary/30 transition-all ${
                    size === 'large' ? 'col-span-2 row-span-2' : 
                    size === 'medium' ? 'col-span-2' : ''
                }`}
            >
                <CardContent className={`flex flex-col justify-center ${size === 'large' ? 'pt-8 pb-2' : 'pt-6'}`}>
                    <div className={`rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors ${
                        size === 'large' ? 'size-16' : 'size-12'
                    }`}>
                        <Icon className={`text-primary ${size === 'large' ? 'size-8' : 'size-6'}`} />
                    </div>
                    <h3 className={`font-semibold mb-1 ${size === 'large' ? 'text-xl' : 'text-base'}`}>{title}</h3>
                    <p className={`text-muted-foreground ${size === 'large' ? 'text-base' : 'text-sm'}`}>{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
