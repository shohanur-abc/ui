import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Tag, Sparkles, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const BrandShowcase = ({ brands }: { brands: { name: string; logo?: string; discount?: string }[] }) => (
    <div className="grid grid-cols-2 @sm:grid-cols-4 gap-4">
        {brands.map((brand, i) => (
            <div key={i} className="group relative p-6 rounded-2xl border bg-card text-center hover:border-primary transition-colors">
                <p className="text-xl font-bold">{brand.name}</p>
                {brand.discount && (
                    <Badge className="absolute -top-2 -right-2 bg-primary">{brand.discount}</Badge>
                )}
            </div>
        ))}
    </div>
)

const FeaturedBrand = ({ name, description, products }: { name: string; description: string; products: { image: string; name: string; price: string }[] }) => (
    <div className="rounded-3xl border bg-card overflow-hidden">
        <div className="p-6 border-b">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold">{name}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-1">
                    View All <ArrowRight className="size-3" />
                </Button>
            </div>
        </div>
        <div className="grid grid-cols-3 divide-x">
            {products.map((product, i) => (
                <div key={i} className="group p-4">
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                        <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-primary font-bold">{product.price}</p>
                </div>
            ))}
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Tag} text="Shop by Brand" />
                        <Title text="Your Favorite" highlight="Brands" />
                        <Description text="Explore our collection of premium brands. From designer labels to everyday essentials, find all your favorites in one place." />
                        <BrandShowcase brands={[
                            { name: "Nike", discount: "Up to 40% Off" },
                            { name: "Adidas" },
                            { name: "Gucci", discount: "New In" },
                            { name: "Prada" },
                            { name: "Zara" },
                            { name: "H&M" },
                            { name: "Uniqlo" },
                            { name: "Levi's" }
                        ]} />
                        <CTA items={[
                            { label: "Shop All Brands", href: "/brands", icon: ArrowRight },
                            { label: "A-Z Directory", href: "/brands/directory", variant: "outline" }
                        ]} />
                    </div>
                    <FeaturedBrand 
                        name="Nike"
                        description="Just Do It - New arrivals this week"
                        products={[
                            { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", name: "Air Max 90", price: "$129" },
                            { image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop", name: "Air Force 1", price: "$99" },
                            { image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop", name: "Jordan 1", price: "$179" }
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}
