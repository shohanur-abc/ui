import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Code, Palette, Rocket, Server, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="emerald">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @xl:grid-cols-3 gap-6 @xl:gap-8">
                    <MainContent
                        title="Explore Our Categories"
                        description="Dive deep into topics that matter to you"
                        cta={{ label: 'Browse All', href: '/categories' }}
                        className="@xl:col-span-1"
                    />
                    <CategoriesGrid
                        categories={[
                            { icon: Code, label: 'Frontend', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400', count: 342 },
                            { icon: Server, label: 'Backend', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', count: 256 },
                            { icon: Palette, label: 'Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400', count: 128 },
                            { icon: Rocket, label: 'DevOps', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400', count: 94 },
                        ]}
                        className="@xl:col-span-2"
                    />
                </div>
            </div>
        </section>
    )
}

interface MainContentProps {
    title: string
    description: string
    cta: { label: string; href: string }
    className?: string
}

const MainContent = ({ title, description, cta, className }: MainContentProps) => (
    <div className={`flex flex-col justify-center ${className}`}>
        <Badge className="w-fit mb-4 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="size-3.5 mr-1.5" />
            Categories
        </Badge>
        <h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
            {description}
        </p>
        <Button size="lg" asChild className="gap-2 w-fit">
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

interface Category {
    icon: React.ComponentType<{ className?: string }>
    label: string
    image: string
    count: number
}

interface CategoriesGridProps {
    categories: Category[]
    className?: string
}

const CategoriesGrid = ({ categories, className }: CategoriesGridProps) => (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
        {categories.map((cat, i) => (
            <Link key={cat.label} href={`/category/${cat.label.toLowerCase()}`}>
                <Card className={`group overflow-hidden cursor-pointer py-0 h-full ${i === 0 ? 'col-span-2 @md:col-span-1 @md:row-span-2' : ''}`}>
                    <div className={`relative ${i === 0 ? 'aspect-square' : 'aspect-video'}`}>
                        <Image src={cat.image} alt={cat.label} fill className="object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                        <CardContent className="absolute bottom-0 left-0 right-0 p-4 @md:p-5">
                            <div className="size-10 @md:size-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <cat.icon className="size-5 @md:size-6 text-white" />
                            </div>
                            <h3 className="text-lg @md:text-xl font-bold text-white">{cat.label}</h3>
                            <p className="text-sm text-white/70">{cat.count} articles</p>
                        </CardContent>
                    </div>
                </Card>
            </Link>
        ))}
    </div>
)
