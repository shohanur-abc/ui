import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code, Palette, Server, Smartphone, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="slate">
            <div className="relative mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-28">
                <div className="flex flex-col items-center text-center gap-6">
                    <Eyebrow label="Explore Topics" icon={Sparkles} />
                    <Title text="Find Your Area of Interest" />
                    <Description text="Browse articles across various domains of technology, design, and development." />
                    <CategoryGrid
                        categories={[
                            { icon: Code, label: 'Frontend', count: 342, color: 'bg-blue-500/10 text-blue-500' },
                            { icon: Server, label: 'Backend', count: 256, color: 'bg-green-500/10 text-green-500' },
                            { icon: Smartphone, label: 'Mobile', count: 128, color: 'bg-purple-500/10 text-purple-500' },
                            { icon: Palette, label: 'Design', count: 187, color: 'bg-pink-500/10 text-pink-500' },
                        ]}
                    />
                    <CTA label="View All Categories" href="/categories" />
                </div>
            </div>
        </section>
    )
}

interface EyebrowProps {
    label: string
    icon: React.ComponentType<{ className?: string }>
}

const Eyebrow = ({ label, icon: Icon }: EyebrowProps) => (
    <Badge variant="secondary" className="px-4 py-1.5">
        <Icon className="size-3.5 mr-2" />
        {label}
    </Badge>
)

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
        {text}
    </h1>
)

interface DescriptionProps {
    text: string
}

const Description = ({ text }: DescriptionProps) => (
    <p className="text-lg text-muted-foreground max-w-xl">
        {text}
    </p>
)

interface Category {
    icon: React.ComponentType<{ className?: string }>
    label: string
    count: number
    color: string
}

interface CategoryGridProps {
    categories: Category[]
}

const CategoryGrid = ({ categories }: CategoryGridProps) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 w-full max-w-3xl mt-4">
        {categories.map((cat) => (
            <Link
                key={cat.label}
                href={`/category/${cat.label.toLowerCase()}`}
                className={`group flex flex-col items-center gap-3 p-6 rounded-2xl border bg-card transition-all hover:border-primary hover:shadow-lg`}
            >
                <div className={`size-14 rounded-xl ${cat.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <cat.icon className="size-7" />
                </div>
                <div className="text-center">
                    <p className="font-semibold">{cat.label}</p>
                    <p className="text-sm text-muted-foreground">{cat.count} articles</p>
                </div>
            </Link>
        ))}
    </div>
)

interface CTAProps {
    label: string
    href: string
}

const CTA = ({ label, href }: CTAProps) => (
    <Button variant="outline" size="lg" asChild className="gap-2 mt-4">
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)
