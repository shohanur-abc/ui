import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

interface ProductProps {
    image: string
    name: string
    tagline: string
    price: number
    features: string[]
}

const GlowDecorative = () => (
    <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-accent/30 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
)

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative mx-auto size-48 @sm:size-56">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
        <Image src={src} alt={alt} fill className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" />
    </div>
)

const ProductTagline = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1.5">
        <Sparkles className="size-3" />
        {text}
    </Badge>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-2xl font-bold tracking-tight text-foreground @sm:text-3xl">{text}</h3>
)

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="space-y-1.5">
        {items.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-1.5 rounded-full bg-primary" />
                {feature}
            </li>
        ))}
    </ul>
)

const ProductPrice = ({ amount }: { amount: number }) => (
    <div className="flex items-baseline gap-1">
        <span className="text-3xl font-bold text-foreground">${Math.floor(amount)}</span>
        <span className="text-lg text-muted-foreground">.{((amount % 1) * 100).toFixed(0).padStart(2, "0")}</span>
    </div>
)

const CTAButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2" size="lg">
        {label}
        <ArrowRight className="size-4" />
    </Button>
)

export default function Main() {
    const product: ProductProps = {
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        name: "Ultra Runner Pro",
        tagline: "Limited Edition",
        price: 249.99,
        features: ["Adaptive cushioning", "Breathable mesh", "Carbon fiber plate"],
    }

    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-sm px-4 py-8">
                <div className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border/50 bg-card/80 p-6 backdrop-blur-xl transition-all hover:border-primary/50 @sm:p-8">
                    <GlowDecorative />
                    <div className="relative space-y-6">
                        <ProductImage src={product.image} alt={product.name} />
                        <div className="space-y-4 text-center">
                            <ProductTagline text={product.tagline} />
                            <ProductName text={product.name} />
                            <FeatureList items={product.features} />
                        </div>
                        <div className="flex items-center justify-between pt-4">
                            <ProductPrice amount={product.price} />
                        </div>
                        <CTAButton label="Shop Now" />
                    </div>
                </div>
            </div>
        </section>
    )
}
