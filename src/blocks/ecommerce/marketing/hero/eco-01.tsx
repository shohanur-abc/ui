import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Recycle, Heart, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge className="gap-2 bg-green-500/20 text-green-500 border-green-500/30">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-green-500">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const Stats = ({ items }: { items: { value: string; label: string; icon: React.ElementType }[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
        {items.map(({ value, label, icon: Icon }, i) => (
            <div key={i} className="rounded-xl border bg-card p-4 text-center">
                <Icon className="size-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-500">{value}</div>
                <div className="text-xs text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className={`gap-2 ${variant === "default" ? "bg-green-500 hover:bg-green-600" : ""}`} asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative">
        <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image src={src} alt={alt} fill className="object-cover" />
        </div>
        <div className="absolute -bottom-6 -right-6 size-32 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute -top-6 -left-6 size-24 rounded-full bg-green-500/10 blur-2xl" />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Leaf} text="Eco-Friendly" />
                        <Title text="Fashion That Loves" highlight="The Planet" />
                        <Description text="Join the sustainable fashion revolution. Every purchase supports environmental initiatives and ethical manufacturing practices." />
                        <Stats items={[
                            { value: "100%", label: "Organic Materials", icon: Leaf },
                            { value: "Zero", label: "Plastic Packaging", icon: Recycle },
                            { value: "50K+", label: "Trees Planted", icon: Globe },
                            { value: "1M+", label: "Happy Customers", icon: Heart }
                        ]} />
                        <CTA items={[
                            { label: "Shop Sustainable", href: "/sustainable", icon: ArrowRight },
                            { label: "Our Mission", href: "/mission", variant: "outline" }
                        ]} />
                    </div>
                    <HeroImage 
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=800&fit=crop" 
                        alt="Sustainable fashion"
                    />
                </div>
            </div>
        </section>
    )
}
