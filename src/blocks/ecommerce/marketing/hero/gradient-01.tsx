import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Crown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="outline" className="gap-2 border-primary/50 text-primary">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-2xl mx-auto">{text}</p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
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

const FeaturedProducts = ({ products }: { products: { image: string; alt: string }[] }) => (
    <div className="flex justify-center -space-x-8 mt-12">
        {products.map((product, i) => (
            <div 
                key={i} 
                className="relative size-32 @md:size-40 @lg:size-48 rounded-full border-4 border-background overflow-hidden shadow-2xl hover:scale-110 hover:z-10 transition-transform"
                style={{ zIndex: products.length - i }}
            >
                <Image src={product.image} alt={product.alt} fill className="object-cover" />
            </div>
        ))}
    </div>
)

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] rounded-full bg-accent/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full bg-primary/10 blur-[100px]" />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <GlowDecorative />
            <div className="relative max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-24 @md:py-32 @xl:py-40">
                <div className="text-center space-y-8">
                    <Eyebrow icon={Crown} text="Premium Collection" />
                    <Title text="Luxury Redefined" />
                    <Description text="Experience the pinnacle of craftsmanship. Each piece in our premium collection is a masterwork of design and quality." />
                    <CTA items={[
                        { label: "Explore Premium", href: "/premium", icon: Sparkles },
                        { label: "Book Consultation", href: "/consultation", variant: "outline", icon: ArrowRight }
                    ]} />
                    <FeaturedProducts products={[
                        { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop", alt: "Luxury watch" },
                        { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop", alt: "Designer bag" },
                        { image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop", alt: "Fashion" },
                        { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", alt: "Premium shoes" },
                        { image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop", alt: "Fragrance" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
