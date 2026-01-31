import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, ChevronRight, Code, Cpu, Layers, Palette, Smartphone, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'



export default function Main() {
    return (
        <section className="@container min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 h-full">
                <ul className="grid @3xl:grid-cols-2 min-h-screen gap-6 @md:gap-8 @xl:gap-12">
                    <li className='flex flex-col justify-center h-full py-8 @md:py-12 @3xl:py-0'>
                        <Eyebrow text="🚀 Over 500+ Articles" />
                        <Title text="Empowering Developers with Knowledge" />
                        <Description text="Your destination for cutting-edge development tutorials, insights, and industry news." />

                        <CTA items={[
                            { text: 'Explore Articles', href: '#articles', iconRight: ArrowRight },
                            { text: 'Subscribe Now', href: '#subscribe', variant: 'outline' },
                        ]} />

                        <Stats items={[
                            { value: '500+', label: 'Articles' },
                            { value: '50+', label: 'Authors' },
                            { value: '100K+', label: 'Readers' },
                        ]} />
                    </li>
                    <li className="flex flex-col justify-center py-8 @md:py-12 @3xl:py-16 @5xl:py-20">
                        <CategoryGrid className="grid @sm:grid-cols-2 gap-3 @md:gap-4" items={[
                            { name: 'Development', icon: Code, color: 'bg-blue-500', articles: 124, description: 'Web, mobile & backend development' },
                            { name: 'Design', icon: Palette, color: 'bg-purple-500', articles: 89, description: 'UI/UX, graphics & brand design' },
                            { name: 'Technology', icon: Cpu, color: 'bg-green-500', articles: 156, description: 'AI, blockchain & emerging tech' },
                            { name: 'Mobile', icon: Smartphone, color: 'bg-orange-500', articles: 67, description: 'iOS, Android & cross-platform' },
                            { name: 'DevOps', icon: Layers, color: 'bg-cyan-500', articles: 45, description: 'CI/CD, cloud & infrastructure' },
                            { name: 'Performance', icon: Zap, color: 'bg-yellow-500', articles: 38, description: 'Optimization & best practices' },
                        ]} />
                    </li>
                </ul>
            </div>
        </section>
    )
}


const Eyebrow = ({ text }: { text: string }) => (
    <div className="mb-4 @md:mb-5 @xl:mb-6">
        <Badge variant="outline" className="w-fit">
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <div className="mb-4 @md:mb-5 @xl:mb-6">
        <h1 className="text-3xl @sm:text-4xl @md:text-5xl @2xl:text-6xl @3xl:@max-4xl:text-4xl @5xl:text-6xl font-bold text-foreground leading-tight text-center @3xl:text-left">
            {text}
        </h1>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <div className="mb-6 @md:mb-8">
        <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-lg mx-auto text-center @3xl:mx-0 @3xl:text-left">
            {text}
        </p>
    </div>
)

const CTA = ({ items }: { items: { text: string, href: string, variant?: React.ComponentProps<typeof Button>['variant'], iconRight?: React.ComponentType<{ className?: string }>, iconLeft?: React.ComponentType<{ className?: string }> }[] }) => (
    <div className="flex justify-center @3xl:justify-start flex-wrap gap-3 @md:gap-4">
        {items.map((item, i) => (
            <Button key={i} size="lg" variant={item.variant} className="gap-2" asChild>
                <Link href={item.href}>
                    {item.iconLeft && <item.iconLeft className="size-4" />}
                    {item.text}
                    {item.iconRight && <item.iconRight className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Stats = ({ items }: { items: { value: string, label: string }[] }) => (
    <div className="flex justify-center @3xl:justify-start gap-6 @md:gap-8 mt-6 @md:mt-8 pt-4 @md:pt-5 mx-4 @md:mx-5 border-t">
        {items.map((stat) => (
            <div key={stat.label} className="text-center @3xl:text-left">
                <p className="text-2xl @md:text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs @md:text-sm text-muted-foreground">{stat.label}</p>
            </div>
        ))}
    </div>
)


interface CategoryGridProps {
    items: {
        name: string
        icon: ComponentType<{ className?: string }>
        color: string
        articles: number
        description: string
    }[]
    className?: string
}

const CategoryGrid = ({ items, className }: CategoryGridProps) => (
    <>
        <div className="flex items-center justify-between mb-4 @md:mb-6">
            <h2 className="text-lg @md:text-xl font-semibold text-foreground">Explore Topics</h2>
            <Button variant="ghost" size="sm" className="text-primary">
                View All
                <ChevronRight className="size-4 ml-1" />
            </Button>
        </div>
        <ul className={className}>
            {items.map((category) => (
                <li key={category.name}>
                    <Card className="group cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 py-0 gap-0">
                        <CardContent className="p-4 @md:p-5">
                            <div className="flex items-start gap-3 @md:gap-4">
                                <div
                                    className={`size-10 @md:size-12 rounded-xl ${category.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                                >
                                    <category.icon className="size-5 @md:size-6 text-white" />
                                </div>

                                {/* ⬇️ ONLY THIS COLUMN CHANGED */}
                                <div className="flex-1 min-w-0 relative pb-6">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        <ChevronRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>

                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                        {category.description}
                                    </p>

                                    <Badge
                                        variant="secondary"
                                        className="absolute bottom-0 left-0 text-xs"
                                    >
                                        {category.articles} articles
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </li>
            ))}
        </ul>
    </>
)

