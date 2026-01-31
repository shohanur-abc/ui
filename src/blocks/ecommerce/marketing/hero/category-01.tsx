import Link from "next/link"
import Image from "next/image"
import { ArrowRight, LayoutGrid, ListFilter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const CategoryGrid = ({ categories }: { categories: { image: string; name: string; count: string }[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-6 gap-4">
        {categories.map((cat, i) => (
            <Link key={i} href={`/category/${cat.name.toLowerCase()}`} className="group">
                <div className="relative aspect-square rounded-2xl overflow-hidden border bg-card">
                    <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 inset-x-4 text-center text-white">
                        <p className="font-medium">{cat.name}</p>
                        <p className="text-sm text-white/70">{cat.count}</p>
                    </div>
                </div>
            </Link>
        ))}
    </div>
)

const SortBar = () => (
    <div className="flex justify-center gap-4">
        <Button variant="outline" className="gap-2">
            <ListFilter className="size-4" />
            Filter
        </Button>
        <Button variant="outline" className="gap-2">
            <ArrowUpDown className="size-4" />
            Sort
        </Button>
        <Button variant="outline" className="gap-2">
            <LayoutGrid className="size-4" />
            View
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Eyebrow icon={LayoutGrid} text="Browse Categories" />
                    <Title text="Shop by" highlight="Category" />
                    <Description text="Explore our diverse collection organized by category. Find exactly what you're looking for with our easy navigation." />
                </div>
                <CategoryGrid categories={[
                    { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&h=300&fit=crop", name: "Dresses", count: "245 items" },
                    { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", name: "Shoes", count: "189 items" },
                    { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop", name: "Bags", count: "124 items" },
                    { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", name: "Watches", count: "87 items" },
                    { image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop", name: "Jewelry", count: "156 items" },
                    { image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop", name: "Outerwear", count: "98 items" }
                ]} />
                <SortBar />
            </div>
        </section>
    )
}
