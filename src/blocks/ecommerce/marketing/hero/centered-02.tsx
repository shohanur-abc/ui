import Link from "next/link"
import Image from "next/image"
import { Play, ShoppingCart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <div className="inline-flex items-center gap-2 text-sm text-primary">
        <Icon className="size-4" />
        <span className="font-medium">{text}</span>
    </div>
)

const Title = ({ text, gradient }: { text: string; gradient?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight">
        {text}
        {gradient && (
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {gradient}
            </span>
        )}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground max-w-xl mx-auto">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-col @sm:flex-row justify-center gap-3 @md:gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2 min-w-[160px]" asChild>
                <Link href={href}>
                    {Icon && <Icon className="size-4" />}
                    {label}
                </Link>
            </Button>
        ))}
    </div>
)

const ProductPreview = ({ src, alt, badge }: { src: string; alt: string; badge?: string }) => (
    <div className="relative mt-12 @md:mt-16">
        {badge && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                {badge}
            </Badge>
        )}
        <div className="relative aspect-[16/9] max-w-4xl mx-auto rounded-xl overflow-hidden border shadow-2xl shadow-primary/10">
            <Image src={src} alt={alt} fill className="object-cover" />
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Sparkles} text="Limited Edition" />
                    <Title text="Experience Premium" gradient="Shopping Redefined" />
                    <Description text="Discover exclusive products crafted with precision and designed for excellence. Your journey to premium quality starts here." />
                    <CTA items={[
                        { label: "Start Shopping", href: "/shop", icon: ShoppingCart },
                        { label: "Watch Video", href: "#video", variant: "outline", icon: Play }
                    ]} />
                </div>
                <ProductPreview 
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=675&fit=crop" 
                    alt="Premium products showcase"
                    badge="New Arrivals"
                />
            </div>
        </section>
    )
}
