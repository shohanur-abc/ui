import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, Star, CheckCircle2, Sparkles } from "lucide-react"
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

const BundleContents = ({ items }: { items: { image: string; name: string; originalPrice: string }[] }) => (
    <div className="grid grid-cols-3 gap-3">
        {items.map((item, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border bg-card">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-2 inset-x-2 text-center">
                    <p className="text-white text-xs font-medium truncate">{item.name}</p>
                    <p className="text-white/70 text-xs line-through">{item.originalPrice}</p>
                </div>
            </div>
        ))}
    </div>
)

const Savings = ({ originalTotal, bundlePrice, savedAmount }: { originalTotal: string; bundlePrice: string; savedAmount: string }) => (
    <div className="rounded-2xl border bg-card p-6 space-y-4">
        <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Original Total:</span>
            <span className="line-through">{originalTotal}</span>
        </div>
        <div className="flex justify-between items-center">
            <span className="font-medium">Bundle Price:</span>
            <span className="text-2xl font-bold text-primary">{bundlePrice}</span>
        </div>
        <div className="pt-4 border-t">
            <Badge className="w-full justify-center py-2 bg-green-500/10 text-green-500 border-green-500/20">
                You Save {savedAmount}!
            </Badge>
        </div>
    </div>
)

const Benefits = ({ items }: { items: string[] }) => (
    <div className="space-y-2">
        {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>{item}</span>
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

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Package} text="Bundle Deal" />
                        <Title text="Complete Your Look &" highlight="Save 30%" />
                        <Description text="Get everything you need in one bundle. Hand-picked combinations that work perfectly together at an unbeatable price." />
                        <Benefits items={[
                            "All items curated to match perfectly",
                            "Free express shipping included",
                            "30-day satisfaction guarantee",
                            "Gift wrapping available"
                        ]} />
                        <CTA items={[
                            { label: "Add Bundle to Cart", href: "/cart", icon: Sparkles },
                            { label: "Customize Bundle", href: "/bundle/customize", variant: "outline", icon: ArrowRight }
                        ]} />
                    </div>
                    <div className="space-y-6">
                        <BundleContents items={[
                            { image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=300&fit=crop", name: "Classic Blazer", originalPrice: "$189" },
                            { image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=300&fit=crop", name: "Tailored Pants", originalPrice: "$129" },
                            { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop", name: "Oxford Shoes", originalPrice: "$169" }
                        ]} />
                        <Savings originalTotal="$487" bundlePrice="$339" savedAmount="$148" />
                    </div>
                </div>
            </div>
        </section>
    )
}
