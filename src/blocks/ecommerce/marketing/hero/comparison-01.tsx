import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Scale, CheckCircle2, X, Star } from "lucide-react"
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

const ComparisonTable = ({ products }: { products: { image: string; name: string; price: string; rating: number; features: { name: string; value: boolean | string }[]; highlighted?: boolean }[] }) => (
    <div className="grid @md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {products.map((product, i) => (
            <div key={i} className={`rounded-2xl border ${product.highlighted ? "border-primary bg-primary/5" : "bg-card"} overflow-hidden`}>
                {product.highlighted && <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">Most Popular</div>}
                <div className="p-6 space-y-6">
                    <div className="relative h-48 rounded-xl overflow-hidden">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-bold">{product.name}</h3>
                        <p className="text-2xl font-bold text-primary mt-1">{product.price}</p>
                        <div className="flex justify-center mt-2">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-4 ${j < product.rating ? "fill-primary text-primary" : "text-muted"}`} />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-3">
                        {product.features.map((feature, j) => (
                            <div key={j} className="flex items-center justify-between py-2 border-b last:border-0">
                                <span className="text-sm">{feature.name}</span>
                                {typeof feature.value === "boolean" ? (
                                    feature.value ? (
                                        <CheckCircle2 className="size-5 text-green-500" />
                                    ) : (
                                        <X className="size-5 text-muted-foreground" />
                                    )
                                ) : (
                                    <span className="text-sm font-medium">{feature.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                    <Button className="w-full" variant={product.highlighted ? "default" : "outline"}>
                        Add to Cart
                    </Button>
                </div>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Scale} text="Compare" />
                    <Title text="Find Your" highlight="Perfect Match" />
                    <Description text="Not sure which one to choose? Compare features side by side to find the product that best fits your needs." />
                </div>
                <ComparisonTable products={[
                    { 
                        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop", 
                        name: "Urban Runner", 
                        price: "$129", 
                        rating: 4,
                        features: [
                            { name: "Cushioning", value: "Standard" },
                            { name: "Waterproof", value: false },
                            { name: "Breathable", value: true },
                            { name: "Weight", value: "280g" }
                        ]
                    },
                    { 
                        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop", 
                        name: "Urban Runner Pro", 
                        price: "$189", 
                        rating: 5,
                        highlighted: true,
                        features: [
                            { name: "Cushioning", value: "Premium" },
                            { name: "Waterproof", value: true },
                            { name: "Breathable", value: true },
                            { name: "Weight", value: "245g" }
                        ]
                    }
                ]} />
            </div>
        </section>
    )
}
