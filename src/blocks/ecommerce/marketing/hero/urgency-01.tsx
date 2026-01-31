import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Timer, Users, AlertCircle, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-destructive">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const UrgencyBadge = ({ text }: { text: string }) => (
    <Badge className="gap-2 bg-destructive animate-pulse">
        <AlertCircle className="size-4" />
        {text}
    </Badge>
)

const StockIndicator = ({ remaining, total }: { remaining: number; total: number }) => (
    <div className="space-y-2">
        <div className="flex justify-between text-sm">
            <span className="font-medium">Only {remaining} left!</span>
            <span className="text-muted-foreground">{Math.round((remaining/total) * 100)}% remaining</span>
        </div>
        <Progress value={(remaining/total) * 100} className="h-3" />
    </div>
)

const ViewerCount = ({ count }: { count: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="relative">
            <Users className="size-4" />
            <span className="absolute -top-1 -right-1 size-2 rounded-full bg-green-500 animate-pulse" />
        </div>
        <span>{count} people viewing this right now</span>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className={`gap-2 ${variant === "default" ? "bg-destructive hover:bg-destructive/90" : ""}`} asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const ProductCard = ({ image, name, price, originalPrice, remaining }: { image: string; name: string; price: string; originalPrice: string; remaining: number }) => (
    <div className="relative rounded-3xl overflow-hidden border bg-card">
        <Badge className="absolute top-4 left-4 z-10 bg-destructive">Only {remaining} left!</Badge>
        <div className="relative aspect-square">
            <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <div className="p-6 space-y-4">
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-destructive">{price}</span>
                <span className="text-lg text-muted-foreground line-through">{originalPrice}</span>
            </div>
            <StockIndicator remaining={remaining} total={100} />
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <UrgencyBadge text="Selling Fast!" />
                        <Title text="Don't Miss Out -" highlight="Almost Gone!" />
                        <Description text="This popular item is selling incredibly fast. Once it's gone, it's gone! Don't wait - secure yours now before stock runs out." />
                        <ViewerCount count="47" />
                        <CTA items={[
                            { label: "Buy Now", href: "/checkout", icon: ShoppingBag },
                            { label: "View Details", href: "/product", variant: "outline", icon: ArrowRight }
                        ]} />
                    </div>
                    <ProductCard 
                        image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
                        name="Limited Edition Urban Runner"
                        price="$99"
                        originalPrice="$199"
                        remaining={12}
                    />
                </div>
            </div>
        </section>
    )
}
