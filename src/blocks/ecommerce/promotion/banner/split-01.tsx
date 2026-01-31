import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
    </div>
)

const ContentBlock = ({
    eyebrow,
    headline,
    description,
    cta,
}: {
    eyebrow: { text: string }
    headline: { text: string; highlight: string }
    description: string
    cta: { label: string; href: string; icon: React.ElementType }[]
}) => (
    <div className="space-y-4 @md:space-y-6">
        <Badge variant="outline" className="border-primary/50 text-primary">
            {eyebrow.text}
        </Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl @lg:text-6xl font-bold tracking-tight">
            {headline.text}
            <span className="text-primary block">{headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-lg">
            {description}
        </p>
        <div className="flex flex-wrap gap-3 @md:gap-4 pt-2">
            {cta.map(({ label, href, icon: Icon }, i) => (
                <Button
                    key={i}
                    variant={i === 0 ? "default" : "outline"}
                    size="lg"
                    className="gap-2"
                    asChild
                >
                    <Link href={href}>
                        {label}
                        <Icon className="size-4" />
                    </Link>
                </Button>
            ))}
        </div>
    </div>
)

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square @lg:aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
        <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
                        <ContentBlock
                            eyebrow={{ text: "New Season" }}
                            headline={{ text: "Premium", highlight: "Collection 2026" }}
                            description="Discover our exclusive collection crafted for the modern lifestyle. Luxury meets functionality in every piece."
                            cta={[
                                { label: "Shop Now", href: "/collection", icon: ShoppingCart },
                                { label: "View Lookbook", href: "/lookbook", icon: ArrowRight },
                            ]}
                        />
                        <ProductImage
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                            alt="Premium Collection"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
