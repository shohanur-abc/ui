import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Leaf, Award, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2 px-4 py-1.5">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight leading-tight">
        {text}{" "}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">{text}</p>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex gap-8">
        {items.map(({ value, label }, i) => (
            <div key={i}>
                <div className="text-2xl @md:text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Certifications = ({ items }: { items: { icon: React.ElementType; text: string }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 text-primary" />
                {text}
            </div>
        ))}
    </div>
)

const HeroImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative">
        <div className="relative aspect-[3/4] @lg:aspect-square rounded-3xl overflow-hidden">
            <Image src={src} alt={alt} fill className="object-cover" />
        </div>
        <div className="absolute -bottom-4 -right-4 @md:-bottom-6 @md:-right-6 size-24 @md:size-32 rounded-full bg-primary/10 blur-3xl" />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Leaf} text="Sustainable Fashion" />
                        <Title text="Fashion That Cares for" highlight="Our Planet" />
                        <Description text="Join the movement towards sustainable style. Every piece in our collection is crafted with eco-friendly materials and ethical practices." />
                        <Stats items={[
                            { value: "100%", label: "Organic Cotton" },
                            { value: "Zero", label: "Plastic Waste" },
                            { value: "50K+", label: "Trees Planted" }
                        ]} />
                        <CTA items={[
                            { label: "Shop Sustainable", href: "/sustainable", icon: ArrowRight },
                            { label: "Our Impact", href: "/impact", variant: "outline" }
                        ]} />
                        <Certifications items={[
                            { icon: Award, text: "B Corp Certified" },
                            { icon: Recycle, text: "100% Recyclable" }
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
