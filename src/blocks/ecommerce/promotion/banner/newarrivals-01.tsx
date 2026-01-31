import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const NewArrivalCard = ({
    image,
    title,
    price,
    category,
    isNew,
}: {
    image: string
    title: string
    price: string
    category: string
    isNew?: boolean
}) => (
    <div className="group relative">
        <div className="aspect-[4/5] rounded-2xl overflow-hidden relative mb-3">
            <Image src={image} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            {isNew && (
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground border-0 gap-1">
                    <Sparkles className="size-3" />
                    New
                </Badge>
            )}
        </div>
        <p className="text-xs text-muted-foreground mb-1">{category}</p>
        <h3 className="font-semibold mb-1 line-clamp-1">{title}</h3>
        <span className="font-bold text-primary">{price}</span>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    subtext: string
    cta: { label: string; href: string }
}) => (
    <div className="flex flex-col @md:flex-row @md:items-end justify-between gap-4 mb-10">
        <div>
            <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-4">
                <badge.icon className="size-3" />
                {badge.text}
            </Badge>
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-2">
                {headline.text}
                <span className="text-primary"> {headline.highlight}</span>
            </h2>
            <p className="text-muted-foreground">{subtext}</p>
        </div>
        <Button variant="outline" className="gap-2 shrink-0" asChild>
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Sparkles, text: "Just Dropped" }}
                        headline={{ text: "New", highlight: "Arrivals" }}
                        subtext="Be the first to shop our latest products"
                        cta={{ label: "Shop All New", href: "/new-arrivals" }}
                    />
                    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 @md:gap-6">
                        <NewArrivalCard
                            image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"
                            title="Smart Watch Ultra"
                            price="$449"
                            category="Electronics"
                            isNew
                        />
                        <NewArrivalCard
                            image="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400"
                            title="AirPods Max"
                            price="$549"
                            category="Audio"
                            isNew
                        />
                        <NewArrivalCard
                            image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
                            title="Galaxy Ring"
                            price="$399"
                            category="Wearables"
                            isNew
                        />
                        <NewArrivalCard
                            image="https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"
                            title="MagSafe Charger"
                            price="$129"
                            category="Accessories"
                            isNew
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
