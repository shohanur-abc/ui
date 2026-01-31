import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, Layers, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative min-h-screen flex items-center justify-center overflow-hidden ">
            <BackgroundDecorative />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 w-full">
                <div className="max-w-5xl mx-auto text-center">
                    <Eyebrow icon={Zap} text="Welcome to My Digital Space" />
                    <Title text="Full-Stack Developer" highlight="Building the Web" />
                    <Subtitle text="Hi, I'm Alex Rivera. I transform complex problems into elegant solutions with clean code, stunning visuals, and exceptional user experiences. py-12 @md:py-16 @xl:py-20 @3xl:py-24" />

                    <CTA items={[
                        { label: 'Explore Portfolio', href: '#portfolio', icon: ArrowRight },
                        { label: 'Get in Touch', href: '#contact', variant: 'outline' },
                    ]} />

                    <FeaturesGrid items={[
                        { Icon: Code2, title: 'Clean Code', description: 'Writing scalable, maintainable solutions' },
                        { Icon: Layers, title: 'Modern Stack', description: 'Latest tech for best results' },
                        { Icon: Zap, title: 'Fast Delivery', description: 'Efficient workflows, timely results' },
                    ]} />
                </div>
            </div>
        </section>
    )
}


const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>, text: string }) => (
    <div className="inline-flex items-center rounded-full border bg-background/50 backdrop-blur-sm px-4 py-2 mb-6 @md:mb-7 @xl:mb-8">
        <Icon className="size-4" />
        <span className="text-sm font-medium ml-2">{text}</span>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold mb-4 @md:mb-5 @xl:mb-6 leading-[1.05] tracking-tight">
        {text}
        <span className="block bg-linear-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {highlight}
        </span>
    </h1>
)

const Subtitle = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl @xl:text-2xl text-muted-foreground mb-10 @md:mb-12 @xl:mb-16 max-w-3xl mx-auto leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: React.ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @lg:gap-4 mb-6 @md:mb-8 @lg:mb-10">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" className="gap-2 shadow-lg " variant={variant || 'default'} asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

interface FeatureCardProps {
    Icon: ComponentType<{ className: string }>
    title: string
    description: string
}

const FeaturesGrid = ({ items }: { items: FeatureCardProps[] }) => (
    <ul className="grid @md:grid-cols-3 gap-4 @md:gap-5 @xl:gap-6 max-w-4xl mx-auto">
        {items.map(({ Icon, title, description }, i) => (
            <li key={i} className="group p-5 @md:p-6 @xl:p-8 rounded-2xl border bg-card/50 backdrop-blur-sm hover:bg-card transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 @md:mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Icon className="size-6 @md:size-7 text-primary" />
                </div>
                <h3 className="font-semibold text-base @md:text-lg mb-1.5 @md:mb-2">{title}</h3>
                <p className="text-xs @md:text-sm text-muted-foreground">{description}</p>
            </li>
        ))}
    </ul>
)


function BackgroundDecorative() {
    return (
        <>
            <div className="absolute inset-0 bg-linear-to-br from-background via-primary/5 to-background" />
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-[128px] animate-pulse [animation-delay:2s]" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-20" />
        </>
    )
}

