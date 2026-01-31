import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Code, Database, Palette, Server, Smartphone, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="slate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header
                    title="Explore by Category"
                    description="Find content that matches your interests"
                />
                <CategoryGrid
                    categories={[
                        { icon: Code, label: 'Frontend', count: 342, color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20' },
                        { icon: Server, label: 'Backend', count: 256, color: 'bg-green-500/10 text-green-500 hover:bg-green-500/20' },
                        { icon: Database, label: 'Database', count: 128, color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20' },
                        { icon: Smartphone, label: 'Mobile', count: 94, color: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20' },
                        { icon: Palette, label: 'Design', count: 187, color: 'bg-pink-500/10 text-pink-500 hover:bg-pink-500/20' },
                        { icon: Terminal, label: 'DevOps', count: 156, color: 'bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
    description: string
}

const Header = ({ title, description }: HeaderProps) => (
    <div className="text-center mb-10">
        <h1 className="text-3xl @md:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
    </div>
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
    <div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-6 gap-4">
        {categories.map((cat) => (
            <Link key={cat.label} href={`/category/${cat.label.toLowerCase()}`}>
                <Card className={`group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 ${cat.color}`}>
                    <CardContent className="p-5 flex flex-col items-center text-center">
                        <div className={`size-14 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                            <cat.icon className="size-7" />
                        </div>
                        <p className="font-semibold">{cat.label}</p>
                        <p className="text-xs text-muted-foreground">{cat.count} articles</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)
