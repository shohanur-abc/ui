import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Snowflake, Sun, Leaf, Flower2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
    </div>
)

const SeasonalContent = ({
    badge,
    headline,
    description,
    features,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    description: string
    features: string[]
    cta: { label: string; href: string }
}) => (
    <div className="space-y-6">
        <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/30 gap-1.5">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold">
            {headline.text}
            <span className="text-blue-500 block">{headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg">{description}</p>
        <div className="flex flex-wrap gap-2">
            {features.map((feature, i) => (
                <Badge key={i} variant="secondary" className="text-sm">
                    {feature}
                </Badge>
            ))}
        </div>
        <Button size="lg" className="gap-2 bg-blue-500 hover:bg-blue-600" asChild>
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

const SeasonalImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square @lg:aspect-[4/5] rounded-3xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
            <Badge className="bg-blue-500 text-white border-0 text-lg px-4 py-1">
                Up to 60% Off
            </Badge>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
                        <SeasonalContent
                            badge={{ icon: Snowflake, text: "Winter Collection" }}
                            headline={{ text: "Winter", highlight: "Wonderland Sale" }}
                            description="Cozy up with our winter essentials. From warm coats to festive accessories, discover everything you need for the season."
                            features={["Coats & Jackets", "Knitwear", "Boots", "Accessories"]}
                            cta={{ label: "Shop Winter", href: "/winter" }}
                        />
                        <SeasonalImage
                            src="https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800"
                            alt="Winter Collection"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
