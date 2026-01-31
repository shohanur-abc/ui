import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Heart, Bookmark, Share2, ShoppingBag } from "lucide-react"
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

const WishlistStats = ({ stats }: { stats: { value: string; label: string }[] }) => (
    <div className="flex gap-8">
        {stats.map(({ value, label }, i) => (
            <div key={i}>
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        ))}
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

const WishlistPreview = ({ items }: { items: { image: string; name: string; price: string }[] }) => (
    <div className="relative">
        <div className="grid grid-cols-2 gap-4">
            {items.map((item, i) => (
                <div key={i} className="group relative rounded-2xl overflow-hidden">
                    <div className="aspect-square relative">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <div className="absolute top-3 right-3">
                            <Button size="icon" variant="secondary" className="size-8 rounded-full">
                                <Heart className="size-4 fill-red-500 text-red-500" />
                            </Button>
                        </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-white text-sm font-medium truncate">{item.name}</p>
                        <p className="text-primary font-bold">{item.price}</p>
                    </div>
                </div>
            ))}
        </div>
        <div className="absolute -top-4 -right-4 size-20 bg-primary/20 rounded-full blur-3xl" />
    </div>
)

const Features = ({ items }: { items: { icon: React.ElementType; text: string }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-primary" />
                <span>{text}</span>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Heart} text="Wishlist" />
                        <Title text="Save Items for" highlight="Later" />
                        <Description text="Found something you love? Add it to your wishlist and come back anytime. We'll even notify you when items go on sale." />
                        <Features items={[
                            { icon: Bookmark, text: "Save unlimited items" },
                            { icon: Share2, text: "Share with friends" },
                            { icon: ShoppingBag, text: "One-click checkout" }
                        ]} />
                        <WishlistStats stats={[
                            { value: "0", label: "Items Saved" },
                            { value: "$0", label: "Total Value" }
                        ]} />
                        <CTA items={[
                            { label: "Start Browsing", href: "/shop", icon: ShoppingBag },
                            { label: "View Wishlist", href: "/wishlist", variant: "outline", icon: Heart }
                        ]} />
                    </div>
                    <WishlistPreview items={[
                        { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop", name: "Silk Dress", price: "$189" },
                        { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop", name: "Running Shoes", price: "$149" },
                        { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", name: "Leather Bag", price: "$299" },
                        { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop", name: "Smart Watch", price: "$399" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
