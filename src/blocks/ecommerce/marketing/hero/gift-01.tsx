import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Gift, Heart, Package, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

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

const GiftFinder = ({ placeholder, buttonText }: { placeholder: string; buttonText: string }) => (
    <div className="max-w-md mx-auto">
        <div className="flex gap-2">
            <Input 
                type="text" 
                placeholder={placeholder}
                className="h-12"
            />
            <Button size="lg" className="gap-2 shrink-0">
                {buttonText}
                <ArrowRight className="size-4" />
            </Button>
        </div>
    </div>
)

const Categories = ({ items }: { items: { icon: React.ElementType; label: string; href: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {items.map(({ icon: Icon, label, href }, i) => (
            <Button key={i} variant="outline" className="gap-2" asChild>
                <Link href={href}>
                    <Icon className="size-4" />
                    {label}
                </Link>
            </Button>
        ))}
    </div>
)

const GiftPicks = ({ products }: { products: { image: string; title: string; price: string; href: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 mt-12">
        {products.map((product, i) => (
            <Link key={i} href={product.href} className="group rounded-2xl border bg-card overflow-hidden">
                <div className="relative aspect-square">
                    <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                    <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{product.title}</h3>
                    <p className="text-primary font-bold">{product.price}</p>
                </div>
            </Link>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="space-y-8">
                    <div className="text-center">
                        <Eyebrow icon={Gift} text="Gift Guide" />
                    </div>
                    <Title text="Find the Perfect" highlight="Gift" />
                    <Description text="Discover thoughtful gifts for every occasion and person. Our curated collections make gifting easy and memorable." />
                    <GiftFinder placeholder="Who are you shopping for?" buttonText="Find Gifts" />
                    <Categories items={[
                        { icon: Heart, label: "For Her", href: "/gifts/for-her" },
                        { icon: Star, label: "For Him", href: "/gifts/for-him" },
                        { icon: Gift, label: "For Kids", href: "/gifts/for-kids" },
                        { icon: Package, label: "For Home", href: "/gifts/for-home" }
                    ]} />
                    <GiftPicks products={[
                        { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", title: "Luxury Watch", price: "$299", href: "/product/watch" },
                        { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", title: "Leather Bag", price: "$189", href: "/product/bag" },
                        { image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", title: "Fragrance Set", price: "$129", href: "/product/fragrance" },
                        { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop", title: "Accessory Kit", price: "$79", href: "/product/accessories" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
