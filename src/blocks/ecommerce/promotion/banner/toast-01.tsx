import Link from "next/link"
import Image from "next/image"
import { ArrowRight, X, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const ProductToast = ({
    image,
    badge,
    title,
    price,
    rating,
    cta,
}: {
    image: { src: string; alt: string }
    badge?: string
    title: string
    price: { original?: string; sale: string }
    rating: { value: string; count: string }
    cta: { label: string; href: string }
}) => (
    <div className="flex gap-4">
        <div className="relative size-20 rounded-lg overflow-hidden shrink-0 bg-muted">
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
            {badge && (
                <Badge className="absolute top-1 left-1 text-[10px] px-1.5 py-0">{badge}</Badge>
            )}
        </div>
        <div className="flex-1 min-w-0">
            <p className="font-medium truncate mb-1">{title}</p>
            <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-primary">{price.sale}</span>
                {price.original && (
                    <span className="text-sm text-muted-foreground line-through">{price.original}</span>
                )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <Star className="size-3 fill-primary text-primary" />
                <span>{rating.value}</span>
                <span>({rating.count})</span>
            </div>
            <Button size="sm" className="gap-1.5 h-7 text-xs" asChild>
                <Link href={cta.href}>
                    <ShoppingCart className="size-3" />
                    {cta.label}
                </Link>
            </Button>
        </div>
        <Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground hover:text-foreground">
            <X className="size-4" />
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-sm ml-auto mr-4">
                    <div className="bg-card rounded-2xl border border-border/50 p-4 shadow-xl">
                        <ProductToast
                            image={{
                                src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
                                alt: "Watch",
                            }}
                            badge="SALE"
                            title="Premium Chronograph Watch"
                            price={{ original: "$299", sale: "$149" }}
                            rating={{ value: "4.9", count: "1.2k" }}
                            cta={{ label: "Add to Cart", href: "/product/watch" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
