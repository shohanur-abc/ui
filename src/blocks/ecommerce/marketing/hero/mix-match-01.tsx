import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Shuffle, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const MixMatchGrid = ({ items }: { items: { category: string; options: { image: string; name: string; selected?: boolean }[] }[] }) => (
    <div className="space-y-6">
        {items.map((item, i) => (
            <div key={i} className="space-y-3">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">{item.category}</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {item.options.map((option, j) => (
                        <div key={j} className={`relative size-20 @md:size-24 rounded-xl overflow-hidden shrink-0 cursor-pointer ring-2 ${option.selected ? "ring-primary" : "ring-transparent"} hover:ring-primary/50 transition-all`}>
                            <Image src={option.image} alt={option.name} fill className="object-cover" />
                            {option.selected && (
                                <div className="absolute top-1 right-1 size-5 rounded-full bg-primary flex items-center justify-center">
                                    <Check className="size-3 text-primary-foreground" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

const Preview = ({ items }: { items: { image: string }[] }) => (
    <div className="relative">
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-background border">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                {items.map((item, i) => (
                    <div key={i} className="relative size-24 @md:size-32 rounded-2xl overflow-hidden shadow-lg">
                        <Image src={item.image} alt={`Selected item ${i + 1}`} fill className="object-cover" />
                    </div>
                ))}
            </div>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
            <Button className="gap-2 shadow-lg">
                <Shuffle className="size-4" />
                Randomize
            </Button>
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
                        <Eyebrow icon={Shuffle} text="Mix & Match" />
                        <Title text="Create Your" highlight="Perfect Combo" />
                        <Description text="Mix and match pieces to create unique combinations. Select items from each category and see how they look together in real-time." />
                        <MixMatchGrid items={[
                            { category: "Tops", options: [
                                { image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop", name: "Blazer", selected: true },
                                { image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=100&h=100&fit=crop", name: "Shirt" },
                                { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=100&h=100&fit=crop", name: "Sweater" }
                            ]},
                            { category: "Bottoms", options: [
                                { image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&h=100&fit=crop", name: "Pants", selected: true },
                                { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop", name: "Jeans" },
                                { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop", name: "Shorts" }
                            ]},
                            { category: "Shoes", options: [
                                { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop", name: "Sneakers", selected: true },
                                { image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop", name: "Boots" },
                                { image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop", name: "Loafers" }
                            ]}
                        ]} />
                        <CTA items={[
                            { label: "Shop This Look", href: "/cart", icon: Sparkles },
                            { label: "Save Combo", href: "/wishlist", variant: "outline" }
                        ]} />
                    </div>
                    <Preview items={[
                        { image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=200&h=200&fit=crop" },
                        { image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop" },
                        { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
