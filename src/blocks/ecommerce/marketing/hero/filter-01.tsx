import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Filter, Grid3X3, SlidersHorizontal } from "lucide-react"
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

const FilterBar = ({ filters }: { filters: { label: string; options: string[] }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {filters.map(({ label, options }, i) => (
            <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{label}:</span>
                <div className="flex gap-1">
                    {options.slice(0, 3).map((opt, j) => (
                        <Button key={j} variant={j === 0 ? "default" : "outline"} size="sm" className="h-7 text-xs">
                            {opt}
                        </Button>
                    ))}
                </div>
            </div>
        ))}
        <Button variant="outline" size="sm" className="gap-1 h-7">
            <SlidersHorizontal className="size-3" />
            More Filters
        </Button>
    </div>
)

const FilteredProducts = ({ products }: { products: { image: string; name: string; price: string; tags: string[] }[] }) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
        {products.map((product, i) => (
            <div key={i} className="group rounded-2xl border bg-card overflow-hidden">
                <div className="relative aspect-[3/4] overflow-hidden">
                    <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 space-y-2">
                    <div className="flex gap-1">
                        {product.tags.map((tag, j) => (
                            <Badge key={j} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                    </div>
                    <p className="font-medium truncate">{product.name}</p>
                    <p className="text-primary font-bold">{product.price}</p>
                </div>
            </div>
        ))}
    </div>
)

const ResultCount = ({ count, total }: { count: string; total: string }) => (
    <p className="text-center text-muted-foreground">
        Showing <span className="font-medium text-foreground">{count}</span> of <span className="font-medium text-foreground">{total}</span> products
    </p>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-8">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Filter} text="Smart Filter" />
                    <Title text="Find Exactly What" highlight="You Want" />
                    <Description text="Use our smart filters to narrow down products by size, color, price, and more. Shopping made simple." />
                </div>
                <FilterBar filters={[
                    { label: "Size", options: ["S", "M", "L", "XL"] },
                    { label: "Color", options: ["Black", "White", "Blue"] },
                    { label: "Price", options: ["$0-50", "$50-100", "$100+"] }
                ]} />
                <ResultCount count="248" total="1,245" />
                <FilteredProducts products={[
                    { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=533&fit=crop", name: "Classic Tee", price: "$45", tags: ["M", "Black"] },
                    { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=533&fit=crop", name: "Running Shoes", price: "$129", tags: ["10", "White"] },
                    { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop", name: "Crossbody Bag", price: "$89", tags: ["One Size"] },
                    { image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=533&fit=crop", name: "Slim Pants", price: "$79", tags: ["L", "Navy"] }
                ]} />
            </div>
        </section>
    )
}
